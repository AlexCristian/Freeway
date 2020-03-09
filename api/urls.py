from django.urls import path
from .endpoints import conversations, feeds, messages, swipes, tasks, userprofiles, views

app_name = "api"

urlpatterns = [
    path('', views.index, name='index'),
    path('login', userprofiles.login, name='login'),
    path('logout', userprofiles.logout, name='logout'),
    path('signup', userprofiles.signup, name='signup'),
    path('setbio', userprofiles.setbio, name='setbio'),
    path('setlocation', userprofiles.setlocation, name='setlocation'),
    path('messages/<conversationid>', messages.postmessage, name='postmessage'),
    path('createconversation', messages.createconversation, name='createconversation'),
    path('task', tasks.task, name='task'),
    path('get_task/<taskid>', tasks.get_task, name='get_task'),
    path('profile', userprofiles.profile, name='profile'),
    path('conversations', conversations.conversations, name='conversations'),
    path('conversations/a/<convo_id>', conversations.archive_conversation, name='archive_conversation'),
    path('feed/p/<task_id>', feeds.pin_feed, name='pin_feed'),
    path('feed/v/', feeds.volunteer_feed, name='volunteer_feed'),
    path('swipe/p/<taskid>/<volunteerid>/<match>', swipes.pin_swipe, name='pin_swipe'),
    path('swipe/v/<taskid>/<pinid>/<match>', swipes.volunteer_swipe, name='volunteer_swipe'),
    path('commit/p/<taskid>', tasks.pin_commit, name='pin_commit'),
    path('commit/v/<taskid>', tasks.volunteer_commit, name='volunteer_commit')
]
