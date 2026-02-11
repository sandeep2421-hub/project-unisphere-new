import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";
import fineIcon from "./icons/fine.png";

const Fines = () => {
  const [fines] = useState([
    {
      id: 1,
      reason: "Overdue Book Return",
      amount: "$10.00",
      date: "2023-09-15",
      status: "Unpaid",
    },
    {
      id: 2,
      reason: "Lost Library Card",
      amount: "$5.00",
      date: "2023-08-20",
      status: "Paid",
    },
    {
      id: 3,
      reason: "Damaged Book",
      amount: "$15.00",
      date: "2023-07-10",
      status: "Unpaid",
    },
  ]);

  const totalFines = fines.length;
  const unpaidFines = fines.filter(f => f.status === "Unpaid").length;
  const totalUnpaidAmount = fines
    .filter(f => f.status === "Unpaid")
    .reduce((sum, f) => sum + parseFloat(f.amount.replace('$', '')), 0)
    .toFixed(2);

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">📋 Fine Management</div>
        </div>

        <h1 className="section-title">💰 Fines</h1>
        <p>View and pay your outstanding fines.</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card-modern">
            <div className="summary-icon">📄</div>
            <div className="summary-content">
              <h3>Total Fines</h3>
              <p className="summary-amount">{totalFines}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">⏳</div>
            <div className="summary-content">
              <h3>Unpaid Fines</h3>
              <p className="summary-amount">{unpaidFines}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">💵</div>
            <div className="summary-content">
              <h3>Unpaid Amount</h3>
              <p className="summary-amount">${totalUnpaidAmount}</p>
            </div>
          </div>
        </div>

        <div className="fines-list">
          {fines.map((fine) => (
            <div key={fine.id} className="fine-card">
              <h3>{fine.reason}</h3>
              <p><strong>Amount:</strong> {fine.amount}</p>
              <p><strong>Date:</strong> {fine.date}</p>
              <p><strong>Status:</strong> <span className={fine.status === "Paid" ? "paid" : "unpaid"}>{fine.status}</span></p>
              {fine.status === "Unpaid" && <button className="pay-fine-btn">💳 Pay Fine</button>}
            </div>
          ))}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Fines;
