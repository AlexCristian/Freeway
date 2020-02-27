from django.urls import path

from .endpoints import views, userprofiles

app_name = "api"

urlpatterns = [
    path('', views.index, name='index'),
    path('login', userprofiles.login, name='login'),
    path('signup', userprofiles.signup, name='signup'),
]
