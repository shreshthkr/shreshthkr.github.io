import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import Shreshth_Kumar_Resume from "../Downloads/Shreshth_Kumar_Resume.pdf";
import "./About.css";

const About = () => {
  const handleClick = () => {
    const url =
      "https://drive.google.com/file/d/1g_6YYUTo05E3NcL5S5LDOAJcXPVgwB_I/view?usp=sharing";
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shreshth_Kumar_Resume.pdf";
    link.click();
  };

  const handleGit = () => {
    window.open("https://github.com/shreshthkr");
  };

  const handleLikedin = () => {
    window.open("https://www.linkedin.com/in/shreshthkumar1263/");
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
              <a
                id="resume-link-2"
                href={Shreshth_Kumar_Resume}
                download="Shreshth_Kumar_Resume"
              >
                <button id="resume-button-2" onClick={handleClick}>
                  <BiDownload fontSize="18px" /> Resume
                </button>
              </a>
            </div>
            <div className="social-media">
              <div>
                <BsGithub onClick={handleGit} cursor={"pointer"} />
                <BsLinkedin onClick={handleLikedin} cursor={"pointer"} />
              </div>
            </div>
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
              An Enthusiastic Web Developer, skilled in front-end Web
              Development. Knowlwdge of Core React,Javascript, HTML CSS,
              express, and MongoDB. Aims to leverage knowledge and build
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
