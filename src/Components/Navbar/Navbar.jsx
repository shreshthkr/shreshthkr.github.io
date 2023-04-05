import React from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Shreshth_Kumar_Resume from "../Downloads/Shreshth_Kumar_Resume.pdf";

const Navbar = () => {
  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/17dDau_VkHpOI3PPRKfd13BGihtd6CqsD/view?usp=sharing"
    );
  };

  return (
    <nav id="nav-menu">
      <div className="logo">
        <span className="span">{"<"}</span> Shreshth{" "}
        <span className="span"> {">"}</span>
      </div>
      <input type="checkbox" id="click" />
      <label for="click" className="menu-btn">
        <GiHamburgerMenu />
      </label>
      <ul>
        <li>
          <a className="nav-link home" href="#home">
            Home
          </a>
        </li>
        <li>
          <a className="nav-link about" href="#about">
            About
          </a>
        </li>
        <li>
          <a className="nav-link skills" href="#skills">
            Skills
          </a>
        </li>
        <li>
          <a className="nav-link projects" href="#projects">
            Projects
          </a>
        </li>
        <li>
          <a className="nav-link contact" href="#contact">
            Contact
          </a>
        </li>
        <li className="last_list">
          <button id="resume-button-1">
            <a
              className="nav-link resume"
              id="resume-link-1"
              href={Shreshth_Kumar_Resume}
              onClick={handleClick}
              download="Shreshth_Kumar_Resume"
            >
              Resume
            </a>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

//onClick={()=> window.open("https://drive.google.com/file/d/17dDau_VkHpOI3PPRKfd13BGihtd6CqsD/view?usp=sharing")}
/*
  <li  className='nav-link resume'><a id="resume-link-1"  href={Shreshth_Kumar_Resume} download="Shreshth_Kumar_Resume" ><button id="resume-button-1">Resume</button></a></li>
  https://drive.google.com/file/d/17dDau_VkHpOI3PPRKfd13BGihtd6CqsD/&export=download
*/
