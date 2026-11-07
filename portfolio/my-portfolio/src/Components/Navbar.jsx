import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1sgv3hFs1pO94RJQb6hc6vY47oVaG-XaF/view?usp=sharing";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1101px)');
    const closeDesktop = () => { if(query.matches) setIsOpen(false); };
    query.addEventListener('change', closeDesktop);
    return () => query.removeEventListener('change', closeDesktop);
  }, []);

  const navigate = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 88, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#home" className="nav__logo" onClick={(e) => navigate(e, "#home")}>
          Shreshth Kumar
          <span className="nav__logo-mut">Full Stack Developer</span>
        </a>

        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => navigate(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__right">
          <a
            className="nav__resume"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <button
            className="nav__burger"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </nav>

      <div id="mobile-navigation" inert={isOpen ? undefined : ""} className={`nav__overlay ${isOpen ? "nav__overlay--open" : ""}`}>
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${0.06 * i + 0.1}s` }}>
              <a href={l.href} onClick={(e) => navigate(e, l.href)}>
                <span className="nav__overlay-idx">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ transitionDelay: `${0.06 * LINKS.length + 0.1}s` }}>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <span className="nav__overlay-idx">↗</span>
              Resume
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
