import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { triangularReactor } from './triangularReactor';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import befour from '../Sections/Projects/Befour.png';
import dmas from '../Sections/Projects/DMAS.png';

export default function LabScene({ energized, finale = false }) {
  const host = useRef(null);
  const power = useRef(energized);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => { power.current = energized; }, [energized]);
  useEffect(() => {
    const container = host.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { setUnavailable(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x050a10, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    scene.environmentIntensity = .45;
    room.dispose();pmrem.dispose();
    scene.fog = new THREE.FogExp2(0x050a10, .055);
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
    const metal = new THREE.MeshStandardMaterial({ color: 0x4d535b, metalness: .95, roughness: .24 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x12151a, metalness: .85, roughness: .32 });
        const light = new THREE.MeshBasicMaterial({ color: 0x71e9ff });
    const assembly = new THREE.Group();
    assembly.position.set(finale ? 0 : 2.7, 0, 0); scene.add(assembly);
    function mesh(geometry, material, parent = assembly) { const object = new THREE.Mesh(geometry, material); parent.add(object); return object; }
    function ring(radius, tube, material, height, parent = assembly) {
      const object = mesh(new THREE.TorusGeometry(radius, tube, 12, 100), material, parent);
      object.rotation.x = Math.PI / 2; object.position.y = height; return object;
    }
    // The closing installation retains its cable rig; the opening presents the reactor alone.
    if (finale) {
    const pedestal = mesh(new THREE.CylinderGeometry(2.1, 2.6, .45, 6), dark);
    pedestal.position.y = -2.65;
    mesh(new THREE.CylinderGeometry(1.75, 2.05, .14, 6), metal).position.y = -2.36;
    mesh(new THREE.CylinderGeometry(1.3, 1.65, .14, 6), dark).position.y = -2.22;
    ring(1.35, .018, light, -2.13);
    const cradle = new THREE.Group(); assembly.add(cradle);
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3;
      const arm = new THREE.Group();arm.rotation.y = angle;cradle.add(arm);
      const foot = mesh(new THREE.BoxGeometry(.42, .38, 1.2), metal, arm);
      foot.position.set(0, -2.3, 1.65);
      const lower = mesh(new THREE.BoxGeometry(.24, 1.5, .35), dark, arm);
      lower.position.set(0, -1.4, 2.12);lower.rotation.x = -.17;
      const upper = mesh(new THREE.BoxGeometry(.32, 1.55, .36), metal, arm);
      upper.position.set(0, 1.3, 2.05);upper.rotation.x = .22;
      const tip = mesh(new THREE.BoxGeometry(.5, .3, .7), dark, arm);
      tip.position.set(0, 2.05, 1.6);tip.rotation.x = -.2;
      for (const y of [-1.2, 1.2]) {
        const inset = mesh(new THREE.BoxGeometry(.07, .65, .025), light, arm);
        inset.position.set(0, y, 1.85);
        for (let j=0;j<5;j++) {
          const fin = mesh(new THREE.BoxGeometry(.5, .025, .33), dark, arm);
          fin.position.set(0,y-.25+j*.13,2.15);
        }
      }
      for (const y of [-2.25, 1.95]) {
        const bolt=mesh(new THREE.CylinderGeometry(.065,.065,.06,6),metal,arm);
        bolt.position.set(0,y,1.65);
      }
      const cable=new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.sin(angle)*1.8,-2.4,Math.cos(angle)*1.8),
        new THREE.Vector3(Math.sin(angle)*3.2,-1.4,Math.cos(angle)*3.2),
        new THREE.Vector3(Math.sin(angle)*3.1,1.2,Math.cos(angle)*3.1),
        new THREE.Vector3(Math.sin(angle)*1.8,2,Math.cos(angle)*1.8),
      ]);
      mesh(new THREE.TubeGeometry(cable,45,.04,8,false),dark);
      if(finale) {
        const tether=new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.sin(angle)*1.8,2,Math.cos(angle)*1.8),
          new THREE.Vector3(Math.sin(angle)*4.2,.3,Math.cos(angle)*4.2),
          new THREE.Vector3(Math.sin(angle)*7,4,Math.cos(angle)*7),
          new THREE.Vector3(Math.sin(angle)*9,6,Math.cos(angle)*9),
        ]);
        mesh(new THREE.TubeGeometry(tether,70,.045,8,false),metal);
      }
    }
    }
    const core = new THREE.Group(); assembly.add(core);
    const reactor = triangularReactor(core);
    reactor.group.scale.setScalar(finale ? 1 : 1.35);
    const gradientCanvas = document.createElement('canvas'); gradientCanvas.width=128; gradientCanvas.height=128;
    const ctx = gradientCanvas.getContext('2d'); const gradient=ctx.createRadialGradient(64,64,0,64,64,64);
    gradient.addColorStop(0,'rgba(134,239,255,.8)');gradient.addColorStop(.15,'rgba(53,193,255,.3)');gradient.addColorStop(1,'rgba(0,70,100,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
    const glowTexture = new THREE.CanvasTexture(gradientCanvas);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));glow.scale.set(5,5,1);core.add(glow);
    const beam = mesh(new THREE.CylinderGeometry(.78,.78,4.6,48,1,true),new THREE.MeshBasicMaterial({color:0x46c8eb,transparent:true,opacity:.035,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));
    beam.position.y=.1;
    const positions = new Float32Array(450*3);
    for(let i=0;i<450;i++){const a=i*2.399963;const r=.3+(i%37)/37*2;positions[i*3]=Math.cos(a)*r;positions[i*3+1]=(i/450-.5)*8;positions[i*3+2]=Math.sin(a)*r;}
    const particleGeometry=new THREE.BufferGeometry();particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const particles=new THREE.Points(particleGeometry,new THREE.PointsMaterial({color:finale ? 0xb7a4ff : 0x90eaff,size:finale ? .065 : .035,transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false}));assembly.add(particles);
    // Existing project screenshots become screens inside the environment.
    const loader = new THREE.TextureLoader();
    const screens=[];
    (finale ? [] : [[befour,-1,3.65,-2.5,-.22],[dmas,6,2.7,-3,-.5]]).forEach(([url,x,y,z,angle])=>{
      const group=new THREE.Group();group.position.set(x,y,z);group.rotation.y=angle;scene.add(group);screens.push(group);
      const texture=loader.load(url);texture.colorSpace=THREE.SRGBColorSpace;
      mesh(new THREE.BoxGeometry(3.6,2.25,.14),metal,group);
      const screen=mesh(new THREE.PlaneGeometry(3.4,2.05),new THREE.MeshBasicMaterial({map:texture,color:0x8aafbe,transparent:true,opacity:.7}),group);screen.position.z=.08;
      const strip=mesh(new THREE.BoxGeometry(3.5,.018,.02),light,group);strip.position.set(0,-1.12,.09);
    });
    const floor=mesh(new THREE.PlaneGeometry(160,160),new THREE.MeshStandardMaterial({color:0x08121b,metalness:.65,roughness:.35}),scene);floor.rotation.x=-Math.PI/2;floor.position.y=-3;
    const grid = new THREE.GridHelper(80,60,0x18333e,0x0d202b);grid.position.y=-2.99;scene.add(grid);
    scene.add(new THREE.HemisphereLight(0x8abedb,0x090b10,.65));
    const cyan = new THREE.PointLight(0x4bdfff,85,15,2);cyan.position.set(2.7,.5,1);scene.add(cyan);
    const rim = new THREE.PointLight(0xff3a25,60,15,2);rim.position.set(6,3,2);scene.add(rim);
    if (finale) {
      const violet = new THREE.PointLight(0x9b6eff, 110, 18, 2);violet.position.set(-3, 2, 3);scene.add(violet);
      for (let i=0;i<22;i++) {
        const rock = mesh(new THREE.IcosahedronGeometry(.3+(i%4)*.18,0),dark,scene);
        rock.position.set(Math.sin(i*2.4)*(3+i%5),-2.8,Math.cos(i*2.4)*(3+i%5));rock.scale.y=.5;
      }
    }
    const fill = new THREE.DirectionalLight(0xa0c3dc,3);fill.position.set(-3,7,5);scene.add(fill);
    let width=0,height=0;const target={x:0,y:0};let visible=true;let frame;let elapsed=0;let last=0;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    function resize(){width=container.clientWidth;height=container.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);resize();
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(container);
    function pointer(e){target.x=(e.clientX/window.innerWidth-.5);target.y=(e.clientY/window.innerHeight-.5);}
    window.addEventListener('pointermove',pointer,{passive:true});
    function render(now){frame=requestAnimationFrame(render);if(!visible || document.hidden || now-last<30)return;last=now;elapsed=now*.001;
      const mobile=width<760;const motion=reduced.matches?0:1;

      camera.position.set((mobile?4.7:1)+target.x*.35*motion,(mobile?1.1:1.3)-target.y*.2*motion,mobile?17:14);
      if (finale) { camera.position.set(2+target.x*.3*motion, 1.2, mobile?16:13);camera.lookAt(0,.3,0); }
      else camera.lookAt(mobile?2.7:0,.3,0);
      assembly.rotation.y=Math.sin(elapsed*.12)*.08*motion;
      core.position.y=Math.sin(elapsed*.6)*.16*motion;
      reactor.update(elapsed, power.current, reduced.matches);
      particles.rotation.y=elapsed*.06*motion;particles.position.y=(elapsed*.1%1)*motion;
      const intensity=power.current?1.7:1;glow.material.opacity=(.3+Math.sin(elapsed*1.4)*.03*motion)*intensity;
      cyan.intensity=55*intensity;
      screens.forEach((s,i)=>{s.rotation.z=Math.sin(elapsed*.3+i)*.018*motion;});renderer.render(scene,camera);
    }
    frame=requestAnimationFrame(render);
    const onLoss=e=>{e.preventDefault();setUnavailable(true);};renderer.domElement.addEventListener('webglcontextlost',onLoss);
    return ()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();window.removeEventListener('pointermove',pointer);renderer.domElement.removeEventListener('webglcontextlost',onLoss);scene.traverse(object=>{object.geometry?.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>{if(material){material.map?.dispose();material.dispose();}});});glowTexture.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();};
  }, [finale]);
  return <div ref={host} className={`lab-scene ${unavailable ? 'lab-scene--fallback' : ''}`} aria-hidden="true">{unavailable && <div className="lab-scene__fallback-core" />}</div>;
}
