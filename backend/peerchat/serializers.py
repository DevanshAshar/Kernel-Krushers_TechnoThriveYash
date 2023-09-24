from rest_framework import serializers
from .email import user_send_mail,send_therapist_email
from model.sentiment_analysis import sentiment_analysis
from user.models import User
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
        user = User.objects.get(id=self.context.get('request').user.id)
        text = validated_data['prompt']
        response = sentiment_analysis(text)
        if response >= 50:
            user.stress_count += 1
            user.save()
        if user.stress_count >=5:
            user_send_mail(user.username,user.email)
            send_therapist_email('scarlettwitch031@gmail.com',user.username,user.email)
        validated_data['user'] = self.context.get('request').user
        validated_data['is_stressed'] = 1 if response >= 50 else 0
        return super().create(validated_data)
