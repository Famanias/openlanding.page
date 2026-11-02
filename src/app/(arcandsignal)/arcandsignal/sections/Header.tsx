import { Logo } from "../brand/Logo";
export function Header() {
  return <header className="asc-header asc-wrap"><Logo/><nav className="asc-nav" aria-label="Main navigation"><a href="#services">What we do</a><a href="#work">Selected work</a><a href="#about">Our approach</a></nav><a className="asc-header-cta" href="#contact">Contact Us <span aria-hidden="true">↗</span></a></header>;
}
