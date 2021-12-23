from django.contrib import admin
from .models import Server, ProcessInput, ProcessOutput, Trigger, Schedule


from .models import Execution

# Register your models here.


class ScheduleAdmin(admin.ModelAdmin):
    fields = ('trigger', 'scheduleName', 'userName', 'status', 'recurringType', 'occurOnceDateTime',
              'recurringTime', 'recurringStartDate', 'recurringEndDate')

    # list of fields to display in django admin
    list_display = ['id', 'scheduleName', 'trigger', 'status', 'userName', 'recurringType',
                    'occurOnceDateTime', 'recurringTime', 'recurringStartDate', 'recurringEndDate']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['trigger', 'scheduleName', 'status', 'userName', 'recurringType',
                     'occurOnceDateTime', 'recurringTime', 'recurringStartDate', 'recurringEndDate']

    # to define model data list ordering
    ordering = ('id', 'scheduleName', 'trigger')


class TriggerAdmin(admin.ModelAdmin):
    fields = ('triggerName', 'server', 'releaseKey', 'processName', 'tenancyName',
              'processInputs')

    # list of fields to display in django admin
    list_display = ['id', 'triggerName', 'releaseKey', 'processName', 'server',
                    'tenancyName']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['triggerName', 'server', 'releaseKey', 'processName',
                     'tenancyName']

    # to define model data list ordering
    ordering = ('id', 'triggerName', 'releaseKey', 'processName')


class ProcessInputAdmin(admin.ModelAdmin):
    fields = ('name', 'value')

    # list of fields to display in django admin
    list_display = ['id', 'name', 'value']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['name', 'value']

    # to define model data list ordering
    #ordering = ('id','name')
    ordering = ('id',)


class ProcessOutputAdmin(admin.ModelAdmin):
    fields = ('name', 'value')

    # list of fields to display in django admin
    list_display = ['id', 'name', 'value']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['name', 'value']

    # to define model data list ordering
    #ordering = ('id','name')
    ordering = ('id',)


class ExecutionAdmin(admin.ModelAdmin):
    fields = ('trigger', 'processInputs', 'processOutputs', 'startJobKey',
              'executionDuration')

    # list of fields to display in django admin
    list_display = ['id', 'trigger', 'startJobKey',
                    'endTime', 'createdAt', 'executionDuration']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['trigger', 'startJobKey',
                     'startTime', 'endTime', 'executionDuration']

    # to define model data list ordering
    ordering = ('id', 'trigger', 'startJobKey')


admin.site.register(Server)
admin.site.register(Trigger, TriggerAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Execution, ExecutionAdmin)
admin.site.register(ProcessInput, ProcessInputAdmin)
admin.site.register(ProcessOutput, ProcessOutputAdmin)
