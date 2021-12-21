from django.contrib import admin
from .models import Execution

from .models import Server, Trigger, Schedule, ProcessInput, ProcessOutput


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
    ordering = ('id', 'trigger', 'scheduleName')


class TriggerAdmin(admin.ModelAdmin):
    fields = ('triggerName', 'server', 'processName', 'profileName',
              'processExpirationTime', 'processInputs')

    # list of fields to display in django admin
    list_display = ['id', 'triggerName', 'processName', 'server',
                    'profileName', 'processExpirationTime']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['triggerName', 'server', 'processName',
                     'profileName', 'processExpirationTime']

    # to define model data list ordering
    ordering = ('id', 'triggerName', 'processName')


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
    # Editable fields in django form
    fields = ('trigger', 'processInputs', 'processOutputs',
              'executionDuration', 'message_id')

    # list of fields to display in django admin
    list_display = ['id', 'trigger', 'startTime',
                    'endTime', 'executionDuration', 'message_id']

    # if you want django admin to show the search bar, just add this line
    search_fields = ['id', 'trigger', 'startTime',
                     'endTime', 'executionDuration', 'message_id']

    # to define model data list ordering
    ordering = ('id', 'trigger', 'message_id',)


admin.site.register(Server)
admin.site.register(Trigger, TriggerAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Execution, ExecutionAdmin)
admin.site.register(ProcessInput, ProcessInputAdmin)
admin.site.register(ProcessOutput, ProcessOutputAdmin)
