import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createQuantumBeam } from '../../Components/QuantumBeam';

export default function HelixScene({ projects, progress, reduced, active = 0 }) {
  const container = useRef(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const host = container.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({antialias:false,alpha:true,powerPreference:'high-performance'}); } catch { setUnavailable(true); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio,window.innerWidth<760?1:1.25));renderer.setClearColor(0x03090e,1);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.5;host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();scene.fog = new THREE.FogExp2(0x03090e,.012);
    const camera = new THREE.PerspectiveCamera(48,1,.1,100);
    const group = new THREE.Group();scene.add(group);
    const metal = new THREE.MeshLambertMaterial({color:0x264554});
    const cyan = new THREE.MeshBasicMaterial({color:0x5ed9ee});
    const red = new THREE.MeshBasicMaterial({color:0xd9503e});
    function add(geo,mat,parent=group){const m=new THREE.Mesh(geo,mat);parent.add(m);return m;}
    // A continuous helix winds around the illuminated archive column.
    const helixPoints=[];
    for(let j=0;j<=360;j++){const t=j/360;const a=t*Math.PI*2.1;helixPoints.push(new THREE.Vector3(Math.sin(a)*4.7,5-t*12,Math.cos(a)*4.7));}
    const curve=new THREE.CatmullRomCurve3(helixPoints);
    const railMaterial = new THREE.MeshBasicMaterial({color:0xa8f8ff,toneMapped:false});
    add(new THREE.TubeGeometry(curve,240,.045,6,false),railMaterial);
    add(new THREE.TubeGeometry(curve,240,.13,6,false),new THREE.MeshBasicMaterial({color:0x25b9ff,transparent:true,opacity:.15,blending:THREE.AdditiveBlending,depthWrite:false}));
    const quantum = createQuantumBeam(group);
    for(let j=0;j<19;j++) {
      const collar=add(new THREE.TorusGeometry(j%3===0?1.1:.7,.025,6,64),metal);
      collar.rotation.x=Math.PI/2;collar.position.y=8-j;
    }
    const stations=[];const textures=[];const loader=new THREE.TextureLoader();
    projects.forEach((p,i)=>{
      const t=i/(projects.length-1);const angle=t*Math.PI*2.1;const y=5-t*12;
      const station=new THREE.Group();station.position.set(Math.sin(angle)*4.7,y,Math.cos(angle)*4.7);station.rotation.y=angle;station.userData.ready=false;group.add(station);stations.push(station);
      const frameMaterial=new THREE.MeshLambertMaterial({color:0x284655,transparent:true,opacity:0,depthWrite:false});
      const frameMesh=add(new THREE.BoxGeometry(3.8,2.55,.12),frameMaterial,station);frameMesh.renderOrder=1;
      const texture=loader.load(p.image,loaded=>{
        const image=loaded.image;
        if(image.width>1280){const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=Math.round(image.height*1280/image.width);canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);loaded.image=canvas;loaded.needsUpdate=true;}
        station.userData.ready=true;
      });texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);
      const screen=add(new THREE.PlaneGeometry(3.64,2.28),new THREE.MeshBasicMaterial({map:texture,color:0xffffff,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,toneMapped:false}),station);screen.position.set(0,.04,.075);screen.renderOrder=3;
      const sweep=add(new THREE.PlaneGeometry(3.64,.018),new THREE.MeshBasicMaterial({color:0x97f6ff,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}),station);sweep.position.z=.09;sweep.renderOrder=4;
      station.userData.screen=screen;station.userData.frame=frameMesh;station.userData.sweep=sweep;
      const lower=add(new THREE.BoxGeometry(3.8,.025,.03),i%2?red:cyan,station);lower.position.set(0,-1.27,.08);
      for(const x of [-1.95,1.95]){const edge=add(new THREE.BoxGeometry(.025,.55,.025),cyan,station);edge.position.set(x,1,.1);}
      // Radial support connects each display to the central column.
      const a=new THREE.Vector3(0,y,0),b=station.position.clone();
      add(new THREE.TubeGeometry(new THREE.LineCurve3(a,b),1,.018,5,false),metal);
      const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#86e7f5';ctx.font='28px monospace';ctx.fillText(`0${i+1} / ${p.title.toUpperCase()}`,25,75);
      const labelTexture=new THREE.CanvasTexture(canvas);textures.push(labelTexture);const label=add(new THREE.PlaneGeometry(3.8,.48),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false}),station);label.position.set(0,1.65,.08);label.material.side=THREE.DoubleSide;label.renderOrder=5;station.userData.label=label;
    });
    const dustGeo=new THREE.BufferGeometry();const pos=new Float32Array(240*3);for(let i=0;i<240;i++){pos[i*3]=Math.sin(i*43.2)*15;pos[i*3+1]=(i/240)*30-15;pos[i*3+2]=Math.cos(i*12.6)*15;}dustGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0x81cfdf,size:.025,transparent:true,opacity:.4}));scene.add(dust);
    scene.add(new THREE.HemisphereLight(0xa8e8ff,0x101021,2));const point=new THREE.PointLight(0x38d6ff,70,30);scene.add(point);
    const floor=add(new THREE.CircleGeometry(25,80),new THREE.MeshLambertMaterial({color:0x06121c}),scene);floor.rotation.x=-Math.PI/2;floor.position.y=-9;
    const grid=new THREE.GridHelper(50,35,0x193c48,0x10212d);grid.position.y=-8.99;scene.add(grid);
    let width=0,height=0,visible=false,frame,last=0,current=0;let initialized=false;
    function resize(){width=host.clientWidth;height=host.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(host);
    function render(now){frame=requestAnimationFrame(render);if(!visible||document.hidden){last=0;return;}
      const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;
      const damping=1-Math.exp(-12*dt);
      quantum.update(now*.001,reduced,1.05);
      const target=Math.min(5,Math.floor(progress.current*6));
      const destination=Math.max(0,Math.min(5,progress.current*6-.3));
      if(!initialized){current=destination;initialized=true;}else current+=(destination-current)*(reduced?1:damping);
      const t=current/5,angle=t*Math.PI*2.1,y=5-t*12;const mobile=width<760;
      camera.position.set(Math.sin(angle)*(mobile?15:14),y+1.7,Math.cos(angle)*(mobile?15:14));
      const lateral=mobile?0:-1.25;
      camera.lookAt(Math.sin(angle)*1.6+Math.cos(angle)*lateral,y+(mobile?-.35:-.1),Math.cos(angle)*1.6-Math.sin(angle)*lateral);
      point.position.set(Math.sin(angle)*6,y+3,Math.cos(angle)*6);
      stations.forEach((station,i)=>{
        const distance=Math.abs(i-current);
        const focus=Math.max(0,1-distance);
        const opacity=station.userData.ready?(i===target?1:i===target+1?.48:i===target-1?.24:.12):0;
        const screen=station.userData.screen,frame=station.userData.frame;
        screen.material.opacity+=(opacity-screen.material.opacity)*(reduced?1:1-Math.exp(-9*dt));
        frame.material.opacity+=(opacity*.6-frame.material.opacity)*damping;
        station.userData.label.material.opacity=.25+focus*.75;
        station.scale.setScalar(.94+focus*.06);
        station.lookAt(camera.position);
        if(!reduced)station.rotateX((1-focus)*-.04);
        const scan=station.userData.sweep;
        scan.position.y=-1.05+focus*2.15;
        scan.material.opacity=reduced?0:Math.sin(focus*Math.PI)*.5;
      });
      if(!reduced)dust.rotation.y=now*.00001;renderer.render(scene,camera);
    }frame=requestAnimationFrame(render);
    return()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();scene.traverse(o=>{o.geometry?.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m?.dispose());});textures.forEach(t=>t.dispose());quantum.dispose();renderer.dispose();renderer.domElement.remove();};
  },[projects,progress,reduced]);
  return <div className={`helix-scene ${unavailable ? 'helix-fallback' : ''}`} ref={container} aria-hidden="true">{unavailable && <div className="helix-fallback__screens"><img src={projects[active].image} alt="" /></div>}</div>;
}
