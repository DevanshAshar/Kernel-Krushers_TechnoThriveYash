import torch
import pickle
from transformers import BertTokenizer, BertForSequenceClassification

# Load pre-trained BERT model and tokenizer
model1 = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
tokenizer1 = BertTokenizer.from_pretrained('bert-base-uncased')


# Save the model and tokenizer to a pickle file
with open('model/sentiment_analysis_model.pkl', 'wb') as f:
    pickle.dump({
        'model': model1,
        'tokenizer': tokenizer1
    }, f)
# Define a function for predicting sentiment of text


def predict_sentiment(text):
    # Tokenize text and convert to input ids and attention mask
    inputs = tokenizer1(text, return_tensors='pt')
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']
    
    # Predict sentiment using BERT model
    with torch.no_grad():
        logits = model1(input_ids, attention_mask=attention_mask)[0]
    probs = torch.softmax(logits, dim=1).tolist()[0]
    
    # Determine sentiment label based on highest probability
    sentiment = 'Negative' if probs[1] > probs[0] else 'Positive'
    # print(sentiment)
    return sentiment

