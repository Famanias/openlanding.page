'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '../data/assets';

export default function AboutArchive() {
    const section = useRef<HTMLElement>(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            const context = gsap.context(() => {
                gsap.from('.manifest-line', { clipPath: 'inset(0 0 100% 0)', y: 24, stagger: .12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.manifest-title', start: 'top 85%', once: true } });
                gsap.fromTo('.manifest-world-back', { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
                gsap.fromTo('.manifest-world-front', { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
            }, section);
            return () => context.revert();
        });
        return () => media.revert();
    }, []);
    return <section ref={section} id="manifest" className="about-archive editorial-section" aria-labelledby="manifest-title">
        <div className="section-rule utility"><span>03 / THE MANIFEST</span><span>KEEP YOUR CURIOSITY.</span></div>
        <h2 id="manifest-title" className="section-title centered manifest-title"><span className="manifest-line">THE BEST WORLDS</span><span className="manifest-line">DON&apos;T ASK YOU</span><span className="manifest-line muted">TO HURRY.</span></h2>
        <div className="manifest-composition"><div className="manifest-images"><figure className="manifest-world-back"><img src={assetUrl('world-mossheart.webp')} alt="A tiny traveler beneath the luminous canopy of Mossheart" loading="lazy" width="2752" height="1536" /><figcaption className="utility">MOSSHEART / 1996</figcaption></figure><figure className="manifest-world-front"><img src={assetUrl('world-deep-current.webp')} alt="The submerged structures and open blue depths of Deep Current" loading="lazy" width="2752" height="1536" /><figcaption className="utility">DEEP CURRENT / 2000</figcaption></figure></div><div className="manifest-essay"><p className="manifest-lead">A world doesn&apos;t need to be endless to stay with you.</p><p>Sometimes it&apos;s a signal from a room you haven&apos;t found. A path through the trees that wasn&apos;t there yesterday. The quiet certainty that there&apos;s something beyond the edge of the screen.</p><p>SAVEPOINT is an imaginary collection built around that feeling. Ten self-contained worlds, each with its own weather, questions and small reasons to take the long way home.</p><p>We like the ritual, too. Reading a spine. Turning a cartridge over in your hands. Choosing one thing, putting it into the slot, and giving it your attention. A memory slot isn&apos;t just a place to keep your progress. It&apos;s a promise that you can come back.</p><div className="manifest-spec utility"><span>NO RUSH. NO FEED. JUST A WORLD.</span><span>10 ORIGINAL WORLDS<br />01 SHARED CARTRIDGE ARCHITECTURE<br />AS MANY DETOURS AS YOU NEED</span></div></div></div>
    </section>;
}
