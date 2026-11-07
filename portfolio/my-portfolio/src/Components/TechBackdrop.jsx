import { SiReact, SiTypescript, SiNodedotjs, SiMongodb, SiGo, SiAmazonaws, SiNextdotjs, SiJavascript } from 'react-icons/si';
const icons=[SiReact,SiTypescript,SiNodedotjs,SiMongodb,SiGo,SiAmazonaws,SiNextdotjs,SiJavascript];
export default function TechBackdrop(){return <div className="tech-backdrop" aria-hidden="true">{icons.map((Icon,i)=><Icon key={i} style={{'--tech-x':`${[7,85,17,76,9,90,43,64][i]}%`,'--tech-y':`${[13,8,43,35,74,68,88,56][i]}%`,'--tech-rotate':`${i%2?12:-12}deg`}}/>)}</div>;}
