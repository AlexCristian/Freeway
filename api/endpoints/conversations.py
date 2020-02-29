from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from api.models import Conversation, Message
from api.common import *

# Conversation-related endpoints reside here.

# URI: /api/conversations
# Expect:
# Response: array of {Role (PiN or Volunteer), UID, Name, ProfilePic, TruncatedLastMessage}
def conversations(request):
    if "uemail" not in request.session:
        return httpBadRequest()
    response = []

    convos_pin = None
    try:
        convos_pin = Conversation.objects.get(pinid=request.session["id"])
    except KeyError:
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    except ObjectDoesNotExist:
        pass
    
    convos_vol = None
    try:
        convos_vol = Conversation.objects.get(volunteerid=request.session["id"])
    except KeyError:
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    except ObjectDoesNotExist:
        pass
    
    for convo in convos_pin:
        partnerid = convo.volunteerid
        partner = getUserById(convo.volunteerid)
        lastmsg = Message.objects.filter(conversationid=convo.id).order_by('-datecreated').first()

        item = {}
        item["role"] = "PiN"
        item["uid"] = partnerid
        item["name"] = partner.name
        item["photourl"] = partner.photourl
        item["lastmsg"] = lastmsg.content
        response.append(item)
    
    for convo in convos_vol:
        partnerid = convo.pinid
        partner = getUserById(convo.pinid)
        lastmsg = Message.objects.filter(conversationid=convo.id).order_by('-datecreated').first()

        item = {}
        item["role"] = "Volunteer"
        item["uid"] = partnerid
        item["name"] = partner.name
        item["photourl"] = partner.photourl
        item["lastmsg"] = lastmsg.content
        response.append(item)
    
    return HttpResponse(
        json.dumps(response),
        status=200,
        content_type='application/json'
    )

# Helper method, internal use only.
def _archive_conversation(convo_id):
    convo = None
    try:
        convo = Conversation.objects.get(convo_id)
    except ObjectDoesNotExist:
        return False
    
    convo.archived = True
    convo.save()
    return True

# URI: /api/conversations/a/:id:
# Expect: 
# Response:
def archive_conversation(request, convo_id=None):
    if convo_id == None:
        return httpBadRequest()
    
    call_succeeded = _archive_conversation(convo_id)
    if not call_succeeded:
        return httpBadRequest()
    
    return HttpResponse(
        "Conversation archived",
        status=200
    )