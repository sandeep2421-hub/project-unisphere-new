import React, { useState, useEffect } from "react";
import "./LibraryDetails.css";
import Navbar from "./Navbar";
import Fot from "./footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LibraryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [daysToKeep, setDaysToKeep] = useState(14);
  const [issued, setIssued] = useState(false);
  const [issueMessage, setIssueMessage] = useState("");

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleIssueBook = async () => {
    if (book.availability === "Unavailable") {
      setIssueMessage("Sorry! This book is currently unavailable.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const issueRecord = {
        id: Math.random().toString(36).substr(2, 9),
        bookId: book.id,
        bookTitle: book.title,
        userName: user.name,
        userEmail: user.email,
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + daysToKeep * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "Issued",
      };

      // Show success message
      setIssued(true);
      setIssueMessage(
        `✅ Book successfully issued! Return by ${issueRecord.dueDate}`
      );

      // Reset after 2 seconds
      setTimeout(() => {
        navigate("/library");
      }, 2000);
    } catch (error) {
      setIssueMessage("Failed to issue book. Please try again.");
      console.error("Error issuing book:", error);
    }
  };

  if (!book) {
    return (
      <div className="library-details-page">
        <Navbar />
        <div className="library-details-container">
          <p>Loading book details...</p>
        </div>
        <Fot />
      </div>
    );
  }

  return (
    <div className="library-details-page">
      <Navbar />
      <div className="library-details-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/library")}>
          ← Back to Library
        </button>

        <div className="book-details-wrapper">
          {/* Book Cover Section */}
          <div className="book-cover-section">
            <div className="book-cover-large">
              <p className="book-initial-large">{book.title.charAt(0)}</p>
              <p className="book-category-large">{book.category}</p>
              <p className="book-year">{book.year}</p>
            </div>
            {book.availability === "Unavailable" && (
              <div className="status-badge unavailable">❌ Out of Stock</div>
            )}
            {book.copies > 0 && (
              <div className="status-badge available">✅ Available</div>
            )}
          </div>

          {/* Book Information Section */}
          <div className="book-info-section">
            <h1 className="book-title-large">{book.title}</h1>

            <div className="book-author-info">
              <p className="book-author-label">By</p>
              <p className="book-author-large">{book.author}</p>
            </div>

            {/* Rating */}
            <div className="book-rating-section">
              <div className="rating">
                <span className="stars">
                  {"⭐".repeat(Math.floor(book.rating))}
                </span>
                <span className="rating-value">{book.rating}</span>
              </div>
              <p className="reviews-count">({book.reviews} reader reviews)</p>
            </div>

            {/* Publication Details */}
            <div className="publication-details">
              <h3>Publication Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Publisher</label>
                  <p>{book.publisher}</p>
                </div>
                <div className="detail-item">
                  <label>Edition</label>
                  <p>{book.edition}</p>
                </div>
                <div className="detail-item">
                  <label>Year</label>
                  <p>{book.year}</p>
                </div>
                <div className="detail-item">
                  <label>Pages</label>
                  <p>{book.pages}</p>
                </div>
              </div>
            </div>

            {/* Library Information */}
            <div className="library-info">
              <h3>Library Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>📞 Call Number</label>
                  <p>{book.callNumber}</p>
                </div>
                <div className="info-item">
                  <label>📍 Location</label>
                  <p>{book.location}</p>
                </div>
                <div className="info-item">
                  <label>📚 ISBN</label>
                  <p>{book.isbn}</p>
                </div>
                <div className="info-item">
                  <label>✅ Availability</label>
                  <p className={book.availability === "Available" ? "available" : "unavailable"}>
                    {book.availability === "Available"
                      ? `${book.copies} copies available`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>

            {/* Issue Book Section */}
            <div className="issue-book-section">
              <h3>Issue This Book</h3>

              {!issued ? (
                <div className="issue-form">
                  <div className="form-group">
                    <label htmlFor="days">Keep for (days):</label>
                    <select
                      id="days"
                      value={daysToKeep}
                      onChange={(e) => setDaysToKeep(parseInt(e.target.value))}
                      className="days-select"
                    >
                      <option value={7}>7 days</option>
                      <option value={14}>14 days (Default)</option>
                      <option value={21}>21 days</option>
                      <option value={30}>30 days</option>
                    </select>
                  </div>

                  <div className="issue-info">
                    <p className="issue-date">
                      📅 Issue Date: {new Date().toISOString().split("T")[0]}
                    </p>
                    <p className="due-date">
                      📅 Due Date:{" "}
                      {new Date(Date.now() + daysToKeep * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]}
                    </p>
                  </div>

                  <button
                    className={`issue-btn ${book.availability === "Unavailable" ? "disabled" : ""}`}
                    onClick={handleIssueBook}
                    disabled={book.availability === "Unavailable"}
                  >
                    {book.availability === "Available"
                      ? "📥 Issue Book"
                      : "❌ Not Available"}
                  </button>
                </div>
              ) : (
                <div className="issue-success">
                  <div className="success-icon">✅</div>
                  <p className="success-message">{issueMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="related-section">
          <h3>More in {book.category}</h3>
          <p className="related-text">
            Browse other books in the {book.category} category
          </p>
          <button className="browse-category-btn" onClick={() => navigate("/library")}>
            Browse All Books →
          </button>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default LibraryDetails;
