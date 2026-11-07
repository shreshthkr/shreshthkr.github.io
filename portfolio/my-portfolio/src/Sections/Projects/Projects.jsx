import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { HiArrowUpRight } from 'react-icons/hi2';
import { projects } from './projectData';
import './Projects.css';
import './Spiral.css';
const HelixScene=lazy(()=>import('./HelixScene'));
const agents=['J.A.R.V.I.S.','F.R.I.D.A.Y.','E.D.I.T.H.','K.A.R.E.N.','J.O.C.A.S.T.A.','D.U.M–E'];
const query='(max-width: 1024px), (max-height: 650px), (prefers-reduced-motion: reduce)';
export default function Projects(){
 const section=useRef(null),progress=useRef(0),touch=useRef(null);
 const [active,setActive]=useState(0),[compact,setCompact]=useState(()=>window.matchMedia(query).matches);
 const reduced=useReducedMotion();
 const near=useInView(section,{margin:"400px",once:true});
 useEffect(()=>{const media=window.matchMedia(query);const change=()=>setCompact(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 useEffect(()=>{
  if(compact)return;let frame;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=section.current.getBoundingClientRect();const p=Math.max(0,Math.min(1,-rect.top/(section.current.offsetHeight-window.innerHeight)));progress.current=p;setActive(Math.min(5,Math.floor(p*6)));});};
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};
 },[compact]);
 function select(index){
  if(compact){progress.current=(index+.3)/6;setActive(index);return;}
  const top=window.scrollY+section.current.getBoundingClientRect().top;const length=section.current.offsetHeight-window.innerHeight;
  window.scrollTo({top:top+(index+.3)/6*length,behavior:reduced?'instant':'smooth'});
 }
 const p=projects[active];
 return <section id="projects" className="spiral-projects" ref={section} aria-label="Featured Projects — 3D spiral archive"><div className="spiral-stage">
  <div className="spiral-visual" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!compact||!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))select(Math.max(0,Math.min(5,active+(dx<0?1:-1))));touch.current=null;}}>{near && <Suspense fallback={<div className="helix-fallback"/>}><HelixScene projects={projects} progress={progress} reduced={reduced} active={active}/></Suspense>}</div>
  <div className="spiral-shade"/>
  <header className="spiral-heading"><div><span className="eyebrow">Selected Work / Project archive</span><h2>Inside the<br/><span>architecture.</span></h2></div><a className="projects__viewall" href="https://github.com/shreshthkr" target="_blank" rel="noopener noreferrer">View all on GitHub <HiArrowUpRight/></a></header>
  <div className="spiral-readout" aria-hidden="true"><span>HELICAL ARCHIVE / 06 STATIONS</span><span>{compact?'SWIPE OR SELECT A PROJECT':'SCROLL TO ROTATE ↓'}</span></div>
  <div className="spiral-detail"><div className="agent-heading"><span className="agent-light"/><span>INTERFACE / {agents[active]}</span><span>0{active+1} / 06</span></div>
   <motion.article key={p.title} initial={{opacity:reduced?1:0,y:reduced?0:10}} animate={{opacity:1,y:0}} transition={{duration:.25}}><span className="spiral-project-label">PROJECT FILE — 0{active+1}</span><h3>{p.title}</h3><p>{p.description}</p><ul className="spiral-tech">{p.tech.map(t=><li key={t}>{t}</li>)}</ul><div className="spiral-actions"><a href={p.demo} target="_blank" rel="noopener noreferrer">Launch project <HiArrowUpRight/></a><a href={p.github} target="_blank" rel="noopener noreferrer"><BsGithub/> Source code</a></div></motion.article>
   <div className="spiral-detail__footer"><span>Themed interfaces · Original projects</span><span aria-hidden="true">⌁</span></div>
  </div>
  <nav className="spiral-selector" aria-label="Select a project">{projects.map((project,i)=><button key={project.title} onClick={()=>select(i)} aria-current={active===i?'step':undefined} aria-label={`Show ${project.title}`}><span>0{i+1}</span><span>{project.title}</span><i/></button>)}</nav>
  <div className="spiral-bottom"><span>SHRESHTH / ENGINEERING SYSTEMS</span><span>{compact?'SELECT A PROJECT ABOVE':'SCROLL TO EXPLORE ALL PROJECTS ↓'}</span></div>
 </div></section>;
}
