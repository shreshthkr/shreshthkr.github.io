import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
import { Type } from "../../Components/Type";
import Marquee from "../../Components/Marquee";
import { lazy, Suspense, useState } from "react";
const LabScene = lazy(() => import("../../Components/ReactorVisual"));
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

const RESUME_URL =
  "https://drive.google.com/file/d/1sgv3hFs1pO94RJQb6hc6vY47oVaG-XaF/view?usp=sharing";

const MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Full Stack",
  "Backend Systems",
  "MERN Stack",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Home = () => {
  const [energized, setEnergized] = useState(false);
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 88, behavior: "smooth" });
  };

  return (
    <section id="home" className="hero grain">
      <Suspense fallback={<div className="lab-scene lab-scene--fallback" aria-hidden="true" />}><LabScene energized={energized} /></Suspense>
      <div className="hero__vignette" />
      <div className="hero__inner inner">
        <motion.div
          className="hero__meta"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span>© 2026</span>
          <span className="hero__status">
            <i /> Available for work
          </span>
          <span>Based in India</span>
        </motion.div>

        <div className="hero__layout"><div className="hero__copy">
        <p className="hero__eyebrow">PORTFOLIO / SHRESHTH KUMAR</p>
        <h1 className="hero__title">
          <motion.span custom={1} variants={fadeUp} initial="hidden" animate="show">
            Full Stack
          </motion.span>
          <motion.span
            className="hero__title-italic"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Developer
          </motion.span>
        </h1>

        <motion.div
          className="hero__row"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className="hero__intro">
            I'm <strong>Shreshth Kumar</strong> — a Full Stack Developer at Inamo,
            building web applications, backend services, and operational systems.
          </p>

          <div className="hero__type">
            <span className="hero__type-label">Currently</span>
            <Type />
          </div>
        </motion.div>

        <motion.div
          className="hero__actions"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <a
            className="hero__cta"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume <HiArrowUpRight aria-hidden="true" />
          </a>
          <button className="hero__cta hero__cta--ghost" onClick={scrollToContact}>
            Get in touch
          </button>

          <ul className="hero__socials">
            <li>
              <a href="https://github.com/shreshthkr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <BsGithub aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/shreshthkumar1263/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <BsLinkedin aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="mailto:shreshthkumar6@gmail.com" aria-label="Email">
                <SiGmail aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="tel:+918700244923" aria-label="Phone">
                <FaPhoneAlt aria-hidden="true" />
              </a>
            </li>
          </ul>
        </motion.div>
        </div><div className="lab-instruments">
          <span className="lab-instruments__label">SK / CORE ASSEMBLY</span>
          <span className="lab-instruments__line" />
          <button className="reactor__control" aria-pressed={energized} onClick={() => setEnergized(value => !value)}>{energized ? '− Reduce core energy' : '+ Energize core'} <span aria-hidden="true">↗</span></button>
          <span className="lab-instruments__status">● CORE ONLINE</span>
        </div></div>
        <a className="hero__explore" href="#about"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></a>
      </div>

      <div className="hero__marquee">
        <Marquee items={MARQUEE} speed={42} />
      </div>
    </section>
  );
};

export default Home;
