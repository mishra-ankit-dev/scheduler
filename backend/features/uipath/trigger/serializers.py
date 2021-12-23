from ..server.serializers import ServerSerializer
from ..models import Server, Trigger, ProcessInput

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

# Serializers define the API representation.


class ProcessInputsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessInput
        fields = '__all__'


class TriggerSerializer(serializers.ModelSerializer):
    server = ServerSerializer(read_only=True)
    processInputs = ProcessInputsSerializer(read_only=True, many=True)

    class Meta:
        model = Trigger
        fields = ['id', 'triggerName', 'server', 'processName', 'tenancyName',
                  'releaseKey', 'processInputs']

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        try:
            server = Server.objects.get(
                pk=data.get('server').get('serverName'))
        except Server.DoesNotExist:
            raise ValidationError(
                {'server': ['Invalid server primary key']},
                code='invalid',
            )
        internal_data['server'] = server
        return internal_data
