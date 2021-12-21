from ..models import Server

from rest_framework import serializers
from rest_framework import exceptions as drf_exceptions
from rest_framework.authtoken.models import Token

# Serializers define the API representation.


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'
