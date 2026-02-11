import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './footer';
import './ExamSchedule.css';

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:5001/academicCalendar');
      const examData = response.data.filter(
        (event) =>
          event.category === 'Examination' ||
          (event.type && event.type.toLowerCase().includes('exam'))
      );
      setExams(examData.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const generateExamDetails = (examId) => {
    // Generate consistent but random-looking details based on exam ID
    const seed = examId.charCodeAt(examId.length - 1) + parseInt(examId.slice(-2));
    
    const buildings = ['PRP', 'TT', 'SJT', 'SCOPE', 'FRC', 'VLB', 'SSB', 'CFC'];
    const seatNumber = 101 + (seed * 7) % 200;
    const classNumber = 'A' + ((seed % 5) + 1);
    const building = buildings[seed % buildings.length];
    const roomNumber = 201 + (seed * 3) % 99;

    return {
      seatNumber,
      classNumber,
      building,
      roomNumber,
    };
  };

  const theoryExams = exams.filter((e) => e.type === 'Theory Exam' || e.type === 'Exam');
  const practicalExams = exams.filter((e) => e.type === 'Practical Exam' || e.type === 'Practical');

  const ExamCard = ({ exam }) => (
    <div className="exam-card" style={{ borderLeftColor: exam.color }}>
      <div className="exam-card-header">
        <h3>{exam.eventName}</h3>
        <span className={`exam-type-badge ${exam.type.toLowerCase().replace(' ', '-')}`}>
          {exam.type}
        </span>
      </div>
      <div className="exam-card-details">
        <div className="detail-row">
          <span className="detail-label">📅 Date:</span>
          <span className="detail-value">{formatDate(exam.date)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">📝 Category:</span>
          <span className="detail-value">{exam.category}</span>
        </div>
        {exam.description && (
          <div className="detail-row">
            <span className="detail-label">📌 Details:</span>
            <span className="detail-value">{exam.description}</span>
          </div>
        )}
      </div>

      <div className="exam-location-section">
        <h4>📍 Exam Location Details</h4>
        <div className="location-grid">
          <div className="location-item">
            <span className="location-label">🪑 Seat Number:</span>
            <span className="location-value">{generateExamDetails(exam.id).seatNumber}</span>
          </div>
          <div className="location-item">
            <span className="location-label">🏫 Class:</span>
            <span className="location-value">{generateExamDetails(exam.id).classNumber}</span>
          </div>
          <div className="location-item">
            <span className="location-label">🏢 Building:</span>
            <span className="location-value">{generateExamDetails(exam.id).building}</span>
          </div>
          <div className="location-item">
            <span className="location-label">🚪 Room:</span>
            <span className="location-value">{generateExamDetails(exam.id).roomNumber}</span>
          </div>
        </div>
      </div>

      <span className={`importance-badge ${exam.importance.toLowerCase()}`}>
        {exam.importance} Priority
      </span>
    </div>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="exam-schedule-page">
          <p>Loading exam schedule...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="exam-schedule-page">
        <div className="exam-schedule-header">
          <h1>🎓 Exam Schedule 2026-2027</h1>
          <p>All theory and practical exams for your registered courses</p>
        </div>

        {/* Filter Tabs */}
        <div className="exam-filter-tabs">
          <button
            className={`filter-tab ${filterType === 'All' ? 'active' : ''}`}
            onClick={() => setFilterType('All')}
          >
            All Exams ({exams.length})
          </button>
          <button
            className={`filter-tab ${filterType === 'Theory' ? 'active' : ''}`}
            onClick={() => setFilterType('Theory')}
          >
            Theory Exams ({theoryExams.length})
          </button>
          <button
            className={`filter-tab ${filterType === 'Practical' ? 'active' : ''}`}
            onClick={() => setFilterType('Practical')}
          >
            Practical Exams ({practicalExams.length})
          </button>
        </div>

        {/* Theory Exams Section */}
        {(filterType === 'All' || filterType === 'Theory') && theoryExams.length > 0 && (
          <div className="exam-section">
            <h2 className="section-title">📖 Theory Exams</h2>
            <div className="exam-cards-grid">
              {theoryExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </div>
        )}

        {/* Practical Exams Section */}
        {(filterType === 'All' || filterType === 'Practical') && practicalExams.length > 0 && (
          <div className="exam-section">
            <h2 className="section-title">🔬 Practical Exams</h2>
            <div className="exam-cards-grid">
              {practicalExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </div>
        )}

        {exams.length === 0 && (
          <div className="no-exams">
            <p>No exams scheduled yet</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ExamSchedule;
