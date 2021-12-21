from django.test import TestCase

# Create your tests here.

# Serializers
from django.db import models
from authenticate.models import User, Profile
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework import exceptions
from rest_framework.authtoken.models import Token

# Views
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'id' : {'read_only' : True},
            'password' : {'write_only' : True}
        }

class TokenSerializer(serializers.ModelSerializer):
    auth_token = UserSerializer()
    class Meta:
        model = Token
        fields = ['key', 'auth_token']
        extra_kwargs = {
            'key' : {'read_only' : True}
        }

class RegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='auth_token')
    class Meta:
        model = Token
        fields = ['key', 'user']
        extra_kwargs = {
            'key' : {'read_only' : True}
        }

    def create(self, validated_data):
        #validated_data.pop()
        return(User.objects.create_user(**validated_data['user']))


def createUser(user:User):
    try:
        serializer_class = UserSerializer(data=user)
        serializer_class.is_valid(raise_exception=True)

        print(serializer_class.data)
    except Exception as e:
        print(Response(serializer_class.errors))

user = {'username' : 'ankit',
        'first_name' : '',
        'last_name' : '',
        'email' : 'am9713490290@gmail.com',
        'password' : 'Amishm786@'
        }

createUser(user)

