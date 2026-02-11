import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const iconRef = useRef(null);
  const iconRef1 = useRef(null);
  const logoutTimerRef = useRef(null);


  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const startInactivityTimer = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(handleLogout, 5 * 60 * 1000);
  }, [handleLogout]);

  const resetInactivityTimer = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    startInactivityTimer();
  }, [startInactivityTimer]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    startInactivityTimer();

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keypress", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);

    return () => {
      clearTimeout(logoutTimerRef.current);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
    };

  }, [resetInactivityTimer, startInactivityTimer]);

  const handleMouseLeave = (event) => {
    if (
      (dropdownRef1.current || dropdownRef.current) &&
      (iconRef.current || iconRef1.current) &&
      (!dropdownRef1.current.contains(event.relatedTarget) || !dropdownRef.current.contains(event.relatedTarget)) &&
      (!iconRef1.current.contains(event.relatedTarget) || !iconRef.current.contains(event.relatedTarget))
    ) {
      setDropdownOpen1(false);
      setDropdownOpen(false);
    }
  };

  const handleSettingsClick = () => {
    navigate("/details");
  };
  const handleevents = () => {
    navigate("/events");
  };

  return (
    <nav className="navbar">
      <div>
        <a href="/home"><img src="ar.png" alt="Logo" /></a>
        <h1>&copy; All Rights Reserved By UniSphere</h1>
      </div>
      <div className="quick"><ul><li><a className="active" href="/mycampus">MyCampus</a></li></ul></div>
      <div className="quick1"><ul><li><a className="active" href="/unispherehub">UniSphere Hub</a></li></ul></div>
      {user && <div className="navbar-center">User: {user.name}!</div>}
      <div className="navbar-right" ref={dropdownRef1} onMouseLeave={handleMouseLeave}>
        <button
          className="dropdown-btn"
          ref={iconRef}
          onMouseEnter={() => setDropdownOpen1(true)}
        >
          <i className='bx bx-bell'></i>
        </button>

        {dropdownOpen1 && (
          <div className="dropdown-menu">
            <p >Mails</p>
            <p onClick={handleevents}>Events</p>
          </div>
        )}
      </div>

      <div className="navbar-right" ref={dropdownRef} onMouseLeave={handleMouseLeave}>
        <button
          className="dropdown-btn"
          ref={iconRef1}
          onMouseEnter={() => setDropdownOpen(true)}
        >
          <i class='bx bx-user-circle' ></i>
        </button>


        {dropdownOpen && (
          <div className="dropdown-menu">
            <p className="settings" onClick={handleSettingsClick}>Setttings</p>
            <p className="logout" onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
