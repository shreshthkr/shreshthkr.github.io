import "./App.css";
import { MotionConfig } from "framer-motion";
import Navbar from "./Components/Navbar";
import Home from "./Sections/Home/Home";
import About from "./Sections/About/About";
import Experience from "./Sections/Experience/Experience";
import Projects from "./Sections/Projects/Projects";
import Skills from "./Sections/Skills/Skills";
import GithubStats from "./Sections/Github/GithubStats";
import Contact from "./Sections/Contact/Contact";
import "./lab.css";
import SystemFrame from "./Components/SystemFrame";
import "./responsive.css";
import "./enhancements.css";

function App() {
  return (
    <MotionConfig reducedMotion="user"><div className="App">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <SystemFrame />
      <main id="main">
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GithubStats />
      <Contact />
      </main>
    </div></MotionConfig>
  );
}

export default App;
