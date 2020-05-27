from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from google.oauth2 import id_token
from google.auth.transport import requests
from api.models import User
from api.common import *
import bcrypt

from api.bert_embeddings import Embedding
embed_model = Embedding()

CLIENT_IDS = ["742738163356-tpo7qt8cvqno2cs739k8uh7sp9c9oq58.apps.googleusercontent.com",
        "742738163356-b8q9i9ru18trlvo27810a46eoelrh8q5.apps.googleusercontent.com",
        "742738163356-hf5tdgnfa5dec8e5ii42jr28lugkc6ak.apps.googleusercontent.com"]

# Profile-related endpoints reside here.

# URI: /api/login
# Expect: email, oauthid
def login(request):
    expected_fields = ["email", "oauthid"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()

    user = None
    try:
        user = User.objects.get(email=json_req["email"])
    except ObjectDoesNotExist:
        return HttpResponse(
            "Unauthorized",
            status=401
        )

    try:
        # Multiple clients access the backend server:
        idinfo = id_token.verify_oauth2_token(json_req["oauthid"].encode('utf-8'), requests.Request())
        if idinfo['aud'] not in CLIENT_IDS:
            raise ValueError('Wrong audience.')
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        userid = idinfo['sub']
    except ValueError:
        return HttpResponse(
            "Unauthorized",
            status=401
        )

    if "uemail" in request.session:
        logout(request)
    request.session["uemail"] = user.email
    request.session["id"] = str(user.id)
    return HttpResponse(
        "Login acknowledged",
        status=200
    )

# URI: /api/login-legacy
# Expect: email, oauthid
def login_legacy(request):
    expected_fields = ["email", "oauthid"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()

    user = None
    try:
        user = User.objects.get(email=json_req["email"])
    except ObjectDoesNotExist:
        return HttpResponse(
            "Unauthorized",
            status=401
        )

    if not bcrypt.checkpw(json_req["oauthid"].encode('utf-8'),
                          user.oauthid.encode('utf-8')):
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    else:
        if "uemail" in request.session:
            logout(request)
        request.session["uemail"] = user.email
        request.session["id"] = str(user.id)
        return HttpResponse(
            "Login acknowledged",
            status=200
        )

# URI: /api/logout
# Expect:
def logout(request):
    if "id" in request.session:
        del request.session["id"]
    if "uemail" in request.session:
        del request.session["uemail"]
        return HttpResponse(
            "Logout acknowledged",
            status=200
        )
    return httpBadRequest()

# URI: /api/signup
# Expect: email, oauthid, name, photourl, location, bio
def signup(request):
    expected_fields = ["email", "oauthid", "name", "photourl", "location", "bio"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()

    pwd_hash = bcrypt.hashpw(
        json_req["oauthid"].encode('utf-8'),
        bcrypt.gensalt()
    ).decode("utf-8")

    global embed_model
    bio_embedding = list(embed_model.get_embedding(json_req["bio"]))

    try:
        User.objects.create(
            name=json_req["name"],
            email=json_req["email"],
            oauthid=pwd_hash,
            photourl=json_req["photourl"],
            location=json_req["location"],
            bio=json_req["bio"],
            bio_embedding=bio_embedding,
        )
    except ValidationError:
        return HttpResponse(
            "Invalid registration data",
            status=400
        )
    else:
        return HttpResponse(
            "Registration acknowledged",
            status=200
        )

# URI: /api/setbio
# Expect: newbio
def setbio(request):
    expected_fields = ["bio"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()



    user = None
    try:
        user = User.objects.get(email=request.session["uemail"])
    except (ObjectDoesNotExist, KeyError):
        return HttpResponse(
            "Unauthorized",
            status=401
        )

    global embed_model
    bio_embedding = list(embed_model.get_embedding(json_req["bio"]))

    user.bio = json_req["bio"]
    user.bio_embedding = bio_embedding
    user.save()
    return HttpResponse(
        "Bio updated",
        status=200
    )

# URI: /api/setlocation
# Expect: newlocation
def setlocation(request):
    expected_fields = ["location"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()

    user = None
    try:
        user = User.objects.get(email=request.session["uemail"])
    except (ObjectDoesNotExist, KeyError):
        return HttpResponse(
            "Unauthorized",
            status=401
        )

    user.location = json_req["location"]
    user.save()
    return HttpResponse(
        "Location updated",
        status=200
    )

# URI: /api/profile
# Expect:
def profile(request):
    if "uemail" not in request.session:
        return httpBadRequest()

    user = None
    try:
        user = User.objects.get(email=request.session["uemail"])
    except (ObjectDoesNotExist, KeyError):
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    response = {}
    response["bio"] = user.bio
    response["location"] = user.location
    response["email"] = user.email
    response["name"] = user.name
    response["photourl"] = user.photourl
    response["datecreated"] = str(user.datecreated)

    return HttpResponse(
        json.dumps(response),
        status=200,
        content_type='application/json'
    )
