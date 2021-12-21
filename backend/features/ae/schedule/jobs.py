import json
import requests
from ..models import Execution, Trigger

import backend.settings
from django.utils import timezone

from django_apscheduler.jobstores import register_events


class RabbitMQ:

    def CreateJob(self, schedule, baseUrl):
        if (schedule.recurringType == 'Once'):
            job_instance = backend.settings.scheduler.add_job(
                self.SendPostRequest,
                'date',
                id=f'ae_job_{schedule.id}',
                args=[schedule, baseUrl],
                run_date=schedule.occurOnceDateTime
            )
        elif (schedule.recurringType == 'Now'):
            if (schedule.occurOnceDateTime is None):
                schedule.occurOnceDateTime = timezone.now()
                schedule.scheduleName += f'_{schedule.id}'
                schedule.save()
                job_instance = backend.settings.scheduler.add_job(
                    self.SendPostRequest,
                    'date',
                    id=f'ae_job_{schedule.id}',
                    args=[schedule, baseUrl],
                    run_date=schedule.occurOnceDateTime
                )
            else:
                splitted_recurringTime = (
                    str(schedule.recurringTime)).split(':')
                job_instance = backend.settings.scheduler.add_job(
                    self.SendPostRequest,
                    'cron',
                    id=f'ae_job_{schedule.id}',
                    args=[schedule, baseUrl],
                    hour=splitted_recurringTime[0],
                    minute=splitted_recurringTime[1],
                    start_date=schedule.recurringStartDate,
                    end_date=schedule.recurringEndDate
                )
            register_events(backend.settings.scheduler)
            # print(job_instance.next_run_time)
            if job_instance:
                schedule.status = "pending"
                schedule.save()
            return job_instance

    def SendPostRequest(self, schedule, baseUrl=None):
        schedule.status = "Executing"
        schedule.save()
        trigger: Trigger = schedule.trigger
        execution: Execution = Execution.objects.create(trigger=trigger)
        processInputs = schedule.trigger.processInputs.all()
        for processInput in processInputs:
            if (processInput.name == 'processInstanceId'):
                processInput.value = execution.id
                processInput.save()
            elif (processInput.name == 'taskId'):
                processInput.value = f"{execution.trigger.triggerName}_{execution.id}"
                processInput.save()
            elif (processInput.name == 'baseUrl'):
                processInput.value = baseUrl
                processInput.save()
            execution.processInputs.add(processInput)
        execution.save()

        input_params_dict = dict(
            map(lambda pI: (pI.name, pI.value), processInputs))

        perform_automation_dict_value = {
            "AutomationInputDictionary": dict(map(lambda kv: (f"Search.{kv[0]}", kv[1]), input_params_dict.items())),
            "ProcessName": schedule.trigger.processName,
            "ProfileName": schedule.trigger.profileName,
            "APIVersion": "",
            "AppId": "",
            "CommandExecutionWindow": "",
            "CommandGenerationSource": "",
            "Country": "",
            "Instance": "",
            "PartnerId": "",
            "ReferenceCode": "",
            "Timestamp": "",
            "UserName": schedule.userName,
            "VID": ""}

        payload = json.dumps({
            "payload": json.dumps({"PerformAutomation": perform_automation_dict_value}),
            "content_type": "string",
            "content_encoding": "string",
            "profile": schedule.trigger.profileName,
            "expiration": 5000000,
            "app_id": "ConsoleLoadGen",
            "source_message_id": "03cb2a69-9774-4959-89e4-dc2c80649d00",
            "header": {}
        })
        print(payload)
        headers = {
            'Authorization': 'Basic YWU6YWU=',
            'Content-Type': 'application/json'
        }

        response = requests.request(
            "POST", schedule.trigger.server.listenerUrl, headers=headers, data=payload)
        # print(response.__dict__)

        if response:
            schedule.status = "completed"
            schedule.save()
            execution.message_id = json.loads(
                response.content).get('message_id')
            execution.save()
