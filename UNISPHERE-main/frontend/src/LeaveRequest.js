import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      type: "Medical Leave",
      startDate: "2023-10-15",
      endDate: "2023-10-17",
      status: "Approved",
      reason: "Doctor's appointment and recovery from illness",
      category: "Medical",
      importance: "High",
      color: "#ff6b6b",
      universityPolicy: "Medical leave requires doctor's certificate for absences over 2 days.",
    },
    {
      id: 2,
      type: "Casual Leave",
      startDate: "2023-10-20",
      endDate: "2023-10-22",
      status: "Pending",
      reason: "Personal matters and family emergency",
      category: "Personal",
      importance: "Medium",
      color: "#4caf50",
      universityPolicy: "Casual leave limited to 12 days per semester.",
    },
    {
      id: 3,
      type: "Academic Leave",
      startDate: "2023-11-01",
      endDate: "2023-11-05",
      status: "Approved",
      reason: "Participation in inter-university research conference",
      category: "Academic",
      importance: "High",
      color: "#9c27b0",
      universityPolicy: "Academic leave approved for conferences, workshops, and competitions.",
    },
    {
      id: 4,
      type: "Maternity Leave",
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      status: "Approved",
      reason: "Maternity leave as per university policy",
      category: "Special",
      importance: "High",
      color: "#ffb347",
      universityPolicy: "Maternity leave up to 180 days with full pay.",
    },
  ]);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewMode, setViewMode] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const categories = ["All", ...new Set(leaveRequests.map((e) => e.category))];
  const statuses = ["All", "Approved", "Pending", "Rejected"];

  const filteredLeaves = leaveRequests.filter((leave) => {
    const matchesCategory = filterCategory === "All" || leave.category === filterCategory;
    const matchesStatus = filterStatus === "All" || leave.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const upcomingLeaves = filteredLeaves
    .filter((leave) => new Date(leave.endDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5);

  const getLeavesByDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredLeaves.filter((leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const checkDate = new Date(dateStr);
      return checkDate >= start && checkDate <= end;
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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
      const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
      const dateStr = date.toISOString().split("T")[0];
      const dayLeaves = getLeavesByDate(date);
      const isToday = new Date().toISOString().split("T")[0] === dateStr;
      const isSunday = date.getDay() === 0;
      const isSelected = selectedDate === dateStr;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`calendar-day ${isToday ? "today" : ""} ${
            dayLeaves.length > 0 ? "has-events" : ""
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
    <div className="page">
      <Navbar />
      <div className="container">
        <h1>🏖️ Hostel Leave Requests</h1>
        <p>Manage your leave applications, view calendar, and track statuses.</p>

        {/* Legend */}
        <div className="calendar-legend">
          <h3>📖 Legend - Leave Types</h3>
          <p className="legend-description">
            Each colored dot on the calendar represents a different type of leave.
            The color indicates what kind of leave is scheduled on that date.
          </p>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#ff6b6b" }}></div>
              <span>🔴 Medical Leave</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#4caf50" }}></div>
              <span>🟢 Personal Leave</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#9c27b0" }}></div>
              <span>🟣 Academic Leave</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: "#ffb347" }}></div>
              <span>🟠 Maternity Leave</span>
            </div>
          </div>
        </div>

        {/* View Toggle & Filters */}
        <div className="calendar-controls">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "month" ? "active" : ""}`}
              onClick={() => setViewMode("month")}
            >
              📅 Month View
            </button>
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              📝 List Viewa
            </button>
          </div>

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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat === "All" ? "All Status" : `${stat} Status`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === "month" ? (
          <>
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

            {/* Selected Date Details */}
            {selectedDate && (
              <div className="selected-date-section">
                <h3>📅 Leaves on {formatDate(selectedDate)}</h3>
                {getLeavesByDate(new Date(selectedDate)).length > 0 ? (
                  <div className="date-events-list">
                    {getLeavesByDate(new Date(selectedDate)).map((leave) => (
                      <div key={leave.id} className="date-event-card">
                        <div
                          className="date-event-color"
                          style={{ backgroundColor: leave.color }}
                        ></div>
                        <div className="date-event-content">
                          <h4>{leave.type}</h4>
                          <p className="event-category">{leave.category}</p>
                          <p className="event-type">{leave.reason}</p>
                          <p><strong>Status:</strong> <span className={leave.status === "Approved" ? "approved" : "pending"}>{leave.status}</span></p>
                        </div>
                        <span className={`importance-badge ${leave.importance.toLowerCase()}`}>
                          {leave.importance}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-events-on-date">No leaves scheduled for this date</p>
                )}
              </div>
            )}

            {/* Upcoming Leaves */}
            <div className="upcoming-section">
              <h3>📌 Upcoming Leaves</h3>
              {upcomingLeaves.length > 0 ? (
                <div className="upcoming-list">
                  {upcomingLeaves.map((leave) => (
                    <div key={leave.id} className="upcoming-item">
                      <div
                        className="event-color-bar"
                        style={{ backgroundColor: leave.color }}
                      ></div>
                      <div className="event-details">
                        <p className="event-name">{leave.type}</p>
                        <p className="event-date">{formatDate(leave.startDate)} - {formatDate(leave.endDate)}</p>
                        <p className="event-type">{leave.reason}</p>
                      </div>
                      <span className={`importance-badge ${leave.importance.toLowerCase()}`}>
                        {leave.importance}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-events">No upcoming leaves</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* List View */}
            <div className="list-view">
              {filteredLeaves.length > 0 ? (
                <div className="events-list">
                  {filteredLeaves
                    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                    .map((leave) => (
                      <div key={leave.id} className="event-card">
                        <div
                          className="card-color"
                          style={{ backgroundColor: leave.color }}
                        ></div>
                        <div className="card-content">
                          <div className="card-header">
                            <h3>{leave.type}</h3>
                            <span className={`importance-badge ${leave.importance.toLowerCase()}`}>
                              {leave.importance}
                            </span>
                          </div>
                          <p className="card-date">
                            📅 {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                          </p>
                          <p className="card-category">{leave.category}</p>
                          <p className="card-type">{leave.reason}</p>
                          <p><strong>Status:</strong> <span className={leave.status === "Approved" ? "approved" : "pending"}>{leave.status}</span></p>
                          {leave.status === "Pending" && <button className="cancel-btn">Cancel Request</button>}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="no-events">No leaves found matching your filters</p>
              )}
            </div>
          </>
        )}

        <button className="add-btn">Request New Leave</button>
      </div>
      <Fot />
    </div>
  );
};

export default LeaveRequest;
