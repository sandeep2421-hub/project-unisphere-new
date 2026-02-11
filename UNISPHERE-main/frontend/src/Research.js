import React, { useState } from 'react';
import Navbar from './Navbar';
import Fot from './footer';
import './research.css';

const researchPapers = [
  {
    id: 'r1',
    title: 'Efficient Machine Learning Models for Edge Computing in IoT Devices',
    authors: ['Dr. Rajesh Kumar', 'Priya Sharma', 'You'],
    year: 2025,
    category: 'Machine Learning',
    status: 'Published',
    abstract: 'This paper presents optimized ML models designed specifically for edge computing environments, reducing latency and power consumption in IoT applications.',
    citations: 12,
    doi: '10.1234/ml.edge.2025',
    conference: 'IEEE IoT Summit 2025',
    keywords: ['Machine Learning', 'Edge Computing', 'IoT', 'Optimization'],
    progress: 100,
  },
  {
    id: 'r2',
    title: 'Secure Routing Protocols in Wireless Sensor Networks Using Blockchain',
    authors: ['Dr. Arun Singh', 'You', 'Vikram Patel'],
    year: 2024,
    category: 'Cybersecurity',
    status: 'Published',
    abstract: 'A novel blockchain-based routing protocol that enhances security in WSNs while maintaining energy efficiency and network throughput.',
    citations: 8,
    doi: '10.5678/security.routing.2024',
    conference: 'International Conference on Network Security 2024',
    keywords: ['Blockchain', 'Routing', 'Security', 'WSN'],
    progress: 100,
  },
  {
    id: 'r3',
    title: 'Deep Learning Approaches for Real-time Disease Detection in Agricultural Crops',
    authors: ['Dr. Meera Desai', 'Anjali Gupta', 'You'],
    year: 2024,
    category: 'Deep Learning',
    status: 'Published',
    abstract: 'Implementing CNN and transfer learning techniques for automated detection of crop diseases with 94.5% accuracy, enabling farmers to take preventive measures early.',
    citations: 15,
    doi: '10.9012/agri.dl.2024',
    conference: 'International Symposium on Smart Agriculture 2024',
    keywords: ['Deep Learning', 'Agriculture', 'CNN', 'Transfer Learning'],
    progress: 100,
  },
  {
    id: 'r4',
    title: 'Quantum Computing Applications in Optimization Problems',
    authors: ['Dr. Suresh Verma', 'You'],
    year: 2024,
    category: 'Quantum Computing',
    status: 'Under Review',
    abstract: 'Exploring quantum algorithms for solving NP-hard optimization problems with potential speedup over classical algorithms.',
    citations: 3,
    doi: 'Pending',
    conference: 'Journal of Quantum Computing',
    keywords: ['Quantum', 'Algorithms', 'Optimization', 'Complexity'],
    progress: 75,
  },
  {
    id: 'r5',
    title: 'Federated Learning for Privacy-Preserving Distributed Machine Learning',
    authors: ['You', 'Neha Chatterjee', 'Dr. Vijay Nair'],
    year: 2023,
    category: 'Machine Learning',
    status: 'Published',
    abstract: 'A comprehensive framework for federated learning that maintains data privacy while enabling collaborative model training across distributed nodes.',
    citations: 22,
    doi: '10.3456/privacy.ml.2023',
    conference: 'International Conference on Machine Learning (ICML) 2023',
    keywords: ['Federated Learning', 'Privacy', 'Distributed ML', 'Cryptography'],
    progress: 100,
  },
  {
    id: 'r6',
    title: 'Natural Language Processing for Low-Resource Language Translation',
    authors: ['Dr. Priya Nair', 'You', 'Rohit Kumar'],
    year: 2025,
    category: 'NLP',
    status: 'In Progress',
    abstract: 'Developing improved NLP models for accurate translation of low-resource languages using transfer learning and data augmentation techniques.',
    citations: 0,
    doi: 'Pending',
    conference: 'ACL 2025 (Submitted)',
    keywords: ['NLP', 'Translation', 'Transfer Learning', 'Low-Resource'],
    progress: 60,
  },
  {
    id: 'r7',
    title: 'Smart City Infrastructure Using Autonomous Agents and Multi-Agent Systems',
    authors: ['Dr. Ravi Sharma', 'You', 'Pooja Singh', 'Arjun Patel'],
    year: 2024,
    category: 'AI/Robotics',
    status: 'Published',
    abstract: 'Implementing multi-agent system architecture for intelligent traffic management, waste management, and energy optimization in smart cities.',
    citations: 10,
    doi: '10.7890/smartcity.2024',
    conference: 'IEEE SmartCity Conference 2024',
    keywords: ['Multi-Agent Systems', 'Smart City', 'AI', 'IoT'],
    progress: 100,
  },
  {
    id: 'r8',
    title: 'Augmented Reality Applications in Medical Diagnosis and Surgical Training',
    authors: ['You', 'Dr. Anand Joshi', 'Shreya Nambiar'],
    year: 2025,
    category: 'AR/VR',
    status: 'In Progress',
    abstract: 'Developing AR-based tools for surgical training and diagnostic imaging, with potential to improve surgical outcomes and reduce training time.',
    citations: 2,
    doi: 'Pending',
    conference: 'Medical Imaging Summit 2025 (Under Review)',
    keywords: ['AR', 'Medical', 'Surgery', 'Imaging'],
    progress: 80,
  },
];

