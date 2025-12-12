import React from 'react'
import "./Home.css";
import { Type } from '../../Components/Type';
import {BsGithub,BsLinkedin} from "react-icons/bs";
import {SiGmail} from "react-icons/si";
import {FaPhoneAlt} from "react-icons/fa";
import {HiDownload} from "react-icons/hi";
import Shreshth_Kumar_Resume from "../../Components/Downloads/Shreshth_Kumar_Resume.pdf";

const Home = () => {
  const handleClick = () => {
    const url =
      "https://drive.google.com/file/d/1sgv3hFs1pO94RJQb6hc6vY47oVaG-XaF/view?usp=sharing";
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shreshth_Kumar_Resume.pdf";
    link.click();
  };
  const handleOpenMailPage = () => {
    window.open('mailto:shreshthkumar6.com');
  };
  const handleGit = () => {
    window.open("https://github.com/shreshthkr");
  };
  const handlePhoneClick = () => {
    window.open('tel:+918700244923'); 
  };
   const handleLikedin = () => {
    window.open("https://www.linkedin.com/in/shreshthkumar1263/");
  };
  return (
    <>
     <div id="home">
        <div id='heading'>
          <h1 id='name'>Hello, I am <span>Shreshth Kumar</span></h1>
            <h1 id='type'><Type /></h1>
        </div>
        <div id="resume-btn-2">
          <a   id="resume-link-2"
                href={Shreshth_Kumar_Resume}
                download="Shreshth_Kumar_Resume"><button onClick={handleClick}><HiDownload /> Resume</button></a>
           
        </div>
        <div id="social-links">
        <BsGithub className='social-icons' onClick={handleGit} /> 
        <SiGmail className='social-icons' onClick={handleOpenMailPage}  />
        <FaPhoneAlt className='social-icons' onClick={handlePhoneClick}/>
        <BsLinkedin className='social-icons' onClick={handleLikedin}/>
        </div>
        </div> 
    </>
  )
}

export default Home;
