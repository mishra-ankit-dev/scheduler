from django.contrib import admin
from django.urls import path
from .views import ProcessDetail, ProcessMapping
from rest_framework import routers
from django.conf.urls import include

urlpatterns = [
    path('processes/', ProcessDetail.as_view(), name='bp_process-view'),
    path('mappings/', ProcessMapping.as_view(),
         name='bp_mappings-view'),

]