const Research = () => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', 'Machine Learning', 'Deep Learning', 'Cybersecurity', 'Quantum Computing', 'NLP', 'AI/Robotics', 'AR/VR'];
  const statuses = ['All', 'Published', 'Under Review', 'In Progress'];

  const filteredPapers = researchPapers.filter((paper) => {
    const categoryMatch = filterCategory === 'All' || paper.category === filterCategory;
    const statusMatch = filterStatus === 'All' || paper.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Published': '#4caf50',
      'Under Review': '#ff9800',
      'In Progress': '#2196f3',
    };
    return colors[status] || '#9e9e9e';
  };

  const stats = {
    total: researchPapers.length,
    published: researchPapers.filter(p => p.status === 'Published').length,
    underReview: researchPapers.filter(p => p.status === 'Under Review').length,
    inProgress: researchPapers.filter(p => p.status === 'In Progress').length,
  };

  const ResearchCard = ({ paper }) => (
    <div className="research-card">
      <div className="research-card-header">
        <h3 className="research-title">{paper.title}</h3>
        <span className="status-badge" style={{ background: getStatusColor(paper.status) }}>
          {paper.status}
        </span>
      </div>

      <div className="research-meta">
        <span className="category-badge">{paper.category}</span>
        <span className="year-badge">{paper.year}</span>
      </div>

      <p className="research-abstract">{paper.abstract}</p>

      <div className="research-authors">
        <strong>Authors:</strong> {paper.authors.join(', ')}
      </div>

      <div className="research-conference">
        <strong>Venue:</strong> {paper.conference}
      </div>

      <div className="research-keywords">
        {paper.keywords.map((keyword, idx) => (
          <span key={idx} className="keyword-tag">{keyword}</span>
        ))}
      </div>

      <div className="research-stats">
        <div className="stat-item">
          <span className="stat-label">Citations</span>
          <span className="stat-value">{paper.citations}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Progress</span>
          <span className="stat-value">{paper.progress}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">DOI</span>
          <span className="stat-value">{paper.doi}</span>
        </div>
      </div>

      <div className="research-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${paper.progress}%` }}></div>
        </div>
      </div>

      <div className="research-actions">
        <button className="btn-secondary">View Paper</button>
        <button className="btn-secondary">View Details</button>
      </div>
    </div>
  );

  return (
    <div className="research-wrapper">
      <Navbar />
      <div className="research-page">
        <div className="research-header">
          <h1>🔬 Research & Publications</h1>
          <p>Your published papers, ongoing research, and academic contributions.</p>
        </div>

        <div className="research-stats-section">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-text">Total Papers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#4caf50' }}>{stats.published}</div>
            <div className="stat-text">Published</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#ff9800' }}>{stats.underReview}</div>
            <div className="stat-text">Under Review</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#2196f3' }}>{stats.inProgress}</div>
            <div className="stat-text">In Progress</div>
          </div>
        </div>

        <div className="research-controls">
          <div className="filter-section">
            <label>Category:</label>
            <div className="filter-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Status:</label>
            <div className="filter-buttons">
              {statuses.map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
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
              ≡ List
            </button>
          </div>
        </div>

        <div className={`research-container ${viewMode === 'grid' ? 'research-grid' : 'research-list'}`}>
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper) => (
              <ResearchCard key={paper.id} paper={paper} />
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ fontSize: '18px', color: '#666' }}>No research papers found with selected filters.</p>
            </div>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Research;
