import React from 'react'
import "./Contact.css";
import {BsGithub,BsLinkedin} from "react-icons/bs";
import {MdEmail,MdCall} from "react-icons/md"
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
    const [state, handleSubmit] = useForm("mqkoqwlw");
    if (state.succeeded) {
      return <p style={{ color: "#444444" }}>Thanks for Reaching Out!</p>;
    }
    const handleOpenMailPage = () => {
        window.open('mailto:shreshthkumar6.com');
      };
      const handleGit = () => {
        window.open("https://github.com/shreshthkr");
      };
      const handleLikedin = () => {
        window.open("https://www.linkedin.com/in/shreshthkumar1263/");
      };
  return (
    <>
      <div id='contact'>
      <div id="contact-heading">
            <h1>Contact With <span>Me</span> </h1>
        </div>
        <div id='social-contact'>
       <BsGithub fontSize={"35px"} color='#444444' cursor={"pointer"} onClick={handleGit} />
       <MdEmail fontSize={"35px"} color='#444444' cursor={"pointer"} onClick={handleOpenMailPage} />
       <BsLinkedin fontSize={"35px"} color='#444444' cursor={"pointer"} onClick={handleLikedin} />
        </div>
        <div id="contact-section">
            <div id="personal-details" >
            <p id="contact-phone">
                <MdCall className="phone-icon" />{" "} +918700244923
              </p>
              <a id="contact-email" href="shreshthkumar6@gmail.com">
                <MdEmail className="mail-icon" /> shreshthkumar6@gmail.com
              </a>
            </div>
            <div id="formbox">
            <form onSubmit={handleSubmit} className="form-box">
             <input type="text" placeholder='Enter Your Name' name="name" id='nam' />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
              <textarea
                id="message"
                name="message"
                placeholder="Enter message"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
              <button type="submit" disabled={state.submitting}>
                Submit
              </button>
            </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Contact;
