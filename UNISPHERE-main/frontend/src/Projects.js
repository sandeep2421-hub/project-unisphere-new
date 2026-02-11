import React, { useState } from 'react';
import Navbar from './Navbar';
import Fot from './footer';
import './Projects.css';

const sampleProjects = [
  {
    id: 'p1',
    title: 'Smart Irrigation System',
    description: 'IoT-based irrigation system using sensors and ML for smart watering optimization',
    role: 'Team Lead',
    status: 'Completed',
    category: 'Hardware Project',
    technologies: ['IoT', 'Python', 'Arduino', 'ML'],
    members: 4,
    startDate: '2025-08-15',
    endDate: '2025-12-20',
    progress: 100,
  },
  {
    id: 'p2',
    title: 'Campus Chat Application',
    description: 'Real-time messaging platform for university community with file sharing',
    role: 'Member',
    status: 'Ongoing',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    members: 5,
    startDate: '2025-10-01',
    endDate: '2026-03-31',
    progress: 65,
  },
  {
    id: 'p3',
    title: 'Traffic Management System',
    description: 'Computer vision-based traffic signal optimization using video analytics',
    role: 'Team Lead',
    status: 'Ongoing',
    category: 'Computer Vision',
    technologies: ['OpenCV', 'Python', 'TensorFlow', 'Keras'],
    members: 3,
    startDate: '2025-09-10',
    endDate: '2026-04-15',
    progress: 55,
  },
  {
    id: 'p4',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment gateway and admin panel',
    role: 'Backend Developer',
    status: 'Ongoing',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    members: 6,
    startDate: '2025-11-01',
    endDate: '2026-05-01',
    progress: 45,
  },
  {
    id: 'p5',
    title: 'Machine Learning Model for Disease Prediction',
    description: 'Predictive ML model for early disease detection using patient health data',
    role: 'Member',
    status: 'Completed',
    category: 'Data Science',
    technologies: ['Python', 'Sklearn', 'Pandas', 'Matplotlib'],
    members: 4,
    startDate: '2025-07-01',
    endDate: '2025-10-15',
    progress: 100,
  },
  {
    id: 'p6',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    role: 'Member',
    status: 'Planning',
    category: 'Mobile App',
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    members: 5,
    startDate: '2026-02-01',
    endDate: '2026-06-30',
    progress: 10,
  },
  {
    id: 'p7',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain management using blockchain technology',
    role: 'Team Lead',
    status: 'Completed',
    category: 'Blockchain',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    members: 4,
    startDate: '2025-06-01',
    endDate: '2025-11-30',
    progress: 100,
  },
  {
    id: 'p8',
    title: 'Virtual Reality Campus Tour',
    description: 'Immersive VR experience for campus exploration and student onboarding',
    role: 'Member',
    status: 'Ongoing',
    category: 'VR/AR',
    technologies: ['Unity', 'C#', 'Blender', 'VR SDK'],
    members: 3,
    startDate: '2025-10-15',
    endDate: '2026-04-30',
    progress: 72,
  },
];

const statusColors = {
  Completed: { bg: '#4caf50', light: 'rgba(76, 175, 80, 0.1)' },
  Ongoing: { bg: '#ff9800', light: 'rgba(255, 152, 0, 0.1)' },
  Planning: { bg: '#2196f3', light: 'rgba(33, 150, 243, 0.1)' },
};

const Projects = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProjects =
    filterStatus === 'All'
      ? sampleProjects
      : sampleProjects.filter((p) => p.status === filterStatus);

  const getStatusColor = (status) => statusColors[status] || statusColors.Planning;

  return (
    <div className="projects-wrapper">
      <Navbar />
      <div className="projects-page">
        <div className="projects-header">
          <h1>📂 Projects & Portfolio</h1>
          <p>Manage and showcase your academic and professional projects</p>
        </div>

        {/* Stats Section */}
        <div className="projects-stats">
          <div className="stat-card">
            <span className="stat-icon">📊</span>
            <span className="stat-label">Total Projects</span>
            <span className="stat-value">{sampleProjects.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <span className="stat-label">Completed</span>
            <span className="stat-value">{sampleProjects.filter((p) => p.status === 'Completed').length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{sampleProjects.filter((p) => p.status === 'Ongoing').length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <span className="stat-label">Total Contributors</span>
            <span className="stat-value">{new Set(sampleProjects.flatMap((p) => Array(p.members))).size}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="projects-controls">
          <div className="filter-buttons">
            {['All', 'Completed', 'Ongoing', 'Planning'].map((status) => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="view-buttons">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰ List
            </button>
          </div>
        </div>

        {/* Projects Display */}
        <div className={`projects-container projects-${viewMode}`}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                style={{ borderLeftColor: getStatusColor(project.status).bg }}
              >
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <span
                    className="status-badge"
                    style={{
                      background: getStatusColor(project.status).light,
                      color: getStatusColor(project.status).bg,
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="project-meta">
                  <span className="meta-item">
                    <span className="meta-icon">📁</span>
                    {project.category}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">👤</span>
                    {project.role}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">👥</span>
                    {project.members} members
                  </span>
                </div>

                <div className="technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Progress</span>
                    <span className="progress-percent">{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: getStatusColor(project.status).bg,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="project-dates">
                  <div className="date-item">
                    <span className="date-label">Start:</span>
                    <span className="date-value">
                      {new Date(project.startDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">End:</span>
                    <span className="date-value">
                      {new Date(project.endDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="project-actions">
                  <button className="action-btn primary">👁️ View</button>
                  <button className="action-btn secondary">💾 Save</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-projects">
              <p>No projects found with selected filter</p>
            </div>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Projects;
