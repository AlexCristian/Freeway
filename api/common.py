from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from api.models import Conversation, Message, Swipe, Task, User
import json

class UnexpectedContentException(Exception):
    pass

def checkJson(request, expected):
    for term in expected:
        if term not in request:
            return False
    return True

def getSafeJsonFromBody(expect, body):
    json_req = None
    try:
        json_req = json.loads(body)
    except json.JSONDecodeError:
        raise UnexpectedContentException
    if not checkJson(json_req, expect):
        raise UnexpectedContentException
    return json_req

def httpBadRequest():
    return HttpResponse(
        "Bad request",
        status=400
    )

def getUserById(id):
    return User.objects.get(id=id)

def check_taskid(id):
    try:
        task = Task.objects.get(id=id)
    except (ObjectDoesNotExist, KeyError):
        return False
    return True

def check_userid(id):
    try:
        user = User.objects.get(id=id)
    except (ObjectDoesNotExist, KeyError):
        return False
    return True

def check_swipe(swiperid, swipedid):
    try:
        swipe = Swipe.objects.get(swiperid=swiperid, swipedid=swipedid)
    except (ObjectDoesNotExist, KeyError):
        return False
    return True

def check_convoid(id):
    try:
        convo = Conversation.objects.get(id=id)
    except (ObjectDoesNotExist, KeyError):
        return False
    return True

def check_messageid(id):
    try:
        message = Message.objects.get(id=id)
    except (ObjectDoesNotExist, KeyError):
        return False
    return True

def isSwiped():
    pass
