from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import Task, User
from api.common import *

from api.bert_embeddings import Embedding
embed_model = Embedding()

# Task-related endpoints reside here.

def router_task(request, taskid=None):
    if request.method == 'POST':
        return post_task(request)
    elif request.method == 'GET':
        if taskid:
            return get_task(request, taskid)
        else:
            return httpBadRequest()


# URI: /api/task
# Expect: description
def post_task(request):
    expected_fields = ["description"]

    try:
        json_req = getSafeJsonFromBody(expected_fields, request.body.decode("utf-8"))
    except UnexpectedContentException:
        return httpBadRequest()

    global embed_model
    embedding = list(embed_model.get_embedding(json_req["description"]))

    user = None
    try:
        user = User.objects.get(email=request.session["uemail"])
    except (ObjectDoesNotExist, KeyError):
        return HttpResponse("Unauthorized", status=401)
    try:
        task = Task.objects.create(
            description=json_req["description"],
            description_embedding=embedding,
            pinid=user.id,
            volunteerid=user.id,  # May not be the best choice but can't leave it null
            state=Task.POSTED,
        )
        response = {}
        response["id"] = str(task.id)
    except ValidationError:
        return HttpResponse(
            "Invalid task data",
            status=400
        )
    else:
        return HttpResponse(
            json.dumps(response),
            status=200,
            content_type='application/json'
        )

# URI: /api/task/:task_id:
def get_task(request, taskid):

    if "uemail" not in request.session:
        return httpBadRequest()

    try:
        task = Task.objects.get(id=taskid)
    except (ObjectDoesNotExist, KeyError):
        return httpBadRequest()

    res = {
        "description": task.description,
        "datecreated": str(task.datecreated),
        "pinid":       str(task.pinid),
        "volunteerid": str(task.volunteerid),
        "state":       str(task.state)
    }

    return HttpResponse(
        json.dumps(res),
        status=200,
        content_type='application/json'
    )

# URI: /api/commit/p/:task_id:
def pin_commit(request, taskid):

    if "uemail" not in request.session:
        return httpBadRequest()

    try:
        task = Task.objects.get(id=taskid)
    except (ObjectDoesNotExist, KeyError):
        return httpBadRequest()

    if task.state != Task.POSTED:
        return httpBadRequest()

    task.state = Task.COMMITTED_PIN
    task.save()
    return HttpResponse(
        "Task commited by pin",
        status=200
    )

# URI: /api/commit/v/:task_id:
def volunteer_commit(request, taskid):

    if "uemail" not in request.session:
        return httpBadRequest()

    try:
        task = Task.objects.get(id=taskid)
    except (ObjectDoesNotExist, KeyError):
        return httpBadRequest()

    if task.state != Task.COMMITTED_PIN:
        return httpBadRequest()

    task.state = Task.COMMITTED_CONS
    task.save()
    return HttpResponse(
        "Task commited by volunteer",
        status=200
    )
