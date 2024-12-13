from django.shortcuts import render
from .models import User, Profile, PaperDetailAddress
from .serializer import RegisterSerializer, UserTokenObtainPairSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.response import Response


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


#method to test the auth tokens
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def dashboardView_testEndPoint(request):
    if request.method == 'GET':
        response = f"Congratulation {request.user}, your API just responded to GET request. your name is {request.user.profile.full_name}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get("text")
        response = f"Hello {request.user}, your text is {text}"
        return Response({'response': response}, status=status.HTTP_201_CREATED)

    return Response({}, status= status.HTTP_400_BAD_REQUEST)