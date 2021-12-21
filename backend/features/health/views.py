from django.shortcuts import render

import os
import json
from subprocess import Popen, PIPE
from multiprocessing import Process

# Create your views here.
from rest_framework import authentication, permissions, views
from rest_framework.response import Response


class HealthInfo(views.APIView):
    # http_method_names = ['get', 'post', 'put', 'patch']
    # permission_classes = (permissions.IsAuthenticated, )
    # authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        server = request.data

        healthCheckFile = os.path.realpath('features/health/script.ps1')

        if server.get('serverName', None) is None:
            return Response({"error": {"detail": "Server is required"}}, status=400)

        process = Popen(
            [
                "powershell.exe", healthCheckFile,server.get('serverName', ''), 
                server.get('userName', ''), 
                server.get('password', '')
            ], 
            stdin=PIPE, 
            stdout=PIPE, 
            stderr=PIPE
        )

        response = process.communicate()
        try:
            if response[1].__str__().__contains__("Access is denied"):
                return Response({"details": {"error": "Owner of this server does not have login access."}})

            elif response[1].__str__().__contains__("The RPC server is unavailable"):
                return Response({"details": {"error": "Remote connection to this server is disabled."}})

            return Response({'details': json.loads(response[0])})
        except Exception as e:
            print(e)
            return Response({"details": {"error": "Internal Server Error"}}, status=500)
