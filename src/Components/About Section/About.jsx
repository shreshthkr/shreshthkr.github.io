import React from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import Shreshth_Kumar_Resume from "../Downloads/Shreshth_Kumar_Resume.pdf";
import "./About.css";
//#about.about.section
const About = () => {


  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/17dDau_VkHpOI3PPRKfd13BGihtd6CqsD/view?usp=sharing"
    );
  };


  return (
    <div className="about section" id="about">
      <div>
        <div id="intro">
          <div className="Intro">
            <div className="Greeting">
              <h1 id="user-detail-name">Hello, I am Shreshth Kumar</h1>
            </div>
            <div className="role">
              <h3>And I'm a</h3>
              <h3>
                {" "}
                <span class="animate-character">Full Stack Web Developer</span>
              </h3>
            </div>
            <div className="resume-btn">
              <button id="resume-button-2" >
                <a
                  id="resume-link-2"
                  href={Shreshth_Kumar_Resume}
                  download="Shreshth_Kumar_Resume"
                  
                >
                  Resume
                </a>
              </button>
            </div>
            {/* <div className='social-media' ></div> */}
          </div>
        </div>
        <div className="about-me">
          <h1>About me</h1>
        </div>
        <div className="about-intro">
          <div className="picture">
            <img
              class="home-img"
              src="https://www.linkpicture.com/q/Untitled-design-1_4.jpg"
              alt="Shreshth-Kumar"
            />
          </div>
          <div className="details">
            <h3>I am Shreshth Kumar and I'm a MERN Developer</h3>
            <p id="user-detail-intro">
              An Enthusiastic Web Developer, a lifelong learner, skilled in
              front-end Web Development. Knowlwdge of Core React,Javascript, HTML 
              CSS, express, and MongoDB. High Adaptability to learn new technologies quickly and
              paying attention to details. Aims to leverage knowledge and build
              world-class websites while facilitating organization in achieving
              functional goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// <img class="home-img" src="https://www.linkpicture.com/q/Untitled-design-1_4.jpg" alt="Shreshth-Kumar" />
