from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.views.generic.base import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import RedirectView

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    path('admin/', admin.site.urls),
    path('v1/ae/', include('features.ae.urls')),
    path('v1/bp/', include('features.bp.urls')),
    path('v1/uipath/', include('features.uipath.urls')),
    path('v1/authentication/', include('features.authentication.urls')),
    path('v1/users/', include('features.users.urls')),
    path('v1/health/', include('features.health.urls')),
    url(r'^.*', TemplateView.as_view(template_name="home.html"), name="home"),
]
