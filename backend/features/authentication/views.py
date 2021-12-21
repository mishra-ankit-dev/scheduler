from django.http import HttpResponseRedirect
from django.utils.encoding import force_text, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from django.core.mail import EmailMessage
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.sites.shortcuts import get_current_site

from .serializers import ActivationSerializer, RegisterSerializer, LoginSerializer, TokenSerializer
from ..users.serializers import UserSerializer, ProfileSerializer

from rest_framework.response import Response
from ..users.models import User, Profile
from rest_framework.authtoken.models import Token
from rest_framework import views, viewsets, exceptions, permissions, authentication


class RegisterView(views.APIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = [IsAuthenticated,]

    @classmethod
    def get_extra_actions(cls):
        return([])

    def get(self, request):
        queryset = Token.objects.all()
        serializer = RegisterSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            serializer = RegisterSerializer(data={'user': request.data})
            serializer.is_valid(raise_exception=True)
            token = serializer.save()
        except Exception as e:
            return(Response(serializer.errors, status=404))
        else:
            self.send_email(request, token.user, token.key)
            return(Response(serializer.data, status=201))

    def patch(self, request, *args, **kwargs):
        try:
            id = request.data.get('id', None)
            original_user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return Response(status=404)

        try:
            serializer = RegisterSerializer(original_user,
                                            data={'user': request.data},
                                            context={'is_active': request.data.get(
                                                'is_active', None)},
                                            partial=True)

            serializer.is_valid(raise_exception=True)

        except Exception as e:
            return(Response(serializer.errors, status=404))

        else:
            updated_user = serializer.save()
            return(Response(serializer.data, status=200))

    def send_email(self, request, user, token):

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        current_site = get_current_site(request)
        activation_link = f"http://{current_site.domain}/v1/authentication/activation/{uidb64}/{token}/"

        import pythoncom
        import win32com.client

        pythoncom.CoInitialize()
        outlook = win32com.client.Dispatch('outlook.application')
        mail = outlook.CreateItem(0)

        mail.To = user.email
        mail.Subject = 'Activation link for AE Scheduler'
        mail.Body = f"""Hi {user.username},

Please click on the following link to activate your registered account on AE scheduler web application.

Activation Link : {activation_link}

Regards,
Ankit

"""

        mail.Send()
        print(activation_link)

        # email = EmailMessage(
        #    'Activation Link',
        #    activation_link,
        #    'amishm766@gmail.com',
        #    [request.data['email']]
        # )
        # email.send()


class ActivationView(views.APIView):
    queryset = User.objects.all()
    serializer_class = ActivationSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def get(self, request, uidb64, token):
        try:
            token = Token.objects.get(key=token)
        except Token.DoesNotExist:
            return Response(status=404)

        try:
            user = token.user
        except:
            return Response(status=404)

        user.is_active = True
        user.save()
        return HttpResponseRedirect(f'http://{get_current_site(request).domain}/')


class LoginView(views.APIView):
    queryset = User.objects.all()

    @classmethod
    def get_extra_actions(cls):
        return([])

    def get(self, request):
        queryset = User.objects.all()
        serializer_class = LoginSerializer(queryset, many=True)
        return Response(serializer_class.data, status=201)

    def post(self, request):
        try:
            # print(request.data)
            serializer_class = LoginSerializer(data={'user': request.data})
            serializer_class.is_valid()

        except Exception as exception:
            print("Exception in Login View : ", exception)
            return(Response(serializer_class.errors, status=500))

        else:
            try:
                user = serializer_class.validated_data.user
            except Exception:
                return(Response("Invalid username or password", status=401))
            else:
                django_login(request, user)
                # print("Serializer Data", serializer_class.data)
                return(Response(serializer_class.data, status=200))


class ValidateView(views.APIView):
    queryset = User.objects.all()

    @classmethod
    def get_extra_actions(cls):
        return([])

    def get(self, request):
        queryset = User.objects.all()
        serializer_class = LoginSerializer(queryset, many=True)
        return Response(serializer_class.data, status=201)

    def post(self, request):
        # print(request.META)
        # username = request.META.get('USERNAME', None)
        username = request.user
        print(username)
        if username is not None:
            try:
                user: User = User.objects.get(username=username)
                print("=================", user, "===================")
            except User.DoesNotExist:
                return Response({'detail': f'{username} is not registered, Kindly register.'}, status=404)

            token: Token = Token.objects.get_or_create(user=user)[0]

            import subprocess
            response: str = subprocess.run(
                ["net", "user", "/domain", username], stdout=subprocess.PIPE).stdout.decode('utf-8')

            if response.__contains__('Account active               Yes'):
                serializer = TokenSerializer(token)
                print(serializer.data)

                return Response(serializer.data)
            elif response.__contains__('Account active               No'):
                return Response({'detail': 'User not found in Active directory'}, status=404)
            else:
                return Response({'detail': 'User not found in Active directory'}, status=404)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication, )

    def post(self, request):
        try:
            django_logout(request)
        except Exception as exception:
            return(Response(False, status=401))
        else:
            return(Response(True, status=200))
