import React from "react";
import "./footer.css";


const defooter = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i class='bx bxl-instagram'></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i class='bx bxl-twitter'></i>
                </a>
                <div>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
                <p>&copy; 2025 Engoulp. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default defooter;