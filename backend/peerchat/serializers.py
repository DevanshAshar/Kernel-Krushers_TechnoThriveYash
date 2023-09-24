from rest_framework import serializers
from .email import user_send_mail,send_therapist_email
from model.sentiment_analysis import sentiment_analysis
from user.models import User
from .models import *
import string
import random

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class StressedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StressedUser
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['username'] = instance.user.username
        data['email'] = instance.user.email
        return data
        
    
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
        if user.stress_count >=10:
            user_send_mail(user.username,user.email)
            stressuser = StressedUser.objects.filter(user=user).first()
            csv_url = send_therapist_email('scarlettwitch031@gmail.com',user.username,user.email)
            if StressedUser:
                code = ''.join(random.choice(string.digits) for _ in range(6))
                print(code)
                new_stressuser = StressedUser(user=user, connect_code=code, prompt_csv=csv_url)
                new_stressuser.save()
            else:
                stressuser.prompt_csv = csv_url
                stressuser.save()
                
            
        validated_data['user'] = self.context.get('request').user
        validated_data['is_stressed'] = 1 if response >= 50 else 0
        return super().create(validated_data)
