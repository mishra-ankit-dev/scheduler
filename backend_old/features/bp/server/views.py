from ..models import Server
from django.http import HttpResponse
from .serializers import ServerSerializer

from rest_framework.response import Response
from rest_framework import authentication, permissions, views, viewsets
import json


class ServerView(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)


class ServerStartStopView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request, format=None):
        import winrm

        try:
            server: Server = Server.objects.get(
                serverName=request.data.get('serverName', ''))
        except Server.DoesNotExist:
            return Response(status=404)

        if server is not None:
            serverName = server.serverName
            userName = server.userName
            password = server.password

            if (server.status):
                command = f'{server.bpFilePath} stopall'
            elif (not(server.status)):
                command = f'{server.bpFilePath} startall'
            else:
                command = ''

            # Create winrm connection.
            sess = winrm.Session(serverName, auth=(
                userName, password), transport='kerberos')
            result = sess.run_cmd(command)
            print(result.__dict__.get('std_out').decode())
            if (result.__dict__.get('std_out').decode()):
                server.status = not (server.status)
                server.save()
                return Response({'status': "Server satatus changed"}, status=200)
            return Response({'error': result.__dict__.get('std_err').decode()}, status=400)
        return Response(status=404)
