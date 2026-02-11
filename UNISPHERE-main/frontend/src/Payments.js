import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const Payments = () => {
  const [payments] = useState([
    {
      id: 1,
      type: "Tuition Fee",
      amount: "$500.00",
      dueDate: "2023-10-15",
      status: "Pending",
      description: "Semester tuition fee for Fall 2023",
      category: "Academic",
    },
    {
      id: 2,
      type: "Hostel Fee",
      amount: "$200.00",
      dueDate: "2023-10-20",
      status: "Paid",
      description: "Monthly hostel accommodation fee",
      category: "Accommodation",
    },
    {
      id: 3,
      type: "Library Fine",
      amount: "$25.00",
      dueDate: "2023-09-30",
      status: "Paid",
      description: "Overdue book return fine",
      category: "Library",
    },
    {
      id: 4,
      type: "Mess Fee",
      amount: "$150.00",
      dueDate: "2023-11-01",
      status: "Pending",
      description: "Monthly dining services fee",
      category: "Dining",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredPayments = payments.filter((payment) => {
    if (filterStatus === "All") return true;
    return payment.status === filterStatus;
  });

  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "")), 0);

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

        <h1 className="section-title">💳 Payment Dashboard</h1>
        <p>Manage your payments and view outstanding dues.</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card-modern">
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h3>Total Pending</h3>
              <p className="summary-amount">${totalPending.toFixed(2)}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3>Paid This Month</h3>
              <p className="summary-amount">$225.00</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">⏰</div>
            <div className="summary-content">
              <h3>Due Soon</h3>
              <p className="summary-amount">$650.00</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section-modern">
          <h3>Filter Payments</h3>
          <div className="filter-buttons">
            {["All", "Pending", "Paid"].map((status) => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status ? "active" : ""}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Payments List */}
        <div className="payments-list-modern">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <div key={payment.id} className="payment-card-modern" style={{'--i': index}}>
                <div className="card-header-modern">
                  <div className="payment-icon">
                    {payment.category === "Academic" && "🎓"}
                    {payment.category === "Accommodation" && "🏠"}
                    {payment.category === "Library" && "📚"}
                    {payment.category === "Dining" && "🍽️"}
                  </div>
                  <div className="payment-info">
                    <h3>{payment.type}</h3>
                    <span className={`status-badge-modern ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
                <div className="card-body-modern">
                  <p className="payment-description">{payment.description}</p>
                  <div className="payment-details">
                    <div className="detail-item">
                      <span className="detail-label">Amount:</span>
                      <span className="detail-value amount">{payment.amount}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Due Date:</span>
                      <span className="detail-value">{payment.dueDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{payment.category}</span>
                    </div>
                  </div>
                  {payment.status === "Pending" && (
                    <button className="pay-btn-modern">💳 Pay Now</button>
                  )}
                  {payment.status === "Paid" && (
                    <div className="paid-indicator">
                      <span className="checkmark">✓</span> Paid Successfully
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-payments">
              <p>No payments found for the selected filter.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-modern">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">📄 Download Receipt</button>
            <button className="action-btn">📊 View Payment History</button>
            <button className="action-btn">💬 Contact Support</button>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Payments;
