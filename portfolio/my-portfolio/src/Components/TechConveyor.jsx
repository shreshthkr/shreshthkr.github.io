import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiRedux, SiChakraui, SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiMongodb, SiGit, SiVisualstudiocode, SiNpm, SiPostman, SiNetlify, SiVercel, SiGo, SiAmazonaws } from 'react-icons/si';
import { BsPauseFill, BsPlayFill, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import './TechConveyor.css';

const technologies = [
  ['JavaScript', SiJavascript, 'Languages'], ['TypeScript', SiTypescript, 'Languages'],
  ['HTML', SiHtml5, 'Languages'], ['CSS', SiCss3, 'Languages'],
  ['React', SiReact, 'Frameworks & Libraries'], ['Next.js', SiNextdotjs, 'Frameworks & Libraries'],
  ['Redux', SiRedux, 'Frameworks & Libraries'], ['Chakra UI', SiChakraui, 'Frameworks & Libraries'],
  ['Tailwind CSS', SiTailwindcss, 'Frameworks & Libraries'], ['Bootstrap', SiBootstrap, 'Frameworks & Libraries'],
  ['Node.js', SiNodedotjs, 'Backend & Data'], ['Express.js', SiExpress, 'Backend & Data'],
  ['MongoDB', SiMongodb, 'Backend & Data'], ['Go', SiGo, 'Backend & Services'], ['AWS SNS', SiAmazonaws, 'Services & Integrations'], ['Git', SiGit, 'Tooling'],
  ['VS Code', SiVisualstudiocode, 'Tooling'], ['npm', SiNpm, 'Tooling'],
  ['Postman', SiPostman, 'Tooling'], ['Netlify', SiNetlify, 'Tooling'], ['Vercel', SiVercel, 'Tooling'],
];
const wrap = value => (value + technologies.length) % technologies.length;
export default function TechConveyor() {
  const root = useRef(null);
  const visible = useInView(root, { amount: .2 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(4);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [motionOverride, setMotionOverride] = useState(false);
  const touch = useRef(null);
  const playing = !paused && (!reduced || motionOverride);
  useEffect(() => {
    if (!playing || !visible || hovered || focused) return;
    const timer = setInterval(() => { if (!document.hidden) setActive(value => wrap(value + 1)); }, 3200);
    return () => clearInterval(timer);
  }, [playing, visible, hovered, focused]);
  function select(index) { setActive(wrap(index));setPaused(true); }
  function toggle() { if (reduced && !motionOverride) { setMotionOverride(true);setPaused(false); } else setPaused(value => !value); }
  const [name, Icon, category] = technologies[active];
  return <div ref={root} className={`tech-conveyor ${playing && !hovered && !focused ? 'tech-conveyor--playing' : ''}`} role="region" aria-label="Animated technology stack" aria-roledescription="carousel"
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <div className="tech-conveyor__top"><span>SK / TECHNOLOGY INDEX</span><span>{String(active+1).padStart(2,'0')} / {technologies.length} MODULES</span></div>
    <div className="tech-conveyor__viewport" onTouchStart={event=>{touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY};}} onTouchEnd={event=>{
      if (!touch.current) return;
      const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy))select(active+(dx<0?1:-1));touch.current=null;
    }}>
      <div className="tech-conveyor__floor" aria-hidden="true"/>
      <div className="tech-conveyor__axis" aria-hidden="true"><span>STACK ANALYSIS / CONTINUOUS INDEX</span></div>
      <div className="tech-conveyor__deck" aria-hidden="true">
        {technologies.map(([label, Logo, type], index) => {
          let offset=wrap(index-active);if(offset>technologies.length/2)offset-=technologies.length;
          return <div key={label} className={`tech-module ${offset===0?'tech-module--active':''}`} style={{'--offset':offset,'--depth':Math.abs(offset),'--visible':Math.abs(offset)<=4?1:0}}>
            <div className="tech-module__header"><span>MOD–{String(index+1).padStart(2,'0')}</span><span>SK / STACK</span></div>
            <div className="tech-module__logo"><Logo/></div><strong>{label}</strong><span className="tech-module__type">{type}</span>
            <div className="tech-module__footer"><i/><span>ENGINEERING TOOLKIT</span><span>↗</span></div>
          </div>;
        })}
      </div>
      <div className="tech-conveyor__reticle" aria-hidden="true"><i/><i/><i/><i/></div>
    </div>
    <div className="tech-conveyor__console">
      <div className="tech-conveyor__selected"><Icon aria-hidden="true"/><div><span>{category}</span><h3>{name}</h3></div></div>
      <div className="tech-conveyor__controls"><button onClick={()=>select(active-1)} aria-label="Previous technology"><BsArrowLeft/></button><button onClick={toggle} aria-label={playing?'Pause automatic rotation':'Start automatic rotation'}>{playing?<BsPauseFill/>:<BsPlayFill/>}</button><button onClick={()=>select(active+1)} aria-label="Next technology"><BsArrowRight/></button></div>
      <span className="tech-conveyor__mode">{playing?'AUTO SEQUENCE / 3.2 SEC':'MANUAL SELECTION'}</span>
    </div>
    <nav className="tech-conveyor__index" aria-label="Choose a technology">{technologies.map(([label,Logo],i)=><button key={label} onClick={()=>select(i)} aria-label={`Show ${label}`} aria-pressed={active===i} title={label}><Logo aria-hidden="true"/><span>{label}</span></button>)}</nav>
    <div className="tech-conveyor__bottom"><span>SWIPE OR SELECT TO EXPLORE</span><span>HOVER / FOCUS TO HOLD</span></div>
  </div>;
}
