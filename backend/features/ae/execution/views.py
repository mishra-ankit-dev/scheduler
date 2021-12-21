from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from ..models import Execution, ProcessOutput
from .serializers import ExecutionSerializer

from rest_framework import views
from rest_framework.response import Response
from rest_framework import authentication, permissions

# Create your views here.


class ExternalTaskView(views.APIView):
    # http_method_names = ['get', 'post']
    queryset = Execution.objects.all()
    serializer_class = ExecutionSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    # authentication_classes = (authentication.TokenAuthentication,)

    @csrf_exempt
    def get(self, request, processInstanceId, taskId, workerId):
        try:
            execution: Execution = Execution.objects.get(pk=processInstanceId)
        except Execution.DoesNotExist:
            return Response(status=404)
        else:
            serializer = ExecutionSerializer(execution)

            response = {
                'Process_id': f"{execution.trigger.triggerName}_{execution.id}",
                'inputParameters': [
                    {'name': 'id', 'type': 'string',
                        'value': serializer.data["id"]},
                    {'name': 'botName', 'type': 'string',
                        'value': execution.schedule.trigger.processName},
                    {'name': 'message_id', 'type': 'string',
                        'value': execution.message_id},
                ]
            }
            # print(response)
            return Response(response)

    @csrf_exempt
    def post(self, request, processInstanceId: str, workerId: str, status: str):
        execution: Execution = Execution.objects.get(pk=processInstanceId)

        outputs = request.data.get('output', {})

        # execution.save(outputs = outputs)

        for name, value in outputs.items():
            processOutput = ProcessOutput.objects.create(
                name=name, value=value)
            execution.processOutputs.add(processOutput)
        execution.save()
        serializer = ExecutionSerializer(execution)
        return Response(serializer.data)
