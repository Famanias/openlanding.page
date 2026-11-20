import * as THREE from 'three';
import { getShorelineSprayAnchors } from '../sim/island';
import { OceanParams, sampleOceanAtWorldXZ } from '../sim/ocean';
import { ProceduralTextureSet } from './textures';

export interface WeatherEffectsRig {
  group: THREE.Group;
  lightningLight: THREE.DirectionalLight;
  update: (params: {
    dt: number;
    time: number;
    cameraPos: THREE.Vector3;
    windDirX: number;
    windDirZ: number;
    windStrength: number;
    gustFactor: number;
    rainIntensity: number;
    sprayIntensity: number;
    fogDensity: number;
    lightningFlash: number;
    showParticles: boolean;
    expensiveEffects: boolean;
    oceanParams: OceanParams;
    dayFactor: number;
    beaconOrigin: THREE.Vector3;
    beaconDir: THREE.Vector3;
    beaconActive: boolean;
  }) => void;
  dispose: () => void;
}

interface RainDrop {
  x: number;
  y: number;
  z: number;
  speed: number;
  len: number;
}

interface SprayParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  anchorIdx: number;
  sizeScale: number;
}

interface BirdState {
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  baseY: number;
  flapSpeed: number;
  centerX: number;
  centerZ: number;
}

/**
 * Synchronized environmental & atmospheric effects:
 * - Wind-driven diagonal rain streaks (catching warm light inside the lighthouse beam!)
 * - Wave-phase driven localized crashing shoreline spray along island rock contours
 * - Drifting coastal fog wisps
 * - Distant branching lightning bolt & controlled flash illumination
 * - Gliding coastal seabirds
 */
