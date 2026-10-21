/**
 * WebGL2 Procedural Navier-Stokes / Curl-Noise Chromatic Gradient Shader.
 * Generates live fluid optical caustics, wavelength dispersion, and pointer-reactive fluid fields.
 */

export const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_vel;
uniform float u_turbulence;
uniform float u_flow_velocity;
uniform float u_chromatic_spread;
uniform float u_dispersion;
uniform vec2 u_prism_rot;

uniform vec3 u_stop0;
uniform vec3 u_stop1;
uniform vec3 u_stop2;
uniform vec3 u_stop3;

// Simplex-style 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Curl noise derivation for fluid divergence-free velocity
vec2 curlNoise(vec2 p) {
  float eps = 0.005;
  float n1 = snoise(vec2(p.x, p.y + eps));
  float n2 = snoise(vec2(p.x, p.y - eps));
  float n3 = snoise(vec2(p.x + eps, p.y));
  float n4 = snoise(vec2(p.x - eps, p.y));
  float dx = (n1 - n2) / (2.0 * eps);
  float dy = (n3 - n4) / (2.0 * eps);
  return vec2(dx, -dy);
}

// Sample scalar potential field at given coordinate (smooth, laminar, large-scale)
float sampleField(vec2 uv) {
  float t = u_time * u_flow_velocity * 0.08;
  vec2 p = uv * (0.6 * u_turbulence);
  
  // Smooth, gentle pointer ripple
  vec2 toPointer = uv - u_pointer;
  float pointerDist = length(toPointer);
  float pointerRipple = sin(pointerDist * 4.0 - u_time * 1.5) * exp(-pointerDist * 2.2) * u_pointer_vel * 0.15;
  
  // Broad, silky laminar curl advection (no high-frequency churn)
  vec2 flow = curlNoise(p * 0.75 + vec2(t * 0.1, t * 0.07));
  vec2 p2 = p + flow * 0.3 + pointerRipple;
  
  // Primary smooth wave
  float n1 = snoise(p2 + vec2(t * 0.06, -t * 0.05));
  
  // Gentle harmonic for organic fluid contours
  float n2 = snoise(p2 * 0.8 - vec2(t * 0.08, t * 0.09)) * 0.35;
  
  float raw = (n1 + n2) * 0.45 + 0.5;
  return clamp(raw, 0.0, 1.0);
}

// Interpolate across the 4 spectral stops with generous dark obsidian base
vec3 colorRamp(float t) {
  float s = smoothstep(0.1, 0.9, t);
  if (s < 0.42) {
    float f = s / 0.42;
    return mix(u_stop0, u_stop1, smoothstep(0.0, 1.0, f));
  } else if (s < 0.76) {
    float f = (s - 0.42) / 0.34;
    return mix(u_stop1, u_stop2, smoothstep(0.0, 1.0, f));
  } else {
    float f = (s - 0.76) / 0.24;
    return mix(u_stop2, u_stop3, smoothstep(0.0, 1.0, f));
  }
}

