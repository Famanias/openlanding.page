import { BalanceStudio } from "../allocator/BalanceStudio";
import { Reveal } from "../motion/Reveal";
export function Balance() {
  return <section id="balance" data-chapter className="pel-balance pel-section"><div className="pel-container"><div className="pel-studio-intro"><Reveal><p className="pel-eyebrow">01 / A LITTLE CLARITY</p></Reveal><Reveal variant="mask"><h2>Your money.<br/><span>A place for all of it.</span></h2></Reveal><Reveal><p>Life isn’t one big number. It’s the everyday, the just in case,<br className="pel-desktop-break"/> and the thing you can’t wait to do. Make room for each.</p></Reveal></div><Reveal variant="scale"><BalanceStudio/></Reveal><Reveal variant="draw"><div className="pel-rule"/></Reveal><div className="pel-balance-foot"><span>Try a plan. Move the slider. Make it feel like you.</span><span>ILLUSTRATIVE BALANCE · NO REAL MONEY MOVES</span></div></div></section>;
}
