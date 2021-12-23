from ..models import Execution

from rest_framework import serializers

# Serializers define the API representation.


class ExecutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Execution
        fields = '__all__'
        # depth = 1
