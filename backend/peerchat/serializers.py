from rest_framework import serializers

from .sentiment_analysis import predict_sentiment

from .models import *
import pickle

# Load the model and tokenizer from the pickle file

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class ChatResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatResponse
        fields = ['prompt','response']
        
    def create(self, validated_data):
        with open('model/sentiment_analysis_model.pkl', 'rb') as f:
            model, tokenizer = pickle.load(f)
            # Predict the sentiment of a text
        text = validated_data['prompt']
        response = predict_sentiment(text)
        print(response)
        validated_data['user'] = self.context.get('request').user
        validated_data['is_stressed'] = 1 if response=='Negative' else 0
        return super().create(validated_data)
