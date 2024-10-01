from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin
)


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    #last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    details_updated = models.BooleanField(default=False)
    
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email
    
# New SupplierDetails model
class BusinessDetail(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='Business_detail')
    phone_number = models.CharField(max_length=15)
    description = models.TextField()
    location = models.CharField(max_length=100)
    whatsapp_number = models.CharField(max_length=15, null=True, blank=True)
    facebook_link = models.URLField(max_length=200, null=True, blank=True)
    linkedin_link = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.user.name} - Business Detail"

