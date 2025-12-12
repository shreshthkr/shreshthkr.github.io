import React from "react";
import "./Home.css";
import { Type } from "../../Components/Type";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

const Home = () => {
  const handleClick = () => {
    const url =
      "https://drive.google.com/uc?export=download&id=1sgv3hFs1pO94RJQb6hc6vY47oVaG-XaF";

    window.open(url, "_blank", "noopener,noreferrer");

    const link = document.createElement("a");
    link.href = url;
    link.download = "Shreshth_Kumar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenMailPage = () => {
    window.open("mailto:shreshthkumar6@gmail.com");
  };
  const handleGit = () => {
    window.open("https://github.com/shreshthkr");
  };
  const handlePhoneClick = () => {
    window.open("tel:+918700244923");
  };
  const handleLinkedin = () => {
    window.open("https://www.linkedin.com/in/shreshthkumar1263/");
  };

  return (
    <>
      <div id="home">
        <div id="heading">
          <h1 id="name">
            Hello, I am <span>Shreshth Kumar</span>
          </h1>
          <h1 id="type">
            <Type />
          </h1>
        </div>

        <div id="resume-btn-2">
          <button id="resume-link-2" onClick={handleClick}>
            <HiDownload /> Resume
          </button>
        </div>

        <div id="social-links">
          <BsGithub className="social-icons" onClick={handleGit} />
          <SiGmail className="social-icons" onClick={handleOpenMailPage} />
          <FaPhoneAlt className="social-icons" onClick={handlePhoneClick} />
          <BsLinkedin className="social-icons" onClick={handleLinkedin} />
        </div>
      </div>
    </>
  );
};

export default Home;
