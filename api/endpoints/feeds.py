from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import ValidationError
from django.http import HttpResponse
from api.models import Swipe, Task, User
from api.common import *

from api.bert_embeddings import Embedding
embed_model = Embedding()

# Feed-related endpoints reside here.

# URI: /api/feed/p/:task_id:
# Expect:
# Response: Json list of [UID, name, photourl, bio] ranked with similarity to task_id
def pin_feed(request, task_id):

    if "uemail" not in request.session:
        return httpBadRequest()

    if not check_taskid(task_id):
        return HttpResponse("Invalid taskid", status=400)

    pinid = request.session["id"]

    task = Task.objects.get(id=task_id)
    requesting_user = User.objects.get(id=pinid)

    # Loading all users and embedding vectors on memory (FIX THIS NEXT TERM)
    filtered_users = User.objects.filter(location=requesting_user.location)

    # Implement this by joining tables? --> Similar complexity(?)

    # Build dictionary of volunteers the PiN has already swiped on, so that
    # don't reappear in the result set.
    pre_swiped_volunteers = Swipe.objects.filter(taskid=task_id, swiperid=pinid)
    d = {}
    for volunteer in pre_swiped_volunteers:
        d[volunteer.id] = True

    similarities = []
    for user in filtered_users:
        if user.id not in d:
            dist = embed_model.similarity(task.description_embedding, user.bio_embedding)
            similarities.append((dist, str(user.id), user.name, user.photourl, user.bio))

    match_top_k = 10

    k = min(match_top_k, len(similarities))
    res = [{"id": a,
            "name": b,
            "photourl": c,
            "bio": d
            }
            for _, a, b, c, d in sorted(similarities, reverse=True)[:k]
          ]

    return HttpResponse(
        json.dumps(res),
        status=200,
        content_type='application/json'
    )


# URI: /api/feed/v:
# Expect:
# Response: Json list of [UID, taskid, name, photourl, bio, taskdescription, datecreated]
def volunteer_feed(request):

    if "uemail" not in request.session:
        return httpBadRequest()

    volunteerid = request.session["id"]
    swiped = Swipe.objects.filter(swipedid=volunteerid)

    try:
        swiper = Swipe.objects.get(swiperid=volunteerid)
        if type(swiper) != type([]):
            swiper = [swiper]
    except (ObjectDoesNotExist, KeyError):
        swiper = []

    d = {}
    for swipe in swiper:
        d[swipe.taskid] = True


    # FIX: Next term do all these with joint query. It didn't work right now for some reason.

    users = {}
    for user in User.objects.raw('SELECT id, name, photourl, bio FROM "User"'):
        users[user.id] = {"name": user.name, "photourl": user.photourl, "bio": user.bio}

    tasks = {}
    for task in Task.objects.raw('SELECT id, description, datecreated FROM "Task"'):
        tasks[task.id] = {"description": task.description, "date": str(task.datecreated)}

    res = []
    for swipe in swiped:
        if swipe.taskid not in d: # Check if already responded
            user = users[swipe.swiperid]
            task = tasks[swipe.taskid]
            res.append({
                "id": str(swipe.swiperid),
                "taskid": str(swipe.taskid),
                "name": user["name"],
                "photourl": user["photourl"],
                "bio": user["bio"],
                "taskdescription": task["description"],
                "datecreated": task["date"],
            })

    return HttpResponse(
        json.dumps(res),
        status=200,
        content_type='application/json'
    )
