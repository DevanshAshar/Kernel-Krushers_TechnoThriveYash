from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework import generics
from .models import Room, ChatResponse
from .serializers import RoomSerializer, ChatResponseSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class GetRoomAPI(generics.GenericAPIView,ListModelMixin):
    queryset  = Room.objects.all()
    serializer_class = RoomSerializer
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
class ChatAPI(generics.GenericAPIView,CreateModelMixin,ListModelMixin):
    queryset = ChatResponse.objects.all()
    serializer_class = ChatResponseSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    