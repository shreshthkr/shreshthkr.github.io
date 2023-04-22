import React from "react";
import "./Intro.css";
import { FaFileDownload } from "react-icons/fa";
import Shreshth_Kumar_Resume from "../Downloads/Shreshth_Kumar_Resume.pdf";

const Intro = () => {
  return (
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
          className="dowload"
          target="_blank"
          href={Shreshth_Kumar_Resume}
          download
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/17dDau_VkHpOI3PPRKfd13BGihtd6CqsD/view?usp=sharing"
            )
          }
        >
          <button id="resume-link-2">
            <FaFileDownload />
            Resume
          </button>
        </a>
      </div>
      {/* <div className='social-media' ></div> */}
    </div>
  );
};

export default Intro;
