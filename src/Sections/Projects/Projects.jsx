import React from 'react';
import "./Projects.css";
import {BsGithub} from "react-icons/bs";
import {SiNetlify} from "react-icons/si";
const Projects = () => {
    const styleDem = () => {
        window.open("https://genuine-mousse-0f20e2.netlify.app/");
      };
    
      const styleGit = () => {
        window.open("https://github.com/shreshthkr/polite-design-6184");
      };
    
      const expGit = () => {
        window.open("https://github.com/Shubham-Dandekar/expedia.com-clone");
      };
    
      const expDem = () => {
        window.open("https://clone-expedia.netlify.app/");
      };
    
      const urbanGit = () => {
        window.open("https://github.com/shreshthkr/overrated-clam-5001");
      };
      const urbanDem = () => {
        window.open(
          "https://639fa5d018290c7021ff4b09--nimble-jelly-7dbf24.netlify.app/"
        );
      };
    
      const craftsGit = () => {
        window.open("https://github.com/shreshthkr/defective-week-6965");
      };
    
      const craftsDem = () => {
        window.open("https://coruscating-mooncake-55a32f.netlify.app/");
      };
    
      const beGit = () => {
        window.open("https://github.com/atheist31/legit-substance-7075");
      };
    
      const beDem = () => {
        window.open("https://frontend-eight-ashen-60.vercel.app/");
      };
    
  return (
    <>
      <div id='projects'>
      <div id="project-heading">
            <h1>Projects</h1>
        </div>
         <div className='my_projects'>
            <div className='project-card'>
                <div className='project-image'>
                    <img src="https://www.linkpicture.com/q/Screenshot-804.png" alt="Befour.com" />
                </div>
                <div className='project-info'>
                <div className='project-title'>
                    <h2>Befour.com</h2>
                </div>
                <div className="project-description">
            <p>
            It is a clone of Bewakoof.com website which is an e-commerce
              platform for products related to clothing like T-shirt, Shirts
              Kurta and many more options.
            </p>
          </div>
          <div className="project-tech-stack">
          <p>Tech-Stack: HTML | CSS | React | Chakra-UI | Redux | Express.js | MongoDB | Mongoose</p>
          </div>
          <div className="project-links">
            <button className="project-github-link" onClick={beGit}>
              <BsGithub />
            </button>

            <button className="project-deployed-link" onClick={beDem}>
             <SiNetlify />
            </button>
          </div>
          </div>
            </div>
            <div className="project-card2">
          <div className="project-image2">
            <img
              src="https://www.linkpicture.com/q/Screenshot-763_1.png"
              alt=""
            />
          </div>
          <div className='project-info2'>
          <div className="project-title2">
            <h2>CraftsVilla</h2>
          </div>
          <div className="project-description2">
            <p>
              It is a clone of Craftsvilla website which is an e-commerce
              platform for products related to Home-Decor.
            </p>
          </div>
          <div className="project-tech-stack2">
            <p>Tech-Stack: HTML | CSS | React | Chakra-UI</p>
          </div>
          <div className="project-links2">
            <button className="project-github-link2" onClick={craftsGit}>
            <BsGithub />
            </button>
            <button className="project-deployed-link2" onClick={craftsDem}>
              <SiNetlify />
            </button>
          </div>
          </div>
        </div>
        <div className="project-card">
          <div className="project-image">
            <img
              src="https://www.linkpicture.com/q/Screenshot-764.png"
              alt=""
            />
          </div>
          <div className='project-info'>
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
          <div className="project-tech-stack">
            <p>Tech-Stack: HTML | CSS | React | Chakra-UI</p>
          </div>
          <div className="project-links">
            <button className="project-github-link" onClick={urbanGit}>
            <BsGithub />
            </button>
            <button className="project-deployed-link" onClick={urbanDem}>
              <SiNetlify />
            </button>
          </div>
          </div>
          </div>
          <div className="project-card2">
          <div className="project-image2">
            <img
              src="https://www.linkpicture.com/q/Screenshot-768_1.png"
              alt="Expedia.com"
            />
          </div>
          <div className='project-info2'>
          <div className="project-title2">
            <h2>Expedia.com</h2>
          </div>
          <div className="project-description2">
            <p>
              Expedia.com is an E-commerce website that deals with travel
              packages. A variety of services are available through the website.
            </p>
          </div>
          <div className="project-tech-stack2">
            <p>Tech-Stack: HTML | CSS | JavaScript </p>
          </div>
          <div className="project-links2">
            <button className="project-github-link2" onClick={expGit}>
            <BsGithub />
            </button>
            <button className="project-deployed-link2" onClick={expDem}>
              <SiNetlify />
            </button>
          </div>
        </div>
        </div>
        <div className="project-card">
          <div className="project-image">
            <img
              src="https://www.linkpicture.com/q/Screenshot-766_1.png"
              alt="Style-Craze"
            />
          </div>
          <div className='project-info'>
          <div className="project-title">
            <h2>StyleCraze</h2>
          </div>
          <div className="project-description">
            <p>
              It is a clone website of stylecraze which deals in all kinds of
              women products and problems
            </p>
          </div>
          <div className="project-tech-stack">
            <p>Tech-Stack: HTML | CSS | JavaScript </p>
          </div>
          <div className="project-links">
            <button className="project-github-link" onClick={styleGit}>
            <BsGithub />
            </button>

            <button className="project-deployed-link" onClick={styleDem}>
              <SiNetlify />
            </button>
          </div>
        </div>
        </div>
        </div>
         </div>
      
    </>
  )
}

export default Projects;
