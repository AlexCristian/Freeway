from django.test import TestCase
from django.urls import reverse
from api.models import User, Conversation
import json

# Conversation-related endpoint tests reside here.

def create_mock_conversation(pinid="0", volunteerid="0"):
    Conversation.objects.create(
        pinid=pinid,
        volunteerid=volunteerid,
        taskid="12345",
        archived=False,
    )

def get_uid_by_email(email):
    return User.objects.get(email="pin@t.com").id

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
        u1_id = get_uid_by_email("u1@t.com")
        u2_id = get_uid_by_email("u2@t.com")
        u3_id = get_uid_by_email("u3@t.com")

    def test_conversations(self):
        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')
        
        create_mock_conversation(pinid=u1_id, volunteerid=u2_id)
        create_mock_conversation(pinid=u3_id, volunteerid=u1_id)

        response = self.client.generic('GET',
                                        reverse('api:conversations'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode('utf-8'),
                         '{"bio": "Hello.", "location": "Madrid"}')
        self.assertEqual(response['content-type'], 'application/json')
