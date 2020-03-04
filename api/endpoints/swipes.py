from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import Task, User
from api.common import *

# Swipe-related endpoints reside here.

# URI: /api/swipe/p/:taskid,volunteerid,match:
# Expect:
def pin_swipe(request, taskid, volunteerid, match):

    if "uemail" not in request.session:
        return httpBadRequest()

    if not check_taskid(taskid):
        return HttpResponse("Invalid taskid", status=400)
    if not check_userid(volunteerid):
        return HttpResponse("Invalid volunteerid", status=400)

    try:
        Swipe.objects.create(
            swiperid=request.session["id"],
            swipedid=volunteerid,
            taskid=taskid,
            matched=match,
        )
    except ValidationError:
        return HttpResponse(
            "Invalid Swipe data",
            status=400
        )
    else:
        return HttpResponse(
            "Swipe saved",
            status=200
        )

# URI: /api/swipe/v/:taskid,pinid,match:
# Expect:
def volunteer_swipe(request, taskid, pinid, match):

    if "uemail" not in request.session:
        return httpBadRequest()

    volunteerid = request.session["id"]

    if not check_taskid(taskid):
        return HttpResponse("Invalid taskid", status=400)
    if not check_userid(pinid):
        return HttpResponse("Invalid pinid", status=400)

    if not check_swipe(pinid, volunteerid):
        return HttpResponse("Pin didn't swipe!!! Most likely an error from front-end side", status=401)

    try:
        Swipe.objects.create(
            swiperid=volunteerid,
            swipedid=pinid,
            taskid=taskid,
            matched=match,
        )

        if match == True: # This means both parties swiped right.
            # Implement this!!!
            pass


    except ValidationError:
        return HttpResponse(
            "Invalid Swipe data",
            status=400
        )
    else:
        return HttpResponse(
            "Swipe saved",
            status=200
        )
