from rest_framework import serializers

from .models import *

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        
class ChatResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatResponse
        fields = ['prompt','response']
        
    def create(self, validated_data):
        validated_data['user'] = self.context.get('request').user
        return super().create(validated_data)
