import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const DetailsForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [details, setDetails] = useState({
    university: "",
    course: "",
    year: "",
    privacy: "public",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    if (storedUser.details) {
      setDetails(storedUser.details);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedUser = { ...user, details, detailsFilled: true };

      await axios.patch(`http://localhost:5001/users/${user.id}`, updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Details updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div className="df"><Navbar />
      <div className="details-form">
        <h2>Fill in Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>University:</label>
            <input
              type="text"
              name="university"
              value={details.university}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={details.course}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={details.year}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Marks, Timetable: </label>
            <p>To sync Data with your profile Follow from Below Link.!</p>
            <p>You can later setup from your settings.!</p>
            <p>Setup </p>
            <a href="#">Setup </a>
          </div>
          <div>
            <label>Privacy Settings:</label>
            <select name="privacy" value={details.privacy} onChange={handleChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button type="submit">Save Details</button>
          <button type="button" onClick={() => navigate("/home")}>Skip</button>
        </form>
      </div>
      <Fot/>
    </div>
  );
};

export default DetailsForm;
