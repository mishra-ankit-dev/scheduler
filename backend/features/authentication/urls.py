from django.urls import path, include
from rest_framework import routers
from .views import RegisterView, LoginView, LogoutView, ActivationView, ValidateView

urlpatterns = [

    path(r'auth/', include('rest_framework.urls')),

    path(r'register/', RegisterView.as_view(), name="register"),

    path(r'activation/<uidb64>/<token>/',
         ActivationView.as_view(), name="activation"),

    path(r'login/', LoginView.as_view(), name="login"),
    path(r'validate/', ValidateView.as_view(), name="validate"),

    path(r'logout/', LogoutView.as_view(), name="logout"),

]
