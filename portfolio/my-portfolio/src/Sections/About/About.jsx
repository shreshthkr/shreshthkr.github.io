import React from "react";
import Shreshth_Kumar_Picture from "./shreshthkumar.jpg";

import "./About.css";
const About = () => {
  return (
    <>
      <div id="about">
        <div id="about-heading">
          <h1>
            About <span>Me</span>
          </h1>
        </div>
        <div id="details">
          <p>
            A passionate Frontend Web Developer with 1 year of professional
            experience in designing and developing responsive, modern, and
            user-centric web applications. Proficient in React, JavaScript,
            HTML, and CSS, with hands-on experience in Express.js and MongoDB
            for smooth frontend–backend integration. <br /><br />Additionally, worked as an
            Instructional Associate (IA) at Masai School, mentoring students in
            the MERN stack and Data Structures & Algorithms (DSA), conducting
            technical sessions, and providing code reviews to strengthen their
            practical understanding.<br /><br /> Adept at transforming ideas into
            functional, high-performance solutions that align with
            organizational goals, while continuously learning and delivering
            exceptional user experiences through clean, maintainable code.
          </p>
          <div id="profile-pic">
            <img src={Shreshth_Kumar_Picture} alt="Shreshth Kumar" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
