import React from 'react';
import Navigation from './Navbar';
import './UnisphereHub.css';
import chatIcon from './icons/bubble-chat.png';
import universityIcon from './icons/graduation.png';
import eventsIcon from './icons/online-conference.png';
import hackathonIcon from './icons/hackathon.png';
import papersIcon from './icons/question.png';
import Fot from "./footer";

const UnisphereHub = () => {
    return (
        <div className="unisphere-hub-container">
            <Navigation /> 

            <h1 className="hub-title">Unisphere Hub</h1>
            <p className="hub-subtitle">Unite, Collaborate, and Explore with Students Across India!</p>

            <div className="hub-sections">
                <div className="hub-section">
                    <img src={chatIcon} alt="Chat" />
                    <h2>Chat & Collaboration</h2>
                    <p>Public Chat.</p>
                    <a href="/chat">Join Chat</a>
                </div>

                <div className="hub-section">
                    <img src={chatIcon} alt="Chat" />
                    <h2>Chat & Collaboration</h2>
                    <p>Study Related Discussions and Sharing.</p>
                    <a href="/chatfe">Join Chat</a>
                </div>

                <div className="hub-section">
                    <img src={universityIcon} alt="Universities" />
                    <h2>💼 Internship & Jobs</h2>
                    <p>Get Tips, Information on Job postings.</p>
                    <a href="/internships">Enter</a>
                </div>

                <div className="hub-section">
                    <img src={eventsIcon} alt="Events" />
                    <h2>Events & Fests</h2>
                    <p>Stay updated with university events and cultural fests.</p>
                    <a href="/events">View Events</a>
                </div>

                <div className="hub-section">
                    <img src={hackathonIcon} alt="Hackathons" />
                    <h2>Hackathons</h2>
                    <p>Find and participate in upcoming coding hackathons.</p>
                    <a href="/hackathons">Register</a>
                </div>

                <div className="hub-section">
                    <img src={papersIcon} alt="Question Papers" />
                    <h2>Question Papers</h2>
                    <p>Access previous year university question papers.</p>
                    <a href="/qs">Enter</a>
                </div>

                <div className="hub-section">
                    <img src={papersIcon} alt="Attendance" />
                    <h2>📊 Attendance Calculator</h2>
                    <p>Track and calculate your attendance percentage.</p>
                    <a href="/attendance">Calculate</a>
                </div>

                <div className="hub-section">
                    <img src={papersIcon} alt="Library" />
                    <h2>📚 Central Library</h2>
                    <p>Browse and issue books from our central library.</p>
                    <a href="/library">Explore Library</a>
                </div>

                

            </div>
            <Fot/>
        </div>
    );
};

export default UnisphereHub;
