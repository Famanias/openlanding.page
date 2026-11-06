import type {Metadata,Viewport} from "next";
import {Archivo,Plus_Jakarta_Sans,JetBrains_Mono} from "next/font/google";
import "./lenus/lenus.css";
import "./lenus/story/story.css";
const display=Archivo({subsets:["latin"],axes:["wdth"],variable:"--font-ln-display",display:"swap"});
const body=Plus_Jakarta_Sans({subsets:["latin"],weight:["400","500","600","700"],variable:"--font-ln-sans",display:"swap"});
const mono=JetBrains_Mono({subsets:["latin"],weight:["400","500"],variable:"--font-ln-mono",display:"swap",preload:false});
export const metadata:Metadata={title:"LENUS — Reality is just the start.",description:"An independent experience studio at the intersection of design and technology. Step inside an interactive world of light, glass and possibility."};
export const viewport:Viewport={themeColor:"#08090D",colorScheme:"dark"};
export default function LenusLayout({children}:{children:React.ReactNode}){
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="ln-body"><noscript><style>{`.ln-lens-fallback{visibility:visible!important;opacity:1!important}.ln-headline-line>span,.ln-header,.ln-subtitle,.ln-step-inside,.ln-copy-footnote{animation:none!important;opacity:1!important;transform:none!important}`}</style></noscript>{children}</body></html>;
}
