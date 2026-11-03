import { useId } from "react";

export default function LenusLensFallback(){
  const id=useId().replaceAll(":","");
  return <div className="ln-lens-fallback">
    <svg viewBox="-280 -280 560 560" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Optical lens with fluted glass, titanium collars and an emerald core</title>
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
        <circle r="156" fill="#08090D" stroke="#161924" strokeWidth="20"/>
        {[142,120,97,69].map((r,i)=><circle key={r} r={r} fill="none" stroke={`url(#${id}-titanium)`} strokeWidth={18-i*3}/>)}
        {[153,132,111,86,67].map(r=><circle key={r} r={r} fill="none" stroke="#9499A6" strokeWidth=".7" opacity=".65"/>)}
        <circle r="60" fill={`url(#${id}-core)`} stroke="#00E599" strokeOpacity=".65" strokeWidth="1.5"/>
        <ellipse cx="-15" cy="-24" rx="18" ry="8" fill="#F8FAFC" opacity=".15" transform="rotate(-40)"/>
        {[["-120,-88 -84,-101 -72,-69 -91,-60"], ["-126,83 -91,69 -78,89 -119,99"], ["26,-133 31,-117 22,-113 18,-128"], ["-22,125 -5,117 5,133 -17,142"], ["126,32 138,27 144,37 130,43"]].map(([points],i)=><polygon key={i} points={points} fill="#9499A6" fillOpacity=".12" stroke="#F8FAFC" strokeOpacity=".7" strokeWidth=".7"/>)}
      </g>
    </svg>
  </div>;
}
