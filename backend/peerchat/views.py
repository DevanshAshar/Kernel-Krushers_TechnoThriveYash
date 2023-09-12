from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework import generics
from .models import Room, ChatResponse
from .serializers import RoomSerializer, ChatResponseSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
import csv

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
    
    def get(self, request):
        # Retrieve data from the database
        queryset = ChatResponse.objects.all()
        serializer = ChatResponseSerializer(queryset, many=True)
        
        # Create a CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="{request.user}.csv"'
        
        # Create a CSV writer and write data to the response
        writer = csv.writer(response)
        writer.writerow(['prompt', 'response','user'])  # CSV header row
        for item in serializer.data:
            writer.writerow([item['prompt'], item['response'], request.user])  # Add more fields as needed
        
        return response

    
    def post(self, request):
        # Assuming you want to update the CSV file with new data from the request
        data = request.data
        
        # Your code to process and validate the data
        
        # Write the updated data to the CSV file
        with open('yourdata.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['prompt', 'response'])  # CSV header row
            for row in data:
                writer.writerow([row['prompt'], row['response']])  # Add more fields as needed
        
        return Response({'message': 'CSV file updated successfully'})
    