export function buildWeatherEffects(
  textures: ProceduralTextureSet,
  counts: { rain: number; spray: number; fogWisps: number; birds: number }
): WeatherEffectsRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    disposables.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    disposables.push(m);
    return m;
  };

  // =========================================================================
  // 1. WIND-DRIVEN DIAGONAL RAIN STREAKS (Per-instance tint catches beacon light)
  // =========================================================================
  const rainGeo = trackGeo(new THREE.PlaneGeometry(0.018, 1.05));
  const rainMat = trackMat(
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  const rainMesh = new THREE.InstancedMesh(rainGeo, rainMat, counts.rain);
  rainMesh.frustumCulled = false;
  rainMesh.renderOrder = 8;
  group.add(rainMesh);

  const rainDrops: RainDrop[] = [];
  for (let i = 0; i < counts.rain; i++) {
    rainDrops.push({
      x: (Math.random() - 0.5) * 68,
      y: Math.random() * 36,
      z: (Math.random() - 0.5) * 68,
      speed: 22 + Math.random() * 14,
      len: 0.75 + Math.random() * 0.75,
    });
  }

  // =========================================================================
  // 2. LOCALIZED CRASHING WAVE & SEA SPRAY PARTICLES (Points)
  // =========================================================================
  const shoreAnchors = getShorelineSprayAnchors();
  const sprayCount = counts.spray;
  const sprayPositions = new Float32Array(sprayCount * 3);
  const sprayAlphas = new Float32Array(sprayCount);
  const spraySizes = new Float32Array(sprayCount);
  const sprayGeo = trackGeo(new THREE.BufferGeometry());
  sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPositions, 3));
  sprayGeo.setAttribute('aAlpha', new THREE.BufferAttribute(sprayAlphas, 1));
  sprayGeo.setAttribute('aSize', new THREE.BufferAttribute(spraySizes, 1));

  const sprayMat = trackMat(
    new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: textures.spraySprite },
        uColor: { value: new THREE.Color(0xdcebf4) },
        uOpacity: { value: 0.5 },
        uSize: { value: 32.0 },
      },
      vertexShader: /* glsl */ `
        attribute float aAlpha;
        attribute float aSize;
        uniform float uSize;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * aSize * (26.0 / max(4.0, -mvPosition.z)) * (0.65 + (1.0 - aAlpha) * 0.7);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          float alpha = tex.a * vAlpha * uOpacity;
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(uColor * tex.rgb, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    })
  );

  const sprayPoints = new THREE.Points(sprayGeo, sprayMat);
  sprayPoints.frustumCulled = false;
  sprayPoints.renderOrder = 7;
  group.add(sprayPoints);

  const sprayParticles: SprayParticle[] = [];
  for (let i = 0; i < sprayCount; i++) {
    const anchorIdx = i % Math.max(1, shoreAnchors.length);
    const a = shoreAnchors[anchorIdx] ?? { x: 2, z: 4, nx: -1, nz: 0 };
    sprayParticles.push({
      x: a.x,
      y: -15,
      z: a.z,
      vx: 0,
      vy: 0,
      vz: 0,
      life: Math.random() * 1.8,
      maxLife: 0.9 + Math.random() * 1.25,
      anchorIdx,
      sizeScale: 0.75 + Math.random() * 0.65,
    });
  }

  // =========================================================================
  // 3. DRIFTING COASTAL FOG & MIST WISPS
  // =========================================================================
  const fogGeo = trackGeo(new THREE.PlaneGeometry(14, 7.5));
  const fogMat = trackMat(
    new THREE.MeshBasicMaterial({
      map: textures.spraySprite,
      color: 0xaabcc8,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  const fogWisps: Array<{
    mesh: THREE.Mesh;
    baseX: number;
    baseY: number;
    baseZ: number;
    speed: number;
    phase: number;
  }> = [];
  for (let i = 0; i < counts.fogWisps; i++) {
    const m = new THREE.Mesh(fogGeo, fogMat);
    const baseX = -18 + (i / Math.max(1, counts.fogWisps)) * 46;
    const baseY = 2.6 + (i % 4) * 1.9;
    const baseZ = -12 + ((i * 7) % 10) * 3.0;
    m.position.set(baseX, baseY, baseZ);
    const s = 0.85 + (i % 3) * 0.45;
    m.scale.set(s * 1.4, s, 1);
    m.renderOrder = 6;
    group.add(m);
    fogWisps.push({
      mesh: m,
      baseX,
      baseY,
      baseZ,
      speed: 0.7 + (i % 5) * 0.25,
      phase: i * 1.37,
    });
  }

  // =========================================================================
  // 4. DISTANT BRANCHING 3D LIGHTNING BOLT & CONTROLLED FLASH LIGHT
  // =========================================================================
  const buildLightningBoltGeo = (): THREE.BufferGeometry => {
    const segs: number[] = [];
    let x = 36;
    let y = 40;
    let z = -28;
    for (let i = 0; i < 16; i++) {
      const nx = x + (Math.sin(i * 4.1) * 2.2 - 0.55);
      const ny = y - 1.9;
      const nz = z + Math.cos(i * 3.3) * 1.4;
      segs.push(x, y, z, nx, ny, nz);

      if (i === 4 || i === 8 || i === 11) {
        let bx = nx;
        let by = ny;
        let bz = nz;
        const dir = i === 8 ? -1 : 1;
        for (let b = 0; b < 5; b++) {
          const bnx = bx + dir * (1.2 + b * 0.4) + Math.sin(b * 5.2) * 0.6;
          const bny = by - 1.5;
          const bnz = bz + Math.cos(b * 3.7) * 0.7;
          segs.push(bx, by, bz, bnx, bny, bnz);
          bx = bnx;
          by = bny;
          bz = bnz;
        }
      }
      x = nx;
      y = ny;
      z = nz;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
    return geo;
  };

  const boltMat = trackMat(
    new THREE.LineBasicMaterial({
      color: 0xd4e8ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  const lightningBolt = new THREE.LineSegments(
    trackGeo(buildLightningBoltGeo()),
    boltMat
  );
  lightningBolt.visible = false;
  group.add(lightningBolt);

  // Restrained distant lightning directional light (never washes scene pure white)
  const lightningLight = new THREE.DirectionalLight(0xa4ccff, 0);
  lightningLight.position.set(38, 44, -26);
  group.add(lightningLight);

  // =========================================================================
  // 5. DISTANT GLIDING SEABIRDS
  // =========================================================================
  const birdMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xe2e6ec,
      roughness: 0.72,
      metalness: 0.0,
      side: THREE.DoubleSide,
    })
  );
  const wingGeo = trackGeo(new THREE.BufferGeometry());
  wingGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        0, 0, 0.14,
        0, 0, -0.18,
        0.55, 0.06, -0.04,
        0.55, 0.06, -0.04,
        0, 0, -0.18,
        1.02, -0.06, -0.14,
      ],
      3
    )
  );
  wingGeo.computeVertexNormals();

  const birds: Array<{
    root: THREE.Group;
    leftWing: THREE.Mesh;
    rightWing: THREE.Mesh;
    state: BirdState;
  }> = [];

  for (let i = 0; i < counts.birds; i++) {
    const root = new THREE.Group();
    const body = new THREE.Mesh(
      trackGeo(new THREE.ConeGeometry(0.065, 0.52, 5)),
      birdMat
    );
    body.rotation.x = Math.PI / 2;
    root.add(body);

    const rightWing = new THREE.Mesh(wingGeo, birdMat);
    const leftWing = new THREE.Mesh(wingGeo, birdMat);
    leftWing.scale.x = -1;
    root.add(rightWing, leftWing);
    group.add(root);

    birds.push({
      root,
      leftWing,
      rightWing,
      state: {
        orbitRadius: 11 + (i % 4) * 4.5,
        orbitSpeed: 0.18 + (i % 3) * 0.055,
        phase: i * 1.18,
        baseY: 14.0 + (i % 4) * 2.4,
        flapSpeed: 4.8 + (i % 3) * 0.85,
        centerX: -12.0 + (i % 3) * 4.5,
        centerZ: -8.0 + (i % 2) * 5.0,
      },
    });
  }

  // Reusable scratch objects (zero per-frame GC allocation)
  const _dummy = new THREE.Object3D();
  const _vel = new THREE.Vector3();
  const _up = new THREE.Vector3(0, 1, 0);
  const _quat = new THREE.Quaternion();
  const _sprayColDay = new THREE.Color(0xe6f0f7);
  const _sprayColNight = new THREE.Color(0x4b6276);
  const _rainBaseCol = new THREE.Color(0xbcd2e6);
  const _rainBeamCol = new THREE.Color(0xffe09c);
  const _tmpCol = new THREE.Color();
  const _toDrop = new THREE.Vector3();

  return {
    group,
    lightningLight,
    update: ({
      dt,
      time,
      cameraPos,
      windDirX,
      windDirZ,
      windStrength,
      gustFactor,
      rainIntensity,
      sprayIntensity,
      fogDensity,
      lightningFlash,
      showParticles,
      expensiveEffects,
      oceanParams,
      dayFactor,
      beaconOrigin,
      beaconDir,
      beaconActive,
    }) => {
      const clampedDt = Math.min(0.05, Math.max(0.001, dt));
      const effectScale = expensiveEffects ? 1.0 : 0.45;

      // --- 1. Wind-Driven Diagonal Rain (selected drops brighten inside beacon beam) ---
      const activeRainCount = showParticles
        ? Math.floor(counts.rain * effectScale * Math.min(1, rainIntensity * 1.05))
        : 0;
      rainMesh.visible = activeRainCount > 0;
      if (rainMesh.visible) {
        rainMesh.count = activeRainCount;
        rainMat.opacity = 0.16 + rainIntensity * 0.28 + lightningFlash * 0.14;

        const windTiltX = windDirX * (4.5 + windStrength * 7.2 + gustFactor * 4.0);
        const windTiltZ = windDirZ * (4.5 + windStrength * 7.2 + gustFactor * 4.0);
        const cx = cameraPos.x * 0.35;
        const cz = cameraPos.z * 0.35;

        for (let i = 0; i < activeRainCount; i++) {
          const d = rainDrops[i];
          const fallY = -d.speed * (0.85 + rainIntensity * 0.35);
          d.x += windTiltX * clampedDt;
          d.y += fallY * clampedDt;
          d.z += windTiltZ * clampedDt;

          if (d.y < -1) {
            d.y = 32 + Math.random() * 6;
            d.x = cx + (Math.random() - 0.5) * 64;
            d.z = cz + (Math.random() - 0.5) * 64;
          }
          if (d.x - cx > 34) d.x -= 68;
          if (d.x - cx < -34) d.x += 68;
          if (d.z - cz > 34) d.z -= 68;
          if (d.z - cz < -34) d.z += 68;

          _vel.set(windTiltX, fallY, windTiltZ).normalize();
          _quat.setFromUnitVectors(_up, _vel);
          _dummy.position.set(d.x, d.y, d.z);
          _dummy.quaternion.copy(_quat);
          _dummy.scale.set(1, d.len * (0.9 + windStrength * 0.35), 1);
          _dummy.updateMatrix();
          rainMesh.setMatrixAt(i, _dummy.matrix);

          // Highlight droplets falling directly through the rotating lighthouse beam
          let beamCatch = 0;
          if (beaconActive) {
            _toDrop.set(d.x - beaconOrigin.x, d.y - beaconOrigin.y, d.z - beaconOrigin.z);
            const dist = _toDrop.length();
            if (dist > 2 && dist < 58) {
              const align = _toDrop.dot(beaconDir) / dist;
              if (align > 0.94) {
                beamCatch = Math.min(1, (align - 0.94) / 0.055);
              }
            }
          }
          _tmpCol.copy(_rainBaseCol).lerp(_rainBeamCol, beamCatch * 0.85);
          rainMesh.setColorAt(i, _tmpCol);
        }
        rainMesh.instanceMatrix.needsUpdate = true;
        if (rainMesh.instanceColor) rainMesh.instanceColor.needsUpdate = true;
      }

      // --- 2. Localized Wave-Phase Crashing Shoreline Spray ---
      const activeSprayCount = Math.floor(sprayCount * effectScale);
      sprayPoints.visible = showParticles && sprayIntensity > 0.04 && shoreAnchors.length > 0;
      if (sprayPoints.visible) {
        sprayGeo.setDrawRange(0, activeSprayCount);
        sprayMat.uniforms.uColor.value
          .copy(_sprayColNight)
          .lerp(_sprayColDay, Math.min(1, dayFactor + 0.36 + lightningFlash * 0.45));
        sprayMat.uniforms.uOpacity.value = Math.min(0.75, 0.22 + sprayIntensity * 0.38);

        const posAttr = sprayGeo.attributes.position as THREE.BufferAttribute;
        const alphaAttr = sprayGeo.attributes.aAlpha as THREE.BufferAttribute;
        const sizeAttr = sprayGeo.attributes.aSize as THREE.BufferAttribute;

        for (let i = 0; i < activeSprayCount; i++) {
          const p = sprayParticles[i];
          p.life += clampedDt;
          if (p.life >= p.maxLife) {
            const anchor = shoreAnchors[p.anchorIdx];
            // Emit spray strictly when an actual Gerstner wave crests against this coastal rock!
            const wave = sampleOceanAtWorldXZ(anchor.x, anchor.z, oceanParams);
            const impactStrength =
              Math.max(0, wave.y + wave.crestFactor * 0.45 + 0.15) * sprayIntensity;
            p.life = 0;
            p.maxLife = 0.85 + Math.random() * 1.2;

            if (impactStrength > 0.22) {
              p.x = anchor.x + (Math.random() - 0.5) * 1.3;
              p.y = Math.max(0.15, wave.y + 0.2);
              p.z = anchor.z + (Math.random() - 0.5) * 1.3;
              const burst = (1.9 + impactStrength * 3.4) * (0.65 + Math.random() * 0.65);
              // Short ballistic splash up & slightly inward over the rocks + carried by wind
              p.vx =
                anchor.nx * -0.9 +
                windDirX * (0.9 + windStrength * 1.6) +
                (Math.random() - 0.5) * 1.2;
              p.vy = burst;
              p.vz =
                anchor.nz * -0.9 +
                windDirZ * (0.9 + windStrength * 1.6) +
                (Math.random() - 0.5) * 1.2;
              p.sizeScale = 0.65 + Math.min(0.85, impactStrength * 0.55);
            } else {
              p.y = -20;
              p.vx = 0;
              p.vy = 0;
              p.vz = 0;
            }
          } else if (p.y > -10) {
            p.vy -= 5.4 * clampedDt;
            p.vx += windDirX * windStrength * 1.4 * clampedDt;
            p.vz += windDirZ * windStrength * 1.4 * clampedDt;
            p.x += p.vx * clampedDt;
            p.y += p.vy * clampedDt;
            p.z += p.vz * clampedDt;
          }

          posAttr.setXYZ(i, p.x, p.y, p.z);
          const frac = p.life / p.maxLife;
          const alpha =
            p.y > -5 ? Math.sin(Math.min(1, frac) * Math.PI) * Math.min(1.2, sprayIntensity) : 0;
          alphaAttr.setX(i, alpha);
          sizeAttr.setX(i, p.sizeScale);
        }
        posAttr.needsUpdate = true;
        alphaAttr.needsUpdate = true;
        sizeAttr.needsUpdate = true;
      }

      // --- 3. Drifting Coastal Fog Wisps ---
      const fogVis = showParticles && expensiveEffects && fogDensity > 0.14;
      fogMat.opacity = Math.min(0.2, fogDensity * 0.24);
      fogMat.color
        .setRGB(0.45, 0.54, 0.62)
        .lerp(_sprayColDay, dayFactor * 0.45 + lightningFlash * 0.35);

      for (let i = 0; i < fogWisps.length; i++) {
        const fw = fogWisps[i];
        fw.mesh.visible = fogVis;
        if (fogVis) {
          const drift = time * fw.speed * (0.45 + windStrength * 0.72);
          const wx = fw.baseX + ((drift * windDirX + 25) % 50) - 25;
          const wz = fw.baseZ + ((drift * windDirZ + 20) % 40) - 20;
          fw.mesh.position.set(
            wx,
            fw.baseY + Math.sin(time * 0.45 + fw.phase) * 0.7,
            wz
          );
          fw.mesh.lookAt(cameraPos);
        }
      }

      // --- 4. Distant Lightning Bolt & Controlled Environmental Flash ---
      const boltActive = lightningFlash > 0.12;
      lightningBolt.visible = boltActive;
      boltMat.opacity = Math.min(0.95, lightningFlash * 1.25);
      const strikeSlot = Math.floor(time / 2.4);
      lightningBolt.position.x = Math.sin(strikeSlot * 9.7) * 7.5;
      lightningBolt.position.z = Math.cos(strikeSlot * 6.3) * 4.5;
      lightningLight.intensity = lightningFlash * 3.4;

      // --- 5. Distant Gliding Seabirds ---
      for (let i = 0; i < birds.length; i++) {
        const b = birds[i];
        const st = b.state;
        const a = time * st.orbitSpeed + st.phase;
        const bx = st.centerX + Math.cos(a) * st.orbitRadius;
        const bz = st.centerZ + Math.sin(a) * st.orbitRadius * 0.72;
        const by = st.baseY + Math.sin(time * 0.7 + st.phase) * 1.4;
        b.root.position.set(bx, by, bz);

        const dx = -Math.sin(a) * st.orbitRadius;
        const dz = Math.cos(a) * st.orbitRadius * 0.72;
        b.root.rotation.y = Math.atan2(dx, dz);
        b.root.rotation.z = 0.22 + gustFactor * 0.14;

        const glideCycle = Math.sin(time * 0.55 + st.phase);
        const flapAmp = glideCycle > -0.15 ? 0.55 : 0.08;
        const flap = Math.sin(time * st.flapSpeed + st.phase) * flapAmp;
        b.rightWing.rotation.z = flap;
        b.leftWing.rotation.z = -flap;
      }
    },
    dispose: () => {
      disposables.forEach((d) => d.dispose());
    },
  };
}
