import React, { useState } from "react";
import Navbar from "./Navbar";
import Foot from ".//footer";
import "./mycampus.css";
import timetableIcon from "./icons/timetable.png";
import attendenceIcon from "./icons/attendence.png";
import libraryIcon from "./icons/library.png";
import assignmentIcon from "./icons/assignment.png";
import courseIcon from "./icons/course.png";
import curriculumIcon from "./icons/curriculum.png";
import examIcon from "./icons/examshe.png";
import gradeIcon from "./icons/grade.png";
import certificateIcon from "./icons/certificate.png";
import cgpaIcon from "./icons/cgpa.png";
import projectIcon from "./icons/project.png";
import ResearchIcon from "./icons/research.png";
import leaveIcon from "./icons/leave.png";
import hostelIcon from "./icons/hostel.png";
import fineIcon from "./icons/fine.png";
import libdueIcon from "./icons/date-due-card.png";
import receiptIcon from "./icons/receipt.png";
import walletIcon from "./icons/wallet.png";
import payreceiptIcon from "./icons/payment-method.png";
import clubsIcon from "./icons/meeting.png";
import eventregIcon from "./icons/mobile-application.png";
import eventattIcon from "./icons/calendar.png";
import messIcon from "./icons/food.png";

const MyCampus = () => {
  const [leaveRequests] = useState([
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

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

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
    <div>
      <Navbar />
      <div className="campus-container">
        <div className="campus-sections">
          <div className="section">
            <h2>📚 Academics</h2>
            <div className="icon-grid">
              <a href="/timetable"><img src={timetableIcon} alt="Library" /><p>Timetable</p></a>
              <a href="/attendance"><img src={attendenceIcon} alt="Library" /><p>Attendance</p></a>
              <a href="/library"><img src={libraryIcon} alt="Library" /><p>Library</p></a>
              <a href="/assignment"><img src={assignmentIcon} alt="Assignments" /><p>Assignments</p></a>
              <a href="/coursepage"><img src={courseIcon} alt="Course Page" /><p>Course Page</p></a>
              <a href="/curriculum"><img src={curriculumIcon} alt="Curriculum" /><p>Curriculum</p></a>
              <a href="/academic-calendar"><img src={eventattIcon} alt="Academic Calendar" /><p>Academic Calendar</p></a>
            </div>
          </div>

          <div className="section">
            <h2>📊 Exams</h2>
            <div className="icon-grid">
              <a href="/exam-schedule"><img src={examIcon} alt="Exam Schedule" /><p>Exam Schedule</p></a>
              <a href="/grades"><img src={gradeIcon} alt="Grades View" /><p>Grades View</p></a>
              <a href="/certificates"><img src={certificateIcon} alt="Certificates" /><p>Certificates</p></a>
              <a href="/cgpa"><img src={cgpaIcon} alt="CGPA View" /><p>CGPA View</p></a>
              <a href="/projects"><img src={projectIcon} alt="Projects" /><p>Projects</p></a>
              <a href="/research"><img src={ResearchIcon} alt="Research" /><p>Research</p></a>
            </div>
          </div>

          <div className="section">
            <h2>💲  Online Payments</h2>
            <div className="icon-grid">
              <a href="/payments"><img src={payreceiptIcon} alt="Payments" /><p>Payments</p></a>
              <a href="/wallet"><img src={walletIcon} alt="Wallet" /><p>Wallet</p></a>
              <a href="/payment-receipts"><img src={receiptIcon} alt="Payment Receipts" /><p>Payment Receipts</p></a>
              <a href="/library-due"><img src={libdueIcon} alt="Library Due" /><p>Library Due</p></a>
              <a href="/fines"><img src={fineIcon} alt="Fines" /><p>Fines</p></a>
            </div>
          </div>

          <div className="section">
            <h2>🏢 Hostel</h2>
            <div className="icon-grid">
              <a href="/hostel-leave"><img src={leaveIcon} alt="Leave Request" /><p>Leave Request</p></a>
              <a href="/hostel-change"><img src={hostelIcon} alt="Hostel Change" /><p>Hostel Change</p></a>
              <a href="/mess-change"><img src={messIcon} alt="Mess Change" /><p>Mess Change</p></a>
            </div>
          </div>

          <div className="section">
            <h2>📣 Clubs and Chapters</h2>
            <div className="icon-grid">
              <a href="/exam-schedule"><img src={clubsIcon} alt="Exam Schedule" /><p>Clubs Enrollemnt</p></a>
              <a href="/certificates"><img src={eventregIcon} alt="Certificates" /><p>Event Registration</p></a>
              <a href="/grades"><img src={eventattIcon} alt="Grades View" /><p>Event Attendance</p></a>
            </div>
          </div>

          <Foot />

        </div>

      </div>
    </div>
  );
};

export default MyCampus;
