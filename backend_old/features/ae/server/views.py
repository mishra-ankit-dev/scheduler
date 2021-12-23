from ..models import Server
from .serializers import ServerSerializer
from ...users.models import User, Token

from django.http import HttpResponse
from django.utils import timezone

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
    permission_classes = (permissions.IsAdminUser, )
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request, format=None):
        import winrm

        try:
            server: Server = Server.objects.get(
                serverName=request.data.get('serverName', ''))
        except Server.DoesNotExist:
            return Response(status=404)

        try:
            key = request.META.get('HTTP_AUTHORIZATION').split(' ')
            if len(key) >= 2:
                key = key[1]
            token: Token = Token.objects.get(key=key)
            user: User = token.user
        except Server.DoesNotExist:
            return Response(status=404)

        if server is not None:
            serverName = server.serverName
            userName = server.userName
            password = server.password

            if (server.status):
                command = f'{server.aeFilePath} stopall'
            elif (not(server.status)):
                command = f'{server.aeFilePath} startall'
            else:
                command = ''

            # Create winrm connection.
            sess = winrm.Session(serverName, auth=(
                userName, password), transport='kerberos')
            result = sess.run_cmd(command)
            print(result.__dict__)
            if (result.__dict__.get('std_out').decode()):
                if not(server.status):
                    server.lastRestartTime = timezone.now()
                server.status = not (server.status)
                server.lastEditedBy = user
                server.save()
                return Response({'status': "Server satatus changed"}, status=200)
            return Response({'error': result.__dict__.get('std_err').decode()}, status=400)
        return Response(status=404)