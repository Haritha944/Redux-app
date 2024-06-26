from django.shortcuts import render
from .serializers import UserSerializer,myTokenObtainPairSerailizer
from .models import UserAccount
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.filters import SearchFilter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = myTokenObtainPairSerailizer

class UserRegister(CreateAPIView):
    serializer_class = UserSerializer
class UserList(ListCreateAPIView):
    queryset = UserAccount.objects.all().exclude(is_superuser=True)
    serializer_class=UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['email','first_name']

class UserDetails(RetrieveUpdateDestroyAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    print("-------view-------")
    def get_object(self):
        user_id = self.kwargs.get('id')
        user = get_object_or_404(UserAccount,id=user_id)
        print("-------",user)
        return user
    def perform_update(self, serializer):
        serializer.save()

