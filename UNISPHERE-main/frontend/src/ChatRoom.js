import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatRoom.css";
import Navbar from "./Navbar";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [viewedImage, setViewedImage] = useState(null); 

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  useEffect(() => {
    axios.get("http://localhost:5001/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const sendMessage = async () => {
    if (!input && !selectedFile) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : null,
      timestamp: new Date().toLocaleTimeString(),
      sender: user.name
    };

    try {
      await axios.post("http://localhost:5001/messages", newMessage);
      setMessages([...messages, newMessage]);
      setInput("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.open(searchUrl, "_blank"); 
    }
  };

  return (
    <div className="cr1">
      <Navbar />
      <div className="chatroom-container">
        <div className="chat-box">
          <h2>Study Group Chat</h2>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className="chat-message">
                <span className="sender-name">{msg.sender}</span>
                {msg.imageUrl && (
                  <img 
                    src={msg.imageUrl} 
                    alt="shared" 
                    className="chat-image" 
                    onClick={() => setViewedImage(msg.imageUrl)} 
                  />
                )}
                <p>{msg.text}</p>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        <div className="web-box">
          <h2>Surf the Web</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search on Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="image-viewer-container">
        <h2>Image Viewer</h2>
        {viewedImage ? (
          <img src={viewedImage} alt="Selected Preview" className="image-viewer" />
        ) : (
          <p>No image selected. Click on an image in chat to view it here.</p>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
