from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.views.generic.base import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import RedirectView

urlpatterns = [
    path('api/', include('features.ae.api.urls')),
    path('schedules/', include('features.ae.schedule.urls')),
    path('triggers/', include('features.ae.trigger.urls')),
    path('servers/', include('features.ae.server.urls')),
    path('execution/', include('features.ae.execution.urls')),
]
