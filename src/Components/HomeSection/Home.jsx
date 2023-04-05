import React from 'react'
import About from '../About Section/About';
import Skills from '../SkillsSection/Skills';
import Projects from '../Projects/Projects';
import GithubStats from '../GitHub/GithubStats';
import {Contact} from '../Contact/Contact';
import Footer from '../Footer/Footer';
import Tools from '../Tools/Tools';

const Home = () => {
  return (
    <div id="home" >
      <About />
      <Skills />
      <Tools />
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