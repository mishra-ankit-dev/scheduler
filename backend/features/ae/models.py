from typing import List

from django.db import models

from ..users.models import User

from django.dispatch import receiver
from django.db.models.signals import pre_delete

from django.contrib.sites.shortcuts import get_current_site

# Create your models here.


class Server(models.Model):
    serverName: str = models.CharField(max_length=60, primary_key=True)
    dbName: str = models.CharField(max_length=60)
    dbServerName: str = models.CharField(max_length=60)
    serverIp = models.GenericIPAddressField()
    aeVersion: str = models.CharField(max_length=60)
    listenerUrl: str = models.CharField(max_length=60)
    aeSiteUrl: str = models.CharField(max_length=60)
    messagingUrl: str = models.CharField(max_length=60)
    status: bool = models.BooleanField(default=False)
    lastRestartTime = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    createdBy: User = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='ae_server_created_by')
    owner: User = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='ae_server_owner')
    lastEditedBy: User = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='ae_server_last_edited_by')

    aeSite: bool = models.BooleanField(default=False)
    messaging: bool = models.BooleanField(default=False)
    listener: bool = models.BooleanField(default=False)
    controlTower: bool = models.BooleanField(default=False)
    etl: bool = models.BooleanField(default=False)
    vanguard: bool = models.BooleanField(default=False)

    userName: str = models.CharField(max_length=120)
    password: str = models.CharField(max_length=120)
    aeFilePath: str = models.CharField(max_length=500)

    def __str__(self):
        return self.serverName


class ProcessInput(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=120)
    value: str = models.CharField(max_length=360)

    def __str__(self):
        return self.name


class Trigger(models.Model):
    id: int = models.AutoField(primary_key=True)

    triggerName: str = models.CharField(max_length=360)
    server: Server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name='ae_server')
    processName: str = models.CharField(max_length=60, null=False, blank=False)
    profileName: str = models.CharField(max_length=60, null=False, blank=False)
    processExpirationTime: int = models.IntegerField()

    processInputs: List[ProcessInput] = models.ManyToManyField(
        ProcessInput, related_name='processInputs', blank=True)

    def __str__(self):
        return (f"{self.processName} in {self.profileName}")

    def add_process_inputs(self, processInputs: list = None):
        if (processInputs is not None):
            for processInput in processInputs:
                newProcessInput = ProcessInput.objects.create(
                    name=processInput['name'], value=processInput['value'])
                self.processInputs.add(newProcessInput)
            self.save()

    def update_process_inputs(self, processInputs: list = None):
        originalProcessInputs = self.processInputs.all()
        if (processInputs is not None):
            for processInput in processInputs:
                updatedName = processInput['name']
                updatedValue = processInput['value']
                try:
                    updatedProcessInput = originalProcessInputs.get(name=updatedName)
                    updatedProcessInput.value = updatedValue
                    updatedProcessInput.save()
                except ProcessInput.DoesNotExist:
                    updatedProcessInput = ProcessInput.objects.create(name=updatedName, value=updatedValue)
                    self.processInputs.add(updatedProcessInput)


class Schedule(models.Model):
    id: int = models.AutoField(primary_key=True)

    scheduleName: str = models.CharField(max_length=360, null=True)
    trigger: Trigger = models.ForeignKey(
        Trigger, on_delete=models.CASCADE, related_name='ae_schedule_trigger')
    status: str = models.CharField(max_length=9, blank=True, null=True)
    userName: str = models.CharField(max_length=120)
    recurringType: str = models.CharField(max_length=30, default="Once")

    occurOnceDateTime = models.DateTimeField(null=True, blank=True)

    recurringTime = models.TimeField(null=True, blank=True)
    recurringStartDate = models.DateField(null=True, blank=True)
    recurringEndDate = models.DateField(null=True, blank=True)

    def __str__(self):
        return (self.trigger.processName)


class ProcessOutput(models.Model):
    id: int = models.AutoField(primary_key=True)
    name: str = models.CharField(max_length=120)
    value: str = models.CharField(max_length=2000)

    def __str__(self):
        return (self.name)


class Execution(models.Model):
    id: int = models.AutoField(primary_key=True)

    trigger: Trigger = models.ForeignKey(
        Trigger, on_delete=models.CASCADE)

    processInputs: List[ProcessInput] = models.ManyToManyField(
        ProcessInput, related_name='ae_execution_process_inputs', blank=True)

    processOutputs: List[ProcessOutput] = models.ManyToManyField(
        ProcessOutput, related_name='ae_execution_process_outputs', blank=True)

    message_id: str = models.CharField(max_length=360, null=True)

    endTime = models.DateTimeField(auto_now=True)
    startTime = models.DateTimeField(auto_now_add=True)
    executionDuration = models.DurationField(null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def add_process_inputs(self, baseUrl=None):
        for processInput in self.trigger.processInputs.all():
            if (processInput.name == 'processInstanceId'):
                processInput.value = self.id
                processInput.save()
            elif (processInput.name == 'taskId'):
                processInput.value = f"{self.trigger.triggerName}_{self.id}"
                processInput.save()
            elif (processInput.name == 'baseUrl'):
                processInput.value = baseUrl
                processInput.save()
            self.processInputs.add(processInput)
        self.save()

    def add_process_outputs(self, outputs=None):
        if outputs is not None:
            for name, value in outputs.items():
                processOutput = ProcessOutput.objects.create(
                    name=name, value=value)
                self.processOutputs.add(processOutput)
            self.save()


@receiver(pre_delete, sender=Trigger)
def delete_all_process_inputs(sender, instance: Trigger, using, **kwargs):
    try:
        instance.processInputs.all().delete()
    except:
        pass


@receiver(pre_delete, sender=Execution)
def delete_all_process_outputs(sender, instance: Execution, using, **kwargs):
    try:
        instance.processOutputs.all().delete()
    except:
        pass
