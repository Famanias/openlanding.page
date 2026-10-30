export const BLACK_HOLE_VERTEX_SHADER = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export const BLACK_HOLE_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uCamPos;          // Camera world position in Rs units
uniform vec3 uCamTarget;       // Camera look-at target in Rs units
uniform float uRoll;           // Camera bank angle (radians)
uniform float uFov;            // Focal length multiplier (default 1.7)
uniform vec2 uScreenOffset;    // Viewport framing offset (e.g. vec2(0.18, 0.0) in Ch.1 -> vec2(0.0))
uniform float uLensingMass;    // Gravity multiplier (default 1.5; scrubbable 0.3..2.8 in Inspect mode)
uniform float uDopplerBoost;   // Relativistic beaming factor (default 0.6; boosts to 1.15 in Ch.3)
uniform float uDiskOpacity;    // Accretion disk density multiplier (default 1.0; dims to 0.15 in Inspect)
uniform float uJetIntensity;   // Polar relativistic jet emission (0.0 in Ch.1-5 -> 1.0 in Ch.6)
uniform vec3 uPulsePos;        // World-space XYZ of user-launched geodesic test photon
uniform float uPulseActive;    // 0.0 when inactive, 1.0 when flying
uniform sampler2D uSkyTex;     // Reference deep-space crimson & ice-blue star cluster texture
uniform float uSkyTexLoaded;   // 1.0 when texture is ready

float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n2(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}

vec2 mirrorUv(vec2 uv){
  vec2 f = fract(uv * 0.5) * 2.0;
  return 1.0 - abs(f - 1.0);
}

vec3 sampleSkyTexSeamless(vec3 d, float u, float v){
  // High-density spherical equirectangular projection with dual-offset seam crossfade
  vec2 uvA = mirrorUv(vec2(u * 3.2 + 0.15, v * 2.2 + 0.08));
  vec2 uvB = mirrorUv(vec2((u + 0.5) * 3.2 + 0.63, v * 2.2 + 0.41));
  float seamBlend = sin(u * 3.14159265);
  seamBlend = seamBlend * seamBlend;
  vec3 colEq = mix(texture2D(uSkyTex, uvB).rgb, texture2D(uSkyTex, uvA).rgb, seamBlend);

  // Polar cap blend to avoid pinching at |d.y| -> 1
  vec3 colPole = texture2D(uSkyTex, mirrorUv(d.xz * 1.8 + 0.37)).rgb;
  float poleWeight = smoothstep(0.72, 0.95, abs(d.y));
  return mix(colEq, colPole, poleWeight);
}

