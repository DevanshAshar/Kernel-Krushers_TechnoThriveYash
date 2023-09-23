import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import intents from '../intents.json';
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
      message: "Hello, I'm MindfulMate. Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [translatedPrompt, setTranslatedPrompt] = useState("");
  const [translatedResponse, setTranslatedResponse] = useState(""); // State to store translated response
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognitionActive, setRecognitionActive] = useState(false); // State to track microphone state
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [gptResp, setGptResp] = useState(null);
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
      setListening(true);
      setRecognitionActive(true);
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setListening(false);
      setRecognitionActive(false);
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setListening(false);
      setRecognitionActive(false);
    };

    recognition.start();
    setMicActive(true);
  };

  useEffect(() => {
    if (!("SpeechRecognition" in window) && !("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleSend = async (message) => {
    console.log('send clicked');
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTranscript(""); 

    // Start displaying "MindfulMate is Typing..."
    setIsTyping(true);

    try {
      const t = await axios.post(`http://localhost:5000/convert`, {
        text: message,
        from: selectedLanguage,
        to: 'en'
      });
      await setTranslatedPrompt(t.data.translated);
      
    } catch (error) {
      console.log(error.message)
      toast.error('Something went wrong');
    }

    // Translation is complete, stop displaying "MindfulMate is Typing..."
    //setIsTyping(false);
    setMicActive(false);
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
  async function processMessageToChatGPT(chatMessages) {
    const lastUserMessage = chatMessages;
    if (lastUserMessage) {
      // Determine intent based on user message
      let detectedIntent = null;
      if (intents) {
        for (const intent of intents.intents) {
          const patterns = intent.patterns;
          const tag = intent.tag;
          if (patterns.includes(lastUserMessage) || lastUserMessage.includes(tag)) {
            detectedIntent = intent;
            break;
          }
        }
      }

      // Use the detected intent to generate a response
      let chatGPTResponse = "I'm not sure how to respond to that.";
      if (detectedIntent) {
        const responses = detectedIntent.responses;
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)]; // Choose a random response
        chatGPTResponse = randomResponse;
      } else {
        console.log("hello_api");
        const apiRequestBody = {
          model: "gpt-3.5-turbo",
          messages: [systemMessage, { role: 'user', content: lastUserMessage }],
        };

        try {
          const apiResponse = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(apiRequestBody),
            }
          );

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

      // Translate the ChatGPT response to the selected language
      try {
        const t = await axios.post(`http://localhost:5000/convert`, {
          text: chatGPTResponse,
          from: 'en',
          to: selectedLanguage,
        });

        // Set translated response and update messages only after convert API returns
        setTranslatedResponse(t.data.translated);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: t.data.translated, // Display the translated response
            sender: "ChatGPT",
          },
        ]);
      } catch (error) {
        console.log(error.message);
        toast.error('Something went wrong');
      }
    }

    setIsTyping(false);
  }

  useEffect(() => {
    if (translatedPrompt) {
      console.log(translatedPrompt); 
      processMessageToChatGPT(translatedPrompt);
    }
  }, [translatedPrompt]);

  return (
    <Layout>
      <div className="App">
        <div
          style={{
            height: "650px",
            width: "1350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <MainContainer style={{ flex: "1", overflowY: "scroll" }}>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="MindfulMate is Typing..." />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
            </ChatContainer>
          </MainContainer>
          <div
            style={{ display: "flex", alignItems: "center", padding: "10px" }}
          >
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
              <option value="tu">తెలుగు</option>
              <option value="ur">تیلگو</option>
            </select>
            <input
              placeholder="Message"
              readOnly
              value={transcript}
              style={{ flex: "1", marginRight: "10px", padding: "5px" }}
            />
            <button
              className={`mic-button btn btn-primary ${recognitionActive ? "active" : ""}`}
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
