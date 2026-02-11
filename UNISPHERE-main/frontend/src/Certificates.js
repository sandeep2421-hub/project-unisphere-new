import React from 'react';
import Navbar from './Navbar';
import Fot from './footer';
import './certificates.css';

const certificates = [
  { id: 'c1', title: 'Course Completion - Data Structures', date: '2025-12-15' },
  { id: 'c2', title: 'ML Workshop Certificate', date: '2026-02-05' },
];

const Certificates = () => {
  return (
    <div>
      <Navbar />
      <div className="cert-page">
        <h1>📜 Certificates</h1>
        <p className="muted">Download or share your official certificates.</p>

        <div className="cert-list">
          {certificates.map((c) => (
            <div className="cert-card" key={c.id}>
              <div>
                <h3>{c.title}</h3>
                <p className="muted">Issued: {c.date}</p>
              </div>
              <div className="cert-actions">
                <button className="btn">Download</button>
                <button className="btn">Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Certificates;
