import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const Hostel = () => {
  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <h1>🏢 Hostel Management Portal</h1>
        <p>Manage your hostel leaves, room changes, mess preferences, and view facilities.</p>

        <div className="hostel-options">
          <Link to="/hostel-leave" className="hostel-option-card">
            <h3>🏖️ Leave Requests</h3>
            <p>Manage your leave applications, view calendar, and track statuses.</p>
          </Link>
          <Link to="/hostel-change" className="hostel-option-card">
            <h3>🏫 Hostel Change</h3>
            <p>Manage hostel change applications with university policies and procedures.</p>
          </Link>
          <Link to="/mess-change" className="hostel-option-card">
            <h3>🍽️ Mess Change</h3>
            <p>Request mess changes and view available dining options.</p>
          </Link>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Hostel;
