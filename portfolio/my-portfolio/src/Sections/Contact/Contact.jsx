import React, { useState } from "react";
import "./Contact.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdEmail, MdCall } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";
import Reveal from "../../Components/Reveal";
import EnergyFinale from "../../Components/EnergyFinale";
import DecryptedText from "../../Components/DecryptedText/DecryptedText";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const formPayload = {
      access_key: "3ee24450-cb66-4e78-b78e-78224880698b",
      ...formData,
    };
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formPayload),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section section--dark contact grain">
      <div className="contact__glow" />
      <div className="inner">
        <div className="contact__head">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="contact__title">
              Let's build<br />
              something <span className="accent">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="contact__sub">
              Have a project in mind or just want to say hi? My inbox is always
              open.
            </p>
          </Reveal>
        </div>

        <div className="contact__grid">
          <Reveal className="contact__info" delay={0.05}>
            <a className="contact__line" href="mailto:shreshthkumar6@gmail.com">
              <span className="contact__line-label">Email</span>
              <span className="contact__line-value">
                <MdEmail /> shreshthkumar6@gmail.com
              </span>
            </a>
            <a className="contact__line" href="tel:+918700244923">
              <span className="contact__line-label">Phone</span>
              <span className="contact__line-value">
                <MdCall /> +91 87002 44923
              </span>
            </a>
            <div className="contact__socials">
              <a href="https://github.com/shreshthkr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <BsGithub />
              </a>
              <a href="https://www.linkedin.com/in/shreshthkumar1263/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <BsLinkedin />
              </a>
              <a href="mailto:shreshthkumar6@gmail.com" aria-label="Email">
                <MdEmail />
              </a>
            </div>
          </Reveal>

          <Reveal className="contact__formwrap" delay={0.1}>
            {status === "success" ? (
              <div className="contact__success">
                <DecryptedText
                  text="Thank you for reaching out!"
                  speed={80}
                  maxIterations={15}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"
                  animateOn="view"
                  revealDirection="center"
                />
                <p>I'll get back to you as soon as I can.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form">
                {status === "error" && (
                  <p className="contact__error">
                    Something went wrong. Please try again later.
                  </p>
                )}
                <div className="contact__field">
                  <label htmlFor="nam">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    name="name"
                    id="nam"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="contact__submit" disabled={sending}>
                  {sending ? "Sending..." : "Send message"} <HiArrowUpRight />
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <EnergyFinale />
        <footer className="footer">
          <span className="footer__logo">
            <span className="footer__dot" /> Shreshth Kumar
          </span>
          <span className="footer__copy">
            © 2026 — Designed &amp; built by Shreshth Kumar
          </span>
          <a href="#home" className="footer__top">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
