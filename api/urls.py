from django.urls import path

from .endpoints import views, userprofiles

urlpatterns = [
    path('', views.index, name='index'),
    path('login', userprofiles.login, name='login'),
]
