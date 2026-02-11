import React, { useState } from 'react';
import Navbar from './Navbar';
import Fot from './footer';
import './grades.css';

const sampleGrades = [
  { code: 'CS201', name: 'Data Structures', grade: 'A', gradePoint: 9, credits: 4 },
  { code: 'CS202', name: 'Operating Systems', grade: 'A-', gradePoint: 8.5, credits: 4 },
  { code: 'CS301', name: 'Machine Learning', grade: 'B+', gradePoint: 8, credits: 3 },
  { code: 'CS302', name: 'Software Engineering', grade: 'A', gradePoint: 9, credits: 3 },
];

const gradeColors = {
  'A': { color: '#4caf50', value: 10 },
  'A-': { color: '#66bb6a', value: 9 },
  'B+': { color: '#fbc02d', value: 8 },
  'B': { color: '#ffb300', value: 7.5 },
  'B-': { color: '#ff9100', value: 7 },
  'C': { color: '#ff6f00', value: 6 },
};

const Grades = () => {
  const [viewMode, setViewMode] = useState('semester');

  // Calculate GPA
  const totalCredits = sampleGrades.reduce((sum, g) => sum + g.credits, 0);
  const totalPoints = sampleGrades.reduce((sum, g) => sum + (g.gradePoint * g.credits), 0);
  const gpa = (totalPoints / totalCredits).toFixed(2);

  const getGradeColor = (grade) => gradeColors[grade]?.color || '#9e9e9e';

  return (
    <div className="grades-wrapper">
      <Navbar />
      <div className="grades-page">
        <div className="grades-header">
          <h1>📊 Academic Grades</h1>
          <p>Your semester grades and academic performance</p>
        </div>

        {/* GPA Summary Section */}
        <div className="gpa-summary-section">
          <div className="gpa-card">
            <div className="gpa-value">{gpa}</div>
            <div className="gpa-label">Cumulative GPA</div>
          </div>
          <div className="gpa-stats">
            <div className="stat-item">
              <span className="stat-label">Total Credits</span>
              <span className="stat-value">{totalCredits}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Courses Completed</span>
              <span className="stat-value">{sampleGrades.length}</span>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'semester' ? 'active' : ''}`}
            onClick={() => setViewMode('semester')}
          >
            📑 Semester View
          </button>
          <button
            className={`toggle-btn ${viewMode === 'cumulative' ? 'active' : ''}`}
            onClick={() => setViewMode('cumulative')}
          >
            📈 Cumulative
          </button>
        </div>

        {/* Grades Grid */}
        <div className="grades-container">
          <h2 className="section-title">Current Semester Grades</h2>
          <div className="grades-grid">
            {sampleGrades.map((g) => (
              <div className="grade-card" key={g.code}>
                <div className="grade-card-header">
                  <div className="grade-code">{g.code}</div>
                  <div
                    className="grade-letter"
                    style={{ backgroundColor: getGradeColor(g.grade) }}
                  >
                    {g.grade}
                  </div>
                </div>
                <div className="grade-card-body">
                  <h3 className="course-name">{g.name}</h3>
                  <div className="grade-info">
                    <div className="info-row">
                      <span className="info-label">Grade Point:</span>
                      <span className="info-value">{g.gradePoint}/10</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Credits:</span>
                      <span className="info-value">{g.credits} CR</span>
                    </div>
                  </div>
                  <div className="grade-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(g.gradePoint / 10) * 100}%`,
                          backgroundColor: getGradeColor(g.grade),
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{(g.gradePoint / 10) * 100}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Scale Reference */}
        <div className="grade-scale-section">
          <h3 className="section-title">Grade Scale Reference</h3>
          <div className="grade-scale">
            {Object.entries(gradeColors).map(([grade, { color, value }]) => (
              <div key={grade} className="scale-item">
                <div className="scale-box" style={{ backgroundColor: color }}></div>
                <span className="scale-label">{grade}</span>
                <span className="scale-value">{value}/10</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grades-actions">
          <button className="btn btn-primary">⬇️ Download Transcript</button>
          <button className="btn btn-secondary">📊 View Full Grade History</button>
          <button className="btn btn-secondary">🖨️ Print Report</button>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Grades;
