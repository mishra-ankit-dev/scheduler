from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from .views import ExternalTaskView


urlpatterns = [
    path('api/AETask/<str:processInstanceId>/<str:taskId>/<str:workerId>',
         ExternalTaskView.as_view(), name='get-api-view'),
    path('api/AETaskComplete/<str:processInstanceId>/<str:workerId>/<str:status>',
         ExternalTaskView.as_view(), name='post-api-view'),
]
