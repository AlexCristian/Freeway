from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import Task, User
from api.common import *
import bcrypt

# Task-related endpoints reside here.

# URI: /api/createtask
# Expect: description
def createtask(request):
    expected_fields = ["description"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()

    user = None
    try:
        user = User.objects.get(email=request.session["uemail"])
    except (ObjectDoesNotExist, KeyError):
        return HttpResponse("Unauthorized", status=401)

    try:
        Task.objects.create(
            description=json_req["description"],
            pinid=user.id,
            volunteerid=user.id,  # May not be the best choice but can't leave it null
            state=1,
        )
    except ValidationError:
        return HttpResponse(
            "Invalid task data",
            status=400
        )
    else:
        return HttpResponse(
            "New task added to DB",
            status=200
        )
