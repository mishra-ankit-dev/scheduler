from django.http import HttpResponseRedirect
from django.utils.encoding import force_text, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.sites.shortcuts import get_current_site
from django.views.decorators.csrf import csrf_exempt

from .serializers import ActivationSerializer, RegisterSerializer, LoginSerializer, TokenSerializer

from rest_framework.response import Response
from ..users.models import User
from rest_framework.authtoken.models import Token
from rest_framework import views, permissions, authentication


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

    # @csrf_exempt
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
                django_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                # print("Serializer Data", serializer_class.data)
                return(Response(serializer_class.data, status=200))


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


class ValidateView(views.APIView):

    @csrf_exempt
    def post(self, request):
        user: User = authenticate(request=request, remote_user=request.META.get('REMOTE_USER', None))

        if user is None:
            return Response({'detail': 'User name not passed in request. Falling back to Custom Auth.'}, status=400)

        try:
            token: Token = Token.objects.get(user=user)
        except Token.DoesNotExist:
            token: Token = Token.objects.create(user=user)

        import subprocess
        command = ["net", "user", "/domain", user.username]
        response: str = subprocess.run(
            command, stdout=subprocess.PIPE).stdout.decode('utf-8')

        if response.__contains__('Account active               Yes'):
            django_login(request, user, backend='features.authentication.remote_auth.WindowsAuthenticationBackend')
            serializer = TokenSerializer(token)
            return Response(serializer.data)

        elif response.__contains__('Account active               No'):
            return Response({'detail': 'User account is locked or inactive'}, status=404)
        else:
            return Response({'detail': 'User not found in Active directory', 'META': response}, status=404)

    # @csrf_exempt
    # def post(self, request):
    #     username = request.META.get('REMOTE_USER', None)
    #     if username is not None and username:
    #         user_splitted = username.split("\\")
    #         if len(user_splitted) > 1:
    #             username = user_splitted[1]

    #         try:                
    #             user: User = User.objects.get(username=username)
    #         except User.DoesNotExist:
    #             return Response({'detail': f'{username} is not registered. Kindly register.', 'META': request.META}, status=404)

    #         try:
    #             token: Token = Token.objects.get_or_create(user=user)[0]
    #         except:
    #             return Response({'detail': f'Token for {username} is not found. Kindly register.', 'user': user, 'META': request.META}, status=404)

    #         import subprocess
    #         command = ["net", "user", "/domain", username]
    #         response: str = subprocess.run(
    #             command, stdout=subprocess.PIPE).stdout.decode('utf-8')

    #         if response.__contains__('Account active               Yes'):
    #             django_login(request, user)
    #             serializer = TokenSerializer(token)
    #             return Response(serializer.data)
    #             # return Response({**serializer.data, **request.META})

    #         elif response.__contains__('Account active               No'):
    #             return Response({'detail': 'User account is locked or inactive'}, status=404)
    #         else:
    #             return Response({'detail': 'User not found in Active directory', 'META': response}, status=404)
    #     return Response({'detail': 'User name not passed in request. Falling back to Custom Auth.', 'META': request.META}, status=400)
    #     # return Response(request.META, status=400)
