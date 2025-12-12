import React from "react";
import "./Experience.css";

const experiences = [
 
  {
    role: "Instructional Associate (IA)",
    company: "Masai School",
    location: "Bengaluru, India",
    duration: "Feb 2025 - Nov 2025",
    points: [
      "Conducted MERN stack and DSA sessions for students.",
      "Provided technical mentorship through code reviews, debugging assistance, and clarifying complex topics.",
      "Collaborated on curriculum tasks, including defining project modules and assisting with evaluation processes.",
      "Developed and maintained the internal Mentor-MOU Tracker application to streamline workflow."
    ],
  },
   {
    role: "Software Developer Engineer-I (Front-End Developer)",
    company: "K12 Techno Services Pvt. Ltd",
    location: "Bengaluru, India",
    duration: "Dec 2023 - Dec 2024",
    points: [
      "Designed and developed robust Content Management Systems (CMS) to streamline content creation and delivery.",
      "Built and maintained responsive, high-performance websites like Schools Universe and Dance Dynamite using React and Next.js.",
      "Created an interactive voting page with dynamic features, responsive UI, and optimized performance.",
      "Collaborated with cross-functional teams to deliver user-focused features and optimized UI.",
      "Improved website performance and SEO, resulting in faster load times and higher visibility."
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience">
      <h1 className="exp-heading">
        Professional <span>Experience</span>
      </h1>
      <div className="exp-container">
        {experiences.map((exp, index) => (
          <div key={index} className="exp-card">
            <div className="exp-header">
              <h2 className="exp-role">{exp.role}</h2>
              <p className="exp-company">
                {exp.company}, {exp.location}
              </p>
              <p className="exp-duration">{exp.duration}</p>
            </div>
            <ul className="exp-points">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
