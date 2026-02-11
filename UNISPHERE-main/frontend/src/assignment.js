import React, { useState, useEffect } from "react";
import axios from "axios";
import "./assignment.css";

const Assignment = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = ["Mathematics", "Physics", "Computer Science", "Electronics"];

  // Fetch assignments from db.json
  useEffect(() => {
    axios.get("http://localhost:5001/assignments")
      .then((response) => {
        setAssignments(response.data || {}); // Ensure assignments is an object
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedSubject) {
      alert("Please select a subject and file to upload!");
      return;
    }

    const fileUrl = `/uploads/${selectedFile.name}`;

    const newAssignment = {
      id: Date.now().toString(),
      name: selectedFile.name,
      fileUrl: fileUrl
    };

    // Fetch latest assignments before updating
    let updatedAssignments = { ...assignments };
    if (!updatedAssignments[selectedSubject]) {
      updatedAssignments[selectedSubject] = [];
    }
    updatedAssignments[selectedSubject] = [...updatedAssignments[selectedSubject], newAssignment];

    try {
      await axios.put("http://localhost:5001/assignments", updatedAssignments);
      setAssignments(updatedAssignments);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="assignment-container">
      <h2>Upload Assignment</h2>
      
      <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Assignments</h2>
      {Object.keys(assignments).length > 0 ? (
        Object.keys(assignments).map((subject) => (
          <div key={subject} className="subject-section">
            <h3>{subject}</h3>
            <ul>
              {assignments[subject].map((assignment) => (
                <li key={assignment.id}>{assignment.name}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No assignments uploaded yet.</p>
      )}
    </div>
  );
};

export default Assignment;
