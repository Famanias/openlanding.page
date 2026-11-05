import { useId } from "react";

export default function LenusLensFallback({cutaway=false}:{cutaway?:boolean}={}){
  const id=useId().replaceAll(":","");
  if(cutaway)return <div className="ln-lens-fallback">
    <svg viewBox="-340 -280 680 560" role="img" aria-labelledby={`${id}-interior-title`}>
      <title id={`${id}-interior-title`}>Interior optical train with seven glass groups, guide rails and opened titanium panels</title>
      <defs>
        <linearGradient id={`${id}-section-glass`}><stop stopColor="#F8FAFC" stopOpacity=".7"/><stop offset=".35" stopColor="#161924" stopOpacity=".2"/><stop offset=".8" stopColor="#9499A6" stopOpacity=".3"/><stop offset="1" stopColor="#A855F7" stopOpacity=".5"/></linearGradient>
        <radialGradient id={`${id}-section-core`}><stop stopColor="#F8FAFC"/><stop offset=".2" stopColor="#00E599"/><stop offset="1" stopColor="#00E599" stopOpacity=".25"/></radialGradient>
      </defs>
      <g transform="rotate(-5)">
        <path d="M-170-164 174-164 216-212-126-212Z M-170 164 174 164 216 212-126 212Z" fill="#161924" stroke="#9499A6" strokeWidth="2"/>
        <path d="M-200-142H218M-200 142H218" stroke="#9499A6" strokeWidth="5"/>
        <ellipse cx="220" rx="24" ry="180" fill="none" stroke="#9499A6" strokeWidth="8"/>
        <ellipse cx="-264" rx="42" ry="223" fill="none" stroke={`url(#${id}-section-glass)`} strokeWidth="24"/>
        <ellipse cx="-252" rx="34" ry="183" fill="none" stroke={`url(#${id}-section-glass)`} strokeWidth="14"/>
        {[[-205,28,126],[-128,25,117],[-62,22,103],[10,28,80],[82,20,88],[142,18,72],[194,14,55]].map(([x,rx,ry],i)=><g key={x} data-interior-optic={i+1}>
          <ellipse cx={x} rx={rx} ry={ry} fill={i===3?`url(#${id}-section-core)`:`url(#${id}-section-glass)`} stroke={i===3?"#00E599":"#F8FAFC"} strokeWidth={i===3?3:1.5}/>
          <path d={`M${x-8} ${-ry-7}h16v-11M${x-8} ${ry+7}h16v11`} fill="none" stroke="#9499A6" strokeWidth="4"/>
        </g>)}
        <path d="M151-155 174-190M151 155 174 190" stroke="#D2F802" strokeOpacity=".65" strokeWidth="2"/>
      </g>
    </svg>
  </div>;
  return <div className="ln-lens-fallback">
    <svg viewBox="-280 -280 560 560" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Optical lens with a closed titanium shutter and fluted glass</title>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F8FAFC" stopOpacity=".8"/><stop offset=".16" stopColor="#10131C"/>
          <stop offset=".3" stopColor="#F8FAFC" stopOpacity=".9"/><stop offset=".43" stopColor="#161924"/>
          <stop offset=".65" stopColor="#9499A6"/><stop offset=".77" stopColor="#10131C"/>
          <stop offset=".9" stopColor="#F8FAFC"/><stop offset="1" stopColor="#A855F7" stopOpacity=".5"/>
        </linearGradient>
        <linearGradient id={`${id}-titanium`}><stop stopColor="#10131C"/><stop offset=".45" stopColor="#9499A6" stopOpacity=".45"/><stop offset="1" stopColor="#08090D"/></linearGradient>
        <radialGradient id={`${id}-core`} cx="65%" cy="48%"><stop stopColor="#F8FAFC"/><stop offset=".12" stopColor="#00E599"/><stop offset=".55" stopColor="#00E599" stopOpacity=".46"/><stop offset="1" stopColor="#08090D"/></radialGradient>
      </defs>
      <g transform="rotate(-8) scale(.88 1)">
        <circle data-optical-ring="outer" r="244" fill="none" stroke={`url(#${id}-glass)`} strokeWidth="34"/>
        <circle data-optical-ring="inner" r="198" fill="none" stroke={`url(#${id}-glass)`} strokeWidth="29"/>
        {Array.from({length:18},(_,i)=><path key={i} d="M 23 -259 C 6 -240 14 -229 36 -225" transform={`rotate(${i*20})`} fill="none" stroke="#F8FAFC" strokeWidth="1.2" opacity=".27"/>)}
        {[262,255,231,224,216,210,186,178].map((r,i)=><circle key={r} r={r} fill="none" stroke={i%3===0?"#D2F802":i%3===1?"#A855F7":"#F8FAFC"} strokeWidth={i%3===2?1.2:.65} opacity={i%3===2?.55:.65}/>)}
        <g data-closed-shutter="true">
          <circle r="164" fill={`url(#${id}-titanium)`} stroke="#9499A6" strokeWidth="3"/>
          <path d="M-164 0H164M0-164V164" stroke="#08090D" strokeWidth="2"/>
          <circle r="145" fill="none" stroke="#9499A6" strokeOpacity=".3" strokeWidth="1"/>
        </g>
      </g>
    </svg>
  </div>;
}
