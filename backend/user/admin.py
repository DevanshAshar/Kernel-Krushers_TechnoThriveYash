from django.contrib import admin
from .models import User,FormSubmitByUser
# Register your models here.
admin.site.register(User)
admin.site.register(FormSubmitByUser)