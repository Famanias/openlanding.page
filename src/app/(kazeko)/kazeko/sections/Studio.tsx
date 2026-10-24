import { StudioWindow } from "../illustrations/StudioWindow";
import { Picture } from "../assets";
import { Reveal } from "../motion/Reveal";
import { BirdMark } from "../brand/Logo";
import { Arrow } from "../brand/Arrow";
export function Studio() {
  return <section className="kz-studio kz-section" id="studio" aria-labelledby="kz-studio-title"><div className="kz-container kz-studio-grid">
    <Reveal variant="wipe" className="kz-studio-image"><Picture assetKey="studio-window" alt="A quiet drawing desk overlooking the countryside"><StudioWindow /></Picture><span className="kz-studio-image-caption kz-mono">OUR KIND OF CORNER OFFICE.</span></Reveal>
    <div className="kz-studio-copy"><Reveal><span className="kz-eyebrow">03 / Hello, we’re Kazeko</span></Reveal><Reveal variant="mask"><h2 id="kz-studio-title">A small studio.<br /><em>A very open window.</em></h2></Reveal>
      <Reveal><p>We believe the best stories begin by paying attention. To the way a curtain catches the wind. To the sound of summer. To a very ordinary day that feels, somehow, extraordinary.</p><p>Kazeko is an imagined independent studio with a love for hand-drawn animation, thoughtful collaboration, and worlds with a little room to breathe.</p></Reveal>
      <Reveal variant="draw"><div className="kz-studio-services"><span>What we make</span><p>Original short films<br />Animation for thoughtful brands<br />Music videos & imagined worlds</p></div></Reveal>
      <Reveal><a href="#contact" className="kz-text-link">A good story starts with hello <Arrow diagonal /></a></Reveal>
      <BirdMark className="kz-studio-bird" />
    </div>
  </div></section>;
}
