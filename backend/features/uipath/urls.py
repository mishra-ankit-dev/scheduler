from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.views.generic.base import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import RedirectView

urlpatterns = [
    path('api/', include('features.uipath.api.urls')),
    path('schedules/', include('features.uipath.schedule.urls')),
    path('triggers/', include('features.uipath.trigger.urls')),
    path('servers/', include('features.uipath.server.urls')),
    path('execution/', include('features.uipath.execution.urls')),
]
