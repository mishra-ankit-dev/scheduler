from django.contrib import admin
from django.urls import path
from .views import TriggerView
from rest_framework import routers
from django.conf.urls import include

urlpatterns = [
    path('', TriggerView.as_view()),
    path('<int:pk>/', TriggerView.as_view()),
]
