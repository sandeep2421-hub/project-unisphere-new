import React from "react";
import "./footer.css";


const defooter = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.instagram.com/sandeepkumar_2421/" target="_blank" rel="noopener noreferrer">
                    <i class='bx bxl-instagram'></i>
                </a>
                <a href="mailto:kotasandeepkumar2006@gmail.com">
                    <i class='bx bx-envelope'></i>
                </a>
                <div>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
                <p>&copy; 2025 UniSphere. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default defooter;