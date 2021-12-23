from django.contrib import admin
from django.urls import path
from .views import Processes, ProfileProcessMapping, ExternalTaskView
from rest_framework import routers
from django.conf.urls import include

urlpatterns = [
    path('processes/', Processes.as_view(), name='process-view'),
    path('mappings/', ProfileProcessMapping.as_view(),
         name='process-profile-mapping-view'),

    path('AETask/<str:processInstanceId>/<str:taskId>/<str:workerId>',
         ExternalTaskView.as_view(), name='get-api-view'),
    path('AETaskComplete/<str:processInstanceId>/<str:workerId>/<str:status>',
         ExternalTaskView.as_view(), name='post-api-view'),

]
