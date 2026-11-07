import * as THREE from 'three';

// A narrow axial light source inside a true 3D rippled field, rather than a billboard.
export function createQuantumBeam(parent) {
 const field=new THREE.Group();field.position.y=-1;parent.add(field);
 const uniforms={time:{value:0},power:{value:1}};
 const material=new THREE.ShaderMaterial({
  uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:`varying vec2 vUv;varying float vFacing;uniform float time;
   void main(){vUv=uv;vec3 p=position;float y=p.y;
   float radius=.42+.22*sin(y*.85+time*.2)+.11*sin(y*1.7-time*.12);
   p.x*=radius;p.z*=radius;
   vec4 mv=modelViewMatrix*vec4(p,1.);vec3 n=normalize(normalMatrix*normal);
   vFacing=abs(dot(n,normalize(-mv.xyz)));gl_Position=projectionMatrix*mv;}`,
  fragmentShader:`precision highp float;varying vec2 vUv;varying float vFacing;uniform float time;uniform float power;
   void main(){float angle=vUv.x*6.283185,y=(vUv.y-.5)*22.;
   float warp=.25*sin(y*.7-time*.2);
   float strands=pow(.5+.5*sin(angle*32.+y*.8+warp+time*.12),22.);
   float ripples=pow(.5+.5*cos(y*15.+angle*.7-time*.4),30.);
   float edge=pow(1.-vFacing,3.);
   float ends=smoothstep(0.,.045,vUv.y)*(1.-smoothstep(.955,1.,vUv.y));
   float a=(strands*.12+ripples*.045+edge*.07)*ends*power;
   gl_FragColor=vec4(vec3(.1,.55,1.),a);}`
 });
 const shell=new THREE.Mesh(new THREE.CylinderGeometry(1,1,22,32,80,true),material);field.add(shell);
 const axial=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,22,16),new THREE.MeshBasicMaterial({color:0xc1faff,transparent:true,opacity:.92,blending:THREE.AdditiveBlending,depthWrite:false}));field.add(axial);
 const corona=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,22,24,1,true),new THREE.MeshBasicMaterial({color:0x25aeff,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));field.add(corona);
 // Photographic discharge threads stay confined to the pole, with black blending out.
 const arcTexture=new THREE.TextureLoader().load('/images/photoreal-discharge.png');
 arcTexture.wrapT=THREE.RepeatWrapping;arcTexture.colorSpace=THREE.SRGBColorSpace;
 const arcUniforms={map:{value:arcTexture},time:{value:0},power:{value:1}};
 const arcMaterial=new THREE.ShaderMaterial({
  uniforms:arcUniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:`precision highp float;varying vec2 vUv;uniform sampler2D map;uniform float time;uniform float power;
   void main(){vec2 uv=vec2(vUv.x,vUv.y*3.2-time*.075);
   vec3 arc=texture2D(map,uv).rgb;
   float ends=smoothstep(0.,.025,vUv.y)*(1.-smoothstep(.975,1.,vUv.y));
   float traveling=exp(-pow((vUv.y-fract(time*.12))/.055,2.));
   vec3 light=mix(arc,vec3(dot(arc,vec3(.3,.5,.2)))*vec3(.42,.82,1.),.3);
   gl_FragColor=vec4(light*(.62+traveling*.5)*power*ends,1.);}`
 });
 // Three intersecting planes preserve the visible discharge from every orbit angle.
 for(let i=0;i<3;i++) {
  const arc=new THREE.Mesh(new THREE.PlaneGeometry(1.7,22),arcMaterial);
  arc.rotation.y=i*Math.PI/3;arc.renderOrder=1;field.add(arc);
 }
 const spill=[];
 for(let i=0;i<2;i++) {
  const lamp=new THREE.PointLight(0x6ddfff,16,7,2);lamp.position.y=i?5:-5;field.add(lamp);spill.push(lamp);
 }
 const filamentPositions=[];
 for(let i=0;i<16;i++) {
  const points=[];
  for(let j=0;j<=100;j++){
   const y=j/100*22-11;const a=i/16*Math.PI*2+y*.22;
   const r=.25+.55*Math.pow(.5+.5*Math.sin(y*.75+i*.08),2);
   points.push(new THREE.Vector3(Math.sin(a)*r,y,Math.cos(a)*r));
  }
  for(let k=1;k<points.length;k++)filamentPositions.push(...points[k-1].toArray(),...points[k].toArray());
 }
 const filamentGeo=new THREE.BufferGeometry();filamentGeo.setAttribute('position',new THREE.Float32BufferAttribute(filamentPositions,3));
 field.add(new THREE.LineSegments(filamentGeo,new THREE.LineBasicMaterial({color:0x35b5ec,transparent:true,opacity:.1,blending:THREE.AdditiveBlending,depthWrite:false})));
 return {dispose(){arcTexture.dispose();},update(time,reduced,power){uniforms.time.value=reduced?0:time;arcUniforms.time.value=reduced?0:time;arcUniforms.power.value=power;spill.forEach((lamp,i)=>{lamp.position.y=reduced?(i?5:-5):((time*.9+i*11)%22)-11;lamp.intensity=14*power;});uniforms.power.value=power;field.rotation.y=reduced?0:time*.035;axial.material.opacity=.8+power*.08;}};
}
