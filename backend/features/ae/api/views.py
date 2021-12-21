
import pyodbc
import json

from django.shortcuts import render
from django.views import View

from ..models import Server

from rest_framework import authentication, permissions, views
from rest_framework.response import Response


class Processes(views.APIView):
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

        response = {'processInfos': [
            {"processName": '', "version": '', "processInputs": []}]}

        conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}', host=f'{server.dbServerName}', database=dbName,
                              trusted_connection='yes', user='aerpa', password='aerpa')

        cursor = conn.cursor()

        if(processName is None):
            query = f"Select Process_Name from {dbName}.usch_aese.Process_Information"
            cursor.execute(query)

            response['processes'] = tuple(
                map(lambda row: row[0], cursor.fetchall()))

        elif(processName is not None and processName != ''):
            query = f"""SELECT O.WORKFLOW_NAME, O.SEARCHCRITERIA_XML, O.VERSION FROM {dbName}.usch_aese.UTBL_WORKFLOW O
WHERE O.VERSION = (SELECT MAX(I.VERSION) FROM {dbName}.usch_aese.UTBL_WORKFLOW I WHERE O.WORKFLOW_NAME=I.WORKFLOW_NAME) 
AND O.WORKFLOW_NAME='{processName}'"""

            cursor.execute(query)

            response['processInfos'] = tuple(map(lambda row: {"processName": row[0], "version": str(
                row[2]), "processInputs": self.get_pIs_as_list(row[1])}, cursor.fetchall()))

        conn.close()

        return Response(response)

    def get_pIs_as_list(self, process_xml: any):
        from lxml import etree

        if (process_xml):
            return list(map(lambda stage: stage.get("ControlId"), etree.fromstring(process_xml).findall(".//Control")))

        else:
            return []


class ProfileProcessMapping(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        serverName = request.GET.get('serverName', '')
        try:
            server: Server = Server.objects.get(serverName=serverName)
        except Server.DoesNotExist:
            return Response(status=404)

        dbName = server.dbName

        conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}', host=f'{server.dbServerName}', database=dbName,
                              trusted_connection='yes', user='aerpa', password='aerpa')

        cursor = conn.cursor()
        query = f"""SELECT DISTINCT PP.Profile_Name, PP.Process_Name FROM {dbName}.usch_aese.Mapping_Information MI 
INNER JOIN {dbName}.usch_aese.Process_Information PI
ON MI.Process_Id=PI.Process_Id
INNER JOIN {dbName}.usch_aese.R_PROFILEPROCESS PP ON
MI.MAPPING_ID=PP.MAPPINGID
ORDER BY PP.Profile_Name, PP.Process_Name"""

        # query = f"Select Profile_Name, Process_Name from {request.GET.get('dbName', '')}.usch_aese.R_PROFILEPROCESS where Process_Name IS NOT NULL"
        cursor.execute(query)
        response = dict()
        for row in cursor.fetchall():
            if row[0] not in response:
                response.update({row[0]: []})
            response[row[0]].append(row[1])

        conn.close()

        return Response(response)
