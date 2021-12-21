from django.contrib import admin
from django.urls import path
from .views import ProcessDetail
from rest_framework import routers
from django.conf.urls import include

urlpatterns = [
    path('processes/', ProcessDetail.as_view(), name='uipath_process_view'),
]
