from django.contrib.auth.models import BaseUserManager
from datetime import date

class UserManager(BaseUserManager):
    def create_user(self, username, email,password=None):
        """
        Creates and saves a User with the given username
        """
        if not username:
            raise ValueError('Users must have an username')

        user = self.model(
            username=self.normalize_email(username),
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email,password=None):
        """
        Creates and saves a superuser with the given username, date of
        birth and password.
        """
        user = self.create_user(
            username,
            email,
            password,
        )
        user.set_password(password)
        user.is_admin = True
        user.save(using=self._db)
        return user