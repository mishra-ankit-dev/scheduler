from django.shortcuts import render

from django.views import View

import json

from rest_framework import authentication, permissions
import requests
from ...uipath.models import Server
from rest_framework.response import Response
from django.http import HttpResponse

# Create your views here.


class ProcessDetail(View):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        serverName = request.GET.get('serverName', '')
        tenancyName = request.GET.get('tenancyName', 'Default')
        try:
            server: Server = Server.objects.get(serverName=serverName)
        except Server.DoesNotExist:
            return Response(status=404)

        processName = request.GET.get('processName', None)

        if processName is not None:
            releasesUrl = server.releasesUrl + \
                "?$filter=ProcessKey%20eq%20%27"+processName+"%27"
        else:
            releasesUrl = server.releasesUrl

        token = self.login_to_ui_path_orch(tenancyName, server)

        if (token is not None):
            details: [] = self.get_process_details(token, releasesUrl)

            response: list = []

            for detail in details:
                if (not (detail.get('IsProcessDeleted'))):
                    processInputs = detail.get(
                        'Arguments', '').get('Input', '')
                    if processInputs is None:
                        processInputs = '{}'
                    processDetail: dict = {
                        'releaseKey': detail.get('Key', None),
                        'version': detail.get('ProcessVersion', None),
                        'processName': detail.get('ProcessKey', None),
                        'processInputs': list(map(lambda x: x.get('name'), json.loads(processInputs)))
                    }
                    response.append(processDetail)

            return HttpResponse(json.dumps({'process-details': response}))

        return HttpResponse(json.dumps({"detail": "Invalid login input data"}))

    def login_to_ui_path_orch(self, tenancyName: str, server: Server):
        login_headers = {
            'Content-Type': 'application/json',
            'X-Authentication': ''
        }

        login_payload = json.dumps({
            "tenancyName": f"{tenancyName}",
            "usernameOrEmailAddress": f"{server.orchUserName}",
            "password": f"{server.orchPassword}"
        })

        login_response = requests.request(
            "POST", server.loginUrl, headers=login_headers, data=login_payload, verify=False)

        return json.loads(login_response.content).get('result', None)

    def get_process_details(self, token, url):
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
        response = requests.request(
            "GET", url, headers=headers, verify=False)
        return json.loads(response.content).get('value', None)
