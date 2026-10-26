"use client";
import { useRef } from "react";
import { Reveal } from "../motion/Reveal";
import { Arrow } from "../brand/Arrow";
const stories = [
  {
    name: "Alex R.",
    from: "From ‘maybe’ to making things.",
    quote:
      "I thought I needed to know everything before I started. Turns out, I just needed to start.",
    path: "Product thinking",
    initial: "A",
    tone: "sage",
  },
  {
    name: "Sam K.",
    from: "A new direction. A familiar feeling.",
    quote:
      "For the first time, I could see myself doing the work. That changed the way I talked about my future.",
    path: "Digital design",
    initial: "S",
    tone: "blue",
  },
  {
    name: "Maya D.",
    from: "A little confidence goes a long way.",
    quote:
      "My first project wasn’t perfect. But it was mine. And I had a whole team cheering me on.",
    path: "Data storytelling",
    initial: "M",
    tone: "peach",
  },
];
export function Stories() {
  const track = useRef<HTMLDivElement>(null);
  return (
    <section
      className="fd-stories fd-wrap"
      id="stories"
      aria-labelledby="fd-stories-title"
    >
      <div className="fd-section-heading">
        <Reveal variant="mask">
          <p className="fd-eyebrow">03 / PEOPLE, NOT PERFECT RÉSUMÉS</p>
          <h2 id="fd-stories-title">
            Everyone starts
            <br />
            <span className="fd-soft">somewhere.</span>
          </h2>
        </Reveal>
        <div className="fd-story-arrows">
          <button
            aria-label="Previous learner story"
            onClick={() =>
              track.current?.scrollBy({
                left: -380,
                behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <span>
              <Arrow />
            </span>
          </button>
          <button
            aria-label="Next learner story"
            onClick={() =>
              track.current?.scrollBy({
                left: 380,
                behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div className="fd-quotes" ref={track}>
        {stories.map((story, i) => (
          <Reveal key={story.name} index={i} variant="card">
            <article className={`fd-quote fd-tone-${story.tone}`}>
              <span className="fd-quote-mark">“</span>
              <h3>{story.from}</h3>
              <blockquote>{story.quote}</blockquote>
              <footer>
                <span className="fd-avatar">{story.initial}</span>
                <div>
                  <strong>{story.name}</strong>
                  <span>{story.path}</span>
                </div>
                <span className="fd-quote-star">✳</span>
              </footer>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="fd-stories-note">
        A few imagined voices. A very real kind of possibility.
      </p>
    </section>
  );
}
