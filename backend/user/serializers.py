from rest_framework import serializers
from .models import User,FormSubmitByUser
from .stresscsv import create_csv
from peerchat.models import StressedUser
import string
import random

class StressFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmitByUser
        fields = ['answer_array']
        
    def create(self, validated_data):
        user = User.objects.get(id=self.context.get('request').user.id)
        print(user)
        answer_array = validated_data['answer_array']
        validated_data['user'] = user
        csv_url = create_csv(user.username,eval(answer_array))
        formuser = FormSubmitByUser.objects.filter(user=user).first()
        stressuser = StressedUser.objects.filter(user=user).first()
        if stressuser:
            print(csv_url)
            stressuser.form_csv = csv_url
            stressuser.save()       
        if formuser:
            return "user created already"
        else:        
            return super().create(validated_data)
    