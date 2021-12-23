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

        serializer = ExecutionSerializer(execution)

        response = {
            'Process_id': taskId,
            'inputParameters': [
                {'name': 'id', 'type': 'string',
                    'value': serializer.data["id"]},
                {'name': 'botName', 'type': 'string',
                    'value': execution.trigger.processName},
                {'name': 'message_id', 'type': 'string',
                    'value': execution.message_id},
            ]
        }
        return Response(response, status=200)

    @csrf_exempt
    def post(self, request, processInstanceId: str, workerId: str, status: str):
        try:
            execution : Execution = Execution.objects.get(pk=processInstanceId)
        except Execution.DoesNotExist:
            return Response(status=404)

        execution.add_process_outputs(outputs=request.data.get('output', {}))
        
        serializer = ExecutionSerializer(execution)
        return Response(serializer.data)