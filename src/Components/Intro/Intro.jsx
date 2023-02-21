import React from 'react';
import "./Intro.css";
import {RiContactsFill} from "react-icons/ri";
import {FaFileDownload} from "react-icons/fa"

const Intro = () => {
  return (
    <div className='Intro'>
        <div className='Greeting' >
            <h1 id="user-detail-name">Hello, I am Shreshth Kumar</h1>
        </div>
        <div className='role'>
            <h3>And I'm a</h3>
            <h3> <span class="animate-character">Full Stack Web Developer</span></h3>
        </div>
        {/* <div className='formal-intro' >
            <p>A lifelong learner, skilled in front-end Web Development. Knowlwdge of Core Javascript,React, HTML,CSS and Chakra-UI.</p>
        </div> */}
        <div className='resume-btn' >
            <button><RiContactsFill /> Contact me</button>
            <button><FaFileDownload />Resume</button>
        </div>
        <div className='social-media' ></div>
    </div>
  )
}

export default Intro