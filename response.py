import openai
import json
import random

# Load the intents from the JSON file
def load_intents(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# OpenAI GPT-3 API key
api_key = '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'  # Replace with your actual API key

# Function to get a response based on the user's input
def get_response(user_input, intents):
    # Check if the user's input matches any intent pattern
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            if pattern.lower() in user_input.lower():
                return random.choice(intent['responses'])
    
    # If no matching intent is found, use OpenAI GPT-3.5 for a response
    prompt = f"You: {user_input}\nChatbot:"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=50,  # Adjust the token limit as needed
        api_key=api_key
    )
    return response.choices[0].text.strip()

# Function to run the chatbo

intents = load_intents('intents.json')

print("Chatbot: Hello! How can I help you today?")
while True:
    user_input = input("You: ")
    if user_input.lower() in ['bye', 'goodbye']:
        print("Chatbot: Goodbye! Take care.")
        break

    response = get_response(user_input, intents)
    print("Chatbot:", response)    



