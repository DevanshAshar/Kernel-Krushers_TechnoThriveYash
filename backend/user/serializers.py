from rest_framework import serializers
from .models import User,FormSubmitByUser
from .stresscsv import create_csv
from peerchat.models import StressedUser
import string
import random

class StressFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmitByUser
        fields='__all__'
        
    def create(self, validated_data):
        user = User.objects.get(id=self.context.get('request').user.id)
        answer_array = validated_data['answer_array']
        csv_url = create_csv(user.username,answer_array)
        stressuser = StressedUser.objects.filter(user=user).first()
        if stressuser:
            stressuser.form_csv = csv_url
            stressuser.save()       
                
        return super().create(validated_data)
    