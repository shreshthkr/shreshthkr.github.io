import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sampleEnergySequence } from './energySequence';
import { projects } from '../Sections/Projects/projectData';
import './EnergyFinale.css';
const ChamberScene=lazy(()=>import('./ChamberScene'));
const phases=['Approach','Ignition','Energy surge','Stabilise'];
export default function EnergyFinale(){
 const host=useRef(null),progress=useRef(0);const reduced=useReducedMotion();
 const [near,setNear]=useState(false),[phase,setPhase]=useState(0);
 const [style,setStyle]=useState({'--chamber-progress':0,'--chamber-panels':1,'--chamber-message':0,'--chamber-surge':0});
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>setNear(entry.isIntersecting),{rootMargin:'400px'});observer.observe(host.current);
  let scheduled=false,frame;
  const update=()=>{scheduled=false;const rect=host.current.getBoundingClientRect();const distance=host.current.offsetHeight-window.innerHeight;
   const value=reduced?.35:Math.max(0,Math.min(1,-rect.top/Math.max(1,distance)));
   progress.current=value;const s=sampleEnergySequence(value);setPhase(s.phase);
   setStyle({'--chamber-progress':value,'--chamber-panels':reduced?0:s.panels,'--chamber-message':reduced?1:s.message,'--chamber-surge':reduced?0:s.surge});
  };
  const scroll=()=>{if(!scheduled){scheduled=true;frame=requestAnimationFrame(update);}};
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();
  return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);};
 },[reduced]);
 function goTo(index){const top=window.scrollY+host.current.getBoundingClientRect().top;const length=host.current.offsetHeight-window.innerHeight;window.scrollTo({top:top+length*[.08,.35,.68,.94][index],behavior:reduced?'instant':'smooth'});}
 return <div id="energy-chamber" className={`energy-finale energy-finale--interactive ${reduced?'energy-finale--reduced':''}`} ref={host} style={style}>
  <div className="chamber-stage" role="region" aria-label="Scroll-driven energy chamber">
   <img className="chamber-fallback" src="/images/photoreal-energy-chamber.png" alt="Industrial energy chamber with hanging cables and high-voltage electricity" loading="lazy" decoding="async"/>
   {near && <Suspense fallback={null}><ChamberScene progress={progress} reduced={reduced}/></Suspense>}
   <div className="chamber-transition-panels" aria-hidden="true">{projects.slice(-3).map((p,i)=><div key={p.title} style={{'--panel-index':i}}><img src={p.image} alt=""/><span>ARCHIVE / {p.title}</span></div>)}</div>
   <div className="chamber-atmosphere" aria-hidden="true"/>
   <div className="chamber-top"><span>SK / ENERGY CHAMBER</span><span>SEQUENCE / {String(phase+1).padStart(2,'0')}</span></div>
   <div className="chamber-status"><span className="eyebrow">End of transmission</span><p>{phases[phase]}<span aria-hidden="true">_</span></p><span>{reduced?'CONTAINMENT FIELD':'SCROLL TO CHANGE THE ENERGY FIELD'}</span></div>
   <motion.div className="chamber-message" initial={false} style={{visibility:style["--chamber-message"]>.02?"visible":"hidden"}}><span>Ideas connect. Systems come alive.</span><a href="mailto:shreshthkumar6@gmail.com">Let’s build<br/>what’s next. ↗</a></motion.div>
   <div className="chamber-bottom"><nav aria-label="Energy chamber sequence">{phases.map((label,i)=><button key={label} onClick={()=>goTo(i)} aria-current={phase===i?'step':undefined}><span>0{i+1}</span>{label}</button>)}</nav><span className="chamber-scroll-hint">{reduced?'':'SCROLL TO POWER THE CHAMBER ↓'}</span></div>
  </div>
 </div>;
}
