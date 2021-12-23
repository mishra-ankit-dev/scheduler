from django.shortcuts import render
from rest_framework import authentication, permissions

from ..models import Execution
from .serializers import ExecutionSerializer
from rest_framework import views

from rest_framework.response import Response

# Create your views here.


class ExternalTaskGetView(views.APIView):
    # http_method_names = ['get', 'post', 'put', 'patch']
    queryset = Execution.objects.all()
    serializer_class = ExecutionSerializer
    # permission_classes = (permissions.IsAuthenticated, )
    # authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, processInstanceId, taskId, workerId):
        try:
            execution = Execution.objects.get(pk=processInstanceId)
        except Execution.DoesNotExist:
            return Response(status=404)
        else:
            serializer = ExecutionSerializer(execution)

            response = {
                'Process_id': execution.schedule.scheduleName,
                'inputParameters': [
                    {'name': 'id', 'type': 'string',
                        'value': serializer.data["processInstanceId"]},
                    {'name': 'id', 'type': 'string',
                        'value': serializer.data["processInstanceId"]},
                ]
            }
            print(response)
            return Response(response)
