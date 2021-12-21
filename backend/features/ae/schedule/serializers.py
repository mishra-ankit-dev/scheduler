from ..models import Schedule

from rest_framework import serializers

# Serializers define the API representation.


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        depth = 1

    # def __init__(self, *args, **kwargs):
    #     super(ScheduleSerializer, self).__init__(*args, **kwargs)
    #     request = self.context.get('request')
    #     if request and (request.method == 'POST' or request.method == 'PUT'):
    #         ScheduleSerializer.Meta.depth = 0
    #     else:
    #         ScheduleSerializer.Meta.depth = 1
