from django.contrib import admin
from .models import Room,ChatResponse,StressedUser
# Register your models here.
admin.site.register(Room)
admin.site.register(ChatResponse)
admin.site.register(StressedUser)