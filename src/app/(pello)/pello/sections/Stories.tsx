"use client";
import { useState } from "react";
import { QUOTES } from "../content/data";
import { Reveal } from "../motion/Reveal";
export function Stories() {
  const [index, setIndex] = useState(0);
  return <section className="pel-stories pel-section"><div className="pel-container"><Reveal><p className="pel-eyebrow">A LITTLE CHANGE IN PERSPECTIVE</p></Reveal><div className="pel-quote-stage" aria-live="polite" aria-atomic="true">{QUOTES.map((story,i)=><figure key={story.name} className="pel-quote" data-active={i===index} aria-hidden={i!==index}><blockquote>“{story.quote}”</blockquote><figcaption><strong>{story.name}</strong><span>{story.role}</span></figcaption></figure>)}</div><div className="pel-story-controls" role="group" aria-label="Choose a customer story">{QUOTES.map((story,i)=><button type="button" key={story.name} aria-pressed={index===i} onClick={()=>setIndex(i)}><span>0{i+1}</span>{story.name.split(" ")[0]}’s perspective</button>)}</div><p className="pel-demo-disclosure">Fictional stories, created to illustrate the Pello experience.</p></div></section>;
}
