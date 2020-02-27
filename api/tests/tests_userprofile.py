from django.test import TestCase
from django.urls import reverse
import json

# Profile-related endpoint tests reside here.

class SigninTests(TestCase):
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

    def test_signin(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "email": "d@t.com",
                                            "oauthid": "abcdefg"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_signin_no_such_user(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "email": "john@yahoo.us",
                                            "oauthid": "efghijklm"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_signin_wrong_pwd(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "email": "d@t.com",
                                            "oauthid": "12345678"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 401)
    
    def test_signin_malformed_json(self):
        response = self.client.generic('GET',
                                        reverse('api:login'),
                                        json.dumps(
                                        {
                                            "thing": "d@t.com",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)

class SignupTests(TestCase):
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
    
    def test_signup(self):
        response = self.client.generic('GET',
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
        self.assertEqual(response.status_code, 200)
    
    def test_signup_malformed_json(self):
        response = self.client.generic('GET',
                                        reverse('api:signup'),
                                        json.dumps(
                                        {
                                            "thing": "d@t.com",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)
    
    def test_signup_invalid_email(self):
        response = self.client.generic('GET',
                                        reverse('api:signup'),
                                        json.dumps(
                                        {
                                            "name": "Jon Doe",
                                            "email": "d@t",
                                            "oauthid": "abcdefg",
                                            "photourl": "https://google.com/test.png",
                                            "location": "Philadelphia",
                                            "bio": "Hello.",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)
    
    def test_signup_duplicate_email(self):
        response = self.client.generic('GET',
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
        self.assertEqual(response.status_code, 400)

class SetBioTests(TestCase):
    def test_setbio(self):
        response = self.client.generic('GET',
                                        reverse('api:setbio'),
                                        json.dumps(
                                        {
                                            "bio": "Hi.",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 501) # Unimplemented, expect fail.

    def test_setbio_malformed_json(self):
        response = self.client.generic('GET',
                                        reverse('api:setbio'),
                                        json.dumps(
                                        {
                                            "thing": "d@t.com",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)

class SetLocationTests(TestCase):
    def test_setlocation(self):
        response = self.client.generic('GET',
                                        reverse('api:setlocation'),
                                        json.dumps(
                                        {
                                            "location": "Philadelphia",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 501) # Unimplemented, expect fail.

    def test_setlocation_malformed_json(self):
        response = self.client.generic('GET',
                                        reverse('api:setlocation'),
                                        json.dumps(
                                        {
                                            "thing": "d@t.com",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)