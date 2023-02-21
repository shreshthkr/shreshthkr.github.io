import React from 'react'
import Intro from '../Intro/Intro';
import About from '../About Section/About';
import Skills from '../SkillsSection/Skills';
import Projects from '../Projects/Projects';

const Home = () => {
  return (
    <div id="home" >
      <Intro />
      <About />
      <Skills />
      <Projects />
    </div>
  )
}

export default Home;