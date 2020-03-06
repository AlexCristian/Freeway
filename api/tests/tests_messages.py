from django.test import TestCase
from django.urls import reverse
from api.models import Conversation, Task, User
import json

# Message-related endpoint tests reside here.



# This tests task, createconversation and postmessage.
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

        self.client.generic('GET',
                            reverse('api:task'),
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
            'GET',
            reverse('api:postmessage', args=[conversation.id]),
            json.dumps(
            {
                "content": "This is a message!",
            }),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
