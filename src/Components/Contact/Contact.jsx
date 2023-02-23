// import React from 'react'
import "./Contact.css";
import {BsGithub, BsLinkedin} from "react-icons/bs";
import {MdEmail,MdCall} from "react-icons/md";

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
export const Contact = () => {
  const [state, handleSubmit] = useForm("mqkoqwlw");
  if (state.succeeded) {
      return <p style={{color:"#F4DB7D "}}>Thanks for Reaching Out!</p>;
  }
  return (
    <section>
      <div className='contact-head'>
        <h1>Contact</h1>
      </div>
      <div className="contact-box">
      <div className="reach-box">
        <div className='social-link'>
          <div className="social"> 
        <a id="contact-github" href="https://github.com/shreshthkr"><BsGithub /></a>
        <a href="https://www.linkedin.com/in/shreshthkumar1263/" id="contact-linkedin"><BsLinkedin /></a>
        </div>
        <div className="personal-contact">
         <p id="contact-phone"><MdCall className="phone-icon" /> +918700244923</p>
          <a id="contact-email" href="shreshthkumar6@gmail.com">< MdEmail className="mail-icon"/> shreshthkumar6@gmail.com</a>
        </div>
        </div>
        <div  >
      <form onSubmit={handleSubmit} className='form-box'>
        
        <input
        id="name"
        type="text" 
        name="name"
        placeholder="Enter your name"
      />
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
    </section>
  );
}