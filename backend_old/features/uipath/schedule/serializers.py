from ..models import Schedule

from rest_framework import serializers

# Serializers define the API representation.


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        depth = 1
