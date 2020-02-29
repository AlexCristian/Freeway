from django.urls import path
from .endpoints import messages, tasks, userprofiles, conversations, views

app_name = "api"

urlpatterns = [
    path('', views.index, name='index'),
    path('login', userprofiles.login, name='login'),
    path('logout', userprofiles.logout, name='logout'),
    path('signup', userprofiles.signup, name='signup'),
    path('setbio', userprofiles.setbio, name='setbio'),
    path('setlocation', userprofiles.setlocation, name='setlocation'),
    path('messages\<conversationid>', messages.postmessage, name='postmessage'),
    path('createconversation', messages.createconversation, name='createconversation'),
    path('task', tasks.task, name='task'),
    path('profile', userprofiles.profile, name='profile'),
    path('conversations', conversations.conversations, name='conversations'),
    path('conversations/a/<convo_id>', conversations.archive_conversation, name='archive_conversation'),
]
