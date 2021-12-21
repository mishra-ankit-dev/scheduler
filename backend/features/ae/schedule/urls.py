from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from .views import SchedulerView


urlpatterns = [
    path('', SchedulerView.as_view(), name='scheduler-view'),
    path('<int:pk>/', SchedulerView.as_view()),
]
