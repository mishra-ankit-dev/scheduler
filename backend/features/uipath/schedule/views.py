import json
import requests

from .jobs import Orchestrator

from ..models import Schedule, Trigger
from .serializers import ScheduleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

import backend.settings
from django.utils import timezone

from django_apscheduler.jobstores import register_events

class SchedulerView(APIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self, pk):
        try:
            return Schedule.objects.get(pk=pk)
        except Schedule.DoesNotExist:
            return Response(status=404)

    def get(self, request, *args, **kwargs):
        ScheduleSerializer.Meta.depth = 1
        query_params = self.request.query_params
        if (query_params):
            if "recurringType" in self.request.query_params:
                schedules = Schedule.objects.filter(
                    recurringType=self.request.query_params.get("recurringType"))

            if "status" in self.request.query_params:
                schedules = Schedule.objects.filter(
                    status=self.request.query_params.get("status"))

            serializer = ScheduleSerializer(schedules, many=True)
            return Response(serializer.data)

        pk = kwargs.get('pk', None)
        if (pk is None):
            schedules = Schedule.objects.all().order_by('id')
            serializer = ScheduleSerializer(schedules, many=True)
            return Response(serializer.data)

        elif (pk is not None):
            try:
                schedule = self.get_object(pk)
                serializer = ScheduleSerializer(schedule)
                return Response(serializer.data)
            except Schedule.DoesNotExist:
                return Response(status=404)

    def post(self, request, format=None):
        triggerId = request.data.get('trigger')
        try:
            self.trigger = Trigger.objects.get(pk=triggerId)
        except Trigger.DoesNotExist:
            return Response(status=404)
        else:
            ScheduleSerializer.Meta.depth = 0
            serializer = ScheduleSerializer(data=request.data)
            if (serializer.is_valid()):
                schedule: Schedule = serializer.save()
                
                job_instance = Orchestrator().CreateJob(schedule)

                return Response(json.dumps({'created_job': str(job_instance)}))

            return Response(serializer.errors)

        # return HttpResponse(json.dumps({'status': "Invalid Trigger Object supplied"}))

    def delete(self, request, pk):
        try:
            backend.settings.scheduler.remove_job(f'uipath_job_{pk}')
        except:
            pass

        try:
            schedule_to_be_deleted = Schedule.objects.get(pk=pk)

        except Schedule.DoesNotExist:
            return Response(status=404)

        else:
            schedule_to_be_deleted.delete()
            serializer = ScheduleSerializer(schedule_to_be_deleted)
            return Response(serializer.data)
