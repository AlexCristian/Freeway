from django.test import TestCase
from django.urls import reverse
from api.models import User, Conversation
import json

# Conversation-related endpoint tests reside here.

def create_mock_conversation(pinid="0", volunteerid="0"):
    convo = Conversation.objects.create(
        pinid=pinid,
        volunteerid=volunteerid,
        taskid=volunteerid, # Fake task ID - does not exist; for testing only.
        archived=False,
    )
    return str(convo.id)

def get_uid_by_email(_email):
    return str(User.objects.get(email=_email).id)

def create_message(self, convo_id, content):
    self.client.generic('POST',
                        reverse('api:router_message', args=[convo_id]),
                        json.dumps(
                        {
                            "content": content
                        }),
                        content_type='application/json')

class ConversationsTests(TestCase):
    u1_id = ""
    u2_id = ""
    u3_id = ""

    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "u1@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "u2@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "u3@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')
        self.u1_id = get_uid_by_email("u1@t.com")
        self.u2_id = get_uid_by_email("u2@t.com")
        self.u3_id = get_uid_by_email("u3@t.com")

    def test_conversations(self):
        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        c1 = create_mock_conversation(pinid=self.u1_id, volunteerid=self.u2_id)
        c2 = create_mock_conversation(pinid=self.u3_id, volunteerid=self.u1_id)

        create_message(self, c1, "Test1.")
        create_message(self, c1, "Test2.")

        create_message(self, c2, "Test3.")
        create_message(self, c2, "Test4.")

        response = self.client.generic('GET',
                                        reverse('api:conversations'))
        self.assertEqual(response.status_code, 200)

        res_json = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(res_json), 2)

        convo = Conversation.objects.get(volunteerid=self.u2_id)
        self.assertEqual(res_json[0]["id"], str(convo.id))
        self.assertEqual(res_json[0]["role"], "PiN")
        self.assertEqual(res_json[0]["partnerid"], self.u2_id)
        self.assertEqual(res_json[0]["name"], "Jon Doe")
        self.assertEqual(res_json[0]["photourl"], "https://google.com/test.png")
        self.assertEqual(res_json[0]["lastmsg"], "Test2.")
        self.assertEqual(res_json[0]["archived"], False)

        convo = Conversation.objects.get(pinid=self.u3_id)
        self.assertEqual(res_json[1]["id"], str(convo.id))
        self.assertEqual(res_json[1]["role"], "Volunteer")
        self.assertEqual(res_json[1]["partnerid"], self.u3_id)
        self.assertEqual(res_json[1]["name"], "Jon Doe")
        self.assertEqual(res_json[1]["photourl"], "https://google.com/test.png")
        self.assertEqual(res_json[1]["lastmsg"], "Test4.")
        self.assertEqual(res_json[1]["archived"], False)
        self.assertEqual(response['content-type'], 'application/json')

    def test_conversations_no_message(self):
        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        create_mock_conversation(pinid=self.u1_id, volunteerid=self.u2_id)
        create_mock_conversation(pinid=self.u3_id, volunteerid=self.u1_id)

        response = self.client.generic('GET',
                                        reverse('api:conversations'))
        self.assertEqual(response.status_code, 200)

        res_json = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(res_json), 2)

        convo = Conversation.objects.get(volunteerid=self.u2_id)
        self.assertEqual(res_json[0]["id"], str(convo.id))
        self.assertEqual(res_json[0]["role"], "PiN")
        self.assertEqual(res_json[0]["partnerid"], self.u2_id)
        self.assertEqual(res_json[0]["name"], "Jon Doe")
        self.assertEqual(res_json[0]["photourl"], "https://google.com/test.png")
        self.assertEqual(res_json[0]["lastmsg"], "")
        self.assertEqual(res_json[0]["archived"], False)

        convo = Conversation.objects.get(pinid=self.u3_id)
        self.assertEqual(res_json[1]["id"], str(convo.id))
        self.assertEqual(res_json[1]["role"], "Volunteer")
        self.assertEqual(res_json[1]["partnerid"], self.u3_id)
        self.assertEqual(res_json[1]["name"], "Jon Doe")
        self.assertEqual(res_json[1]["photourl"], "https://google.com/test.png")
        self.assertEqual(res_json[1]["lastmsg"], "")
        self.assertEqual(res_json[1]["archived"], False)
        self.assertEqual(response['content-type'], 'application/json')

class ArchiveConversationTests(TestCase):
    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "u1@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')
        partnerid = "96efd272-72c0-4087-8dc5-abdaf9e892be"
        myid = get_uid_by_email("u1@t.com")
        self.convo_id = create_mock_conversation(partnerid, myid)

    def test_archive(self):
        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')
        response = self.client.generic('POST',
                                       '/api/conversations/a/' + self.convo_id)
        self.assertEqual(response.status_code, 200)

    def test_archive_badid(self):
        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')
        response = self.client.generic('POST',
                                       reverse('api:archive_conversation',
                                               args=['96efd272-72c0-4087-8dc5-abdaf9e892be']))
        self.assertEqual(response.status_code, 400)
