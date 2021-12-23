from ..users.models import User
from typing import Any, Optional
from django.contrib.auth.backends import RemoteUserBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from django.contrib.auth import login as django_login
from django.views.decorators.csrf import csrf_exempt

class WindowsAuthenticationBackend(RemoteUserBackend):

    @csrf_exempt
    def authenticate(self, request: HttpRequest, remote_user: str) -> Optional[AbstractBaseUser]:
        if remote_user is None:
            return None
        username = self.clean_username(remote_user)
        try:
            user: User = User.objects.get(username=username)
        except User.DoesNotExist:
            return None
        
        if(user.is_active):
            return user
        return None

    def clean_username(self, username: str) -> str:
        user_splitted = username.split("\\")
        if len(user_splitted) > 1:
            username = user_splitted[1]
            print(username)
        return username
