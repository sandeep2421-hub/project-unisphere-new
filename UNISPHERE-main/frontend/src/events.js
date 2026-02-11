import React, { useState, useEffect } from "react";
import Navigation from "./Navbar";
import axios from "axios";
import "./events.css";
import Fot from "./footer";

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/events")
            .then(response => setEvents(response.data))
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    return (
        <div className="events-container">
            <Navigation />
            <h1 className="events-title">Upcoming Events & Fests</h1>
            <p className="events-subtitle">Stay updated with university events across India!</p>

            <div className="events-list">
                {events.map(event => (
                    <div key={event.id} className="event-card" style={{ backgroundImage: `url(/images/${event.background})` }}>
                        <div className="event-content">
                            <h3>{event.name}</h3>
                            <p><strong>📍 Hosted by:</strong> {event.university}</p>
                            <p><strong>📅 Date:</strong> {event.date}</p>
                            <p>{event.description}</p>
                            <div className="event-buttons">
                                <button className="explore-btn1">Register</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Fot/>
        </div>
    );
};

export default EventsPage;
