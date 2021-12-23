from django.urls import path
from .views import ServerView, ServerStartStopView
from rest_framework import routers
from django.conf.urls import include

router = routers.DefaultRouter()
router.register(r'', ServerView)

urlpatterns = [
    path('start/', ServerStartStopView.as_view(), name='server-start-view'),
    path('', include(router.urls)),
]
