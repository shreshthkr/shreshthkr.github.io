import React from "react";
import "./Projects.css";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaLink } from "react-icons/fa";

const Projects = () => {
  return (
    <div id="projects">
      <div className="projects-head">
        <h1>Projects</h1>
      </div>
      <div className="My_Projects">
        <div className="Project-card">
          <div className="project-image">
            <img
              src="https://www.linkpicture.com/q/Screenshot-766_1.png"
              alt="Style-Craze"
            />
          </div>
          <div className="project-title">
            <h2>StyleCraze</h2>
          </div>
          <div className="project-description">
            <p>
              It is a clone website of stylecraze which deals in all kinds of
              women products and problems
            </p>
          </div>
          <div className="project-tech">
            <p>Tech-Stack: HTML | CSS | JavaScript </p>
          </div>
          <div className="project-links">
            <Link to="https://github.com/shreshthkr/polite-design-6184">
              <button id="contact-github"  className="style-github">
                <BsGithub /> GitHub
              </button>
            </Link>
            <Link to="https://genuine-mousse-0f20e2.netlify.app/">
              <button className="style-link">
                <FaLink /> Demo
              </button>
            </Link>
          </div>
        </div>
        <div className="Project-card">
          <div className="project-image">
            <img
              src="https://www.linkpicture.com/q/Screenshot-768_1.png"
              alt="Expedia.com"
            />
          </div>
          <div className="project-title">
            <h2>Expedia.com</h2>
          </div>
          <div className="project-description">
            <p>
              Expedia.com is an E-commerce website that deals with travel
              packages. A variety of services are available through the website.
            </p>
          </div>
          <div className="project-tech">
            <p>Tech-Stack: HTML | CSS | JavaScript </p>
          </div>
          <div className="project-links">
           
              <Link to="https://github.com/Shubham-Dandekar/expedia.com-clone">
                <button id="contact-github" className="style-github">
                  <BsGithub /> GitHub
                </button>
              </Link>
              <Link to="clone-expedia.netlify.app/">
                <button className="style-link">
             
                  <FaLink /> Demo
                </button>
              </Link>
           
          </div>
        </div>
        <div className="Project-card">
          <div className="project-image">
            <img
              src="https://www.linkpicture.com/q/Screenshot-764.png"
              alt=""
            />
          </div>
          <div className="project-title">
            <h2>Urban Company</h2>
          </div>
          <div className="project-description">
            <p>
              It is a clone of UrbanCompany website which is an online platform
              that connects customers with service professionals for home and
              personal services.
            </p>
          </div>
          <div className="project-tech">
            <p>Tech-Stack: HTML | CSS | React | Chakra-UI</p>
          </div>
          <div className="project-links">
            
              <Link to="https://github.com/shreshthkr/overrated-clam-5001">
                <button id="contact-github" className="style-github">
                  <BsGithub /> GitHub
                </button>
              </Link>
              <Link to="https://639fa5d018290c7021ff4b09--nimble-jelly-7dbf24.netlify.app/">
                <button className="style-link">
                  <FaLink /> Demo
                </button>
              </Link>
         
          </div>
        </div>
        <div className="Project-card">
          <div className="project-image">
            <img
              src="https://www.linkpicture.com/q/Screenshot-763_1.png"
              alt=""
            />
          </div>
          <div className="project-title">
            <h2>CraftsVilla</h2>
          </div>
          <div className="project-description">
            <p>
              It is a clone of Craftsvilla website which is an e-commerce
              platform for products related to Home-Decor.
            </p>
          </div>
          <div className="project-tech">
            <p>Tech-Stack: HTML | CSS | React | Chakra-UI</p>
          </div>
          <div className="project-links">
            <Link to="https://github.com/shreshthkr/defective-week-6965">
              <button id="contact-github" className="style-github">
                <BsGithub className="github-icon" />
                GitHub
              </button>
            </Link>
             <Link to="https://coruscating-mooncake-55a32f.netlify.app/">
              <button className="style-link">
              <FaLink  /> Demo
              </button>
             </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

/*

https://www.linkpicture.com/q/Screenshot-766_1.png
https://www.linkpicture.com/q/Screenshot-768_1.png
https://www.linkpicture.com/q/Screenshot-763_1.png
https://www.linkpicture.com/q/Screenshot-764.png

*/

//https://github.com/shreshthkr/polite-design-6184
//https://genuine-mousse-0f20e2.netlify.app/
