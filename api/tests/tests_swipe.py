from django.test import TestCase
from django.urls import reverse
from api.models import Task, User
import json

# Swipe-related endpoint tests reside here.

class PinSwipeTests(TestCase):

    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 1",
                            "email": "u1@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "I’m interested in offering pro-bono legal counsel to South American immigrants with indeterminate or refugee status. I have over 10 years of experience practicing immigration law.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 2",
                            "email": "u2@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Attorney specializing in immigration law, I’m looking to take on a few pro-bono clients, on a case-by-case basis. Licensed with the Pennsylvania bar association for over 15 years.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        response = self.client.generic('POST',
                            '/api/task',
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')

        self.userid1 = User.objects.get(email="u1@t.com").id
        self.userid2 = User.objects.get(email="u2@t.com").id
        self.taskid = Task.objects.get(description="This is a test task").id

    def test_pin_swipe(self):

        response = self.client.generic('GET',
                        f"/api/swipe/p/{self.taskid}/{self.userid2}/{True}",
                        content_type='application/json')

        self.assertEqual(response.status_code, 200)

    def test_wrong_volunteerid_swipe(self):
        response = self.client.generic('GET',
                        f"/api/swipe/p/{self.taskid}/{self.taskid}/{False}",
                        content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_volunteer_swipe_before_pin(self):
        response = self.client.generic('GET',
                        f"/api/swipe/v/{self.taskid}/{self.userid2}/{True}",
                        content_type='application/json')

        self.assertEqual(response.status_code, 401)

    def test_volunteer_swipe(self):
        self.client.generic('GET',
                        f"/api/swipe/p/{self.taskid}/{self.userid2}/{True}",
                        content_type='application/json')

        self.client.generic('GET', reverse('api:logout'))
        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "u2@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        response = self.client.generic('GET',
                        reverse('api:conversations'),
                        content_type='application/json')
        
        convos = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(convos), 0)

        response = self.client.generic('GET',
                        f"/api/swipe/v/{self.taskid}/{self.userid1}/{True}",
                        content_type='application/json')

        self.assertEqual(response.status_code, 200)

        response = self.client.generic('GET',
                        reverse('api:conversations'),
                        content_type='application/json')
        
        convos = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(convos), 1)

    def test_wrong_pinid_swipe(self):
        response = self.client.generic('GET',
                        f"/api/swipe/v/{self.taskid}/{self.taskid}/{False}",
                        content_type='application/json')
        self.assertEqual(response.status_code, 400)
