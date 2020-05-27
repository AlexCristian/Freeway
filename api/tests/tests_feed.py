from django.test import TestCase
from django.urls import reverse
from api.models import User,Task
import json

# Feed-related endpoint tests reside here.

class PinFeedTests(TestCase):

    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 2",
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
                            "name": "Volunteer 3",
                            "email": "u2@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Attorney specializing in immigration law, I’m looking to take on a few pro-bono clients, on a case-by-case basis. Licensed with the Pennsylvania bar association for over 15 years.",
                        }),
                        content_type='application/json')
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 1",
                            "email": "u3@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "I’d like to use my web design expertise to help small businesses expand their markets, by engaging in effective advertising and establishing a strong online presence.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 4",
                            "email": "u4@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "New York",
                            "bio": "Attorney specializing in immigration law, I’m looking to take on a few pro-bono clients, on a case-by-case basis. Licensed with the Pennsylvania bar association for over 15 years.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "PIN 1",
                            "email": "u5@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Doesn't matter",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "PIN 2",
                            "email": "u6@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Doesn't matter",
                        }),
                        content_type='application/json')

    def test_pin_feed(self):

        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "u5@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        self.client.generic('POST',
                            '/api/task',
                            json.dumps(
                            {
                                "description": "My name is Pavel and I’m seeking some legal advice on an immigration matter concerning my family of five. We’re not sure how to apply for permanent residency status.",
                            }),
                            content_type='application/json')

        task_id = Task.objects.get(description="My name is Pavel and I’m seeking some legal advice on an immigration matter concerning my family of five. We’re not sure how to apply for permanent residency status.").id

        response = self.client.generic('GET',
                            '/api/feed/p/' + str(task_id),
                            content_type='application/json')


        self.assertEqual(response.status_code, 200)
        t = json.loads(response.content.decode('utf-8'))

        self.assertEqual(t[0]["name"], "Volunteer 2")
        self.assertEqual(t[1]["name"], "Volunteer 3")
        self.assertEqual(t[2]["name"], "Volunteer 1")
        self.assertEqual(len(t), 5)



class VolunteerFeedTests(TestCase):

    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 2",
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
                            "name": "Volunteer 3",
                            "email": "u2@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Attorney specializing in immigration law, I’m looking to take on a few pro-bono clients, on a case-by-case basis. Licensed with the Pennsylvania bar association for over 15 years.",
                        }),
                        content_type='application/json')
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 1",
                            "email": "u3@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "I’d like to use my web design expertise to help small businesses expand their markets, by engaging in effective advertising and establishing a strong online presence.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Volunteer 4",
                            "email": "u4@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "New York",
                            "bio": "Attorney specializing in immigration law, I’m looking to take on a few pro-bono clients, on a case-by-case basis. Licensed with the Pennsylvania bar association for over 15 years.",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "PIN 1",
                            "email": "u5@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Doesn't matter",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "PIN 2",
                            "email": "u6@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Doesn't matter",
                        }),
                        content_type='application/json')

        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "u5@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        self.client.generic('POST',
                            '/api/task',
                            json.dumps(
                            {
                                "description": "My name is Pavel and I’m seeking some legal advice on an immigration matter concerning my family of five. We’re not sure how to apply for permanent residency status.",
                            }),
                            content_type='application/json')

        self.task_id = Task.objects.get(description="My name is Pavel and I’m seeking some legal advice on an immigration matter concerning my family of five. We’re not sure how to apply for permanent residency status.").id
        self.pin_id = User.objects.get(name="PIN 1").id
        self.volunteer_id = User.objects.get(name="Volunteer 2").id
        self.client.generic('GET',
                            f"/api/swipe/p/{self.task_id}/{self.volunteer_id}/{True}",
                            content_type='application/json')

        self.client.generic('GET', reverse('api:logout'))
        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "u1@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')


    def test_volunteer_feed_before_volunteer_swipe(self):
        response = self.client.generic('GET',
                                        '/api/feed/v/',
                                        content_type='application/json')

        self.assertEqual(response.status_code, 200)

        t = json.loads(response.content.decode('utf-8'))
        self.assertEqual(t[0]["id"], str(self.pin_id))
        self.assertEqual(len(t), 1)

    def test_volunteer_feed_after_volunteer_swipe(self):
        self.client.generic('GET',
                            f"/api/swipe/v/{self.task_id}/{self.pin_id}/{True}",
                            content_type='application/json')

        response = self.client.generic('GET',
                                        '/api/feed/v/',
                                        content_type='application/json')

        self.assertEqual(response.status_code, 200)
        t = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(t), 0)
