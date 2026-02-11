import React, { useState, useEffect } from "react";
import "./Qp.css";
import axios from "axios";
import Navbar from "./Navbar";
import Fot from "./footer";

const QuestionPapers = () => {
    const [papers, setPapers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        axios.get("http://localhost:5001/questionPapers")
            .then(response => setPapers(response.data))
            .catch(error => console.error("Error fetching question papers:", error));
    }, []);

    const fp = papers.filter(paper =>
        (selectedCategory === "All" || paper.category === selectedCategory) &&
        (paper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.university.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <Navbar />
            <div className="question-papers-container">
                <h1 className="qp-title">📚 Question Papers</h1>
                <p className="qp-subtitle">Access previous years' question papers for better preparation!</p>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by subject or university..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filters">
                    {["All", "CSE", "ECE", "EEE", "Mechanical", "Civil"].map(category => (
                        <button
                            key={category}
                            className="filter-btn"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="qp-list">
                    {fp.map(paper => (
                        <div key={paper.id} className="qp-card">
                            <h3>{paper.name}</h3>
                            <p><strong>🏛 University:</strong> {paper.university}</p>
                            <p><strong>📅 Year:</strong> {paper.year}</p>
                            <a href={paper.url} download className="download-btn">
                                📥 Download
                            </a>
                        </div>
                    ))}
                </div>

                <div className="trending-papers">
                    <h2 className="trending-title">🔥 Trending Papers</h2>
                    {papers.slice(0, 3).map(paper => (
                        <p key={paper.id}>📌 {paper.name} - {paper.university} ({paper.year})</p>
                    ))}
                </div>

                <Fot />
            </div>
        </div>
    );
};

export default QuestionPapers;
