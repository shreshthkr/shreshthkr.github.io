import React from 'react';
import "./About.css"

const About = () => {
  return (
    <div id="about" className="about section">
      <div className='about-me'><h1>About me</h1></div>
    <div  className='about-intro' >
       <div className='picture' >
       <img class="home-img" src="https://www.linkpicture.com/q/Untitled-design-1_4.jpg" alt="Shreshth-Kumar" />
       </div>
       <div className='details' >
        <h3>
          I am Shreshth Kumar and <span className='mern'>I'm a MERN Developer</span>
        </h3>
        <p id="user-detail-intro">An Enthusiastic Web Developer, a lifelong learner, skilled in front-end Web Development.
Knowlwdge of Core Javascript, HTML and CSS. High Adaptability to learn new technologies
quickly and paying attention to details. Aims to leverage knowledge and build world-class
websites while facilitating organization in achieving functional goals.</p>
       </div>
    </div>
    </div>
  )
}

export default About;

// <img class="home-img" src="https://www.linkpicture.com/q/Untitled-design-1_4.jpg" alt="Shreshth-Kumar" />