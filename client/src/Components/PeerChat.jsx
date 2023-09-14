import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import generateUniqueCode from "../utils/GenerateUniqueCode";
import axios from "axios";
import Layout from "../Layout/Layout.jsx";
import "../css/peerchat.css";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import toast from "react-hot-toast";
const PeerChat = () => {
  const navigate = useNavigate();
  function generateUserId(length) {
    const characters = "0123456789";
    let userId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      userId += characters.charAt(randomIndex);
    }
    return `User${userId}`;
  }

  const [messages, setMessages] = useState([]);
  const [err, setErr] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [roomList, SetRoomList] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]); // State to track online users

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

  const updateUserList = () => {
    // Function to update the list of online users
    const userList = messages
      .filter((message) => message[1] === "received")
      .map((message) => message[2]);
    console.log(userList);
    setOnlineUsers(Array.from(new Set(userList))); // Remove duplicates and set online users
  };

  useEffect(() => {
    getRoomList();
  }, []);

  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", () => {
        console.log("ws opened");
        setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, username]);
      });

      ws.addEventListener("message", (event) => {
        handleSendWS(event);
      });

      ws.addEventListener("close", () => {
        console.log("ws closes");
        const updatedOnlineUsers = onlineUsers.filter(
          (user) => user !== username
        );
        setOnlineUsers(updatedOnlineUsers); // Update user list when a user disconnects
        window.location.reload();
      });

      ws.addEventListener("error", (event) => {
        console.log(event);
        console.log("Error Occurred");
      });
    }
  }, [ws]);

  const handleSendWS = (event) => {
    const message = JSON.parse(event.data);
    console.log(message.status);
    if (message.status === 400 || message.status === 404) {
      setErr(message.message);
    }
    const mess_ws =
      message.username === username
        ? [message.message, "sent"]
        : [message.message, "received", message.username];
    setMessages((prevMessages) => [...prevMessages, mess_ws]);

    // Update user list when a new message is received
  };

  const handlesubmit = (room_id) => {
    const backendurl = "127.0.0.1:8000/";
    const pathname = "chat/";
    const loc = window.location;
    const wsStart = loc.protocol === "https:" ? "wss://" : "ws://";
    const lobby_name = generateUniqueCode();
    const endpoint = `${wsStart}${backendurl}ws/message/${room_id}/`;
    console.log(endpoint);
    const webSocket = new WebSocket(endpoint);
    const userIdentifier = generateUserId(3);
    console.log(userIdentifier);
    setUsername(userIdentifier);

    setWs(webSocket);
  };

  const handleSendMessage = (message) => {
    if (ws) {
      console.log(messages);
      const jsonStr = JSON.stringify({
        message: message,
        sentByUser: true,
        username: username,
        onlineusers: onlineUsers,
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

  const handleLeave = () => {
    console.log("disconnect");
    ws.close();
  };

  const handleErr = (err) =>{
    console.log('error')
    toast.error(err)
  }
  return (
    <Layout>
      {err ? (
        <>{handleErr(err)}</>
      ) : (
        <div className="peerchat">
          <div className="user-list">
            <h1>Online Users</h1>
            <ul>
              {onlineUsers.map((user, index) => (
                <li style={{ color: "black" }} key={index}>
                  {user}
                </li>
              ))}
            </ul>
          </div>
          {ws ? (
            <>
              <div className="message-list">
                {messages.map((message, index) => (
                  <div className={`message ${message[1]}`} key={index}>
                    {message[1] === "received" && (
                      <div className="username">{message[2]}</div>
                    )}
                    {message[0]}
                  </div>
                ))}
              </div>
              <div className="d d-flex">
                <input
                  autoFocus
                  required
                  style={{ width: "80vw" }}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={() => handleSendMessage(newMessage)}
                >
                  <SendIcon />
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleLeave}
                >
                  <ExitToAppIcon />
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1>Room List</h1>
                {roomList.map((room) => (
                  <>
                    <div className="card" style={{ width: "10rem" }}>
                      <div className="card-body">
                        <h5 className="card-title">{room.room_id}</h5>
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={() => handlesubmit(room.room_id)}
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PeerChat;
