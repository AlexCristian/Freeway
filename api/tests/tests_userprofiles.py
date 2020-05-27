from django.test import TestCase
from django.urls import reverse
from api.models import User
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
                                        reverse('api:login-legacy'),
                                        json.dumps(
                                        {
                                            "email": "d@t.com",
                                            "oauthid": "abcdefg"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_signin_no_such_user(self):
        response = self.client.generic('GET',
                                        reverse('api:login-legacy'),
                                        json.dumps(
                                        {
                                            "email": "john@yahoo.us",
                                            "oauthid": "efghijklm"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_signin_wrong_pwd(self):
        response = self.client.generic('GET',
                                        reverse('api:login-legacy'),
                                        json.dumps(
                                        {
                                            "email": "d@t.com",
                                            "oauthid": "12345678"
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_signin_malformed_json(self):
        response = self.client.generic('GET',
                                        reverse('api:login-legacy'),
                                        json.dumps(
                                        {
                                            "thing": "d@t.com",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)

class LogoutTests(TestCase):
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

    def test_logout(self):
        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "d@t.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

        response = self.client.generic('GET', reverse('api:logout'))
        self.assertEqual(response.status_code, 200)

    def test_logout_no_signin(self):
        response = self.client.generic('GET', reverse('api:logout'))
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
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "jon@example.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

    def test_setbio(self):
        self.assertEqual(User.objects.get(email="jon@example.com").bio, "Hello.")
        response = self.client.generic('GET',
                                        reverse('api:setbio'),
                                        json.dumps(
                                        {
                                            "bio": "Hi.",
                                        }),
                                        content_type='application/json')
        self.assertEqual(User.objects.get(email="jon@example.com").bio, "Hi.")
        self.assertEqual(response.status_code, 200)

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
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "jon@example.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')

    def test_setlocation(self):
        self.assertEqual(User.objects.get(email="jon@example.com").location, "Philadelphia")
        response = self.client.generic('GET',
                                        reverse('api:setlocation'),
                                        json.dumps(
                                        {
                                            "location": "Madrid",
                                        }),
                                        content_type='application/json')
        self.assertEqual(User.objects.get(email="jon@example.com").location, "Madrid")
        self.assertEqual(response.status_code, 200)

    def test_setlocation_malformed_json(self):
        response = self.client.generic('GET',
                                        reverse('api:setlocation'),
                                        json.dumps(
                                        {
                                            "thing": "d@t.com",
                                        }),
                                        content_type='application/json')
        self.assertEqual(response.status_code, 400)

class ProfileTests(TestCase):
    def setUp(self):
        self.client.generic('GET',
                        reverse('api:signup'),
                        json.dumps(
                        {
                            "name": "Jon Doe",
                            "email": "jon@example.com",
                            "oauthid": "abcdefg",
                            "photourl": "https://google.com/test.png",
                            "location": "Madrid",
                            "bio": "Hello.",
                        }),
                        content_type='application/json')
    
    def test_profile(self):
        self.client.generic('GET',
                            reverse('api:login-legacy'),
                            json.dumps(
                            {
                                "email": "jon@example.com",
                                "oauthid": "abcdefg"
                            }),
                            content_type='application/json')
        response = self.client.generic('GET', reverse('api:profile'))
        self.assertEqual(response['content-type'], 'application/json')
        self.assertEqual(response.status_code, 200)

        user = User.objects.get(email="jon@example.com")

        res_json = json.loads(response.content.decode('utf-8'))
        self.assertEqual(res_json["bio"], user.bio)
        self.assertEqual(res_json["location"], user.location)
        self.assertEqual(res_json["email"], user.email)
        self.assertEqual(res_json["name"], user.name)
        self.assertEqual(res_json["photourl"], user.photourl)
        self.assertEqual(res_json["datecreated"], str(user.datecreated))

    def test_profile_no_login(self):
        response = self.client.generic('GET', reverse('api:profile'))
        self.assertEqual(response.status_code, 400)
