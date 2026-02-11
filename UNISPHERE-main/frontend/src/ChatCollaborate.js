import React, { useState } from "react";
import "./ChatCollaborate.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Fot from "./footer";

const ChatCollaborate = () => {
  const [subject, setSubject] = useState("");
  const [subject1, setSubject1] = useState("");
  const [studyStyle, setStudyStyle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for study group in ${subject} with ${studyStyle} style`);
  };

  
  const navigate=useNavigate();
  const handleFindStudyGroup = () => {
    navigate("/chatroom"); 
  };

  return (
    <div className="c_c">
      <Navbar />
      <div className="chat-container">
        <h1>Chat & Collaborate</h1>
        <p>Find the right study group instantly!</p>
        
        <form onSubmit={handleSubmit} className="chat-form">
          <label>Select Program:</label>
          <select value={subject1} onChange={(e) => setSubject1(e.target.value)}>
            <option value="">-- Choose Program --</option>
            <option value="B-Tech CSE">B-Tech CSE</option>
            <option value="B-Tech IT">B-Tech IT</option>
            <option value="BARC Architect">B-ARC</option>
          </select>

          <label>Select Subject:</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">-- Choose Subject --</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Probability & Statistics">Probability & Statistics</option>
            <option value="Operating Systems">Operating Systems</option>
          </select>

          <label>Preferred Study Style:</label>
          <select value={studyStyle} onChange={(e) => setStudyStyle(e.target.value)}>
            <option value="">-- Choose Study Style --</option>
            <option value="Quick Q&A">General Chat</option>
            <option value="Deep Discussion">Discussion</option>
            <option value="Notes Sharing">Notes Sharing</option>
          </select>

          <button type="submit" className="match-btn" onClick={handleFindStudyGroup}>Find Study Group</button>
        </form>
      </div>
      <Fot/>
    </div>
  );
};

export default ChatCollaborate;
