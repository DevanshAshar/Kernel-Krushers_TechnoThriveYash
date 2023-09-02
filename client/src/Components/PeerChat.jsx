import React, { useEffect, useState } from "react";
import generateUniqueCode from "../utils/GenerateUniqueCode";

const PeerChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState(null);


  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", () => {
        console.log("ws opened");
      });

      ws.addEventListener("message", (event) => {
        console.log("message");
        const message = JSON.parse(event.data);
        setMessages([...messages, message.message]);
      });

      ws.addEventListener("close", () => {
        console.log("ws closes");
      });

      ws.addEventListener("error", (event) => {
        console.log(event);
        console.log("Error Occurred");
      });
    }
  }, [ws]);

  const handlesubmit = () => {
    const backendurl = "127.0.0.1:8000/";
    const pathname = "chat/";
    const loc = window.location;
    const wsStart = loc.protocol === "https:" ? "wss://" : "ws://";
    const lobby_name = generateUniqueCode();
    const endpoint = `${wsStart}${backendurl}ws/message/${lobby_name}/`;
    console.log(endpoint);
    const webSocket = new WebSocket(endpoint);
    setWs(webSocket);
  };
  return (
    <div className="peerchat">
        <button type="submit" onClick={handlesubmit}>join</button>
    </div>
  )
};

export default PeerChat;
