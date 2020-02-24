from django.shortcuts import render
from django.http import HttpResponse

# Profile-related endpoints reside here.

# URI: /api/login
def login(request):
    return HttpResponse("Not implemented", status=501)