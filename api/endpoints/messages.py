from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import Conversation, Message, User
from api.common import *
import bcrypt

# Message-related endpoints reside here.


# URI: /api/createconversation
# Expect: pinid, volunteerid, taskid
def createconversation(request):
    expected_fields = ["pinid", "volunteerid", "taskid"]
    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()


    try:
        Conversation.objects.create(
            pinid=json_req["pinid"],
            volunteerid=json_req["volunteerid"],
            taskid=json_req["taskid"],
            archived=False,
        )
    except ValidationError(e):
        return HttpResponse(
            "Invalid conversation data",
            status=400
        )
    else:
        return HttpResponse(
            "New conversation added to DB",
            status=200
        )

# URI: /api/message/:[conversationid]
# Expect: content
def postmessage(request, conversationid):
    expected_fields = ["content"]

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
        Message.objects.create(
            conversationid=conversationid,
            senderid=user.id,
            content=json_req["content"],
        )
    except ValidationError:
        return HttpResponse(
            "Invalid message data",
            status=400
        )
    else:
        return HttpResponse(
            "New message added to DB",
            status=200
        )
