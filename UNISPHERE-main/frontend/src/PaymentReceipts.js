import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const PaymentReceipts = () => {
  const [receipts] = useState([
    {
      id: 1,
      date: "2023-10-01",
      amount: "$50.00",
      description: "Tuition Fee Payment",
      status: "Paid",
    },
    {
      id: 2,
      date: "2023-09-15",
      amount: "$25.00",
      description: "Library Fine Payment",
      status: "Paid",
    },
    {
      id: 3,
      date: "2023-08-20",
      amount: "$100.00",
      description: "Hostel Fee Payment",
      status: "Paid",
    },
  ]);

  const totalReceipts = receipts.length;
  const totalAmount = receipts.reduce((sum, receipt) => sum + parseFloat(receipt.amount.replace('$', '')), 0).toFixed(2);

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">💳 Payment Management</div>
        </div>

        <h1 className="section-title">🧾 Payment Receipts</h1>
        <p>View and download your payment receipts.</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card-modern">
            <div className="summary-icon">📄</div>
            <div className="summary-content">
              <h3>Total Receipts</h3>
              <p className="summary-amount">{totalReceipts}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h3>Total Amount</h3>
              <p className="summary-amount">${totalAmount}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3>Paid</h3>
              <p className="summary-amount">{receipts.filter(r => r.status === "Paid").length}</p>
            </div>
          </div>
        </div>

        <div className="receipts-list">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="receipt-card">
              <h3>Receipt #{receipt.id}</h3>
              <p><strong>Date:</strong> {receipt.date}</p>
              <p><strong>Amount:</strong> {receipt.amount}</p>
              <p><strong>Description:</strong> {receipt.description}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${receipt.status.toLowerCase()}`}>{receipt.status}</span></p>
              <button className="download-btn">📥 Download Receipt</button>
            </div>
          ))}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default PaymentReceipts;
