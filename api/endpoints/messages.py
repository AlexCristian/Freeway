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

# URI: /api/messages/:[conversationid]/:[messageid, optional]
# Expect: content or None
# Routes GET and POST requests. All security checks should happen here.
def router_message(request, conversationid, messageid=None):
    # Drop request if you're not logged in.
    if "uemail" not in request.session:
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    # Get conversation to check if you have access permissions.
    try:
        convo = Conversation.objects.get(id=conversationid)
        if request.session["id"] not in (str(convo.pinid), str(convo.volunteerid)):
            return HttpResponse(
                "Unauthorized",
                status=401
            )
    except (ObjectDoesNotExist, KeyError):
        # Drop request if the conversation id is invalid, or
        # if the session is storing no ID (bad login, should
        # not happen.
        # TODO(AlexCristian): Log bad login here.
        return httpBadRequest()

    if request.method == 'POST':
        return postmessage(request, conversationid)
    elif request.method == 'GET':
        if messageid:
            return getmessage_since_messageid(request, conversationid, messageid)
        return getmessage(request, conversationid)
    else:
        return httpBadRequest()

# URI: /api/messages/:[conversationid]
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

def message_results_to_json(messages):
    result = []
    for message in messages:
        item = {}
        item['msg_id'] = message.id
        item['content'] = message.content
        item['datecreated'] = message.datecreated
        item['senderid'] = message.senderid
        result.append(item)
    result.reverse()
    return json.dumps(result)

def getmessage(request, conversationid):
    try:
        results = Message.objects.filter(
            conversationid=conversationid
        ).order_by('datecreated')[:20]
    except ObjectDoesNotExist:
        return httpBadRequest()

    return HttpResponse(
        message_results_to_json(results),
        status=200,
        content_type='application/json'
    )

def getmessage_since_messageid(request, conversationid, messageid):
    try:
        msg = Message.objects.get(messageid=messageid)
    except ObjectDoesNotExist:
        return httpBadRequest()

    since_time = msg.datecreated

    try:
        results = Message.objects.filter(
            conversationid=conversationid,
            datecreated__lt=since_time
        ).order_by('datecreated')[:20]
    except ObjectDoesNotExist:
        return httpBadRequest()

    return HttpResponse(
        message_results_to_json(results),
        status=200,
        content_type='application/json'
    )