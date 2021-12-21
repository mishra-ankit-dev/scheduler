from django.shortcuts import render

import pyodbc
import json

from django.http import HttpResponse
from django.views import View

from ..models import Server

from rest_framework import authentication, permissions, viewsets, views
from rest_framework.response import Response


class ProcessDetail(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        processName = request.GET.get('processName', None)

        serverName = request.GET.get('serverName', '')
        try:
            server: Server = Server.objects.get(serverName=serverName)
        except Server.DoesNotExist:
            return Response(status=404)

        dbName = server.dbName

        conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}', host=f'{server.dbServerName}', database=f'{server.dbName}',
                              user=f'{server.dbUserName}', password=f'{server.dbPassword}')

        cursor = conn.cursor()

        response = {'processInfos': [
            {"processName": '', "version": '', "processInputs": []}]}

        if(processName is None):
            query = f"""SELECT Distinct NAME, PROCESSXML FROM [{server.dbName}].[dbo].[BPAProcess]"""
            cursor.execute(query)

            response = json.dumps(
                dict({'processes': tuple(map(lambda row: row[0], cursor.fetchall()))}))

        elif(processName is not None and processName != ''):
            query = f"""SELECT Distinct NAME, PROCESSXML, VERSION FROM [{server.dbName}].[dbo].[BPAProcess] WHERE NAME='{processName}'"""

            cursor.execute(query)

            response['processInfos'] = tuple(map(lambda row: {"processName": row[0], "version": str(
                row[2]), "processInputs": self.get_pIs_as_list(row[1])}, cursor.fetchall()))

        conn.close()

        return Response(response)

    def get_pIs_as_list(self, process_xml: any):
        from lxml import etree

        if (process_xml):
            tree = etree.fromstring(process_xml)

            return list(
                map(
                    lambda input: input.get('name'), 
                    filter(
                        lambda input: 
                            (input.getparent().getparent().get('type') == 'Start' and len(input.getparent().getparent().findall('.//subsheetid', input.getparent().getparent().nsmap)) == 0),  
                        tree.findall(".//input", tree.nsmap)
                    )
                )
            )

            
            # return list(
            #     map(
            #         lambda stage: stage.get("name"),
            #         filter(
            #             lambda x: x.getparent().getparent().get(
            #                     "type") == 'Start', tree.findall(".//input", tree.nsmap))))

        else:
            return []


class ProcessMapping(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        serverName = request.GET.get('serverName', '')
        try:
            server: Server = Server.objects.get(serverName=serverName)
        except Server.DoesNotExist:
            return Response(status=404)

        conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}', host=f'{server.dbServerName}', database=f'{server.dbName}',
                              user=f'{server.dbUserName}', password=f'{server.dbPassword}')

        cursor = conn.cursor()
        query = f"""SELECT Distinct NAME, PROCESSTYPE FROM [{server.dbName}].[dbo].[BPAProcess]"""

        cursor.execute(query)
        mappings = dict()
        for row in cursor.fetchall():
            if row[1] not in mappings:
                mappings.update({row[1]: []})
            mappings[row[1]].append(row[0])

        conn.close()

        return Response(mappings)
