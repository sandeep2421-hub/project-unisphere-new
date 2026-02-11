import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";
import walletIcon from "./icons/wallet.png";

const Wallet = () => {
  const [balance] = useState("$150.00");
  const [transactions] = useState([
    {
      id: 1,
      date: "2023-10-01",
      description: "Tuition Fee Payment",
      amount: "-$50.00",
      type: "debit",
    },
    {
      id: 2,
      date: "2023-09-28",
      description: "Refund - Library Fine",
      amount: "+$25.00",
      type: "credit",
    },
    {
      id: 3,
      date: "2023-09-20",
      description: "Hostel Fee Payment",
      amount: "-$100.00",
      type: "debit",
    },
  ]);

  const totalTransactions = transactions.length;
  const totalDebits = transactions.filter(t => t.type === "debit").length;
  const totalCredits = transactions.filter(t => t.type === "credit").length;

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">💰 Financial Overview</div>
        </div>

        <h1 className="section-title">💳 Wallet</h1>
        <p>Manage your account balance and view transaction history.</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card-modern">
            <div className="summary-icon">💵</div>
            <div className="summary-content">
              <h3>Current Balance</h3>
              <p className="summary-amount">{balance}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h3>Total Transactions</h3>
              <p className="summary-amount">{totalTransactions}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">⬇️</div>
            <div className="summary-content">
              <h3>Debits</h3>
              <p className="summary-amount">{totalDebits}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">⬆️</div>
            <div className="summary-content">
              <h3>Credits</h3>
              <p className="summary-amount">{totalCredits}</p>
            </div>
          </div>
        </div>

        <h3 className="subsection-title">📈 Recent Transactions</h3>
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <p><strong>Date:</strong> {transaction.date}</p>
              <p><strong>Description:</strong> {transaction.description}</p>
              <p className={transaction.type}><strong>Amount:</strong> {transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Wallet;
