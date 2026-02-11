import React from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Engoulp = () => {
  return (
    <body>
      <section className="header">
        <nav>
          <a href="/"><img src="t.png" alt="Logo" /></a>
          <div className="nav-link">
            <ul>
              <li><a href="">EVENTS</a></li>
              <li><a className="active" href="/login">LOGIN</a></li>
              <li><a href="/reg">REGISTER</a></li>
              <li><a href="">ABOUT</a></li>
              <li><a href="">CONTACT</a></li>
            </ul>
          </div>
        </nav>
        <div className="text-box">
          <h1>Welcome to UniSphere</h1>
          <h3>UniSphere(Uniting Indian Universities)</h3>
          <br />
          <p>A platform to unify Indian universities and enable students
            to connect, collaborate, share <br />and innovate groundbreaking ideas
            and create immense value.
          </p>
          <a href="" className="hbtn">Explore Us to Connect More</a>
        </div>
      </section>

      <section className="About">
        <h1>Bridging Minds, Inspiring Innovation</h1>
        <p>In a diverse and dynamic academic landscape like India, the need for
          collaboration, communication, and shared growth has never been greater.
          Our platform brings together students, faculty, and innovators from
          universities across the nation to connect, share, and create.
        </p>

        <div className="row">
          <div className="About-col">
            <h3>Connect Across Campuses</h3>
            <p>“Unite with students from universities across India.”
              Break the barriers of geography with our platform. Chat in
              real-time, join course-specific communities, and build a
              network of peers and mentors to collaborate on ideas and
              projects.</p>
          </div>

          <div className="About-col">
            <h3>Innovate Together</h3>
            <p>“Transform your ideas into reality with like-minded
              collaborators.”<br />
              Showcase your creativity in the Innovation Hub.
              Post your projects, find teammates from other universities,
              and participate in challenges that push the boundaries of
              what’s possible.
            </p>
          </div>

          <div className="About-col">
            <h3>Track and Showcase Your Journey</h3>
            <p>“Your academic progress, redefined.”<br />
              Easily manage and share your marks, grades, and achievements.
              Build a profile that highlights your skills and contributions,
              making it easier to stand out in academia and beyond.</p>
          </div>
        </div>
      </section>

      <section className="footer">
        <h4>About Us</h4>
        <p>UniSphere...😎</p>
        <div className="icons">
          <i className='bx bxl-facebook-square'></i>
          <a href="https://x.com/engoulp62830?s=11" target="_blank" rel="noopener noreferrer">
            <i class='bx bxl-twitter'></i>
          </a>
          <a href="https://www.instagram.com/sandeepkumar_2421/" target="_blank" rel="noopener noreferrer">
            <i class='bx bxl-instagram'></i>
          </a>
          <i className='bx bxl-linkedin-square'></i>
        </div>
        <p>Made with <i className='bx bx-heart'></i> by Engoulp</p>
        <p>UniSphere - All Copyrights Reserved</p>
      </section>
    </body>
  );
};

export default Engoulp;