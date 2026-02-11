import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const HostelChange = () => {
  const [hostelChangeRequests] = useState([
    {
      id: 1,
      currentHostel: "K-block",
      requestedHostel: "S-block",
      reason: "Closer to academic buildings and better facilities",
      status: "Approved",
      universityPolicy: "Hostel change allowed once per semester with valid reason.",
      submittedDate: "2023-10-01",
      approvalDate: "2023-10-05",
    },
    {
      id: 2,
      currentHostel: "Q-block",
      requestedHostel: "R-block",
      reason: "Need attached bathroom for medical reasons",
      status: "Pending",
      universityPolicy: "Medical reasons are considered for hostel changes.",
      submittedDate: "2023-10-10",
    },
  ]);

  const [availableHostels] = useState([
    {
      id: 1,
      name: "Q-block",
      description: "Modern hostel block with AC rooms and study areas.",
      rating: 4.2,
      facilities: ["AC Rooms", "Wi-Fi", "Study Rooms", "Gym", "Laundry"],
      capacity: 200,
      universityPolicy: "Standard accommodation for undergraduate students.",
      occupancy: 85,
      monthlyRent: "$150",
      location: "North Campus",
    },
    {
      id: 2,
      name: "R-block",
      description: "Premium hostel with attached bathrooms and mess proximity.",
      rating: 4.5,
      facilities: ["Attached Bathrooms", "Wi-Fi", "Mess Access", "Common Areas"],
      capacity: 150,
      universityPolicy: "Preferred for postgraduate students.",
      occupancy: 92,
      monthlyRent: "$180",
      location: "Central Campus",
    },
    {
      id: 3,
      name: "L-block",
      description: "Budget-friendly hostel with basic amenities.",
      rating: 3.8,
      facilities: ["Shared Bathrooms", "Wi-Fi", "Common Rooms"],
      capacity: 300,
      universityPolicy: "For students on scholarship or budget constraints.",
      occupancy: 78,
      monthlyRent: "$120",
      location: "South Campus",
    },
    {
      id: 4,
      name: "S-block",
      description: "Luxury hostel with modern amenities and recreational facilities.",
      rating: 4.7,
      facilities: ["AC Rooms", "Wi-Fi", "Gym", "Swimming Pool", "Cafeteria"],
      capacity: 100,
      universityPolicy: "Premium accommodation for meritorious students.",
      occupancy: 95,
      monthlyRent: "$220",
      location: "Main Campus",
    },
  ]);

  const [formData, setFormData] = useState({
    currentHostel: "",
    requestedHostel: "",
    reason: "",
  });

  const [filterLocation, setFilterLocation] = useState("All");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hostel change request submitted!");
    setFormData({ currentHostel: "", requestedHostel: "", reason: "" });
  };

  const filteredHostels = availableHostels.filter((hostel) => {
    if (filterLocation === "All") return true;
    return hostel.location === filterLocation;
  });

  const totalRequests = hostelChangeRequests.length;
  const approvedRequests = hostelChangeRequests.filter(r => r.status === "Approved").length;

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">🏠 Hostel Management</div>
        </div>

        <h1 className="section-title">🏫 Hostel Change Dashboard</h1>
        <p>Manage your hostel change applications and explore available accommodation options.</p>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card-modern">
            <div className="summary-icon">📋</div>
            <div className="summary-content">
              <h3>Total Requests</h3>
              <p className="summary-amount">{totalRequests}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3>Approved</h3>
              <p className="summary-amount">{approvedRequests}</p>
            </div>
          </div>
          <div className="summary-card-modern">
            <div className="summary-icon">🏢</div>
            <div className="summary-content">
              <h3>Available Hostels</h3>
              <p className="summary-amount">{availableHostels.length}</p>
            </div>
          </div>
        </div>

        {/* Current Requests */}
        <h3 className="subsection-title">📋 Your Hostel Change Requests</h3>
        <div className="hostel-list-modern">
          {hostelChangeRequests.length > 0 ? (
            hostelChangeRequests.map((request, index) => (
              <div key={request.id} className="hostel-card-modern" style={{'--i': index}}>
                <div className="card-header-modern">
                  <div className="request-icon">🔄</div>
                  <div className="request-info">
                    <h3>Hostel Change Request #{request.id}</h3>
                    <span className={`status-badge-modern ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                <div className="card-body-modern">
                  <div className="request-details">
                    <div className="detail-item">
                      <span className="detail-label">Current Hostel:</span>
                      <span className="detail-value">{request.currentHostel}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Requested Hostel:</span>
                      <span className="detail-value">{request.requestedHostel}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Submitted:</span>
                      <span className="detail-value">{request.submittedDate}</span>
                    </div>
                    {request.approvalDate && (
                      <div className="detail-item">
                        <span className="detail-label">Approved:</span>
                        <span className="detail-value">{request.approvalDate}</span>
                      </div>
                    )}
                  </div>
                  <p className="request-reason"><strong>Reason:</strong> {request.reason}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-requests">
              <p>No hostel change requests found.</p>
            </div>
          )}
        </div>

        {/* Available Hostels */}
        <h3 className="subsection-title">🏢 Available Hostels</h3>

        {/* Filter Section */}
        <div className="filter-section-modern">
          <h4>Filter by Location</h4>
          <div className="filter-buttons">
            {["All", "North Campus", "Central Campus", "South Campus", "Main Campus"].map((location) => (
              <button
                key={location}
                className={`filter-btn ${filterLocation === location ? "active" : ""}`}
                onClick={() => setFilterLocation(location)}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        <div className="available-hostels-grid-modern">
          {filteredHostels.length > 0 ? (
            filteredHostels.map((hostel, index) => (
              <div key={hostel.id} className="hostel-option-card-modern" style={{'--i': index}}>
                <div className="hostel-image-placeholder-modern">
                  <span>🏢</span>
                  <div className="occupancy-badge">
                    {hostel.occupancy}% Occupied
                  </div>
                </div>
                <div className="hostel-content-modern">
                  <div className="hostel-header-modern">
                    <h4>{hostel.name}</h4>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(hostel.rating) ? 'star filled' : 'star'}>★</span>
                      ))}
                      <span className="rating-text">({hostel.rating})</span>
                    </div>
                  </div>
                  <p className="hostel-description">{hostel.description}</p>
                  <div className="hostel-details-modern">
                    <div className="detail-item">
                      <span className="detail-label">Monthly Rent:</span>
                      <span className="detail-value amount">{hostel.monthlyRent}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Capacity:</span>
                      <span className="detail-value">{hostel.capacity} students</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{hostel.location}</span>
                    </div>
                  </div>
                  <div className="hostel-facilities-modern">
                    {hostel.facilities.map((facility, idx) => (
                      <span key={idx} className="facility-badge tooltip">
                        {facility}
                        <span className="tooltip-text">Premium {facility} facility available</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-hostels">
              <p>No hostels found for the selected location.</p>
            </div>
          )}
        </div>

        {/* Request Form */}
        <div className="hostel-change-form-modern">
          <h3 className="form-title">📝 Request Hostel Change</h3>
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-row">
              <div className="form-group-modern">
                <label htmlFor="currentHostel">Current Hostel:</label>
                <select
                  id="currentHostel"
                  name="currentHostel"
                  value={formData.currentHostel}
                  onChange={handleInputChange}
                  required
                  className="modern-select"
                >
                  <option value="">Select Current Hostel</option>
                  {availableHostels.map((hostel) => (
                    <option key={hostel.id} value={hostel.name}>{hostel.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group-modern">
                <label htmlFor="requestedHostel">Requested Hostel:</label>
                <select
                  id="requestedHostel"
                  name="requestedHostel"
                  value={formData.requestedHostel}
                  onChange={handleInputChange}
                  required
                  className="modern-select"
                >
                  <option value="">Select Requested Hostel</option>
                  {availableHostels.map((hostel) => (
                    <option key={hostel.id} value={hostel.name}>{hostel.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group-modern">
              <label htmlFor="reason">Reason for Change:</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Please provide a detailed reason for your hostel change request (e.g., medical reasons, proximity to classes, facility preferences)..."
                required
                className="modern-textarea"
              ></textarea>
            </div>
            <div className="form-note">
              <p>⚠️ Note: Hostel change requests are subject to availability and university approval. Medical reasons and academic needs are prioritized.</p>
            </div>
            <button type="submit" className="submit-btn-modern">🚀 Submit Request</button>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-modern">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">📋 View Hostel Rules</button>
            <button className="action-btn">📞 Contact Warden</button>
            <button className="action-btn">💬 Support Chat</button>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default HostelChange;
