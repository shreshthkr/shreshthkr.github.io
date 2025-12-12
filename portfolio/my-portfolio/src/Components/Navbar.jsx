import React, { useState } from "react";
import "./Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import Shreshth_Kumar_Resume from "./Downloads/Shreshth_Kumar_Resume.pdf";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu state
  };

  const closeMenu = () => {
    setIsOpen(false); // Close menu
  };

  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/1sgv3hFs1pO94RJQb6hc6vY47oVaG-XaF/view?usp=sharing"
    );
    closeMenu(); // Close menu after clicking Resume
  };

  const NavigateSection = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const section = document.querySelector(target);

    if (section) {
      const offset = section.offsetTop;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      closeMenu(); // Close menu after navigation
    }
  };

  return (
    <nav>
      <div id="logo">
        <span className="span">{"<"}</span> <h2>Shreshth</h2>{" "}
        <span className="span"> {"/>"}</span>
      </div>
      <ul className={isOpen ? "open" : ""}>
        <li>
          <a href="#home" onClick={NavigateSection}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={NavigateSection}>
            About
          </a>
        </li>
        <li>
          <a href="#skills" onClick={NavigateSection}>
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" onClick={NavigateSection}>
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" onClick={NavigateSection}>
            Contact
          </a>
        </li>
        <li>
          <a
            className="nav-link resume"
            href={Shreshth_Kumar_Resume}
            onClick={handleClick}
            download="Shreshth_Kumar_Resume"
          >
            Resume
          </a>
        </li>
      </ul>
      <div id="menu-btn">
        <RxHamburgerMenu
          onClick={toggleMenu} // Toggle menu open/close
          fontSize={"28px"}
          fontWeight={"700"}
        />
      </div>
      {isOpen && (
        <div id="sideMenu">
          <ul>
            <li>
              <a href="#home" onClick={NavigateSection}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={NavigateSection}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" onClick={NavigateSection}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={NavigateSection}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={NavigateSection}>
                Contact
              </a>
            </li>
            <li>
              <a
                className="nav-link resume"
                href={Shreshth_Kumar_Resume}
                onClick={handleClick}
                download="Shreshth_Kumar_Resume"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
