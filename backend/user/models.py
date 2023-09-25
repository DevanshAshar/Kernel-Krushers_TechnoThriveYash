from django.db import models
from .managers import UserManager
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.

class User(AbstractBaseUser):
    name = models.CharField(max_length=20, help_text='Enter your name',null=True, blank=True)
    username = models.CharField(max_length=200,unique=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        help_text='Enter your Email',
    )
    password_reset_token = models.CharField(max_length=250, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    gender = models.CharField(max_length=100,default='prefer not to say')
    stress_count = models.PositiveIntegerField(default=0)
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
    def is_verified(self):
        return (self.is_email_verified)
    
    
# dont ask me why i made the model due frontend work this is been created : (
# class StressForm(models.Model):
#     question = models.CharField(max_length=300)
#     opt1 = models.CharField(max_length=200)
#     opt2 = models.CharField(max_length=200)
#     opt3 = models.CharField(max_length=200)
#     opt4 = models.CharField(max_length=200)
    
#     def __str__(self) -> str:
#         return str(self.question)
    
class FormSubmitByUser(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    answer_array = models.TextField(default='[]')
    def __str__(self) -> str:
        return str(self.user)