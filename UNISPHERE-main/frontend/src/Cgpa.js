import React, { useState } from 'react';
import Navbar from './Navbar';
import Fot from './footer';
import './cgpa.css';

const Cgpa = () => {
  const [courses] = useState([
    // Semester 1
    { code: 'CS201', name: 'Data Structures', credits: 4, gradePoint: 9, semester: 1, grade: 'A' },
    { code: 'CS202', name: 'Operating Systems', credits: 4, gradePoint: 8.5, semester: 1, grade: 'A-' },
    { code: 'CS203', name: 'Database Systems', credits: 3, gradePoint: 9, semester: 1, grade: 'A' },
    
    // Semester 2
    { code: 'CS301', name: 'Machine Learning', credits: 3, gradePoint: 8, semester: 2, grade: 'B+' },
    { code: 'CS302', name: 'Software Engineering', credits: 3, gradePoint: 9, semester: 2, grade: 'A' },
    { code: 'CS303', name: 'Web Development', credits: 4, gradePoint: 8.5, semester: 2, grade: 'A-' },
  ]);

  const [selectedSemester, setSelectedSemester] = useState('all');

  // Calculate metrics
  const totalCredits = courses.reduce((s, c) => s + Number(c.credits), 0);
  const weightedSum = courses.reduce((s, c) => s + c.credits * c.gradePoint, 0);
  const cgpa = (weightedSum / totalCredits).toFixed(2);

  // Semester-wise calculations
  const semesterData = {};
  courses.forEach((course) => {
    if (!semesterData[course.semester]) {
      semesterData[course.semester] = {
        credits: 0,
        weighted: 0,
        courses: [],
      };
    }
    semesterData[course.semester].credits += course.credits;
    semesterData[course.semester].weighted += course.credits * course.gradePoint;
    semesterData[course.semester].courses.push(course);
  });

  const semesterGPAs = Object.entries(semesterData).map(([sem, data]) => ({
    semester: parseInt(sem),
    gpa: (data.weighted / data.credits).toFixed(2),
    credits: data.credits,
    courses: data.courses,
  }));

  // Filter courses
  const filteredCourses =
    selectedSemester === 'all'
      ? courses
      : courses.filter((c) => c.semester === parseInt(selectedSemester));

  const getGradeColor = (gp) => {
    if (gp >= 9) return '#4caf50';
    if (gp >= 8.5) return '#66bb6a';
    if (gp >= 8) return '#fbc02d';
    if (gp >= 7.5) return '#ffb300';
    return '#ff6f00';
  };

  return (
    <div className="cgpa-wrapper">
      <Navbar />
      <div className="cgpa-page">
        <div className="cgpa-header">
          <h1>📊 Academic Performance Tracker</h1>
          <p>Monitor your CGPA and semester-wise progress</p>
        </div>

        {/* Main CGPA Card */}
        <div className="cgpa-main-card">
          <div className="cgpa-large-container">
            <div className="cgpa-score">
              <div className="cgpa-number">{cgpa}</div>
              <div className="cgpa-label">Overall CGPA</div>
              <div className="cgpa-subtitle">out of 10.00</div>
            </div>

            <div className="cgpa-stats-grid">
              <div className="stat-box">
                <span className="stat-icon">📚</span>
                <span className="stat-title">Total Courses</span>
                <span className="stat-value">{courses.length}</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">⭐</span>
                <span className="stat-title">Total Credits</span>
                <span className="stat-value">{totalCredits}</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">📈</span>
                <span className="stat-title">Semesters</span>
                <span className="stat-value">{semesterGPAs.length}</span>
              </div>
            </div>
          </div>

          {/* CGPA Progress */}
          <div className="cgpa-progress-section">
            <h3>Performance Progress</h3>
            <div className="progress-bar-large">
              <div
                className="progress-fill-large"
                style={{
                  width: `${(cgpa / 10) * 100}%`,
                  backgroundColor: getGradeColor(cgpa),
                }}
              ></div>
            </div>
            <div className="progress-text-large">{(cgpa / 10) * 100}% Achievement</div>
          </div>
        </div>

        {/* Semester-wise GPA */}
        <div className="semester-gpa-section">
          <h2 className="section-title">📋 Semester-wise GPA</h2>
          <div className="semester-cards">
            {semesterGPAs.map((sem) => (
              <div
                key={sem.semester}
                className={`semester-card ${selectedSemester === String(sem.semester) ? 'active' : ''}`}
                onClick={() =>
                  setSelectedSemester(selectedSemester === String(sem.semester) ? 'all' : String(sem.semester))
                }
              >
                <div className="sem-header">
                  <span className="sem-label">Semester {sem.semester}</span>
                  <span className="sem-gpa">{sem.gpa}</span>
                </div>
                <div className="sem-details">
                  <span className="sem-courses">{sem.courses.length} Courses</span>
                  <span className="sem-credits">{sem.credits} Credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course List */}
        <div className="courses-section">
          <h2 className="section-title">
            📚 Courses {selectedSemester !== 'all' && `(Semester ${selectedSemester})`}
          </h2>
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.code} className="course-card">
                <div className="course-header">
                  <div className="course-info">
                    <h4 className="course-code">{course.code}</h4>
                    <p className="course-name">{course.name}</p>
                  </div>
                  <div
                    className="grade-badge"
                    style={{ backgroundColor: getGradeColor(course.gradePoint) }}
                  >
                    {course.grade}
                  </div>
                </div>

                <div className="course-metrics">
                  <div className="metric">
                    <span className="metric-label">Grade Point</span>
                    <span className="metric-value">{course.gradePoint}/10</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Credits</span>
                    <span className="metric-value">{course.credits}</span>
                  </div>
                </div>

                <div className="course-progress">
                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill"
                      style={{
                        width: `${(course.gradePoint / 10) * 100}%`,
                        backgroundColor: getGradeColor(course.gradePoint),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="performance-summary">
          <h2 className="section-title">📊 Performance Summary</h2>
          <div className="summary-grid">
            <div className="summary-item high">
              <span className="summary-label">Excellent (A)</span>
              <span className="summary-count">{courses.filter((c) => c.gradePoint >= 9).length}</span>
            </div>
            <div className="summary-item good">
              <span className="summary-label">Very Good (A-/B+)</span>
              <span className="summary-count">{courses.filter((c) => c.gradePoint >= 8 && c.gradePoint < 9).length}</span>
            </div>
            <div className="summary-item avg">
              <span className="summary-label">Average (B)</span>
              <span className="summary-count">{courses.filter((c) => c.gradePoint < 8).length}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cgpa-actions">
          <button className="btn btn-primary">📊 Download Report</button>
          <button className="btn btn-secondary">✉️ Email to Faculty</button>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Cgpa;
