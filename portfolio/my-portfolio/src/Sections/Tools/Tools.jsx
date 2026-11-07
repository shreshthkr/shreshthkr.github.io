import React from "react";
import "./Tools.css";
import Reveal from "../../Components/Reveal";

const tools = ["Git", "VS Code", "npm", "Postman", "Netlify", "Vercel"];

const Tools = () => {
  return (
    <Reveal as="div" className="skill-row" delay={0.06}>
      <div className="skill-row__head">
        <span className="skill-row__num">04</span>
        <h3 className="skill-row__label">Tooling</h3>
      </div>
      <ul className="skill-row__items">
        {tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </Reveal>
  );
};

export default Tools;
