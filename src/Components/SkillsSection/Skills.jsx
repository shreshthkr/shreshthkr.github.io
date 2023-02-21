import React from "react";
import "./Skill.css";

const skills = [
  { id: 1, skill: "HTML", img: "https://img.icons8.com/color/256/html-5.png" },
  { id: 2, skill: "CSS", img: "https://img.icons8.com/fluency/256/css3.png" },
  {
    id: 3,
    skill: "JavaScript",
    img: "https://img.icons8.com/fluency/256/javascript.png",
  },
  {
    id: 4,
    skill: "React",
    img: "https://img.icons8.com/officel/256/react.png",
  },
  {
    id: 5,
    skill: "Chakra-UI",
    img: "https://img.icons8.com/color/256/chakra-ui.png",
  },
  { id: 6, skill: "Redux", img: "https://img.icons8.com/color/256/redux.png" },
  {
    id: 7,
    skill: "TypeScript",
    img: "https://img.icons8.com/color/256/typescript.png",
  },
  { id: 8, skill: "Git", img: "https://img.icons8.com/color/256/git.png" },
  { id: 9, skill: "Node", img: "https://img.icons8.com/color/256/nodejs.png" },
];

const Skills = () => {
  return (
    <div id="skills">
      <div className="skill-head">
        <h1>Skills</h1>
      </div>
      <div className="skill-section">
        {skills.map((el) => {
          return (
            <div className="skills-card">
              <div id="skill-logo">
                <img className="skills-card-img" src={el.img} alt={el.skill} />
              </div>
              <div className="skill-title">
                <p className="skills-card-name">{el.skill}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
