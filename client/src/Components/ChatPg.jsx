import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Layout from '../Layout/Layout';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const API_KEY = process.env.REACT_APP_API_KEY;

const systemMessage = {
  role: 'system',
  content: "Explain things like you're a mental health professional."
};

const ChatPg = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm MindfulMate. I'm here to listen. Tell me what's on your mind.",
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
        prompt: message
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

  const processMessageToChatGPT = async (chatMessages) => {
    const lastUserMessage = chatMessages
      .filter((messageObject) => messageObject.sender === "user")
      .pop();
    const {data}=await axios.post('http://localhost:5000/chatbot',{query:lastUserMessage.message})
    setMessages([...chatMessages, {
      message: data.response,
      sender: "ChatGPT"
    }])
    setIsTyping(false);
  };

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
        <MainContainer style={{ height: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="MindfulMate is Typing..." /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
          </ChatContainer>
        </MainContainer>
        <div className="input-container" style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
          <input
            placeholder="Type message here"
            value={transcribedMessage}
            onChange={(e) => setTranscribedMessage(e.target.value)}
            className="message-input"
            style={{ flex: '1', marginRight: '10px', padding: '5px', width: 'calc(70vw - 60px)' }}
            ref={messageInputRef}
          />
          <button className="mic-button btn btn-primary" onClick={handleMicClick}>
            <MicIcon />
          </button>
          <button className="send-button btn btn-success" onClick={handleTranscribedMessageSubmit}>
            <SendIcon />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPg;
