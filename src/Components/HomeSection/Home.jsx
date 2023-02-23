import React from 'react'
import Intro from '../Intro/Intro';
import About from '../About Section/About';
import Skills from '../SkillsSection/Skills';
import Projects from '../Projects/Projects';
import GithubStats from '../GitHub/GithubStats';
import {Contact} from '../Contact/Contact';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div id="home" >
      <Intro />
      <About />
      <Skills />
      <Projects />
      <GithubStats />
      <section id="contact">
      <Contact />
      </section>
      <Footer />
    </div>
  )
}

export default Home;