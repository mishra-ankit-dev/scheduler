from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from .views import ExternalTaskGetView


urlpatterns = [
    path('api/UiPathTask/<str:processInstanceId>/<str:taskId>//<str:workerId>',
         ExternalTaskGetView.as_view(), name='get-api-view'),
]
