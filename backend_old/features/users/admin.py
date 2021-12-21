from django.contrib import admin
from .models import User, Address, Profile
from django.contrib.auth.admin import UserAdmin

# Register your models here.

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(Address)