from django.contrib import admin
from django.urls import path
from .views import Processes, ProfileProcessMapping
from rest_framework import routers
from django.conf.urls import include

urlpatterns = [
    path('processes/', Processes.as_view(), name='process-view'),
    path('mappings/', ProfileProcessMapping.as_view(),
         name='process-profile-mapping-view'),

]
