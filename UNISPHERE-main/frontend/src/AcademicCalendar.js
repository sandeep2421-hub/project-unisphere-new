import React, { useState, useEffect, useMemo } from "react";
import "./AcademicCalendar.css";
import Navbar from "./Navbar";
import Fot from "./footer";
import axios from "axios";

const AcademicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterImportance, setFilterImportance] = useState("All");

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/academicCalendar");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      setSelectedMonth(new Date(selectedDateObj.getFullYear(), selectedDateObj.getMonth()));
    }
  }, [selectedDate]);

  const categories = ["All", ...new Set(events.map((e) => e.category))];
  const importances = ["All", "High", "Medium", "Low"];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        filterCategory === "All" || event.category === filterCategory;
      const matchesImportance =
        filterImportance === "All" || event.importance === filterImportance;
      return matchesCategory && matchesImportance;
    });
  }, [events, filterCategory, filterImportance]);

  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const examEvents = filteredEvents
    .filter(
      (event) =>
        event.category === "Examination" ||
        (event.type && event.type.toLowerCase().includes("exam"))
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getEventsByDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredEvents.filter((event) => event.date === dateStr);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Convert Sunday (0) to 6, so Monday is 0
    return day === 0 ? 6 : day - 1;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const days = [];

    // Empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        day
      );
      const dateStr = date.toISOString().split("T")[0];
      const dayEvents = getEventsByDate(date);
      const isToday =
        new Date().toISOString().split("T")[0] === dateStr;
      const isSunday = date.getDay() === 0;
      const isSelected = selectedDate === dateStr;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`calendar-day ${isToday ? "today" : ""} ${
            dayEvents.length > 0 ? "has-events" : ""
          } ${isSunday ? "sunday" : ""} ${isSelected ? "selected" : ""}`}
        >
          <div className="day-number">{day}</div>
        </div>
      );
    }

    return days;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };



  const monthYear = selectedMonth.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="academic-calendar-page">
      <Navbar />
      <div className="academic-calendar-container">
        <div className="calendar-header">
          <h1>📅 Academic Calendar 2026-2027</h1>
          <p>Important dates, exams, holidays, and university events</p>
        </div>

        {/* Filters */}
        <div className="calendar-controls">
          <div className="filter-controls">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={filterImportance}
              onChange={(e) => setFilterImportance(e.target.value)}
              className="filter-select"
            >
              {importances.map((imp) => (
                <option key={imp} value={imp}>
                  {imp === "All" ? "All Importance" : `${imp} Importance`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="selected-date-section">
            <h3>📅 Events on {formatDate(selectedDate)}</h3>
            {getEventsByDate(new Date(selectedDate)).length > 0 ? (
              <div className="date-events-list">
                {getEventsByDate(new Date(selectedDate)).map((event) => (
                  <div key={event.id} className="date-event-card">
                    <div
                      className="date-event-color"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <div className="date-event-content">
                      <h4>{event.eventName}</h4>
                      <p className="event-category">{event.category}</p>
                      <p className="event-type">{event.type}</p>
                      {event.description && (
                        <p className="event-description">{event.description}</p>
                      )}
                    </div>
                    <span className={`importance-badge ${event.importance.toLowerCase()}`}>
                      {event.importance}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events-on-date">No events scheduled for this date</p>
            )}
          </div>
        )}

        {/* Calendar Month View */}
        <div className="calendar-view">
          <div className="calendar-header-nav">
            <button
              onClick={() =>
                setSelectedMonth(
                  new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1)
                )
              }
              className="nav-btn"
            >
              ←
            </button>
            <h2>{monthYear}</h2>
            <button
              onClick={() =>
                setSelectedMonth(
                  new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)
                )
              }
              className="nav-btn"
            >
              →
            </button>
          </div>

          <div className="calendar-weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className={`weekday ${day === "Sun" ? "sunday-header" : ""}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days">{renderCalendar()}</div>
        </div>

        {/* List View */}
        <div className="list-view">
          <h3>📝 All Events</h3>
          {filteredEvents.length > 0 ? (
            <div className="events-list">
              {filteredEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => (
                  <div key={event.id} className={`event-card ${event.date === selectedDate ? 'selected' : ''}`} onClick={() => setSelectedDate(event.date)} style={{ cursor: 'pointer' }}>
                    <div
                      className="card-color"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <div className="card-content">
                      <div className="card-header">
                        <h3>{event.eventName}</h3>
                        <span className={`importance-badge ${event.importance.toLowerCase()}`}>
                          {event.importance}
                        </span>
                      </div>
                      <p className="card-date">
                        📅 {formatDate(event.date)}
                      </p>
                      <p className="card-category">{event.category}</p>
                      <p className="card-type">{event.type}</p>
                      <p className="card-description">{event.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="no-events">No events found matching your filters</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-section">
          <h3>📌 Upcoming Events</h3>
          {upcomingEvents.length > 0 ? (
            <div className="upcoming-list">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="upcoming-item">
                  <div
                    className="event-color-bar"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div className="event-details">
                    <p className="event-name">{event.eventName}</p>
                    <p className="event-date">{formatDate(event.date)}</p>
                    <p className="event-type">{event.type}</p>
                  </div>
                  <span className={`importance-badge ${event.importance.toLowerCase()}`}>
                    {event.importance}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">No upcoming events</p>
          )}
        </div>
        {/* Exam Schedule */}
        <div className="exams-section">
          <h3>🎓 Exam Schedule</h3>
          {examEvents.length > 0 ? (
            <div className="exams-list">
              {examEvents.map((exam) => (
                <div key={exam.id} className="exam-item">
                  <div
                    className="event-color-bar"
                    style={{ backgroundColor: exam.color }}
                  ></div>
                  <div className="event-details">
                    <p className="event-name">{exam.eventName}</p>
                    <p className="event-date">{formatDate(exam.date)}</p>
                    <p className="event-type">{exam.type}</p>
                    <p className="event-description">{exam.description}</p>
                  </div>
                  <span className={`importance-badge ${exam.importance.toLowerCase()}`}>
                    {exam.importance}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">No exams scheduled</p>
          )}
        </div>

        {/* Legend */}
        <div className="calendar-legend">
          <h3>📖 Legend - What Do The Dots Mean?</h3>
          <p className="legend-description">
            Each colored dot on the calendar represents a different type of event or activity. 
            The color indicates what kind of event is scheduled on that date. Larger dots or overlapping dots mean multiple events on the same day.
          </p>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#ff6b6b" }}></div>
              <span>🔴 Examination/Important Test</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#4caf50" }}></div>
              <span>🟢 Academic Activities/Classes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#ffb347" }}></div>
              <span>🟠 Holiday/Vacation Break</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#9c27b0" }}></div>
              <span>🟣 University Events/Fest</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#2196f3" }}></div>
              <span>🔵 Break/Special Holiday</span>
            </div>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default AcademicCalendar;
