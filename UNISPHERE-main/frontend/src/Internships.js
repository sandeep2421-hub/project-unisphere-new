import React, { useState, useEffect } from "react";
import "./Internships.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Fot from "./footer";
import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/internships")
      .then((response) => {
        setInternships(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching internships:", error);
        setLoading(false);
      });
  }, []);

  const filteredInternships = internships.filter((internship) => {
    return (
      (filterCompany === "" ||
        internship.company.toLowerCase().includes(filterCompany.toLowerCase())) &&
      (filterRole === "" ||
        internship.position.toLowerCase().includes(filterRole.toLowerCase()))
    );
  });

  const handleApply = (internship) => {
    navigate(`/internships/${internship.id}`);
  };

  return (
    <div className="internships-page">
      <Navbar />
      <div className="internships-container">
        <h1>Internship Opportunities</h1>
        <p>Find the perfect internship to kickstart your career!</p>

        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by company..."
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Search by role..."
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-input"
          />
        </div>

        {loading ? (
          <p>Loading internships...</p>
        ) : (
          <div className="internships-grid">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <div key={internship.id} className="internship-card">
                  <h3>{internship.company}</h3>
                  <h4>{internship.position}</h4>
                  <p>
                    <strong>Location:</strong> {internship.location}
                  </p>
                  <p>
                    <strong>Duration:</strong> {internship.duration}
                  </p>
                  <p>
                    <strong>Stipend:</strong> {internship.stipend}
                  </p>
                  <p>
                    <strong>Eligibility:</strong> {internship.eligibility}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {internship.applicationDeadline}
                  </p>
                  <p className="description">{internship.description}</p>
                  <button
                    className="apply-btn"
                    onClick={() => handleApply(internship)}
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p>No internships found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
      <Fot />
    </div>
  );
};

export default Internships;
