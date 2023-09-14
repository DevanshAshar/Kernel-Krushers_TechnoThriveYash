import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import intents from '../intents.json';
import Layout from '../Layout/Layout';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

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
  const [transcribedMessage, setTranscribedMessage] = useState('');
  const messageInputRef = useRef(null);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setTranscribedMessage(transcript);
    }
  }, [transcript]);
  const sendToServer = async (message) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/room/chatresponse/`, {
        prompt:message
      });

      if (response.status === 201) {
        console.log('Message sent to the server successfully:', message);
      } else {
        console.error('Failed to send message to the server.');
      }
    } catch (error) {
      console.error('Error sending message to the server:', error);
    }
  };
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    await sendToServer(message);
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
        for (const intent of intents.intents) {
          console.log("intent 1") // Change 'in' to 'of' for iterating over intents
          console.log(intent)
          const patterns = intent.patterns;
          const tag = intent.tag;
          if ((patterns.includes(lastUserMessage.message) || tag.includes(lastUserMessage.message))) {
            detectedIntent = intent;
            console.log("hello_intent")
            break;
          }
        }
      }
    
      // Use the detected intent to generate a response
      let chatGPTResponse = "I'm not sure how to respond to that.";
      if (detectedIntent) {
        const responses = detectedIntent.responses;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]; // Choose a random response
        chatGPTResponse = randomResponse;
        console.log("hello_random")
      } 
      else {
        console.log("hello_api")
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

  const handleMicClick = () => {
    if (!isTyping) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const handleTranscribedMessageSubmit = () => {
    if (transcribedMessage) {
      handleSend(transcribedMessage);
      resetTranscript(); // Reset the transcript after sending
      setTranscribedMessage('');
    }
  };

  return (
    <Layout>
  <div className="App">
    <div style={{ height: "650px", width: "1350px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <MainContainer style={{ flex: "1", overflowY: "scroll" }}>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="Typing..." /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />
            })}
          </MessageList>
        </ChatContainer>
      </MainContainer>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <input
          placeholder="Type message here"
          value={transcribedMessage}
          onChange={(e) => setTranscribedMessage(e.target.value)}
          style={{ flex: "1", marginRight: "10px", padding: "5px" }}
          ref={messageInputRef}
        />
        <button className="mic-button btn btn-primary" onClick={handleMicClick}>
          <MicIcon/>
        </button>
        <button className="send-button btn btn-success" onClick={handleTranscribedMessageSubmit}>
          <SendIcon/>
        </button>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default ChatPg;
