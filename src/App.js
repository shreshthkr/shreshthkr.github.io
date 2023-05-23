
import './App.css';
import Navbar from './Components/Navbar';
import About from './Sections/About/About';
import Contact from './Sections/Contact/Contact';
import GithubStats from './Sections/Github/GithubStats';
import Home from './Sections/Home/Home';
import Projects from './Sections/Projects/Projects';
import Skills from './Sections/Skills/Skills';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Home />
     <About />
     <Skills />
     <Projects />
     <GithubStats />
     <Contact />
    </div>
  );
}

export default App;
