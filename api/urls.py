from django.urls import path

from .endpoints import views, userprofiles

app_name = "api"

urlpatterns = [
    path('', views.index, name='index'),
    path('login', userprofiles.login, name='login'),
    path('logout', userprofiles.logout, name='logout'),
    path('signup', userprofiles.signup, name='signup'),
    path('setbio', userprofiles.setbio, name='setbio'),
    path('setlocation', userprofiles.setlocation, name='setlocation'),
]
