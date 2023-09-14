import pickle
from sentiment_analysis import predict_sentiment

# Load the model and tokenizer from the pickle file
with open('backend/model/sentiment_analysis_model.pkl', 'rb') as f:
    model, tokenizer = pickle.load(f)

# Predict the sentiment of a text
text = 'happy'
response = predict_sentiment(text)
print(response)