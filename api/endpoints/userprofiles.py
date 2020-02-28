from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import User
from api.common import *
import bcrypt

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
        return HttpResponse(
            "Login acknowledged",
            status=200
        )

# URI: /api/logout
# Expect:
def logout(request):
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
    
    user.bio = json_req["bio"]
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