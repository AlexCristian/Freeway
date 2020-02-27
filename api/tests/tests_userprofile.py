from django.test import TestCase
from django.urls import reverse
import json

# Profile-related endpoint tests reside here.

class UserSigninTests(TestCase):
    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "d@t.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Philadelphia",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')

    def test_user_signin(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "email": "d@t.com",
                                            "oauthid": "abcdefg"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_no_such_user_signin(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "email": "john@yahoo.us",
                                            "oauthid": "efghijklm"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_user_signin_wrong_pwd(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "email": "d@t.com",
                                            "oauthid": "12345678"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 401)