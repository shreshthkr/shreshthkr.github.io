import React from "react";
import "./Tools.css";

const tools = [
  { id: 1, tool: "Git", img: "https://img.icons8.com/color/256/git.png" },
  { id: 2, tool: "VsCode", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png" },
  {
    id: 3,
    tool: "npm",
    img: "https://img.icons8.com/color/256/npm.png",
  },
  {
    id: 4,
    tool: "Postman",
    img: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/256/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png",
  },
  {
    id: 5,
    tool: "Cypress",
    img: "https://brandfetch.com/_next/image?url=https%3A%2F%2Fasset.brandfetch.io%2FidIq_kF0rb%2Fidv3zwmSiY.jpeg&w=1920&q=75",
  },
  { id: 6, tool: "Netlify", img: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/256/external-netlify-a-cloud-computing-company-that-offers-hosting-and-serverless-backend-services-for-static-websites-logo-color-tal-revivo.png" },
 
];

const Tools = () => {
  return (
    <div id="tools">
      <div className="tool-head">
        <h1>Tools</h1>
      </div>
      <div className="tool-section">
        {tools.map((el) => {
          return (
            <div className="tools-card">
              <div id="tool-logo">
                <img className="tool-card-img" src={el.img} alt={el.tool} />
              </div>
              <div className="tool-title">
                <p className="tool-card-name">{el.tool}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tools;
