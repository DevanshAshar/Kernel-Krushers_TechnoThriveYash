from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework import generics
from .models import Room, ChatResponse
from .serializers import RoomSerializer, ChatResponseSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from rest_framework import status
from datetime import datetime
import csv
import uuid
import os
import cloudinary
import cloudinary.uploader


cloudinary.config( 
  cloud_name = "dztwsdfiz", 
  api_key = "996593567246431", 
  api_secret = "aLCza1AhLq3ppqkRRD_bb8poX7w" 
)

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
    
class ChatCSV(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            # Retrieve data from the database
            queryset = ChatResponse.objects.all()
            serializer = ChatResponseSerializer(queryset, many=True)
            data = serializer.data
            filename = f"data_{request.user}.csv"
            file_path = os.path.join("csv_files", filename).replace("\\", "/")
            file_exists = os.path.isfile(file_path)
            current_timestamp = datetime.now().strftime('%Y-%m-%d')
            # Create and write data to the CSV file
            with open(file_path, mode='a', newline='') as csv_file:
                writer = csv.writer(csv_file)
                if not file_exists:
                    writer.writerow(["Timestamp","user","prompt","response"])  # Write header only if the file is newly created
                for row in data:
                    writer.writerow([current_timestamp,request.user,row['prompt'],row['response']])

            upload_result = cloudinary.uploader.upload(
                file_path, 
                resource_type="raw", 
                public_id=file_path,  # Set the custom filename
                overwrite=True  # Overwrite if a file with the same name exists
            )
            # Send the URL of the CSV file to the admin user
            admin_email = "admin@example.com"  # Replace with the admin's email
            csv_url = upload_result['secure_url']
            return Response({'csv_url': csv_url}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message":'exception',"exception":str(e)}, status=status.HTTP_501_NOT_IMPLEMENTED)
        

    


    