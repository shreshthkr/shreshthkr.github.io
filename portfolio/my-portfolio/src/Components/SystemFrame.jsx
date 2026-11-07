import { useEffect, useState } from 'react';
import TechBackdrop from './TechBackdrop';
const sections = [['home','01 / Identity'],['about','02 / Profile'],['experience','03 / Experience'],['projects','04 / Projects'],['skills','05 / Stack'],['github','06 / Activity'],['contact','07 / Contact']];
export default function SystemFrame(){
  const [active,setActive]=useState('home');
  useEffect(()=>{
    const update=()=>{
      let current='home';
      for(const [id] of sections){const el=document.getElementById(id);if(el && el.getBoundingClientRect().top<window.innerHeight*.4)current=id;}
      setActive(current);
    };
    window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update);
  },[]);
  return <><TechBackdrop/><div className="system-atmosphere" aria-hidden="true"><div className="system-atmosphere__ring"/><div className="system-atmosphere__axis"/></div><nav className="system-rail" aria-label="Portfolio chapters">{sections.map(([id,label])=><a key={id} href={`#${id}`} aria-label={label} aria-current={active===id?'location':undefined}><i/><span>{label}</span></a>)}</nav><div className="system-caption" aria-hidden="true"><span>SK / PERSONAL ENGINEERING SYSTEM</span><span>{sections.find(([id])=>id===active)?.[1]}</span></div></>;
}
