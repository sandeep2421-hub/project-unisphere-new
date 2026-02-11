import React, { useState, useEffect } from "react";
import "./HackathonDetails.css";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Fot from "./footer";
import axios from "axios";

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    teamName: "",
    teamMembers: "",
    projectIdea: "",
    github: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData((prev) => ({
        ...prev,
        fullName: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone || "",
      }));
    }

    axios
      .get(`http://localhost:5001/hackathons/${id}`)
      .then((response) => {
        setHackathon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hackathon:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.teamName ||
      !formData.projectIdea
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const registration = {
        id: Date.now().toString(),
        hackathonId: id,
        hackathonName: hackathon.name,
        teamName: formData.teamName,
        leaderName: formData.fullName,
        leaderEmail: formData.email,
        leaderPhone: formData.phone,
        teamMembers: formData.teamMembers,
        projectIdea: formData.projectIdea,
        githubLink: formData.github,
        registeredDate: new Date().toLocaleDateString(),
        status: "registered",
      };

      // Save to registrations in db
      const response = await axios.get("http://localhost:5001/registrations");
      let registrations = response.data || [];
      if (!Array.isArray(registrations)) {
        registrations = [];
      }
      registrations.push(registration);

      await axios.put("http://localhost:5001/registrations", registrations);

      setSubmitted(true);
      setTimeout(() => {
        alert(`${formData.teamName} registered successfully for ${hackathon.name}!`);
        navigate("/hackathons");
      }, 2000);
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Failed to register. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!hackathon)
    return (
      <div>
        <Navbar />
        <p>Hackathon not found</p>
      </div>
    );

  const isUpcoming = new Date(hackathon.date) > new Date();

  return (
    <div className="hackathon-details-page">
      <Navbar />
      <div className="details-container">
        <button className="back-btn" onClick={() => navigate("/hackathons")}>
          ← Back to Hackathons
        </button>

        <div className="details-card">
          <h1>{hackathon.name}</h1>
          {isUpcoming && <span className="badge-upcoming-large">Upcoming</span>}

          <div className="details-grid">
            <div className="detail-item">
              <label>Date</label>
              <p>{new Date(hackathon.date).toLocaleDateString()}</p>
            </div>
            <div className="detail-item">
              <label>Duration</label>
              <p>{hackathon.duration}</p>
            </div>
            <div className="detail-item">
              <label>Location</label>
              <p>{hackathon.location}</p>
            </div>
            <div className="detail-item">
              <label>Prize Pool</label>
              <p className="prize">{hackathon.prizePool}</p>
            </div>
          </div>

          <div className="detail-section">
            <h3>Themes</h3>
            <div className="theme-tags-large">
              {hackathon.themes.map((theme, idx) => (
                <span key={idx} className="theme-tag-large">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>Description</h3>
            <p>{hackathon.description}</p>
          </div>

          <div className="detail-section">
            <h3>Registration Deadline</h3>
            <p className="deadline">
              {new Date(hackathon.registrationDeadline).toLocaleDateString()}
            </p>
          </div>

          {isUpcoming && new Date(hackathon.registrationDeadline) > new Date() && !showForm && !submitted && (
            <button className="register-btn-large" onClick={() => setShowForm(true)}>
              Register Team Now
            </button>
          )}

          {showForm && !submitted && (
            <div className="registration-form">
              <h3>Register Your Team</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Team Leader Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Team Name *</label>
                  <input
                    type="text"
                    name="teamName"
                    placeholder="e.g., Code Warriors"
                    value={formData.teamName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Team Members (names separated by commas)</label>
                  <textarea
                    name="teamMembers"
                    rows="3"
                    placeholder="Member 1, Member 2, Member 3..."
                    value={formData.teamMembers}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Project Idea *</label>
                  <textarea
                    name="projectIdea"
                    rows="5"
                    placeholder="Describe your project idea and which theme it belongs to..."
                    value={formData.projectIdea}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>GitHub Repository Link</label>
                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/..."
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" className="submit-btn">
                    Register Team
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {submitted && (
            <div className="success-message">
              ✅ Registration successful! Good luck in the hackathon!
            </div>
          )}

          {!isUpcoming && (
            <div className="expired-message">
              ⏰ This hackathon has already passed
            </div>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default HackathonDetails;
