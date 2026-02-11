import React, { useState, useEffect } from "react";
import "./Hackathons.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Fot from "./footer";
import axios from "axios";

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filterTheme, setFilterTheme] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/hackathons")
      .then((response) => {
        setHackathons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hackathons:", error);
        setLoading(false);
      });
  }, []);

  const filteredHackathons = hackathons.filter((hackathon) => {
    return (
      filterTheme === "" ||
      hackathon.themes.some((theme) =>
        theme.toLowerCase().includes(filterTheme.toLowerCase())
      ) ||
      hackathon.name.toLowerCase().includes(filterTheme.toLowerCase())
    );
  });

  const handleRegister = (hackathon) => {
    navigate(`/hackathons/${hackathon.id}`);
  };

  const isUpcoming = (date) => {
    return new Date(date) > new Date();
  };

  return (
    <div className="hackathons-page">
      <Navbar />
      <div className="hackathons-container">
        <h1>Hackathons & Coding Competitions</h1>
        <p>Showcase your skills, compete, and win amazing prizes!</p>

        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by hackathon name or theme..."
            value={filterTheme}
            onChange={(e) => setFilterTheme(e.target.value)}
            className="filter-input"
          />
        </div>

        {loading ? (
          <p>Loading hackathons...</p>
        ) : (
          <div className="hackathons-grid">
            {filteredHackathons.length > 0 ? (
              filteredHackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className={`hackathon-card ${
                    isUpcoming(hackathon.date) ? "upcoming" : "past"
                  }`}
                >
                  <div className="hackathon-header">
                    <h3>{hackathon.name}</h3>
                    {isUpcoming(hackathon.date) && (
                      <span className="badge-upcoming">Upcoming</span>
                    )}
                  </div>
                  <p className="date">
                    <strong>Date:</strong> {new Date(hackathon.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Duration:</strong> {hackathon.duration}
                  </p>
                  <p>
                    <strong>Location:</strong> {hackathon.location}
                  </p>
                  <p>
                    <strong>Prize Pool:</strong> <span className="prize">{hackathon.prizePool}</span>
                  </p>
                  <div className="themes">
                    <strong>Themes:</strong>
                    <div className="theme-tags">
                      {hackathon.themes.map((theme, idx) => (
                        <span key={idx} className="theme-tag">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="description">{hackathon.description}</p>
                  <p>
                    <strong>Registration Deadline:</strong>{" "}
                    {new Date(hackathon.registrationDeadline).toLocaleDateString()}
                  </p>
                  {isUpcoming(hackathon.registrationDeadline) && (
                    <button
                      className="register-btn"
                      onClick={() => handleRegister(hackathon)}
                    >
                      Register Now
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No hackathons found matching your search.</p>
            )}
          </div>
        )}
      </div>
      <Fot />
    </div>
  );
};

export default Hackathons;
