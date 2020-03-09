from django.test import TestCase
from django.urls import reverse
from api.models import Task
import json

# Task-related endpoint tests reside here.


class TaskTests(TestCase):
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

    def test_create_task(self):
        res = self.client.generic('GET',
                            reverse('api:task'),
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')
        self.assertEqual(res.status_code, 200)

    def test_get_task(self):
        res = self.client.generic('GET',
                            reverse('api:task'),
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')
        task = Task.objects.get(description="This is a test task")
        res = self.client.generic('GET',
                            '/api/get_task/' + str(task.id),
                            content_type='application/json')
        self.assertEqual(res.status_code, 200)

    def test_commit_volunteer_before_pin(self):
        res = self.client.generic('GET',
                            reverse('api:task'),
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')
        task = Task.objects.get(description="This is a test task")
        res = self.client.generic('GET',
                            '/api/commit/v/' + str(task.id),
                            content_type='application/json')
        self.assertEqual(res.status_code, 400)

    def test_commit_both(self):
        res = self.client.generic('GET',
                            reverse('api:task'),
                            json.dumps(
                            {
                                "description": "This is a test task",
                            }),
                            content_type='application/json')
        task = Task.objects.get(description="This is a test task")
        res = self.client.generic('GET',
                            '/api/commit/p/' + str(task.id),
                            content_type='application/json')
        self.assertEqual(res.status_code, 200)

        res = self.client.generic('GET',
                            '/api/commit/v/' + str(task.id),
                            content_type='application/json')
        self.assertEqual(res.status_code, 200)
