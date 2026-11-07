import * as THREE from 'three';

export function triangularReactor(parent) {
  const reactor = new THREE.Group(); parent.add(reactor);
  const casing = new THREE.MeshStandardMaterial({color:0x152534,metalness:.95,roughness:.22});
  const titanium = new THREE.MeshStandardMaterial({color:0x547082,metalness:.95,roughness:.24});
  const blue = new THREE.MeshStandardMaterial({color:0x082838,emissive:0x086181,emissiveIntensity:.65,metalness:.8,roughness:.25});
  const energy = new THREE.MeshStandardMaterial({color:0xc8fbff,emissive:0x65eaff,emissiveIntensity:2.4,metalness:.15,roughness:.16});
  const points=[[-1.35,1.35],[1.35,1.35],[1.72,.72],[.27,-1.72],[-.27,-1.72],[-1.72,.72]];
  function contour(scale) {const path=new THREE.Shape();points.forEach(([x,y],i)=>i?path.lineTo(x*scale,y*scale):path.moveTo(x*scale,y*scale));path.closePath();return path;}
  function frame(outer,inner,depth,z,material) {
    const shape=contour(outer);const hole=new THREE.Path();[...points].reverse().forEach(([x,y],i)=>i?hole.lineTo(x*inner,y*inner):hole.moveTo(x*inner,y*inner));hole.closePath();shape.holes.push(hole);
    const geometry=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.025});
    const mesh=new THREE.Mesh(geometry,material);mesh.position.z=z;reactor.add(mesh);return mesh;
  }
  frame(1.08,.87,.3,-.2,casing);
  frame(1.02,.98,.055,.12,titanium);
  frame(.96,.925,.035,.17,blue);
  frame(.9,.72,.12,.18,casing);
  frame(.85,.81,.025,.32,energy);
  frame(.76,.70,.04,.31,titanium);
  const shape=new THREE.Shape();shape.moveTo(-.78,.61);shape.lineTo(.78,.61);shape.lineTo(0,-.92);shape.closePath();
  const heart=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.08,bevelEnabled:true,bevelSegments:3,bevelSize:.045,bevelThickness:.025}),energy);heart.position.z=.34;reactor.add(heart);
  const lip=frame(.69,.63,.035,.36,casing);
  // Mechanical bridges divide the luminous channels into separate cells.
  for(const side of [-1,1]) {
    const bridge=new THREE.Mesh(new THREE.BoxGeometry(.12,1.75,.15),casing);bridge.position.set(side*.78,-.1,.43);bridge.rotation.z=-side*.47;reactor.add(bridge);
    for(let i=0;i<6;i++) {
      const fin=new THREE.Mesh(new THREE.BoxGeometry(.18,.055,.19),titanium);fin.position.set(side*(1.52-i*.115),.57-i*.2,.09);fin.rotation.z=side*.45;reactor.add(fin);
    }
  }
  const bar=new THREE.Mesh(new THREE.BoxGeometry(2.35,.17,.23),casing);bar.position.set(0,.83,.39);reactor.add(bar);
  for(const x of [-1.05,0,1.05]) {
    const mount=new THREE.Mesh(new THREE.CylinderGeometry(.24,.26,.2,6),casing);mount.rotation.x=Math.PI/2;mount.position.set(x,1.3,.32);reactor.add(mount);
    const bolt=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.04,6),titanium);bolt.rotation.x=Math.PI/2;bolt.position.set(x,1.3,.45);reactor.add(bolt);
    const insert=new THREE.Mesh(new THREE.CylinderGeometry(.085,.085,.045,6),energy);insert.rotation.x=Math.PI/2;insert.position.set(x,1.3,.48);reactor.add(insert);
  }
  const arcs=[];
  for(let j=0;j<8;j++) {
    const angle=j*Math.PI/4;const vertices=[];
    for(let k=0;k<15;k++) {
      const t=k/14, r=1.9+t*.9;
      const kink=Math.sin(k*4.7+j*2.1)*.12*Math.sin(t*Math.PI);
      vertices.push(new THREE.Vector3(Math.cos(angle)*r-Math.sin(angle)*kink,Math.sin(angle)*r+Math.cos(angle)*kink,.2+Math.sin(k)*.04));
    }
    const geometry=new THREE.BufferGeometry().setFromPoints(vertices);
    const line=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0x89e9ff,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));reactor.add(line);
    const glow=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(vertices),40,.025,5,false),new THREE.MeshBasicMaterial({color:0x008de0,transparent:true,opacity:.16,blending:THREE.AdditiveBlending,depthWrite:false}));reactor.add(glow);
    const spark=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),energy);reactor.add(spark);arcs.push({line,glow,spark,vertices});
  }
  return {group:reactor,update(time,energized,reduced){
    reactor.rotation.y=reduced?-.08:Math.sin(time*.35)*.12-.08;
    reactor.rotation.x=reduced?0:Math.sin(time*.24)*.04;
    const power=energized?1.6:1;
    energy.emissiveIntensity=(2.1+(reduced?0:Math.sin(time*1.2)*.2))*power;
    lip.position.z=.36+(energized?.06:0);
    arcs.forEach(({line,glow,spark,vertices},j)=>{
      const phase=reduced?.5:(time*.35+j*.13)%1;
      line.geometry.setDrawRange(0,reduced?10:Math.max(3,Math.ceil(phase*15)));
      spark.position.copy(vertices[Math.min(14,Math.floor(phase*15))]);
      line.material.opacity=(.45+Math.sin(phase*Math.PI)*.4)*power;glow.material.opacity=.12*power;
    });
  }};
}
