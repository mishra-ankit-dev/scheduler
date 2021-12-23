from ..models import Server
from .serializers import ServerSerializer

from rest_framework import authentication, permissions, views, viewsets
from django.http import HttpResponse
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

        server = Server.objects.filter(
            serverName=request.data.get('serverName', '')).first()

        # if server is not None:
        #     serverName = server.serverName
        #     userName = server.userName
        #     password = server.password

        #     if (server.status):
        #         command = f'{server.aeFilePath} stopall'
        #     elif (not(server.status)):
        #         command = f'{server.aeFilePath} startall'
        #     else:
        #         command = ''

        #     # Create winrm connection.
        #     sess = winrm.Session(serverName, auth=(
        #         userName, password), transport='kerberos')
        #     result = sess.run_cmd(command)
        #     print(result.__dict__)
        #     if (result.__dict__):
        #         server.status = not (server.status)
        #         server.save()
        #     return HttpResponse()
        return HttpResponse()
