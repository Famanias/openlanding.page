import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { JOURNAL } from "../content/data";
import { signupHref } from "../allocator/model";
import { Picture } from "../assets";
import { Reveal } from "../motion/Reveal";
export function Journal() {
  return <section id="living" data-chapter className="pel-journal pel-section"><div className="pel-container"><div className="pel-journal-heading"><Reveal><p className="pel-eyebrow">02 / MONEY IS FOR LIVING</p><h2>A little clearer.<br/><span>A lot more possible.</span></h2></Reveal><Reveal><p>Not just a balance.<br/>A bit of breathing room.<br/>And something to look forward to.</p></Reveal></div><div className="pel-journal-grid">{JOURNAL.map((story, i) => <article className={"pel-journal-story pel-journal-story-" + i} key={story.id}><Reveal variant="wipe" index={i}><a className="pel-journal-image" href={signupHref(story.id, story.goal)} aria-label={"Start with " + story.label}><div data-parallax><Picture assetKey={story.image} alt={story.alt} sizes="(min-width: 900px) 33vw, 100vw"/></div><span className="pel-journal-arrow" aria-hidden="true"><ArrowUpRight size={24}/></span></a></Reveal><Reveal index={i}><p className="pel-story-index">{story.index} / A LITTLE PURPOSE</p><h3>{story.title}</h3><p>{story.copy}</p><a className="pel-text-link" href={signupHref(story.id, story.goal)}>Make a little room <ArrowUpRight size={16} aria-hidden="true"/></a></Reveal></article>)}</div></div></section>;
}
