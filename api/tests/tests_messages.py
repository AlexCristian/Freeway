from django.test import TestCase
from django.urls import reverse
from api.models import Conversation, Task, User
import json

# Message-related endpoint tests reside here.

# This tests task, createconversation and POST message.
class PostMessageTests(TestCase):
    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "jon@example.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "jon@example.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        self.client.generic('POST',
                            '/api/task',
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')

        self.user = User.objects.get(email="jon@example.com")
        self.task = Task.objects.get(description="This is a test task")

        self.client.generic('GET',
                            reverse('api:createconversation'),
                            json.dumps(
                            {
                                "pinid": str(self.user.id),
                                "volunteerid": str(self.user.id),
                                "taskid": str(self.task.id),
                            }),
                            content_type='application/json')

    def test_post_message(self):

        conversation = Conversation.objects.get(taskid=self.task.id)

        response = self.client.generic(
            'POST',
            reverse('api:router_message', args=[conversation.id]),
            json.dumps(
            {
                "content": "This is a message!",
            }),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)

# This tests GET message endpoints.
class GetMessagesTests(TestCase):
    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "jon@example.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                            reverse('api:login'),
                            json.dumps(
                            {
                                "email": "jon@example.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        self.client.generic('POST',
                            reverse('api:task'),
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')

        self.user = User.objects.get(email="jon@example.com")
        self.task = Task.objects.get(description="This is a test task")

        # Set up messages and conversations for successful tests.
        self.client.generic('GET',
                            reverse('api:createconversation'),
                            json.dumps(
                            {
                                "pinid": str(self.user.id),
                                "volunteerid": str(self.user.id),
                                "taskid": str(self.task.id),
                            }),
                            content_type='application/json')

        self.conversation = Conversation.objects.get(taskid=self.task.id)

        for i in range(0, 50):
            self.client.generic(
                'POST',
                reverse('api:router_message', args=[self.conversation.id]),
                json.dumps(
                {
                    "content": "This is message #" + str(50 - i) + ".",
                }),
                content_type="application/json"
            )

        # Set up messages and conversation for unauthorized user test.
        self.client.generic('GET',
                            reverse('api:createconversation'),
                            json.dumps(
                            {
                                "pinid": "860518ae-6e02-44d9-a034-030f943f5c8f",
                                "volunteerid": "860518ae-6e02-44d9-a034-030f943f5c8f",
                                "taskid": "860518ae-6e02-44d9-a034-030f943f5c4f",
                            }),
                            content_type='application/json')

        self.unauth_conversation = Conversation.objects.get(taskid="860518ae-6e02-44d9-a034-030f943f5c4f")

        for i in range(0, 5):
            self.client.generic(
                'POST',
                reverse('api:router_message', args=[self.unauth_conversation.id]),
                json.dumps(
                {
                    "content": "This is message #" + str(5 - i) + ".",
                }),
                content_type="application/json"
            )

    def test_get_messages(self):
        response = self.client.generic(
            'GET',
            reverse('api:router_message', args=[str(self.conversation.id)])
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

        msgs = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(msgs), 20)
        for i in range(0, len(msgs)):
            self.assertEqual(msgs[i]['content'],
                             "This is message #" + str(i+1) + ".")

    def test_get_messages_from_msgid(self):
        response = self.client.generic(
            'GET',
            reverse('api:router_message', args=[str(self.conversation.id)])
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

        msgs = json.loads(response.content.decode('utf-8'))
        mid = msgs[len(msgs) - 1]['msg_id']
        previous_len = len(msgs)

        response = self.client.generic(
            'GET',
            reverse('api:router_message',
                    args=[str(self.conversation.id), mid])
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

        msgs = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(msgs), 20)
        for i in range(0, len(msgs)):
            self.assertEqual(msgs[i]['content'],
                             "This is message #" + str(previous_len+i+1) + ".")

    def test_get_messages_unauthorized_user(self):
        response = self.client.generic(
            'GET',
            reverse('api:router_message', args=[str(self.unauth_conversation.id)])
        )
        self.assertEqual(response.status_code, 401)

    def test_get_messages_from_msgid_unauthorized_user(self):
        response = self.client.generic(
            'GET',
            reverse('api:router_message', args=[str(self.unauth_conversation.id), "860518ae-6e02-44d9-a034-030f943f5c8f"])
        )
        self.assertEqual(response.status_code, 401)

    def test_get_messages_nologin(self):
        self.client.generic('GET', reverse('api:logout'))

        response = self.client.generic(
            'GET',
            reverse('api:router_message', args=[str(self.conversation.id)])
        )
        self.assertEqual(response.status_code, 401)

    def test_get_messages_from_msgid_nologin(self):
        self.client.generic('GET', reverse('api:logout'))

        response = self.client.generic(
            'GET',
            reverse('api:router_message', args=[str(self.conversation.id), "860518ae-6e02-44d9-a034-030f943f5c8f"])
        )
        self.assertEqual(response.status_code, 401)
