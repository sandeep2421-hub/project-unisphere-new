import React, { useState, useEffect } from "react";
import "./Library.css";
import Navbar from "./Navbar";
import Fot from "./footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAvailability, setFilterAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const categories = ["All", ...new Set(books.map((book) => book.category))];

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "All" || book.category === filterCategory;

      const matchesAvailability =
        filterAvailability === "All" || book.availability === filterAvailability;

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "author") {
        return a.author.localeCompare(b.author);
      } else if (sortBy === "year") {
        return b.year - a.year;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.availability === "Available").length;
  const categories_count = new Set(books.map((b) => b.category)).size;

  return (
    <div className="library-page">
      <Navbar />
      <div className="library-container">
        <div className="library-header">
          <h1>📚 Central Library</h1>
          <p>Your gateway to knowledge and learning resources</p>
        </div>

        {/* Library Stats */}
        <div className="library-stats">
          <div className="stat-item">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <p className="stat-label">Total Books</p>
              <p className="stat-value">{totalBooks}</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <p className="stat-label">Available</p>
              <p className="stat-value">{availableBooks}</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <p className="stat-label">Categories</p>
              <p className="stat-value">{categories_count}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="library-search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        {/* Filters */}
        <div className="library-filters">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Availability:</label>
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="year">Latest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div
                  className="book-cover"
                  onClick={() => navigate(`/library/${book.id}`)}
                >
                  <div className="book-cover-content">
                    <p className="book-initial">{book.title.charAt(0)}</p>
                    <p className="book-category">{book.category}</p>
                  </div>
                  {book.availability === "Unavailable" && (
                    <div className="unavailable-overlay">Out of Stock</div>
                  )}
                </div>

                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>

                  <div className="book-meta">
                    <span className="meta-item">
                      <strong>Edition:</strong> {book.edition}
                    </span>
                    <span className="meta-item">
                      <strong>Year:</strong> {book.year}
                    </span>
                  </div>

                  <div className="book-rating">
                    <span className="stars">
                      {"⭐".repeat(Math.floor(book.rating))}
                    </span>
                    <span className="rating-value">{book.rating}</span>
                    <span className="reviews">({book.reviews} reviews)</span>
                  </div>

                  <div className="book-availability">
                    <span
                      className={`availability-badge ${book.availability === "Available" ? "available" : "unavailable"}`}
                    >
                      {book.availability === "Available"
                        ? "✅ Available"
                        : "❌ Unavailable"}
                    </span>
                    <span className="copies">{book.copies} copies</span>
                  </div>

                  <div className="book-price">{book.price}</div>

                  <button
                    className="view-btn"
                    onClick={() => navigate(`/library/${book.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-books">
              <p>📚 No books found matching your criteria.</p>
              <p>Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Library;
