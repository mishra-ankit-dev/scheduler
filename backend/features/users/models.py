from django.db import models
from django.contrib.auth.models import UserManager
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

from cloudinary.models import CloudinaryField

from rest_framework.authtoken.models import Token

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=120, unique=True)
    first_name = models.CharField(max_length=120, blank=True)
    last_name = models.CharField(max_length=120, blank=True)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=254)

    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return self.username

Token = Token

class Address(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    street = models.CharField(max_length=200, blank=True, default="")
    city = models.CharField(max_length=50, blank=True, default="")
    state = models.CharField(max_length=30, blank=True, default="")
    zip_code = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return ("{}'s Address".format(self.user.username))


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    bio = models.TextField(max_length=500, default="")
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, null=True)
    birth_date = models.DateField(null=True, default=None)
    email_confirmed = models.BooleanField(default=False)
    image = models.ImageField(default='profile/default.jpg',
                              upload_to='profile')
    # image = CloudinaryField('image')

    def __str__(self):
        return ("{}'s Profile".format(self.user.username))


@receiver(post_save, sender=Address)
def update_user_profile(sender, instance, created, **kwargs):
    print('Instance in update user profile', instance.user)
    if created:
        profile = Profile.objects.create(user=instance.user)
        profile.address = instance
        profile.save()


@receiver(post_save, sender=User)
def update_user_address(sender, instance, created, **kwargs):
    if created:
        address = Address.objects.create(user=instance)
    instance.address.save()
