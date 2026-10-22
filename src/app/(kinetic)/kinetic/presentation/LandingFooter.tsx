import Link from "next/link";
import { Logo } from "../brand/Logo";
import styles from "../journey/journeyStyles";

export function LandingFooter() {
  return (
    <footer className={`${styles.footerPlate} py-10 text-[13px] text-[#8E8294] border-t border-[#8E8294]/20 bg-[#FAF7F2]`}>
      <div className="mx-auto flex w-[min(1240px,calc(100%-40px))] flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="font-mono text-xs text-[#8E8294] max-w-[40ch]">
            Autonomous 3D freight and dispatch operations connected in real time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#8E8294]">
          <Link href="#depart" className="hover:text-[#FF6B2B] transition-colors">
            Departure
          </Link>
          <Link href="#prepare" className="hover:text-[#FF6B2B] transition-colors">
            Prepare Load
          </Link>
          <Link href="#connected" className="hover:text-[#FF6B2B] transition-colors">
            Records
          </Link>
          <Link href="#workspace" className="hover:text-[#FF6B2B] transition-colors">
            Command Center
          </Link>
          <Link href="#arrive" className="hover:text-[#FF6B2B] transition-colors">
            Arrival
          </Link>
          <span className="text-[#8E8294]/60">© 2026 KINETIC Technologies.</span>
        </div>
      </div>
    </footer>
  );
}
export default LandingFooter;
