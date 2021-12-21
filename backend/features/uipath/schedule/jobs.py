import json
import requests

import backend.settings
from django.utils import timezone

from django_apscheduler.jobstores import register_events

from ..models import Schedule, Trigger, Server

class Orchestrator:

    def CreateJob(self, schedule):
        if (schedule.recurringType == 'Once'):
            job_instance = backend.settings.scheduler.add_job(
                Orchestrator().SendPostRequest,
                'date',
                id=f'uipath_job_{schedule.id}',
                args=[schedule],
                run_date=schedule.occurOnceDateTime
            )
        elif (schedule.recurringType == 'Now'):
            if (schedule.occurOnceDateTime is None):
                schedule.occurOnceDateTime = timezone.now()
                schedule.scheduleName += f'_{schedule.id}'
                schedule.save()
                job_instance = backend.settings.scheduler.add_job(
                    Orchestrator().SendPostRequest,
                    'date',
                    id=f'uipath_job_{schedule.id}',
                    args=[schedule],
                    run_date=schedule.occurOnceDateTime
                )
        else:
            splitted_recurringTime = (
                str(schedule.recurringTime)).split(':')
            job_instance = backend.settings.scheduler.add_job(
                Orchestrator().SendPostRequest,
                'cron',
                id=f'uipath_job_{schedule.id}',
                args=[schedule],
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


    def SendPostRequest(self, schedule: Schedule):
        schedule.status = "Executing"
        schedule.save()

        trigger: Trigger = schedule.trigger
        server: Server = trigger.server

        token = self.login_to_ui_path_orch(trigger.tenancyName, server)

        if (token is not None):
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {token}'
            }
            arguments = dict(
                map(lambda pI: (pI.name, pI.value), schedule.trigger.processInputs.all()))

            payload = json.dumps({
                "startInfo": {
                    "ReleaseKey": trigger.releaseKey,
                    "Strategy": "All",
                    "RobotIds": [],
                    "NoOfRobots": 0,
                    "InputArguments": json.dumps(arguments)
                }
            })

            print(payload)

            response = requests.request(
                "POST", server.startJobUrl, headers=headers, data=payload, verify=False)
            # print(response.__dict__)

            if response:
                schedule.status = "completed"
                schedule.save()

    def login_to_ui_path_orch(self, tenancyName: str, server: Server):
        login_headers = {
            'Content-Type': 'application/json',
            'X-Authentication': ''
        }

        login_payload = json.dumps({
            "tenancyName": f"{tenancyName}",
            "usernameOrEmailAddress": f"{server.orchUserName}",
            "password": f"{server.orchPassword}"
        })

        login_response = requests.request(
            "POST", server.loginUrl, headers=login_headers, data=login_payload, verify=False)

        return json.loads(login_response.content).get('result', None)