void main() {
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 uv = v_uv * aspect;
  
  // Optical origin: screen-space coordinates of the central 3D prism
  vec2 prismOrigin = vec2(0.5 * aspect.x, 0.48);
  vec2 rayVec = uv - prismOrigin;
  float rayDist = length(rayVec);

  // Dynamic Cauchy dispersion angle linked to the 3D prism's yaw & pitch
  float baseAngle = -0.36 + u_prism_rot.x * 0.42;
  float rayAngle = atan(rayVec.y, rayVec.x);
  float angleDelta = rayAngle - baseAngle;

  // Dispersion fan width modulated by chromatic spread
  float fanSpread = 0.58 * u_chromatic_spread;
  float inFan = smoothstep(fanSpread, 0.0, abs(angleDelta)) * step(-0.1, rayVec.x);

  // Smooth, borderless radial wash across the entire landing page
  float fanIntensity = inFan * exp(-rayDist * 0.42);
  float spectralCoord = clamp((angleDelta / fanSpread) * 0.5 + 0.5, 0.0, 1.0);

  // Subtle optical dispersion (gentle chromatic warmth, no harsh color fringes)
  float dispersionOffset = (u_chromatic_spread * (u_dispersion - 1.0) * 0.01) + (fanIntensity * 0.014);
  
  float fieldR = sampleField(uv - vec2(dispersionOffset * (1.2 + spectralCoord * 0.6), 0.0));
  float fieldG = sampleField(uv);
  float fieldB = sampleField(uv + vec2(dispersionOffset * (1.8 - spectralCoord * 0.6), 0.0));
  
  vec3 colR = colorRamp(fieldR);
  vec3 colG = colorRamp(fieldG);
  vec3 colB = colorRamp(fieldB);
  
  // Cohesive blending: smooth luminous fluid without eye-straining chromatic aberration
  vec3 finalColor = vec3(
    mix(colG.r, colR.r, 0.3 + fanIntensity * 0.22),
    colG.g,
    mix(colG.b, colB.b, 0.3 + fanIntensity * 0.22)
  );

  // Radiant chromatic caustic wash across the entire page background
  vec3 spectralCaustic = mix(u_stop1, u_stop3, spectralCoord);
  finalColor += spectralCaustic * fanIntensity * 0.16;
  
  // Central reading shield: gently deepens contrast behind text
  vec2 center = vec2(0.5 * aspect.x, 0.5);
  float distToCenter = length(uv - center);
  float centerShield = smoothstep(0.18, 0.9, distToCenter);
  finalColor = mix(u_stop0, finalColor, mix(0.4, 1.0, centerShield));
  
  // Subtle film grain dither to eliminate banding
  float grain = fract(sin(dot(v_uv, vec2(12.9898, 78.233) + u_time * 0.005)) * 43758.5453) * 0.015 - 0.0075;
  finalColor += grain;
  
  // Smooth peripheral vignette
  float vignette = 1.0 - smoothstep(0.55, 1.45, length(v_uv - 0.5));
  finalColor *= mix(0.55, 1.0, vignette);

  fragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`;

export interface ShaderContext {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  positionBuffer: WebGLBuffer;
  uniforms: {
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    pointer: WebGLUniformLocation | null;
    pointerVel: WebGLUniformLocation | null;
    turbulence: WebGLUniformLocation | null;
    flowVelocity: WebGLUniformLocation | null;
    chromaticSpread: WebGLUniformLocation | null;
    dispersion: WebGLUniformLocation | null;
    prismRot: WebGLUniformLocation | null;
    stop0: WebGLUniformLocation | null;
    stop1: WebGLUniformLocation | null;
    stop2: WebGLUniformLocation | null;
    stop3: WebGLUniformLocation | null;
  };
}

export function initShader(gl: WebGL2RenderingContext): ShaderContext | null {
  const vert = gl.createShader(gl.VERTEX_SHADER);
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vert || !frag) return null;

  gl.shaderSource(vert, VERTEX_SHADER_SOURCE);
  gl.compileShader(vert);
  if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
    console.error("Vertex compile error:", gl.getShaderInfoLog(vert));
    return null;
  }

  gl.shaderSource(frag, FRAGMENT_SHADER_SOURCE);
  gl.compileShader(frag);
  if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
    console.error("Fragment compile error:", gl.getShaderInfoLog(frag));
    return null;
  }

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Shader link error:", gl.getProgramInfoLog(program));
    return null;
  }

  const posAttr = gl.getAttribLocation(program, "a_position");
  const posBuffer = gl.createBuffer();
  if (!posBuffer) return null;

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  // Full screen quad in clip space
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    program,
    positionBuffer: posBuffer,
    uniforms: {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      pointer: gl.getUniformLocation(program, "u_pointer"),
      pointerVel: gl.getUniformLocation(program, "u_pointer_vel"),
      turbulence: gl.getUniformLocation(program, "u_turbulence"),
      flowVelocity: gl.getUniformLocation(program, "u_flow_velocity"),
      chromaticSpread: gl.getUniformLocation(program, "u_chromatic_spread"),
      dispersion: gl.getUniformLocation(program, "u_dispersion"),
      prismRot: gl.getUniformLocation(program, "u_prism_rot"),
      stop0: gl.getUniformLocation(program, "u_stop0"),
      stop1: gl.getUniformLocation(program, "u_stop1"),
      stop2: gl.getUniformLocation(program, "u_stop2"),
      stop3: gl.getUniformLocation(program, "u_stop3"),
    },
  };
}
