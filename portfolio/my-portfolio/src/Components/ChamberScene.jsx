import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sampleEnergySequence } from './energySequence';

const vertex = `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D chamber;
uniform sampler2D discharge;
uniform float aspect;
uniform float imageAspect;
uniform float focus;
uniform float phase;
uniform float charge;
uniform float surge;
uniform float reveal;
uniform float zoom;
uniform float pan;
uniform float clock;
uniform vec3 tint;
uniform vec2 pointer;
vec2 cover(vec2 uv){vec2 scale=vec2(min(aspect/imageAspect,1.),min(imageAspect/aspect,1.));return (uv-.5)*scale+vec2(focus,.5);}
void main(){
 vec2 uv=cover((vUv-.5)/zoom+.5);
 uv.x+=pan*.35;
 vec3 base=texture2D(chamber,uv).rgb;
 float depth=dot(base,vec3(.21,.72,.07));
 uv+=pointer*(.0015+depth*.003);
 vec2 center=vec2(.68,.51);
 vec2 delta=uv-center;
 float radius=length(delta*vec2(1.75,1.));
 float ring=exp(-pow((radius-(.08+phase*.5))/.09,2.));
 vec2 shift=normalize(delta+vec2(.0001))*ring*surge*.006*sin(radius*65.-phase*24.);
 float split=.0015*surge;
 vec3 physical=vec3(texture2D(chamber,uv+shift+vec2(split,0.)).r,texture2D(chamber,uv+shift).g,texture2D(chamber,uv+shift-vec2(split,0.)).b);
 float lightMask=smoothstep(.07,.6,dot(physical,vec3(.21,.72,.07)));
 vec3 colored=mix(physical,physical*tint*1.8,charge*.52);
 colored*=.2+reveal*.64+charge*.16;
 colored+=physical*tint*surge*lightMask*.65;
 vec2 boltUV=(uv-center)/vec2(.26,.52)+.5;
 float bounds=step(0.,boltUV.x)*step(boltUV.x,1.)*step(0.,boltUV.y)*step(boltUV.y,1.);
 vec3 bolt=texture2D(discharge,clamp(boltUV,0.,1.)).rgb;
 float electric=dot(bolt,vec3(.25,.5,.25));
 float windowMask=smoothstep(.24,.3,uv.y)*(1.-smoothstep(.65,.72,uv.y));
 colored+=mix(bolt,vec3(electric)*tint*1.7,.7)*bounds*windowMask*charge*(.2+surge*.3);
 float halo=exp(-radius*radius*14.);
 colored+=tint*halo*charge*(.025+surge*.045);
 float vignette=1.-smoothstep(.35,.95,length((vUv-.5)*vec2(1.,.7)));
 colored*=.65+.35*vignette;
 float edge=smoothstep(0.,.12,vUv.y)*(1.-smoothstep(.93,1.,vUv.y));
 gl_FragColor=vec4(mix(vec3(.0196,.0392,.0627),colored,edge),1.);
}`;
const particleVertex=`
uniform float clock;uniform float charge;uniform float size;uniform vec3 tint;
attribute float seed;varying float opacity;varying vec3 color;
void main(){
 vec3 p=position;
 float angle=seed*6.28318+clock*.13;
 float tube=seed*134.1;
 vec3 torus=vec3((.82+.24*cos(tube))*cos(angle),.72*sin(tube),(.82+.24*cos(tube))*sin(angle));
 p=mix(p,torus,charge);
 p.y+=sin(clock*.35+seed*25.)*.06;
 vec4 mv=modelViewMatrix*vec4(p,1.);
 gl_Position=projectionMatrix*mv;
 gl_PointSize=clamp(size*(.5+fract(seed*51.))*220./(-mv.z),1.,5.);
 opacity=(.12+charge*.55)*(.4+fract(seed*33.)*.6);
 color=mix(tint,vec3(1.),fract(seed*71.)*.5);
}`;
const particleFragment=`varying float opacity;varying vec3 color;void main(){float d=length(gl_PointCoord-.5);float a=(1.-smoothstep(.15,.5,d))*opacity;gl_FragColor=vec4(color,a);}`;

