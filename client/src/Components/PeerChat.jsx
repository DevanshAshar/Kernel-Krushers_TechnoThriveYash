import React, { useEffect, useState } from "react";
import generateUniqueCode from "../utils/GenerateUniqueCode";
import axios from "axios";

const PeerChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [roomList, SetRoomList] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState('');

  const getRoomList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/room/roomlist/`
      );
      SetRoomList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoomList();
  }, []);

  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", () => {
        console.log("ws opened");
      });

      ws.addEventListener("message", (event) => {
        console.log("message");
        const message = JSON.parse(event.data);
        console.log(message)
        setMessages((prevMessages) => [...prevMessages, message.message]);
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

  const handlesubmit = (room_id) => {
    const backendurl = "127.0.0.1:8000/";
    const pathname = "chat/";
    const loc = window.location;
    const wsStart = loc.protocol === "https:" ? "wss://" : "ws://";
    const lobby_name = generateUniqueCode();
    const endpoint = `${wsStart}${backendurl}ws/message/${room_id}/`;
    console.log(endpoint);
    const webSocket = new WebSocket(endpoint);
    setWs(webSocket);
  };

  const handleSendMessage = (message) => {
    // const newMessArray = [...messages,message]
    // setMessages(newMessArray);
    if (ws) {
      console.log(messages);
      const jsonStr = JSON.stringify({
        message: message,
      });

      ws.send(jsonStr);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(newMessage);
    }
  };

  return (
    <div className="peerchat">
      <div className="message-list">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            {message}
          </div>
        ))}
      </div>
      {ws ? (
        <>
          <input
            autoFocus
            required
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" onClick={() => handleSendMessage(newMessage)}>
            send
          </button>
        </>
      ) : (
        <>
          <div>
            <h1>Room List</h1>
            {roomList.map((room) => (
              <>
                <h2>{room.room_id}</h2>
                <button type="submit" onClick={()=>handlesubmit(room.room_id)}>
                  Join
                </button>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PeerChat;
