from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from api.models import Conversation, Message
from api.common import *

# Conversation-related endpoints reside here.

# Helper method. Returns the content of the last message in a conversation.
def fetch_last_message(convo_id):
    result = Message.objects.filter(conversationid=convo_id).order_by('-datecreated').first()
    if result == None:
        return ""
    return result.content

# URI: /api/conversations
# Expect:
# Response: array of {Role (PiN or Volunteer), UID, Name, ProfilePic, TruncatedLastMessage}
def conversations(request):
    if "uemail" not in request.session:
        return httpBadRequest()
    response = []

    convos_pin = None
    try:
        convos_pin = Conversation.objects.filter(pinid=request.session["id"])
    except KeyError:
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    except ObjectDoesNotExist:
        pass
    
    convos_vol = None
    try:
        convos_vol = Conversation.objects.filter(volunteerid=request.session["id"])
    except KeyError:
        return HttpResponse(
            "Unauthorized",
            status=401
        )
    except ObjectDoesNotExist:
        pass
    
    for convo in convos_pin:
        partnerid = str(convo.volunteerid)
        partner = getUserById(convo.volunteerid)
        lastmsg = fetch_last_message(convo.id)

        item = {}
        item["role"] = "PiN"
        item["partnerid"] = partnerid
        item["name"] = partner.name
        item["photourl"] = partner.photourl
        item["lastmsg"] = lastmsg
        item["archived"] = convo.archived
        response.append(item)
    
    for convo in convos_vol:
        partnerid = str(convo.pinid)
        partner = getUserById(convo.pinid)
        lastmsg = fetch_last_message(convo.id)

        item = {}
        item["role"] = "Volunteer"
        item["partnerid"] = partnerid
        item["name"] = partner.name
        item["photourl"] = partner.photourl
        item["lastmsg"] = lastmsg
        item["archived"] = convo.archived
        response.append(item)
    
    return HttpResponse(
        json.dumps(response),
        status=200,
        content_type='application/json'
    )

# Helper method, internal use only. Set "archived" boolean flag to true.
def _archive_conversation(convo_id):
    convo = None
    try:
        convo = Conversation.objects.get(id=convo_id)
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