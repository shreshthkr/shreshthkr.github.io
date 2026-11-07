import React from "react";
import "./Experience.css";
import Reveal from "../../Components/Reveal";
import CareerCircuit from "../../Components/CareerCircuit";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Inamo",
    duration: "Jan 2026 — Present",
    points: [
      "Designed the low-level architecture and built a COD reconciliation product to resolve order-versus-collection amount discrepancies; integrated Razorpay workflows for online payments.",
      "Designed finance database schemas and reconciliation data models; developed and maintained internal company dashboards and operational tooling across the web stack.",
      "Maintained the backend of the Picksy workforce app; implemented geofencing-based automatic clock-in/clock-out and introduced 5S task workflows.",
      "Built an AWS SNS-based event notifier for the Tesseract project, supporting event-driven communication between services.",
      "Designed and implemented a CNS downstream worker from scratch in Go to process downstream integration jobs.",
    ],
  },
  {
    role: "Instructional Associate",
    company: "Masai School",
    location: "Bengaluru, India",
    duration: "Feb 2025 — Nov 2025",
    points: [
      "Led MERN-stack and DSA sessions, mentoring students through complex topics.",
      "Provided technical mentorship via code reviews and debugging support.",
      "Shaped curriculum tasks — defining project modules and evaluation processes.",
      "Built and maintained the internal Mentor-MOU Tracker to streamline workflow.",
    ],
  },
  {
    role: "Software Developer Engineer I",
    company: "K12 Techno Services",
    location: "Bengaluru, India",
    duration: "Dec 2023 — Dec 2024",
    points: [
      "Designed and built Content Management Systems to streamline content delivery.",
      "Shipped responsive, high-performance sites like Schools Universe and Dance Dynamite in React & Next.js.",
      "Created an interactive voting page with dynamic features and optimized performance.",
      "Improved performance and SEO, driving faster load times and higher visibility.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section section--dark exp">
      <div className="inner">
        <div className="exp__top">
          <Reveal>
            <span className="eyebrow">Career</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              Professional <span className="muted">Experience</span>
            </h2>
          </Reveal>
        </div>

        <CareerCircuit />
        <div className="exp__list">
          {experiences.map((exp, index) => (
            <Reveal as="article" className="exp__item" key={exp.company} delay={index * 0.08}>
              <div className="exp__meta" id={`experience-${["inamo", "masai", "k12"][index]}`}>
                <span className="exp__index">0{experiences.length - index}</span>
                <span className="exp__duration">{exp.duration}</span>
                <span className="exp__company">
                  {exp.company}
                  {exp.location && <span className="exp__location">{exp.location}</span>}
                </span>
              </div>

              <div className="exp__body">
                <h3 className="exp__role">{exp.role}</h3>
                <ul className="exp__points">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
