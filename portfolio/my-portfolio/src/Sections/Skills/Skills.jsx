import React from "react";
import "./Skills.css";
import Tools from "../Tools/Tools";
import Reveal from "../../Components/Reveal";
import TechConveyor from "../../Components/TechConveyor";

const CATEGORIES = [
  {
    num: "01",
    label: "Languages",
    items: ["JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    num: "02",
    label: "Frameworks & Libraries",
    items: ["React", "Next.js", "Redux", "Chakra UI", "Tailwind CSS", "Bootstrap"],
  },
  {
    num: "03",
    label: "Backend & Data",
    items: ["Node.js", "Express.js", "MongoDB"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section section--dark skills">
      <div className="inner">
        <div className="skills__top">
          <Reveal>
            <span className="eyebrow">Toolbox</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Skills &amp; <span className="muted">Stack</span>
            </h2>
          </Reveal>
        </div>

        <TechConveyor />
        <div className="skills__list">
          {CATEGORIES.map((cat, i) => (
            <Reveal as="div" className="skill-row" key={cat.label} delay={i * 0.06}>
              <div className="skill-row__head">
                <span className="skill-row__num">{cat.num}</span>
                <h3 className="skill-row__label">{cat.label}</h3>
              </div>
              <ul className="skill-row__items">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Tools />
        </div>
      </div>
    </section>
  );
};

export default Skills;
