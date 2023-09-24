from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework import generics
from .models import Room, ChatResponse, StressedUser
from .serializers import RoomSerializer, ChatResponseSerializer, StressedUserSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpResponse
from rest_framework import status
from datetime import datetime
import csv
import uuid
import os
import cloudinary
import cloudinary.uploader
from decouple import config

cloudinary.config( 
  cloud_name = config('CLOUD_NAME'), 
  api_key = config('API_KEY'), 
  api_secret = config('API_SECRET') 
)

# Create your views here.

class GetRoomAPI(generics.GenericAPIView,ListModelMixin):
    queryset  = Room.objects.all()
    serializer_class = RoomSerializer
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
class StressUserView(generics.GenericAPIView,ListModelMixin):
    permission_classes = [IsAdminUser]
    queryset  = StressedUser.objects.all()
    serializer_class = StressedUserSerializer
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
    
class ChatCSV(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            # Retrieve data from the database
            queryset = ChatResponse.objects.filter(user= request.user)
            serializer = ChatResponseSerializer(queryset, many=True)
            data = serializer.data
            for i in queryset:
                print(i.response)
            print(queryset[0].response)
            filename = f"data_{request.user}.csv"
            file_path = os.path.join("csv_files", filename).replace("\\", "/")
            file_exists = os.path.isfile(file_path)
            current_timestamp = datetime.now().strftime('%Y-%m-%d')
            # Create and write data to the CSV file
            with open(file_path, mode='w', newline='') as csv_file:
                writer = csv.writer(csv_file)
                if not file_exists:
                    writer.writerow(["Timestamp","user","prompt","response"])
                for row in queryset:
                    writer.writerow([current_timestamp,request.user,row.prompt,row.response])

            upload_result = cloudinary.uploader.upload(
                file_path, 
                resource_type="raw", 
                public_id=file_path,  # Set the custom filename
                overwrite=True  # Overwriting the file if it exists
            )
            csv_url = upload_result['secure_url']
            print(csv_url,type(csv_url))
            return Response({'csv_url': csv_url}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message":'exception',"exception":str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        

    


    