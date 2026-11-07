import * as THREE from 'three';

// Smooth travelling current with a bright inner conductor and soft outer halo.
export function electricCore(parent, { height = 18, radius = .55 } = {}) {
  const group = new THREE.Group(); parent.add(group);
  const bolts = [];
  for (let strand = 0; strand < 4; strand++) {
    const points = [];
    for (let i = 0; i <= 90; i++) {
      const t = i / 90, angle = t * 25 + strand * Math.PI / 2;
      const r = radius * (.55 + .4 * Math.sin(i * 2.7 + strand));
      points.push(new THREE.Vector3(Math.cos(angle) * r, (t - .5) * height, Math.sin(angle) * r));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const inner = new THREE.Mesh(new THREE.TubeGeometry(curve, 240, .018, 5, false), new THREE.MeshBasicMaterial({ color: 0xd9fbff }));
    const halo = new THREE.Mesh(new THREE.TubeGeometry(curve, 240, .08, 6, false), new THREE.MeshBasicMaterial({ color: 0x36bfff, transparent: true, opacity: .12, blending: THREE.AdditiveBlending, depthWrite: false }));
    group.add(inner, halo);
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), new THREE.MeshBasicMaterial({ color: 0xe5ffff }));group.add(pulse);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(.32, 10, 8), new THREE.MeshBasicMaterial({ color: 0x54cfff, transparent: true, opacity: .12, blending: THREE.AdditiveBlending, depthWrite: false }));group.add(glow);
    bolts.push({ curve, inner, halo, pulse, glow });
  }
  return { group, update(time, reduced = false) {
    group.rotation.y = reduced ? 0 : time * .18;
    bolts.forEach((bolt, i) => {
      const phase = reduced ? .45 : (time * .23 + i * .25) % 1;
      bolt.pulse.position.copy(bolt.curve.getPointAt(phase));bolt.glow.position.copy(bolt.pulse.position);
      bolt.halo.material.opacity = .1 + (reduced ? .03 : Math.sin(time * 1.7 + i) * .035);
    });
  }};
}
