import * as THREE from 'three';

interface FloatingDrop {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
}

interface BurstDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  start: number;
  life: number;
}

/** A bounded, reusable set of water droplets for the footer's existing WebGL scene. */
export function createFooterDroplets() {
  const floatingCount = 18;
  const burstCount = 18;
  const total = floatingCount + burstCount;
  let seed = 4197;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const floating: FloatingDrop[] = Array.from({ length: floatingCount }, (_, index) => ({
    x: -1.9 + random() * 4.3,
    y: -0.7 + random() * 1.95,
    z: 1.4 + random() * 0.3,
    size: (index < 3 ? 0.055 : 0.024) + random() * 0.024,
    speed: 0.28 + random() * 0.24,
    phase: random() * Math.PI * 2,
    opacity: 0.55 + random() * 0.35,
  }));
  const bursts: BurstDrop[] = Array.from({ length: burstCount }, () => ({
    x: 0, y: 0, vx: 0, vy: 0, size: 0, start: -100, life: 1,
  }));
  let nextBurst = 0;

  const geometry = new THREE.SphereGeometry(1, 20, 14);
  const positions = geometry.getAttribute('position');
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const taper = 1 - Math.max(0, y) * 0.3;
    positions.setXYZ(i, positions.getX(i) * taper, y * 1.14, positions.getZ(i) * taper);
  }
  geometry.computeVertexNormals();
  const opacities = new THREE.InstancedBufferAttribute(new Float32Array(total), 1);
  opacities.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('aOpacity', opacities);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      attribute float aOpacity;
      varying vec3 vDropNormal;
      varying float vDropOpacity;
      void main() {
        vDropNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);
        vDropOpacity = aOpacity;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDropNormal;
      varying float vDropOpacity;
      void main() {
        vec3 n = normalize(vDropNormal);
        float rim = pow(1.0 - abs(n.z), 2.0);
        float highlight = pow(max(dot(n, normalize(vec3(-0.35, 0.55, 1.0))), 0.0), 38.0);
        float softLight = pow(max(dot(n, normalize(vec3(0.5, -0.3, 1.0))), 0.0), 10.0);
        vec3 tint = mix(vec3(0.16, 0.27, 0.60), vec3(1.0), min(1.0, highlight + rim * 0.15));
        float alpha = (0.08 + rim * 0.78 + highlight * 0.8 + softLight * 0.08) * vDropOpacity;
        gl_FragColor = vec4(tint, min(alpha, 0.9));
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, total);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.renderOrder = 6;
  mesh.frustumCulled = false;
  const group = new THREE.Group();
  group.add(mesh);
  const rippleGeometry = new THREE.RingGeometry(0.975, 1, 48);
  const ripples = Array.from({ length: 3 }, () => {
    const rippleMaterial = new THREE.MeshBasicMaterial({
      color: '#8E7CE8', transparent: true, opacity: 0, depthWrite: false, depthTest: false,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ring.renderOrder = 5.5;
    ring.visible = false;
    group.add(ring);
    return { ring, start: -100 };
  });
  let nextRipple = 0;
  const dummy = new THREE.Object3D();

  const setDrop = (index: number, x: number, y: number, z: number, size: number, opacity: number) => {
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(size);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    opacities.setX(index, opacity);
  };

  const update = (time: number, pointer: THREE.Vector2, pointerStrength: number) => {
    floating.forEach((drop, index) => {
      const phase = time * drop.speed + drop.phase;
      let x = drop.x + Math.sin(phase) * 0.12;
      let y = drop.y + Math.cos(phase * 0.75) * 0.15;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const push = Math.exp(-distance * distance * 5) * pointerStrength * 0.25;
      if (distance > 0.001) {
        x += (dx / distance) * push;
        y += (dy / distance) * push;
      }
      setDrop(index, x, y, drop.z + Math.sin(phase * 0.7) * 0.1, drop.size, drop.opacity);
    });

    bursts.forEach((drop, index) => {
      const age = time - drop.start;
      if (age < 0 || age >= drop.life) {
        setDrop(floatingCount + index, 0, 0, 1.5, 0, 0);
        return;
      }
      const progress = age / drop.life;
      const fade = Math.min(1, age * 8) * Math.min(1, (1 - progress) * 3);
      setDrop(
        floatingCount + index,
        drop.x + drop.vx * age,
        drop.y + drop.vy * age - 0.12 * age * age,
        1.8,
        drop.size * (0.55 + 0.45 * fade),
        fade * 0.9
      );
    });
    ripples.forEach(({ ring, start }) => {
      const progress = (time - start) / 1.3;
      ring.visible = progress >= 0 && progress < 1;
      if (ring.visible) {
        ring.scale.setScalar(0.04 + progress * 0.48);
        ring.material.opacity = Math.sin(progress * Math.PI) * 0.38;
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
    opacities.needsUpdate = true;
  };

  const burst = (x: number, y: number, time: number) => {
    const ripple = ripples[nextRipple];
    nextRipple = (nextRipple + 1) % ripples.length;
    ripple.start = time;
    ripple.ring.position.set(x, y, 1.75);
    for (let i = 0; i < 6; i++) {
      const drop = bursts[nextBurst];
      nextBurst = (nextBurst + 1) % burstCount;
      drop.x = x + (random() - 0.5) * 0.08;
      drop.y = y + (random() - 0.5) * 0.06;
      drop.vx = (random() - 0.5) * 0.45;
      drop.vy = 0.25 + random() * 0.35;
      drop.size = 0.025 + random() * 0.035;
      drop.start = time + i * 0.025;
      drop.life = 1.6 + random() * 0.6;
    }
  };

  return {
    group,
    mesh,
    update,
    burst,
    dispose: () => {
      mesh.dispose();
      geometry.dispose();
      material.dispose();
      rippleGeometry.dispose();
      ripples.forEach(({ ring }) => ring.material.dispose());
    },
  };
}
