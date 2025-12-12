import React, { useState } from "react";
import "./Contact.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdEmail, MdCall } from "react-icons/md";
import DecryptedText from "../../Components/DecryptedText/DecryptedText";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = {
      access_key: "3ee24450-cb66-4e78-b78e-78224880698b", // Replace with your Web3Forms key
      ...formData,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formPayload),
    });

    const result = await response.json();
    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  const handleOpenMailPage = () => {
    window.open("mailto:shreshthkumar6@gmail.com");
  };
  const handleGit = () => {
    window.open("https://github.com/shreshthkr");
  };
  const handleLinkedin = () => {
    window.open("https://www.linkedin.com/in/shreshthkumar1263/");
  };

  return (
    <>
      <div id="contact">
        <div id="contact-heading">
          <h1>
            Contact With <span>Me</span>
          </h1>
        </div>

        <div id="social-contact">
          <BsGithub fontSize={"35px"} color="#444444" cursor={"pointer"} onClick={handleGit} />
          <MdEmail fontSize={"35px"} color="#444444" cursor={"pointer"} onClick={handleOpenMailPage} />
          <BsLinkedin fontSize={"35px"} color="#444444" cursor={"pointer"} onClick={handleLinkedin} />
        </div>

        <div id="contact-section">
          <div id="personal-details">
            <p id="contact-phone">
              <MdCall className="phone-icon" /> +918700244923
            </p>
            <a id="contact-email" href="mailto:shreshthkumar6@gmail.com">
              <MdEmail className="mail-icon" /> shreshthkumar6@gmail.com
            </a>
          </div>

          <div id="formbox">
            {status === "success" ? (
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
                   style={{
        color: "white",
        fontWeight: "bold",
        fontSize: "3rem",
        letterSpacing: "1px",
      }}
                />
              </div>
            ) : status === "error" ? (
              <p style={{ color: "red" }}>Something went wrong. Please try again later.</p>
            ) : (
              <form onSubmit={handleSubmit} className="form-box">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  id="nam"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
