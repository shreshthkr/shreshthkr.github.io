import React from 'react'
import "./Navbar.css";

const Navbar = () => {
  return (
    <div id='nav-menu'>
      <div id="nav_name_div">
        <h1 href="" id="nav_name" >Shreshth</h1>
      </div>
      <div id='nav_components'>
        <p class="nav-link home"> <a href="#home">Home</a></p>
        <p class="nav-link about"> <a href="#about">About</a></p>
        <p class="nav-link skills"> <a href="#skills">Skills</a></p>
        <p  class="nav-link projects"> <a href="#projects"> Projects</a></p>
        <p class="nav-link contact"> <a href="#contact"> Contact</a></p>
      </div>
      <div class="nav-link resume">
        <button id="resume_dwnld">Resume</button>
      </div>
    </div>
  )
}

export default Navbar;



//#FF6A3D
//#F4DB7D