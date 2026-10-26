export const VERTEX = `#version 300 es
in vec2 position;
out vec2 uv;
void main() {
  uv = position * .5 + .5;
  gl_Position = vec4(position, 0., 1.);
}`;

export const FRAGMENT = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 color;
uniform vec2 resolution;
uniform float time;
uniform float travel;
uniform float progress;
uniform vec4 wipes[32];
uniform vec2 ends[32];

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);
}
float segment(vec2 p, vec2 a, vec2 b) {
  vec2 d=b-a;
  return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.00001),0.,1.));
}
vec3 outside(vec2 p, float dawn) {
  vec3 sky=mix(vec3(.016,.04,.085),vec3(.095,.18,.28),p.y);
  sky=mix(sky,mix(vec3(.32,.18,.14),vec3(.62,.48,.34),p.y),dawn);
  // Three depths: distant blue lamps, city windows, close amber platforms.
  for(int layer=0; layer<3; layer++) {
    float l=float(layer), scale=7.-l*1.7;
    vec2 world=vec2(p.x*scale+travel*(.16+l*.38),p.y*scale);
    vec2 cell=floor(world), local=fract(world)-.5;
    float seed=hash(cell+17.*l);
    vec2 center=vec2((seed-.5)*.4,(hash(cell+13.)-.5)*.3);
    vec2 d=local-center;
    float radius=.09+l*.035;
    float disc=1.-smoothstep(radius*.7,radius*1.7,length(d));
    float bloom=exp(-dot(d,d)*16.)*.18;
    float band=smoothstep(.16,.36,p.y)*(1.-smoothstep(.62,.86,p.y));
    float enabled=step(.5,seed)*band;
    vec3 lamp=mix(vec3(.3,.48,.64),vec3(1.,.59,.22),step(.38,seed));
    sky+=lamp*(disc+bloom)*enabled*(.42+l*.16)*(1.-dawn*.45);
    // Blurred foreground building silhouettes stay below the light line.
    float roof=.18+hash(vec2(cell.x,l))*.13;
    sky*=1.-(1.-smoothstep(roof,roof+.025,p.y))*(.2+l*.1);
  }
  float rail=exp(-abs(p.y-.14)*160.)+exp(-abs(p.y-.10)*200.);
  sky+=vec3(.32,.29,.22)*rail*.18;
  return sky;
}
void main() {
  float aspect=resolution.x/resolution.y;
  vec2 p=vec2(uv.x*aspect,uv.y);
  float dawn=smoothstep(.68,.94,progress);
  // Droplet normals refract the background, with highlights on their rim.
  vec2 distortion=vec2(0.);
  float edge=0., streak=0.;
  for(int layer=0;layer<2;layer++) {
    float l=float(layer), scale=10.+l*8.;
    vec2 grid=p*vec2(scale,scale*.64);
    // Each column drifts at its own pace so drops never line up in rows.
    grid.y+=time*(.05+l*.04)*(.6+hash(vec2(floor(grid.x),l)))+hash(vec2(floor(grid.x),l+3.))*9.;
    vec2 cell=floor(grid), local=fract(grid)-.5;
    float seed=hash(cell+7.*l);
    vec2 jitter=(vec2(hash(cell+2.),hash(cell+5.))-.5)*.5;
    vec2 d=(local-jitter)*vec2(1.,.7);
    float r=.07+seed*.1;
    float len=length(d);
    float bead=1.-smoothstep(r*.6,r,len);
    float enabled=step(.55,seed);
    distortion+=d*bead*enabled*.16;
    // Lit rim on the lower-left only, so a drop reads as a lens and not a ring.
    float facing=.5+.5*dot(d/max(len,.0001),vec2(-.6,-.8));
    edge+=(1.-smoothstep(.008,.03,abs(len-r*.92)))*facing*facing*enabled*.07;
    streak+=(1.-smoothstep(.004,.012,abs(d.x)))*smoothstep(.02,.22,d.y)*step(.8,seed)*.02;
  }
  vec3 scene=outside(p+distortion,dawn);
  float clear=0.;
  for(int i=0;i<32;i++) {
    vec2 a=wipes[i].xy*vec2(aspect,1.);
    vec2 b=ends[i]*vec2(aspect,1.);
    float age=max(0.,time-wipes[i].z);
    float stroke=(1.-smoothstep(.035,.085,segment(p,a,b)))*exp(-age*.38)*wipes[i].w;
    clear=max(clear,stroke);
  }
  float fog=(.58+.14*noise(p*5.))*(1.-clear*.97);
  vec3 mist=mix(vec3(.16,.24,.31),vec3(.50,.45,.36),dawn);
  scene=mix(scene,mist,fog)+(edge+streak)*(1.-clear);
  scene+=vec3(.34,.19,.08)*exp(-length((p-vec2(aspect*.87,.89))*vec2(.6,1.))*9.)*.3;
  float vignette=smoothstep(0.,.18,uv.x)*smoothstep(0.,.18,1.-uv.x);
  scene*=.62+.38*vignette;
  scene+=(hash(gl_FragCoord.xy+fract(time))-.5)/255.;
  color=vec4(scene,1.);
}`;
