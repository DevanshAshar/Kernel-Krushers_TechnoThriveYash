from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer
from rest_framework import status
# Create your views here.

class GetRoomAPI(generics.GenericAPIView,ListModelMixin):
    queryset  = Room.objects.all()
    serializer_class = RoomSerializer
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)