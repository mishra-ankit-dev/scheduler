from ..models import Trigger
from .serializers import TriggerSerializer

from rest_framework.response import Response
from rest_framework import authentication, permissions, views

# Create your views here.


class TriggerView(views.APIView):
    # http_method_names = ['get', 'post', 'put', 'patch']
    queryset = Trigger.objects.all()
    serializer_class = TriggerSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self, pk):
        return Trigger.objects.get(pk=pk)

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if (pk is None):
            triggers = self.queryset.order_by('id')
            serializer = self.serializer_class(triggers, many=True)
            return Response(serializer.data)

        elif (pk is not None):
            try:
                trigger = self.get_object(pk=pk)
            except Trigger.DoesNotExist:
                return Response(status=404)

            serializer = self.serializer_class(trigger)
            return Response(serializer.data)

    def post(self, request, format=None):
        processInputs = request.data.get('processInputs', None)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            trigger: Trigger = serializer.save()
            trigger.add_process_inputs(processInputs)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def put(self, request, pk, format=None):
        try:
            trigger = self.get_object(pk=pk)
        except Trigger.DoesNotExist:
            return Response(status=404)
            
        processInputs = request.data.get('processInputs', None)
        serializer = self.serializer_class(trigger, data=request.data)
        if serializer.is_valid():
            trigger: Trigger = serializer.save()
            trigger.update_process_inputs(processInputs=processInputs)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            trigger_to_be_deleted: Trigger = Trigger.objects.get(pk=pk)
        except Trigger.DoesNotExist:
            return Response(status=404)
        else:
            serializer = self.serializer_class(trigger_to_be_deleted)
            response = serializer.data
            trigger_to_be_deleted.delete()

            return Response(response)