vec3 sky(vec3 d){
  float u = atan(d.z, d.x) / 6.2831853 + 0.5;
  float v = asin(clamp(d.y, -1.0, 1.0)) / 3.14159265 + 0.5;
  vec2 sp = vec2(u * 6.2831853 * 1.6, (v - 0.5) * 3.14159265 * 1.6);
  vec3 c = vec3(0.0);

  // 1. Sample the attached reference deep-space nebula & cluster image at crisp scale
  if(uSkyTexLoaded > 0.5){
    vec3 texCol = sampleSkyTexSeamless(d, u, v);
    // Preserve deep obsidian void while keeping crimson & icy-blue clusters vibrant
    texCol = pow(max(texCol, vec3(0.0)), vec3(1.35)) * 1.15;
    c += texCol;
  }

  // 2. Fine-scale domain-warped H-alpha crimson emission pockets & pale icy-blue cluster clouds
  vec2 warp = vec2(fbm(sp * 2.4 + vec2(1.2, 3.4)), fbm(sp * 2.4 + vec2(8.1, 2.7)));
  float nebCluster = fbm(sp * 3.2 + warp * 1.2);
  float redKnots = fbm(sp * 5.5 - warp * 1.1 + vec2(4.2, 1.9));
  float cyanClouds = fbm(sp * 4.4 + warp * 1.1 + vec2(9.4, 6.1));
  float darkVoidMask = smoothstep(0.36, 0.68, fbm(sp * 2.8 + vec2(2.3, 7.1)));

  // Scattered ruby / crimson H-alpha pockets
  float redMask = smoothstep(0.54, 0.80, redKnots) * smoothstep(0.38, 0.76, nebCluster);
  c += vec3(0.78, 0.12, 0.05) * pow(redMask, 1.7) * 0.46;
  float redCore = smoothstep(0.68, 0.88, redKnots) * redMask;
  c += vec3(0.96, 0.24, 0.10) * pow(redCore, 2.2) * 0.42;

  // Scattered icy cyan-white stellar dust clouds
  float cyanMask = smoothstep(0.52, 0.80, cyanClouds) * darkVoidMask;
  c += vec3(0.56, 0.76, 0.86) * pow(cyanMask, 1.75) * 0.36;

  // 3. Compact, tight stellar cores (small glowing cyan-white & ruby-orange knots with isotropic aspect)
  float cosLat = max(0.35, sqrt(max(0.0, 1.0 - d.y * d.y)));
  for(int m=0; m<2; m++){
    float bScale = m==0 ? 64.0 : 110.0;
    vec2 bg = vec2(u * bScale * 2.0 * cosLat, v * bScale);
    vec2 bid = floor(bg), bf = fract(bg) - 0.5;
    float bh = h21(bid + float(m)*19.7);
    vec2 bo = (vec2(h21(bid + 5.1), h21(bid + 13.3)) - 0.5) * 0.68;
    float dist = length(bf - bo);
    float coreGlow = exp(-dist * dist * 48.0) * step(0.89, bh);
    float isRedKnot = step(0.50, h21(bid + 29.1));
    vec3 knotCol = mix(vec3(0.78, 0.93, 1.0), vec3(0.95, 0.22, 0.10), isRedKnot);
    c += knotCol * coreGlow * 0.42;
  }

  // 4. Crisp multi-scale pinpoint stardust field concentrated inside nebula clusters
  for(int k=0; k<3; k++){
    float sc = k==0 ? 180.0 : (k==1 ? 360.0 : 720.0);
    vec2 g = vec2(u * sc * 2.0 * cosLat, v * sc), id = floor(g), f = fract(g) - 0.5;
    float h = h21(id + float(k)*31.0);
    vec2 o = (vec2(h21(id + 3.0), h21(id + 7.0)) - 0.5) * 0.75;
    float dStar = length(f - o);
    float thresh = k==2 ? 0.86 : 0.93;
    float radius = k==2 ? 0.14 : 0.10;
    float s = smoothstep(radius, 0.0, dStar) * step(thresh, h);
    float halo = exp(-dStar * dStar * 65.0) * step(0.975, h) * (k==0 ? 0.45 : 0.18);
    float colorSeed = h21(id + 11.0);
    vec3 starCol = mix(vec3(0.78, 0.90, 1.0), vec3(1.0, 0.90, 0.82), colorSeed);
    starCol = mix(starCol, vec3(1.0, 0.30, 0.14), step(0.82, colorSeed));
    float clusterMod = 0.25 + 0.95 * smoothstep(0.38, 0.74, max(cyanClouds, redKnots));
    c += starCol * (s + halo) * (0.20 + 0.90 * (h - thresh) / (1.0 - thresh)) * clusterMod;
  }

  return c;
}

