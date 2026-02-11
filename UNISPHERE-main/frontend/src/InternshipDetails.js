import React, { useState, useEffect } from "react";
import "./InternshipDetails.css";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Fot from "./footer";
import axios from "axios";

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
    linkedIn: "",
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
      .get(`http://localhost:5001/internships/${id}`)
      .then((response) => {
        setInternship(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching internship:", error);
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
      !formData.resume
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const application = {
        id: Date.now().toString(),
        internshipId: id,
        company: internship.company,
        position: internship.position,
        applicantName: formData.fullName,
        applicantEmail: formData.email,
        applicantPhone: formData.phone,
        resumeLink: formData.resume,
        coverLetter: formData.coverLetter,
        linkedInProfile: formData.linkedIn,
        appliedDate: new Date().toLocaleDateString(),
        status: "pending",
      };

      // Save to applications in db
      const response = await axios.get("http://localhost:5001/applications");
      let applications = response.data || [];
      if (!Array.isArray(applications)) {
        applications = [];
      }
      applications.push(application);

      await axios.put("http://localhost:5001/applications", applications);

      setSubmitted(true);
      setTimeout(() => {
        alert(`Application submitted for ${internship.position} at ${internship.company}!`);
        navigate("/internships");
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!internship)
    return (
      <div>
        <Navbar />
        <p>Internship not found</p>
      </div>
    );

  return (
    <div className="internship-details-page">
      <Navbar />
      <div className="details-container">
        <button className="back-btn" onClick={() => navigate("/internships")}>
          ← Back to Internships
        </button>

        <div className="details-card">
          <h1>{internship.company}</h1>
          <h2 className="position">{internship.position}</h2>

          <div className="details-grid">
            <div className="detail-item">
              <label>Location</label>
              <p>{internship.location}</p>
            </div>
            <div className="detail-item">
              <label>Duration</label>
              <p>{internship.duration}</p>
            </div>
            <div className="detail-item">
              <label>Stipend</label>
              <p className="stipend">{internship.stipend}</p>
            </div>
            <div className="detail-item">
              <label>Application Deadline</label>
              <p>{internship.applicationDeadline}</p>
            </div>
          </div>

          <div className="detail-section">
            <h3>Eligibility</h3>
            <p>{internship.eligibility}</p>
          </div>

          <div className="detail-section">
            <h3>Description</h3>
            <p>{internship.description}</p>
          </div>

          {!showForm && !submitted && (
            <button className="apply-btn-large" onClick={() => setShowForm(true)}>
              Apply Now
            </button>
          )}

          {showForm && !submitted && (
            <div className="application-form">
              <h3>Apply for this Internship</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
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
                  <label>Resume Link * (PDF/Google Drive/GitHub)</label>
                  <input
                    type="url"
                    name="resume"
                    placeholder="https://..."
                    value={formData.resume}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    rows="5"
                    placeholder="Tell us why you're interested in this internship..."
                    value={formData.coverLetter}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedIn"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedIn}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" className="submit-btn">
                    Submit Application
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
              ✅ Application submitted successfully! Good luck!
            </div>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default InternshipDetails;
