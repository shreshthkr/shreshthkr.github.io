import { motion, useReducedMotion } from 'framer-motion';
export default function ReactorVisual({energized=false}) {
 const reduced=useReducedMotion();
 return <div className={`reactor-art ${energized?'reactor-art--energized':''}`} aria-hidden="true"><motion.div className="reactor-art__object" animate={reduced?{}:{y:[0,-12,0],rotate:[-.8,.8,-.8]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}><img src="/images/photoreal-reactor.png" alt="" fetchPriority="high"/><div className="reactor-art__energy"/><svg viewBox="0 0 1000 1000" className="reactor-art__arcs" fill="none"><path d="M110 270 75 250 92 221 56 202 70 170M845 330l45-22-12-30 38-20-5-31M500 900l18 34 32-9 20 35M250 620l-40 12-19-32-32 15-27-28"/><path d="M290 110l-18-35 35-16-8-23M760 630l45 25-9 31 39 15"/></svg></motion.div></div>;
}
