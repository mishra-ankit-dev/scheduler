from django.http import Http404

# All rest framework imports
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import authentication, permissions, status, views, viewsets

from .models import User, Profile
from .serializers import UserSerializer, PasswordSerializer, ProfileSerializer


class UserDetailsView(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class ProfileView(views.APIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        serializer = None
        if (pk is None):
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        else:
            profile = Profile.objects.filter(pk=pk).first()
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        try:
            user = User.objects.get(pk=request.data['user'])
            user_profile = Profile.objects.get(user=user)
            serializer_class = ProfileSerializer(
                user_profile, data=request.data, partial=True)
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()
            return(Response(serializer_class.data))

        except Exception as exception:
            return(Response(serializer_class.errors))