export default function ChamberScene({ progress, reduced }) {
 const host=useRef(null);
 useEffect(()=>{
  const root=host.current;let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x050a10,0);root.appendChild(renderer.domElement);
  const loader=new THREE.TextureLoader();let loaded=0;let disposed=false;
  const ready=()=>{loaded++;};
  const image=loader.load('/images/photoreal-energy-chamber.png',ready);
  const lightning=loader.load('/images/photoreal-discharge.png',ready);
  const uniforms={chamber:{value:image},discharge:{value:lightning},aspect:{value:1},imageAspect:{value:16/9},focus:{value:.5},phase:{value:0},charge:{value:0},surge:{value:0},reveal:{value:0},zoom:{value:1.16},pan:{value:0},clock:{value:0},tint:{value:new THREE.Vector3(.35,.65,.85)},pointer:{value:new THREE.Vector2()}};
  const material=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms,depthWrite:false,depthTest:false});
  const scene=new THREE.Scene();const quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),material);quad.frustumCulled=false;scene.add(quad);
  const camera=new THREE.Camera();
  const particlesScene=new THREE.Scene();const particleCamera=new THREE.PerspectiveCamera(42,1,.1,50);particleCamera.position.z=8;
  const count=window.innerWidth<760?700:1600;const positions=new Float32Array(count*3),seeds=new Float32Array(count);
  for(let i=0;i<count;i++){const f=i/count;seeds[i]=f;positions[i*3]=Math.sin(i*24.7)*1.6;positions[i*3+1]=(f-.5)*3.5;positions[i*3+2]=Math.cos(i*17.3)*1.2;}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));geo.setAttribute('seed',new THREE.BufferAttribute(seeds,1));
  const particleUniforms={clock:{value:0},charge:{value:0},size:{value:1},tint:{value:new THREE.Vector3(.35,.65,.85)}};
  const particleMaterial=new THREE.ShaderMaterial({vertexShader:particleVertex,fragmentShader:particleFragment,uniforms:particleUniforms,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false});
  const points=new THREE.Points(geo,particleMaterial);particlesScene.add(points);
  let width=1,height=1,visible=false,frame,last=0,current=progress.current,first=true;const pointer={x:0,y:0};
  function resize(){width=root.clientWidth;height=root.clientHeight;renderer.setSize(width,height);uniforms.aspect.value=width/height;uniforms.focus.value=width<760?.66:.5;particleCamera.aspect=width/height;particleCamera.updateProjectionMatrix();}
  const ro=new ResizeObserver(resize);ro.observe(root);resize();const io=new IntersectionObserver(([entry])=>visible=entry.isIntersecting);io.observe(root);
  function move(event){const box=root.getBoundingClientRect();pointer.x=(event.clientX-box.left)/box.width-.5;pointer.y=(event.clientY-box.top)/box.height-.5;}
  window.addEventListener('pointermove',move,{passive:true});
  const lose=event=>{event.preventDefault();root.classList.remove('chamber-renderer--ready');};renderer.domElement.addEventListener('webglcontextlost',lose);
  function render(now){frame=requestAnimationFrame(render);if(disposed||!visible||document.hidden||now-last<32)return;last=now;
   if(loaded<2)return;
   if(first){current=progress.current;first=false;}current+=(progress.current-current)*(reduced?1:.09);
   const sequence=sampleEnergySequence(reduced?.35:current);
   uniforms.imageAspect.value=image.image.width/image.image.height;
   uniforms.phase.value=sequence.progress;uniforms.charge.value=sequence.charge;uniforms.surge.value=reduced?0:sequence.surge;uniforms.reveal.value=reduced?1:sequence.reveal;
   uniforms.zoom.value=reduced?1.03:sequence.zoom;uniforms.pan.value=reduced?0:sequence.pan;uniforms.tint.value.set(...sequence.color);
   uniforms.clock.value=reduced?0:now*.001;uniforms.pointer.value.lerp(new THREE.Vector2(reduced?0:pointer.x,reduced?0:pointer.y),.04);
   particleUniforms.clock.value=reduced?0:now*.001;particleUniforms.charge.value=sequence.charge;particleUniforms.tint.value.copy(uniforms.tint.value);
   const coverX=Math.min((width/height)/uniforms.imageAspect.value,1);
   const chamberScreenX=(.68-uniforms.focus.value)/coverX;
   const viewHeight=2*Math.tan(THREE.MathUtils.degToRad(21))*8;
   points.position.set(chamberScreenX*viewHeight*(width/height),.22,0);points.scale.setScalar(width<760?.65:.85);
   renderer.autoClear=true;renderer.render(scene,camera);renderer.autoClear=false;renderer.render(particlesScene,particleCamera);
   root.classList.add('chamber-renderer--ready');
  }frame=requestAnimationFrame(render);
  return()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();window.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',lose);image.dispose();lightning.dispose();material.dispose();quad.geometry.dispose();geo.dispose();particleMaterial.dispose();renderer.dispose();renderer.domElement.remove();};
 },[progress,reduced]);
 return <div className="chamber-renderer" ref={host} aria-hidden="true"/>;
}
