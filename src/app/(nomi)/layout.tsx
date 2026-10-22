import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import "./nomi/nomi.css";
const display=DM_Serif_Display({subsets:["latin"],weight:"400",variable:"--font-nomi-display"});
const body=Geist({subsets:["latin"],variable:"--font-nomi-body"});
const mono=Geist_Mono({subsets:["latin"],variable:"--font-nomi-mono"});
export const metadata:Metadata={metadataBase:new URL("https://openlandingpage.vercel.app"),title:"NOMI — lessons, made lighter.",description:"A calm mobile workspace for independent tutoring studios.",icons:{icon:"/templates/nomi/icon.svg"}};
export default function NomiLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="nomi-body"><noscript><style>{`[data-nomi-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript>{children}</body></html>}
