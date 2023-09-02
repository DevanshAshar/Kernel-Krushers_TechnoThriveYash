// import { useState } from 'react'
// import './App.css'
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

// const API_KEY = "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";

// const systemMessage = {
//   "role": "system",
//   "content": "Explain things like you're talking to a software professional with 2 years of experience."
// }

// function App() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT"
//     }
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];
    
//     setMessages(newMessages);

//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant";
//       } else {
//         role = "user";
//       }
//       return { role: role, content: messageObject.message }
//     });

//     const apiRequestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         systemMessage,
//         ...apiMessages
//       ]
//     }

//     try {
//       const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Authorization": "Bearer " + API_KEY,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(apiRequestBody)
//       });

//       if (apiResponse.ok) {
//         const responseData = await apiResponse.json();
//         if (responseData.choices && responseData.choices.length > 0) {
//           const chatGPTResponse = responseData.choices[0].message.content;
//           setMessages([...chatMessages, {
//             message: chatGPTResponse,
//             sender: "ChatGPT"
//           }]);
//         }
//       } else {
//         console.error("API request failed:", apiResponse.statusText);
//       }

//       setIsTyping(false);
//     } catch (error) {
//       console.error("Error processing message:", error);
//     }
//   }

//   return (
//     <div className="App">
//       <div style={{height: "650px", width: "1350px" }}>
//         <MainContainer>
//           <ChatContainer>       
//             <MessageList 
//               scrollBehavior="smooth" 
//               typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
//             >
//               {messages.map((message, i) => {
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />        
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   )
// }

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPg from "./Components/ChatPg";
import BreathingCircle from "./breathing/BreathingCircle";
import TestPg from "./Components/TestPg";
import PeerChat from "./Components/PeerChat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TestPg />} />
      <Route path="/chatPg" element={<ChatPg />} />
      <Route path="/breathingGame" element={<BreathingCircle />} />
      <Route path='/peerchat' element={<PeerChat/>}/>
    </Routes>
  );
}

export default App;

