import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './PortraitScene.css';

export default function IdentityPortrait() {
  const host = useRef(null);
  const visible = useInView(host, { amount: .1 });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: host, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [24, -24]);
  return <figure ref={host} className={`portrait-scene ${visible ? 'portrait-scene--visible' : ''}`}>
    <div className="portrait-scene__atmosphere" aria-hidden="true"/>
    <div className="portrait-scene__coordinates" aria-hidden="true"><span>02 / THE DEVELOPER</span><span>SHRESHTH / PERSONAL ENGINEERING SYSTEM</span></div>
    <motion.img className="portrait-scene__image" src="/images/shreshth-electric-portrait-unlettered.png" alt="Shreshth in profile with glasses, electric-blue rim lighting, against a dark electric atmosphere" style={{ y: reduced ? 0 : drift }} />
    <svg className="portrait-scene__name" viewBox="0 0 1000 180" role="img" aria-label="SHRESHTH">
      <defs><linearGradient id="portrait-name-metal" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d4edf2"/><stop offset=".35" stopColor="#829da6"/><stop offset=".52" stopColor="#e0f5f8"/><stop offset=".65" stopColor="#587781"/><stop offset="1" stopColor="#b5e3ec"/></linearGradient></defs>
      <text x="0" y="148" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#portrait-name-metal)">SHRESHTH</text>
    </svg>
    <motion.img className="portrait-scene__image portrait-scene__foreground" src="/images/shreshth-electric-portrait-unlettered.png" alt="" aria-hidden="true" style={{y:reduced?0:drift}} />
    <svg className="portrait-scene__lightning" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <defs><filter id="portrait-electric-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs>
      <g className="portrait-scene__bolt-halo" filter="url(#portrait-electric-glow)">
        <path d="M0 650 100 620 128 652 183 593 220 610 270 545 310 574 365 520 420 540 470 485"/>
        <path d="M1440 600 1340 570 1310 610 1274 558 1220 580 1180 510 1140 550 1085 490 1040 515 980 460"/>
      </g>
      <g className="portrait-scene__bolt-main">
        <path d="M0 650 100 620 128 652 183 593 220 610 270 545 310 574 365 520 420 540 470 485"/>
        <path d="M1440 600 1340 570 1310 610 1274 558 1220 580 1180 510 1140 550 1085 490 1040 515 980 460"/>
      </g>
      <g className="portrait-scene__bolt-branches"><path d="m183 593-18-55-40-12 14-35-50-37M310 574l-12 65-44 24 13 44-38 33M1274 558l16-63 42-15-13-30 45-35M1140 550l29 69 42 12-10 44 43 25"/></g>
    </svg>
    <div className="portrait-scene__edge" aria-hidden="true"/>
    <figcaption className="portrait-scene__caption"><div><strong>Shreshth Kumar</strong><span>Full Stack Developer / Inamo</span></div><span>Bengaluru, India</span></figcaption>
    <a className="portrait-scene__continue" href="#developer-details">Explore the developer <span aria-hidden="true">↓</span></a>
  </figure>;
}
