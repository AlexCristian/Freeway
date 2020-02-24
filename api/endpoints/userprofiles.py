from django.shortcuts import render, get_object_or_404
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import User
import bcrypt
import json

# Profile-related endpoints reside here.

def checkJson(request, expected):
    for term in expected:
        if term not in request:
            return False
    return True

def httpBadRequest():
    return HttpResponse(
        "400 Bad request",
        status=400
    )


# URI: /api/login
# Expect: email, oauthid
def login(request):
    expected_fields = ["email", "oauthid"]
    
    json_req = json.loads(request.body.decode("utf-8"))
    if not checkJson(json_req, expected_fields):
        return httpBadRequest()
    
    user = get_object_or_404(
        User,
        email=json_req["email"]
    )

    if not bcrypt.checkpw(json_req["oauthid"], user.oauthid):
        return HttpResponse(
            "401 Unauthorized",
            status=401
        )
    else:
        request.session["uemail"] = user.email
        return HttpResponse(
            "200 Login acknowledged",
            status=200
        )

# URI: /api/signup
# Expect: email, oauthid, name, photourl, location, bio
def signup(request):
    expected_fields = ["email", "oauthid", "name", "photourl", "location", "bio"]
    
    json_req = json.loads(request.body.decode("utf-8"))
    if not checkJson(json_req, expected_fields):
        return httpBadRequest()
    
    pwd_hash = bcrypt.hashpw(
        json_req["oauthid"].encode('utf-8'),
        bcrypt.gensalt()
    )

    try:
        User.objects.create(
            name=json_req["name"],
            email=json_req["email"],
            oauthid=pwd_hash,
            photourl=json_req["photourl"],
            location=json_req["location"],
            bio=json_req["bio"]
        )
    except ValidationError:
        return HttpResponse(
            "400 Invalid registration data",
            status=400
        )
    else:
        return HttpResponse(
            "200 Registration acknowledged",
            status=200
        )

# URI: /api/setbio
# Expect: newbio
def setbio(request):
    return HttpResponse("Not implemented", status=501)

# URI: /api/setlocation
# Expect: newlocation
def setlocation(request):
    return HttpResponse("Not implemented", status=501)