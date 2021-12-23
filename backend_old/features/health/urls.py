from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.views.generic.base import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from .views import HealthInfo

urlpatterns = [
    path('details/', HealthInfo.as_view(), name="health-info"),
]
