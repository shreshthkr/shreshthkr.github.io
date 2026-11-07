import React from "react";
import IdentityPortrait from "../../Components/IdentityPortrait";
import Reveal from "../../Components/Reveal";
import "./About.css";

const STATS = [
  { value: "1+", label: "Years\nExperience" },
  { value: "10+", label: "Projects\nShipped" },
  { value: "MERN", label: "Core\nStack" },
];

const About = () => {
  return (
    <section id="about" className="section section--light about">
      <IdentityPortrait />
      <div id="developer-details" className="inner about__grid">
        <div className="about__left">
          <Reveal>
            <span className="eyebrow">About / Developer dossier</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="about__lead">
              I build <span className="accent">fast</span>, modern and
              user-centric web applications — turning ideas into clean,
              high-performance products.
            </h2>
          </Reveal>

          <div className="about__assignment"><span className="about__assignment-dot"/><div><span>CURRENT ASSIGNMENT</span><strong>Full Stack Developer / Inamo</strong></div><span>2026 ↗</span></div>
          <div className="about__text">
            <Reveal delay={0.1}>
              <p>
                Currently a Full Stack Developer at Inamo, building web applications,
                finance and reconciliation systems, backend services, and internal
                operational tools. Previously worked on frontend development,
                designing and building responsive, modern web applications.
                Proficient in React, JavaScript, HTML and CSS, with hands-on
                experience in Express.js and MongoDB for smooth frontend–backend
                integration.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Previously an Instructional Associate at Masai School, mentoring
                students in the MERN stack and Data Structures &amp; Algorithms —
                running technical sessions and code reviews to strengthen their
                practical understanding.
              </p>
            </Reveal>
          </div>

        </div>
        <aside className="about__technical" aria-label="Stack and engineering focus">
          <Reveal delay={0.2}>
            <dl className="about__stats">
              {STATS.map((s) => (
                <div className="about__stat" key={s.label}>
                  <dt className="about__stat-value">{s.value}</dt>
                  <dd className="about__stat-label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="about__systems" aria-label="Engineering focus">
            <span className="about__systems-label">CONNECTED SYSTEMS / INAMO</span>
            <div><span>01</span><strong>Finance & reconciliation</strong><small>COD · Razorpay · Data models</small></div>
            <div><span>02</span><strong>Workforce & operations</strong><small>Picksy · Geofencing · 5S workflows</small></div>
            <div><span>03</span><strong>Services & integrations</strong><small>AWS SNS · Tesseract · Go · CNS</small></div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
