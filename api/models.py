from django.db import models
import uuid

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    oauthid = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    photourl = models.CharField(max_length=500)
    bio = models.CharField(max_length=5000)
    datecreated = models.DateField(auto_now_add=True)
    location = models.CharField(max_length=200)

class Task(models.Model):
    
    DEFAULT = 0
    POSTED = 1
    COMMITTED_PIN = 2
    COMMITTED_CONS = 3 # Committed_Consensus
    COMPLETED_ONE = 4
    COMPLETED_CONS = 5 # Completed_Consensus
    TASK_STATUS_CHOICES = (
        (DEFAULT, 'DEFAULT'),
        (POSTED, 'POSTED'),
        (COMMITTED_PIN, 'COMMITTED PIN'),
        (COMMITTED_CONS, 'COMMITTED CONSENSUS'),
        (COMPLETED_ONE, 'COMPLETED ONE'),
        (COMPLETED_CONS, 'COMPLETED CONSENSUS'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=5000)
    datecreated = models.DateField(auto_now_add=True)
    pinid = models.UUIDField()
    volunteerid = models.UUIDField()
    state = models.IntegerField(choices=TASK_STATUS_CHOICES, default=0)

class Swipe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    swiperid = models.UUIDField()
    swipedid = models.UUIDField()
    taskid = models.UUIDField()
    matched = models.BooleanField()

class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pinid = models.UUIDField()
    volunteerid = models.UUIDField()
    taskid = models.UUIDField()
    archived = models.BooleanField()

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversationid = models.UUIDField()
    datecreated = models.DateField(auto_now_add=True)
    senderid = models.UUIDField()
    content = models.CharField(max_length=5000)