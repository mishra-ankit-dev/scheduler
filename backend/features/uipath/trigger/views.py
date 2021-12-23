from django.shortcuts import render
from django.http.response import Http404

from .serializers import TriggerSerializer
from ..models import Trigger, ProcessInput

from rest_framework import authentication, permissions, status, views, viewsets
from rest_framework.response import Response

import json
from ..models import Server
from ..server.serializers import ServerSerializer

# Create your views here.


class TriggerView(views.APIView):
    # http_method_names = ['get', 'post', 'put', 'patch']
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self, pk):
        try:
            return Trigger.objects.get(pk=pk)
        except Trigger.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if (pk is None):
            triggers = Trigger.objects.all().order_by('id')
            serializer = TriggerSerializer(triggers, many=True)
            return Response(serializer.data)

        elif (pk is not None):
            try:
                trigger = Trigger.objects.get(pk=pk)
            except Trigger.DoesNotExist:
                return Response(status=404)

            serializer = TriggerSerializer(trigger)
            return Response(serializer.data)

    def post(self, request, format=None):
        processInputs = request.data.get('processInputs', None)
        serializer = TriggerSerializer(data=request.data)
        if serializer.is_valid():
            trigger: Trigger = serializer.save()
            trigger.add_process_inputs(processInputs)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        trigger = self.get_object(pk)
        processInputs = request.data.get('processInputs', None)
        serializer = TriggerSerializer(trigger, data=request.data)
        if serializer.is_valid():
            trigger: Trigger = serializer.save()
            trigger.update_process_inputs(processInputs=processInputs)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            trigger_to_be_deleted: Trigger = Trigger.objects.get(pk=pk)
        except Trigger.DoesNotExist:
            return Response(status=404)
        else:
            serializer = TriggerSerializer(trigger_to_be_deleted)
            response = serializer.data
            trigger_to_be_deleted.delete()

            return Response(response)