vec4 disk(vec3 p, vec3 vdir){
  float rr=length(p.xz);
  if(rr<2.2||rr>12.5) return vec4(0.);
  float a=atan(p.z,p.x);
  float ar=a-uTime*5./pow(rr,1.5);
  vec2 q=vec2(cos(ar),sin(ar))*rr;
  float n=fbm(q*1.1+fbm(q*.6+uTime*.03)*1.5)*.6+fbm(q*3.4+7.)*.4;
  float rings=.78+.22*sin(rr*11.+n*7.);
  float dens=smoothstep(2.2,2.9,rr)*smoothstep(12.5,5.5,rr)*pow(n,1.6)*1.9*rings*uDiskOpacity;
  float temp=smoothstep(11.,2.3,rr);
  vec3 col=mix(vec3(1.,.32,.06),vec3(1.,.78,.5),temp);
  col=mix(col,vec3(.88,.94,1.),pow(temp,4.2)*.75);
  vec3 vel=normalize(vec3(-p.z,0.,p.x));
  float dop=dot(vel,-vdir);
  float beam=pow(clamp(1.+uDopplerBoost*dop,.15,2.3),3.);
  // Illuminate disk plasma when a user-launched geodesic photon passes nearby
  float pDist = length(p - uPulsePos);
  float pulseIllum = uPulseActive * exp(-pDist * pDist * 0.9) * 3.0;
  vec3 finalRgb = col*dens*beam*(.6+2.4*temp) + vec3(1.0, 0.85, 0.6) * pulseIllum * dens;
  return vec4(finalRgb, clamp(dens*1.2,0.,1.));
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uResolution)/uResolution.y;
  uv -= uScreenOffset;

  vec3 fw=normalize(uCamTarget - uCamPos);
  vec3 worldUp=abs(fw.y) > 0.99 ? vec3(0.,0.,1.) : vec3(0.,1.,0.);
  vec3 rt=normalize(cross(worldUp, fw));
  vec3 up=cross(fw, rt);
  vec3 rt2=rt*cos(uRoll)+up*sin(uRoll);
  vec3 up2=up*cos(uRoll)-rt*sin(uRoll);
  vec3 rd=normalize(fw*uFov+rt2*uv.x+up2*uv.y);

  vec3 pos=uCamPos, vel=rd;
  vec3 hc=cross(pos,vel);
  float h2=dot(hc,hc);
  vec3 col=vec3(0.);
  float alpha=0., glow=0., jetGlow=0.;
  bool hole=false;

  for(int i=0;i<260;i++){
    float r2=dot(pos,pos), rl=sqrt(r2);
    float dt=clamp(.07*rl,.02,.9);
    vel += -uLensingMass * h2 * pos / pow(r2, 2.5) * dt;
    vec3 np=pos+vel*dt;

    // Equatorial accretion disk crossing
    if(pos.y*np.y<0.){
      vec3 cp=mix(pos,np,pos.y/(pos.y-np.y));
      vec4 dc=disk(cp,normalize(vel));
      col+=(1.-alpha)*dc.rgb;
      alpha+=(1.-alpha)*dc.a;
    }

    // Photon ring accumulation at r = 1.5 - 1.6 Rs
    glow+=exp(-pow((rl-1.6)*3.,2.))*dt;

    // Relativistic polar jet along Y axis (active in Chapter 6)
    if(uJetIntensity > 0.001){
      float cylR = length(pos.xz);
      float coneWidth = 0.25 + abs(pos.y) * 0.08;
      float jetMask = exp(-pow(cylR / coneWidth, 2.0) * 2.5) * smoothstep(1.1, 2.5, abs(pos.y)) * exp(-abs(pos.y)*0.06);
      jetGlow += jetMask * dt * uJetIntensity;
    }

    // Glowing test photon in 3D space
    if(uPulseActive > 0.5){
      float dPulse = length(pos - uPulsePos);
      glow += exp(-dPulse * dPulse * 6.0) * dt * 4.5;
    }

    pos=np;
    if(rl<1.){hole=true;break;}
    if(rl>60.||alpha>.995)break;
  }

  if(!hole) col+=(1.-alpha)*sky(normalize(vel));
  col+=vec3(1.,.72,.48)*glow*.06*(1.-alpha*.6);
  col+=vec3(1.,.86,.68)*jetGlow*.35*(1.-alpha*.4);
  col*=1.15;
  col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14); // ACES Filmic
  vec2 q=gl_FragCoord.xy/uResolution;
  col*=1.-.25*dot(q-.5,q-.5)*2.;
  col+=(h21(gl_FragCoord.xy+fract(uTime))-.5)*.012;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;
