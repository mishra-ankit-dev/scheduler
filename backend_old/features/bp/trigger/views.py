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
        serializer = None
        if (pk is None):
            triggers = Trigger.objects.all().order_by('id')
            # TriggerSerializer.Meta.depth = 1
            serializer = TriggerSerializer(triggers, many=True)

            for index, queries in enumerate(serializer.data):
                processInputs = queries.get('processInputs')
                for index, id in enumerate(processInputs):
                    try:
                        matchingProcessInput = ProcessInput.objects.get(
                            pk=id)
                    except ProcessInput.DoesNotExist:
                        return Response(status=404)

                    if (matchingProcessInput is not None):
                        processInputs[index] = ProcessInput.get_process_input_as_dict(
                            matchingProcessInput)

            return Response(serializer.data)

        elif (pk is not None):
            try:
                trigger = Trigger.objects.get(pk=pk)
            except Trigger.DoesNotExist:
                return Response(status=404)

            serializer = TriggerSerializer(trigger)

            processInputs = serializer.data.get('processInputs')
            for index, id in enumerate(processInputs):
                try:
                    matchingProcessInput = ProcessInput.objects.get(pk=id)
                except ProcessInput.DoesNotExist:
                    return Response(status=404)

                if (matchingProcessInput is not None):
                    processInputs[index] = ProcessInput.get_process_input_as_dict(
                        matchingProcessInput)

            return Response(serializer.data)

    def put(self, request, pk, format=None):
        trigger = self.get_object(pk)
        processInputs = request.data.get('processInputs', None)
        originalPIDict = dict(
            map(lambda pI: (pI.name, pI), trigger.processInputs.all()))
        if (processInputs is not None):
            for index, processInput in enumerate(processInputs):
                name = processInput['name']
                value = processInput['value']
                # matchingProcessInput = ProcessInput.objects.filter(name=name).first()
                matchingProcessInput = originalPIDict.get(
                    name, None)
                if (matchingProcessInput is not None):
                    matchingProcessInput.name = name
                    matchingProcessInput.value = value
                    matchingProcessInput.save()
                    processInputs[index] = matchingProcessInput.id

                else:
                    newProcessInput = ProcessInput.objects.create(
                        name=name, value=value)
                    processInputs[index] = newProcessInput.id
                    trigger.processInputs.add(newProcessInput.id)
            serializer = TriggerSerializer(trigger, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        processInputs = request.data.get('processInputs', None)
        # print(request.data)
        if (processInputs is not None):
            for index, processInput in enumerate(processInputs):
                name = processInput['name']
                value = processInput['value']

                newProcessInput = ProcessInput.objects.create(
                    name=name, value=value)
                processInputs[index] = newProcessInput.id
        # print(request.data)
        serializer = TriggerSerializer(data=request.data)
        if serializer.is_valid():
            trigger = serializer.save()
            for processInputId in processInputs:
                trigger.processInputs.add(processInputId)

            trigger.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            trigger_to_be_deleted = Trigger.objects.get(pk=pk)
        except Trigger.DoesNotExist:
            return Response(status=404)
        else:
            trigger_to_be_deleted.delete()
            serializer = TriggerSerializer(trigger_to_be_deleted)

            return Response(serializer.data)
