from django.contrib import admin

from .models import User, Task, Swipe, Conversation, Message

# We register our database models here so that
# the admin interface can edit these database
# tables. This is only used for development.

admin.site.register(User)
admin.site.register(Task)
admin.site.register(Swipe)
admin.site.register(Conversation)
admin.site.register(Message)