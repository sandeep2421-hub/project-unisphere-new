import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./coursepage.css";
import Foot from "./footer";

const CoursePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/courses")
            .then((response) => setCourses(response.data))
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className="cour">
            <Navbar />
            <div className="course-container">
                
                <h1 className="course-title">Course Materials</h1>
                {courses.map((course) => (
                    <div key={course.id} className="course">
                        <h2 className="course-name">{course.name}</h2>
                        <ul className="materials-list">
                            {course.materials.map((material) => (
                                <li key={material.id} className="material-item">
                                    <a href={material.url} className="download-link" download>
                                        {material.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
            <Foot />
        </div>

    );
};

export default CoursePage;
