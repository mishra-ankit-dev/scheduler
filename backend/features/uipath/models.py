from django.db import models
from ..users.models import User

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete

# Create your models here.


class Server(models.Model):
    serverName = models.CharField(max_length=60, primary_key=True)
    dbName = models.CharField(max_length=60)
    dbServerName = models.CharField(max_length=60)
    serverIp = models.GenericIPAddressField()
    version = models.CharField(max_length=60)
    loginUrl = models.CharField(max_length=500)
    releasesUrl = models.CharField(max_length=500)
    startJobUrl = models.CharField(max_length=500)
    getJobsUrl = models.CharField(max_length=500)

    status = models.BooleanField(default=False)
    lastRestartTime = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='uipath_server_created_by')
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='uipath_server_owner')
    lastEditedBy = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='uipath_server_last_edited_by')

    userName = models.CharField(max_length=120)
    password = models.CharField(max_length=120)

    orchUserName = models.CharField(max_length=120)
    orchPassword = models.CharField(max_length=120)

    dbUserName = models.CharField(max_length=120)
    dbPassword = models.CharField(max_length=120)

    uiPathFilePath = models.CharField(max_length=500)

    def __str__(self):
        return self.serverName


class ProcessInput(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120)
    value = models.CharField(max_length=360)

    @staticmethod
    def get_id_by_name(name: str):
        print(name)
        processInputId = ProcessInput.objects.filter(
            name=name).first().id
        print(processInputId)
        return (processInputId)

    @staticmethod
    def get_process_input_as_dict(processInput):
        processInputDict = dict()
        processInputDict.update({'name': processInput.name,
                                'value': processInput.value})
        return(processInputDict)

    def __str__(self):
        return self.name


class Trigger(models.Model):
    id = models.AutoField(primary_key=True)

    triggerName = models.CharField(max_length=360)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name='uipath_server')
    releaseKey = models.CharField(max_length=360)
    processName = models.CharField(max_length=60)
    tenancyName = models.CharField(max_length=60)

    processInputs = models.ManyToManyField(
        ProcessInput, related_name='uipath_trigger_process_inputs', blank=True)

    def __str__(self):
        return (f"{self.processName} in {self.tenancyName}")


class Schedule(models.Model):
    id = models.AutoField(primary_key=True)

    scheduleName = models.CharField(max_length=360, null=True)
    trigger = models.ForeignKey(
        Trigger, on_delete=models.CASCADE, related_name='uipath_schedule_trigger')
    status = models.CharField(max_length=9, blank=True, null=True)
    userName = models.CharField(max_length=120)
    recurringType = models.CharField(max_length=30, default="Once")

    occurOnceDateTime = models.DateTimeField(null=True, blank=True)

    recurringTime = models.TimeField(null=True, blank=True)
    recurringStartDate = models.DateField(null=True, blank=True)
    recurringEndDate = models.DateField(null=True, blank=True)

    def __str__(self):
        return (self.trigger.processName)


class ProcessOutput(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120)
    value = models.CharField(max_length=360)


class Execution(models.Model):
    id = models.AutoField(primary_key=True)

    schedule = models.OneToOneField(
        Schedule, on_delete=models.CASCADE)

    processInputs = models.ManyToManyField(
        ProcessInput, related_name='uipath_execution_process_inputs', blank=True)

    processOutputs = models.ManyToManyField(
        ProcessOutput, related_name='uipath_execution_process_outputs', blank=True)

    startJobKey = models.CharField(max_length=360)

    endTime = models.DateTimeField(auto_now=True)
    startTime = models.DateTimeField(auto_now_add=True)
    executionDuration = models.DurationField(null=True)
    createdAt = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=Schedule)
def create_execution(sender, instance: Schedule, created, **kwargs):
    if created:
        execution = Execution.objects.create(schedule=instance)
        processInputs = instance.trigger.processInputs.all()
        for processInput in processInputs:
            execution.processInputs.add(processInput.id)
        execution.save()


@receiver(pre_delete, sender=Trigger)
def delete_all_process_inputs(sender, instance: Trigger, using, **kwargs):
    try:
        instance.processInputs.all().delete()
    except:
        pass


@receiver(pre_delete, sender=Execution)
def delete_all_process_inputs(sender, instance: Execution, using, **kwargs):
    try:
        instance.processOutputs.all().delete()
    except:
        pass
