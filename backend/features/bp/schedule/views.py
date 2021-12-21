import os
import json
import requests
from subprocess import Popen, PIPE

from ..models import Schedule, Trigger, Server, Execution
from .serializers import ScheduleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from django.utils import timezone
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events

scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default")

scheduler.start()


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
                schedule = serializer.save()

                if (schedule.recurringType == 'Once'):
                    job_instance = scheduler.add_job(
                        RabbitMQ().SendPostRequest,
                        'date',
                        id=f'bp_job_{schedule.id}',
                        args=[schedule],
                        run_date=schedule.occurOnceDateTime
                    )
                elif (schedule.recurringType == 'Now'):
                    if (schedule.occurOnceDateTime is None):
                        schedule.occurOnceDateTime = timezone.now()
                        schedule.scheduleName += f'_{schedule.id}'
                        schedule.save()
                    job_instance = scheduler.add_job(
                        RabbitMQ().SendPostRequest,
                        'date',
                        id=f'bp_job_{schedule.id}',
                        args=[schedule],
                        run_date=schedule.occurOnceDateTime
                    )
                else:
                    splitted_recurringTime = (
                        str(schedule.recurringTime)).split(':')
                    job_instance = scheduler.add_job(
                        RabbitMQ().SendPostRequest,
                        'cron',
                        id=f'bp_job_{schedule.id}',
                        args=[schedule],
                        hour=splitted_recurringTime[0],
                        minute=splitted_recurringTime[1],
                        start_date=schedule.recurringStartDate,
                        end_date=schedule.recurringEndDate
                    )
                register_events(scheduler)
                # print(job_instance.next_run_time)
                if job_instance:
                    schedule.status = "pending"
                    schedule.save()
                return Response(json.dumps({'created_job': str(job_instance)}))

            return Response(serializer.errors)

        # return HttpResponse(json.dumps({'status': "Invalid Trigger Object supplied"}))

    def delete(self, request, pk):
        try:
            scheduler.remove_job(f'bp_job_{pk}')
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


class RabbitMQ:
    def SendPostRequest(self, schedule: Schedule):
        schedule.status = "Executing"
        schedule.save()
        server: Server = schedule.trigger.server
        execution: Execution = Execution.objects.create(schedule=schedule)
        processInputs = schedule.trigger.processInputs.all()

        inputParameters = f'-serverName {server.serverName} -userName {server.orchUserName} -password {server.orchPassword} -processName {schedule.trigger.processName} -inputParameters "<inputs>'

        for processInput in processInputs:
            execution.processInputs.add(processInput)
            inputParameters += f"<input name='{processInput.name}' type='text' value='{processInput.value}'/>"

        inputParameters += '</inputs>"'
        # print(inputParameters)
        execution.save()

        response = {}

        # os.path.realpath('features/health/script.ps1')

        runProcessFile = os.path.realpath(
            'features/bp/schedule/runProcess.ps1')
        print(runProcessFile)

        process = Popen(["powershell.exe", runProcessFile,
                        inputParameters], stdin=PIPE, stdout=PIPE, stderr=PIPE)

        response = process.communicate()

        print(response)

        if response:
            schedule.status = "completed"
            schedule.save()
