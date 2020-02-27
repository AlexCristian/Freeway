from django.http import HttpResponse
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
        "400 Bad request",
        status=400
    )