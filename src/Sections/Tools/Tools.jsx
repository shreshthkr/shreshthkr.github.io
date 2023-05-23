import React from 'react';
import "./Tools.css";

const tools = [
    { id: 1, tool: "Git", img: "https://img.icons8.com/color/256/git.png" },
    {
      id: 2,
      tool: "VsCode",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png",
    },
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
      img: "data:image/png;base64,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",
    },
    {
      id: 6,
      tool: "Netlify",
      img: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/256/external-netlify-a-cloud-computing-company-that-offers-hosting-and-serverless-backend-services-for-static-websites-logo-color-tal-revivo.png",
    },
  ];
const Tools = () => {
  return (
    <>
    <div id='tools'>
        <div id="tools-heading">
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
      
    </>
  )
}

export default Tools
