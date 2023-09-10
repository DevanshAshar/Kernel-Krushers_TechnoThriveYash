import React, { useEffect, useState } from 'react';
import '../App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import intents from '../intents.json';
import Layout from '../Layout/Layout';

const API_KEY = "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";

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're a mental health professional."
};

const ChatPg = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // Extract the last user message to determine intent
    const lastUserMessage = chatMessages
      .filter((messageObject) => messageObject.sender === "user")
      .pop();
  
    // Check if there is a user message
    if (lastUserMessage) {
      // Determine intent based on user message
      let detectedIntent = null;
      if (intents) {
        for (const intent in intents) {
          const examples = intents[intent].examples;
          if (examples && Array.isArray(examples) && examples.includes(lastUserMessage.message)) {
            detectedIntent = intent;
            break;
          }
        }
      }
  
      // Use the detected intent to generate a response
      let chatGPTResponse = "I'm not sure how to respond to that.";
      if (detectedIntent) {
        chatGPTResponse = intents[detectedIntent].response;
      } else {
        // If no intent is detected, send the message to the API
        const apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message }
        });
  
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,
            ...apiMessages
          ]
        };
  
        try {
          const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + API_KEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
          });
  
          if (apiResponse.ok) {
            const responseData = await apiResponse.json();
            if (responseData.choices && responseData.choices.length > 0) {
              chatGPTResponse = responseData.choices[0].message.content;
            }
          } else {
            console.error("API request failed:", apiResponse.statusText);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
  
      setMessages([...chatMessages, {
        message: chatGPTResponse,
        sender: "ChatGPT"
      }]);
    }
  
    setIsTyping(false);
  }
  

  return (
    <Layout>
    <div className="App">
      <div style={{ height: "650px", width: "1350px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
    </Layout>
  );
};

export default ChatPg;
