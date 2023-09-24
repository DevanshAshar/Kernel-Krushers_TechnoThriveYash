import pickle

# Load the pickled classifier object
with open('model/class.pkl', 'rb') as f:
    classifier = pickle.load(f)

# Load the pickled predictions if needed
with open('model/predictions.pkl', 'rb') as f:
    predictions = pickle.load(f)

text = "Poll pact need of hour to defeat YSRC: Jana Sena on alliance with TDP"
def sentiment_analysis(text):
    json = {}
    l = []
    # Define your new input data
    text_piece = text
    labels = ["Positive", "Negative", "Neutral"]

    # Perform zero-shot classification using the loaded classifier
    new_predictions = classifier(text_piece, labels, multi_label=False)

    # Print the predictions for the new input data
    for i,n in enumerate(new_predictions['labels']):
        json[n] = new_predictions['scores'][i]*100
    print(json['Negative'])
    max_key = max(json, key=lambda k: json[k])
    return json['Negative']

# print(sentiment_analysis(text))


# Bert model 
# import torch
# import pickle
# from transformers import BertTokenizer, BertForSequenceClassification

# # Load pre-trained BERT model and tokenizer
# model1 = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
# tokenizer1 = BertTokenizer.from_pretrained('bert-base-uncased')


# # Save the model and tokenizer to a pickle file
# with open('backend/model/sentiment_analysis_model.pkl', 'wb') as f:
#     pickle.dump({
#         'model': model1,
#         'tokenizer': tokenizer1
#     }, f)
# # Define a function for predicting sentiment of text


# def predict_sentiment(text):
#     # Tokenize text and convert to input ids and attention mask
#     inputs = tokenizer1(text, return_tensors='pt')
#     input_ids = inputs['input_ids']
#     attention_mask = inputs['attention_mask']
    
#     # Predict sentiment using BERT model
#     with torch.no_grad():
#         logits = model1(input_ids, attention_mask=attention_mask)[0]
#     print(logits)
#     probs = torch.softmax(logits, dim=1).tolist()[0]
#     print(probs)
#     # Determine sentiment label based on highest probability
#     sentiment = 'Negative' if probs[0] > probs[1] else 'Positive'
#     # print(sentiment)
#     return sentiment

