from django.db import models

# Create your models here.
class Room(models.Model):
    room_id = models.CharField(unique=True,max_length=6)
    max_user = models.PositiveIntegerField()
    user_count = models.PositiveIntegerField(default=0)
    
    def __str__(self) -> str:
        return str(self.room_id)+"   "+str(self.max_user)