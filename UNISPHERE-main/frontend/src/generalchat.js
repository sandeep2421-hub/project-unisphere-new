import React, { useState, useEffect } from "react";
import axios from "axios";
import "./generalchat.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "-", program: "-", university: "-" });

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const username = storedUser.username || null;

  useEffect(() => {
    if (username) {
      axios.get("http://localhost:5001/users")
        .then((response) => {
          const user = response.data.find(user => user.username === username);
          if (user && user.details) {
            setUserDetails({
              name: user.name,
              program: user.details.course,
              university: user.details.university
            });
          }
        })
        .catch(error => console.error("Error fetching user details:", error));
    }
  }, [username]);

  useEffect(() => {
    axios.get("http://localhost:5001/message")
      .then((response) => setMessages(response.data || []))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const sendMessage = async () => {
    if (!input) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      timestamp: new Date().toLocaleTimeString(),
      sender: userDetails.name,
      program: userDetails.program,
      university: userDetails.university
    };

    try {
      await axios.post("http://localhost:5001/message", newMessage);
      setMessages([...messages, newMessage]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="gch">
      <Navbar />
      <div className="chatroom-container1">
        <div className="chat-box1">
          <h2>General Chat</h2>
          <div className="chat-messages1">
            {messages.map((msg) => (
              <div key={msg.id} className="chat-message1">
                <div className="user-info">
                  <span className="sender-name">{msg.sender}</span>
                  <span className="thread-info">({msg.program}, {msg.university})</span>
                </div>
                <p>{msg.text}</p>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          <div className="chat-input1">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
      <Fot/>
    </div>
  );
};

export default ChatRoom;
