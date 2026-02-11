import React from "react";
import Navbar from "./Navbar";
import "./timetable.css";

const timetable = () => {
    return (
        <div className="tt">
            <Navbar />
            <div className="heading"> <h1>Your Timetable</h1></div>
            <div className="timetable">

            </div>
        </div>
    )
} 

export default timetable;