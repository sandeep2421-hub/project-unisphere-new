import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";
import libraryIcon from "./icons/library.png";

const LibraryDue = () => {
  const [dueItems] = useState([
    {
      id: 1,
      bookTitle: "Introduction to Algorithms",
      dueDate: "2023-10-10",
      status: "Due Soon",
    },
    {
      id: 2,
      bookTitle: "Data Structures and Algorithms",
      dueDate: "2023-09-25",
      status: "Overdue",
    },
    {
      id: 3,
      bookTitle: "Computer Networks",
      dueDate: "2023-10-20",
      status: "On Time",
    },
  ]);

  const totalItems = dueItems.length;
  const overdueItems = dueItems.filter(item => item.status === "Overdue").length;
  const dueSoonItems = dueItems.filter(item => item.status === "Due Soon").length;
  const onTimeItems = dueItems.filter(item => item.status === "On Time").length;

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">📚 Library Management</div>
        </div>

        <h1 className="section-title">📖 Library Due</h1>
        <p>Check your library due dates and overdue items.</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card-modern">
            <div className="summary-icon">📚</div>
            <div className="summary-content">
              <h3>Total Items</h3>
              <p className="summary-amount">{totalItems}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">⚠️</div>
            <div className="summary-content">
              <h3>Overdue</h3>
              <p className="summary-amount">{overdueItems}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">⏰</div>
            <div className="summary-content">
              <h3>Due Soon</h3>
              <p className="summary-amount">{dueSoonItems}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3>On Time</h3>
              <p className="summary-amount">{onTimeItems}</p>
            </div>
          </div>
        </div>

        <div className="due-items-list">
          {dueItems.map((item) => (
            <div key={item.id} className="due-item-card">
              <h3>{item.bookTitle}</h3>
              <p><strong>Due Date:</strong> {item.dueDate}</p>
              <p><strong>Status:</strong> <span className={item.status === "Overdue" ? "overdue" : item.status === "Due Soon" ? "due-soon" : "on-time"}>{item.status}</span></p>
              {item.status === "Overdue" && <button className="renew-btn">🔄 Renew Book</button>}
            </div>
          ))}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default LibraryDue;
