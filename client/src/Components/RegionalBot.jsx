import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import intents from "../intents.json";
import axios from "axios";
import toast from "react-hot-toast";
const API_KEY = process.env.REACT_APP_API_KEY;

const systemMessage = {
  role: "system",
  content: "Explain things like you're a mental health professional.",
};

const RegionalBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "नमस्ते, मैं माइंडफुलमेट हूं, मुझे बताएं कि आपके मन में क्या है",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [translatedPrompt, setTranslatedPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translatedResponse, setTranslatedResponse] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [micActive, setMicActive] = useState(false);
  let recognition = null;

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const startListening = () => {
    if (recognition) {
      recognition.stop();
    }

    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setMicActive(true);
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setMicActive(false);
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setMicActive(false);
    };

    recognition.start();
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction:'outgoing',
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setTranscript(""); 

    setIsTyping(true);

    try {
      const t = await axios.post(`http://localhost:5000/convert`, {
        text: message,
        from: selectedLanguage,
        to: "en",
      });
      await setTranslatedPrompt(t.data.translated);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  const sendToServer=async()=>{
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/room/chatresponse/`, {
        prompt:translatedPrompt
      });

      if (response.status === 201) {
        console.log('Message sent to the server successfully');
      } else {
        console.error('Failed to send message to the server.');
      }
    } catch (error) {
      // toast.error('something went wrong')
      console.log(error.message)
    }
  }
  useEffect(()=>{
    sendToServer()
  },[translatedPrompt])
  useEffect(() => {
    if (translatedPrompt) {
      processMessageToChatGPT(translatedPrompt);
    }
  }, [translatedPrompt]);

  async function processMessageToChatGPT(userMessage) {
    const {data}=await axios.post('http://localhost:5000/chatbot',{query:userMessage})
    const t = await axios.post(`http://localhost:5000/convert`, {
          text: data.response,
          from: 'en',
          to: selectedLanguage,
        });
        setTranslatedResponse(t.data.translated);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: t.data.translated, // Display the translated response
            sender: "ChatGPT",
          },
        ]);
    setIsTyping(false);
  }

  return (
    <Layout>
      <div className="App">
        <div className="chat-container">
          <MainContainer style={{ height: "650px", overflowY: "scroll" }}>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? <TypingIndicator content="MindfulMate is Typing..." /> : null
                }
              >
                {messages.map((message, i) => (
                  <Message key={i} model={message} />
                ))}
              </MessageList>
            </ChatContainer>
          </MainContainer>
          <div className="input-container">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{ marginRight: "10px" }}
            >
              <option value="hi">हिंदी</option>
              <option value="gu">ગુજરાતી</option>
              <option value="ml">മലയാളം</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="ur">اردو</option>
            </select>
            <input
              placeholder="Type message here"
              readOnly
              value={transcript}
              className="message-input"
              style={{ flex: "1", marginRight: "10px", padding: "5px" ,width:'70vw'}}
            />
            <button
              className={`mic-button btn btn-primary ${micActive ? "active" : ""}`}
              onClick={startListening}
            >
              <MicIcon />
            </button>
            <button
              className="send-button btn btn-success"
              onClick={() => handleSend(transcript)}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegionalBot;
