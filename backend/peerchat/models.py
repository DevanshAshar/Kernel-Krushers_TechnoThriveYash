from django.db import models
from user.models import User
# Create your models here.
class Room(models.Model):
    room_id = models.CharField(unique=True,max_length=18)
    max_user = models.PositiveIntegerField()
    user_count = models.PositiveIntegerField(default=0)
    
    def __str__(self) -> str:
        return str(self.room_id)+"   "+str(self.max_user)

class ChatResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    prompt = models.TextField()
    response = models.TextField(null=True,blank=True)
    is_stressed = models.PositiveIntegerField(default=0)
    
    def __str__(self) -> str:
        return self.prompt
    
class StressedUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    connect_code = models.CharField(max_length=6)
    prompt_csv = models.URLField(null=True,blank=True)
    form_csv = models.URLField(null=True,blank=True)
    
    def __str__(self) -> str:
        return str(self.user)
    

    