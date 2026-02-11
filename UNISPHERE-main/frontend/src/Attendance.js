import React, { useState } from "react";
import "./Attendance.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const Attendance = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Data Structures", attended: 0, total: 0, type: "subject" },
    { id: 2, name: "Probability & Statistics", attended: 0, total: 0, type: "subject" },
    { id: 3, name: "Operating Systems", attended: 0, total: 0, type: "subject" },
    { id: 4, name: "Machine Learning", attended: 0, total: 0, type: "subject" },
    { id: 5, name: "Software Engineering", attended: 0, total: 0, type: "subject" },
    { id: 6, name: "Embedded Systems", attended: 0, total: 0, type: "subject" },
    { id: 7, name: "Cryptography & Network Security", attended: 0, total: 0, type: "subject" },
    { id: 8, name: "Advanced Coding", attended: 0, total: 0, type: "subject" },
  ]);

  const [labs, setLabs] = useState([
    { id: 101, name: "Data Structures Lab", attended: 0, total: 0, type: "lab" },
    { id: 102, name: "Web Development Lab", attended: 0, total: 0, type: "lab" },
    { id: 103, name: "Machine Learning Lab", attended: 0, total: 0, type: "lab" },
    { id: 104, name: "Software Engineering Lab", attended: 0, total: 0, type: "lab" },
    { id: 105, name: "Embedded Systems Lab", attended: 0, total: 0, type: "lab" },
    { id: 106, name: "Cryptography & Network Security Lab", attended: 0, total: 0, type: "lab" },
    { id: 107, name: "Advanced Coding Lab", attended: 0, total: 0, type: "lab" },
  ]);

  const [newSubject, setNewSubject] = useState("");
  const [newLab, setNewLab] = useState("");
  const [targetPercentage, setTargetPercentage] = useState(75);

  const addSubject = () => {
    if (newSubject.trim() !== "") {
      const newId = Math.max(...subjects.map((s) => s.id), 0) + 1;
      setSubjects([
        ...subjects,
        { id: newId, name: newSubject, attended: 0, total: 0, type: "subject" },
      ]);
      setNewSubject("");
    }
  };

  const addLab = () => {
    if (newLab.trim() !== "") {
      const newId = Math.max(...labs.map((l) => l.id), 100) + 1;
      setLabs([
        ...labs,
        { id: newId, name: newLab, attended: 0, total: 0, type: "lab" },
      ]);
      setNewLab("");
    }
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const removeLab = (id) => {
    setLabs(labs.filter((l) => l.id !== id));
  };

  const updateSubject = (id, field, value) => {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, [field]: Math.max(0, parseInt(value) || 0) } : s
      )
    );
  };

  const updateLab = (id, field, value) => {
    setLabs(
      labs.map((l) =>
        l.id === id ? { ...l, [field]: Math.max(0, parseInt(value) || 0) } : l
      )
    );
  };

  const calculateAttendance = (attended, total) => {
    return total === 0 ? 0 : ((attended / total) * 100).toFixed(2);
  };

  const calculateNeeded = (attended, total, target) => {
    if (total === 0) return "Add classes";
    const current = (attended / total) * 100;
    if (current >= target) return "✅ Target Met";

    const classesNeeded = Math.ceil(
      (target * total - attended * 100) / (100 - target)
    );
    return classesNeeded > 0 ? classesNeeded : 0;
  };

  const totalSubjectAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalSubjectClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallSubjectAttendance = calculateAttendance(totalSubjectAttended, totalSubjectClasses);

  const totalLabAttended = labs.reduce((sum, l) => sum + l.attended, 0);
  const totalLabClasses = labs.reduce((sum, l) => sum + l.total, 0);
  const overallLabAttendance = calculateAttendance(totalLabAttended, totalLabClasses);

  const totalAllAttended = totalSubjectAttended + totalLabAttended;
  const totalAllClasses = totalSubjectClasses + totalLabClasses;
  const overallAllAttendance = calculateAttendance(totalAllAttended, totalAllClasses);

  return (
    <div className="attendance-page">
      <Navbar />
      <div className="attendance-container">
        <h1>📊 Attendance Calculator</h1>
        <p>Track your theory classes & labs attendance and plan to reach your target percentage</p>

        <div className="overall-section">
          <h2>Overall Attendance (Classes + Labs)</h2>
          <div className="stats-card">
            <div className="stat-item">
              <label>Total Classes & Labs</label>
              <p className="stat-value">{totalAllClasses}</p>
            </div>
            <div className="stat-item">
              <label>Attended</label>
              <p className="stat-value">{totalAllAttended}</p>
            </div>
            <div className="stat-item">
              <label>Attendance %</label>
              <p className={`stat-value ${overallAllAttendance >= 75 ? "green" : "red"}`}>
                {overallAllAttendance}%
              </p>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(overallAllAttendance, 100)}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {overallAllAttendance >= 75
                ? "✅ Excellent attendance!"
                : `🎯 Maintain ${(75 - overallAllAttendance).toFixed(2)}% more to reach 75%`}
            </p>
          </div>

          <div className="eligibility-section">
            <h3>📋 Examination Eligibility</h3>
            <div className={`eligibility-card ${overallAllAttendance >= 75 ? 'eligible' : 'not-eligible'}`}>
              <div className="eligibility-icon">
                {overallAllAttendance >= 75 ? '✅' : '❌'}
              </div>
              <div className="eligibility-text">
                <p className="eligibility-status">
                  {overallAllAttendance >= 75 ? 'ELIGIBLE FOR EXAMINATIONS' : 'NOT ELIGIBLE FOR EXAMINATIONS'}
                </p>
                <p className="eligibility-detail">
                  {overallAllAttendance >= 75
                    ? 'Your attendance meets the minimum requirement of 75%. You are eligible to appear for all examinations.'
                    : `Your attendance is ${overallAllAttendance}%. You need ${(75 - overallAllAttendance).toFixed(2)}% more to become eligible for examinations.`}
                </p>
              </div>
            </div>
          </div>

          <div className="attendance-breakdown">
            <div className="breakdown-item">
              <h4>Theory Classes</h4>
              <p className={`breakdown-percentage ${overallSubjectAttendance >= 75 ? "green" : "red"}`}>
                {overallSubjectAttendance}%
              </p>
              <p className="breakdown-stats">({totalSubjectAttended}/{totalSubjectClasses})</p>
            </div>
            <div className="breakdown-item">
              <h4>Labs</h4>
              <p className={`breakdown-percentage ${overallLabAttendance >= 75 ? "green" : "red"}`}>
                {overallLabAttendance}%
              </p>
              <p className="breakdown-stats">({totalLabAttended}/{totalLabClasses})</p>
            </div>
          </div>
        </div>

        <div className="target-section">
          <label>Set Target Percentage:</label>
          <div className="target-input-group">
            <input
              type="range"
              min="0"
              max="100"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(parseInt(e.target.value))}
              className="target-slider"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(parseInt(e.target.value) || 0)}
              className="target-input"
            />
            <span className="target-display">%</span>
          </div>
        </div>

        {/* SUBJECTS SECTION */}
        <div className="section-header">
          <h2>📚 Theory Classes</h2>
        </div>

        <div className="add-subject-section">
          <h3>Add New Subject</h3>
          <div className="add-input-group">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Enter subject name..."
              onKeyPress={(e) => e.key === "Enter" && addSubject()}
              className="subject-input"
            />
            <button onClick={addSubject} className="add-btn">
              Add Subject
            </button>
          </div>
        </div>

        <div className="subjects-grid">
          {subjects.length > 0 ? (
            subjects.map((subject) => {
              const attendance = calculateAttendance(subject.attended, subject.total);
              const needed = calculateNeeded(subject.attended, subject.total, targetPercentage);
              const isTargetMet = attendance >= targetPercentage;

              return (
                <div key={subject.id} className="subject-card">
                  <div className="subject-header">
                    <h3>{subject.name}</h3>
                    <button
                      className="delete-btn"
                      onClick={() => removeSubject(subject.id)}
                      title="Remove subject"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="attendance-display">
                    <p className={`attendance-percentage ${isTargetMet ? "green" : "red"}`}>
                      {attendance}%
                    </p>
                  </div>

                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill"
                      style={{ width: `${Math.min(attendance, 100)}%` }}
                    ></div>
                  </div>

                  <div className="input-group">
                    <label>Classes Attended:</label>
                    <div className="input-controls">
                      <button
                        onClick={() =>
                          updateSubject(subject.id, "attended", subject.attended - 1)
                        }
                        className="control-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={subject.attended}
                        onChange={(e) =>
                          updateSubject(subject.id, "attended", e.target.value)
                        }
                        className="class-input"
                      />
                      <button
                        onClick={() =>
                          updateSubject(subject.id, "attended", subject.attended + 1)
                        }
                        className="control-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Total Classes:</label>
                    <div className="input-controls">
                      <button
                        onClick={() =>
                          updateSubject(subject.id, "total", subject.total - 1)
                        }
                        className="control-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={subject.total}
                        onChange={(e) =>
                          updateSubject(subject.id, "total", e.target.value)
                        }
                        className="class-input"
                      />
                      <button
                        onClick={() =>
                          updateSubject(subject.id, "total", subject.total + 1)
                        }
                        className="control-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="classes-needed">
                    <label>Classes needed for {targetPercentage}%:</label>
                    <p className="needed-value">
                      {needed === "✅ Target Met" ? needed : `${needed} classes`}
                    </p>
                  </div>

                  <div className="eligibility-badge">
                    <label>Exam Eligibility:</label>
                    <p className={`eligibility-status-badge ${attendance >= 75 ? 'eligible' : 'not-eligible'}`}>
                      {attendance >= 75 ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-items">No subjects added yet. Add a subject to get started!</p>
          )}
        </div>

        {/* LABS SECTION */}
        <div className="section-header">
          <h2>🧪 Labs</h2>
        </div>

        <div className="add-subject-section">
          <h3>Add New Lab</h3>
          <div className="add-input-group">
            <input
              type="text"
              value={newLab}
              onChange={(e) => setNewLab(e.target.value)}
              placeholder="Enter lab name..."
              onKeyPress={(e) => e.key === "Enter" && addLab()}
              className="subject-input"
            />
            <button onClick={addLab} className="add-btn add-lab-btn">
              Add Lab
            </button>
          </div>
        </div>

        <div className="subjects-grid">
          {labs.length > 0 ? (
            labs.map((lab) => {
              const attendance = calculateAttendance(lab.attended, lab.total);
              const needed = calculateNeeded(lab.attended, lab.total, targetPercentage);
              const isTargetMet = attendance >= targetPercentage;

              return (
                <div key={lab.id} className="subject-card lab-card">
                  <div className="subject-header">
                    <h3>{lab.name}</h3>
                    <button
                      className="delete-btn"
                      onClick={() => removeLab(lab.id)}
                      title="Remove lab"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="attendance-display">
                    <p className={`attendance-percentage ${isTargetMet ? "green" : "red"}`}>
                      {attendance}%
                    </p>
                  </div>

                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill"
                      style={{ width: `${Math.min(attendance, 100)}%` }}
                    ></div>
                  </div>

                  <div className="input-group">
                    <label>Labs Attended:</label>
                    <div className="input-controls">
                      <button
                        onClick={() =>
                          updateLab(lab.id, "attended", lab.attended - 1)
                        }
                        className="control-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={lab.attended}
                        onChange={(e) =>
                          updateLab(lab.id, "attended", e.target.value)
                        }
                        className="class-input"
                      />
                      <button
                        onClick={() =>
                          updateLab(lab.id, "attended", lab.attended + 1)
                        }
                        className="control-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Total Labs:</label>
                    <div className="input-controls">
                      <button
                        onClick={() =>
                          updateLab(lab.id, "total", lab.total - 1)
                        }
                        className="control-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={lab.total}
                        onChange={(e) =>
                          updateLab(lab.id, "total", e.target.value)
                        }
                        className="class-input"
                      />
                      <button
                        onClick={() =>
                          updateLab(lab.id, "total", lab.total + 1)
                        }
                        className="control-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="classes-needed">
                    <label>Labs needed for {targetPercentage}%:</label>
                    <p className="needed-value">
                      {needed === "✅ Target Met" ? needed : `${needed} labs`}
                    </p>
                  </div>

                  <div className="eligibility-badge">
                    <label>Exam Eligibility:</label>
                    <p className={`eligibility-status-badge ${attendance >= 75 ? 'eligible' : 'not-eligible'}`}>
                      {attendance >= 75 ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-items">No labs added yet. Add a lab to get started!</p>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Attendance;
