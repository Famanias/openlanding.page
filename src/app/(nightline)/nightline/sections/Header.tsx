"use client";
import { Logo } from "../brand/Logo";
import { Magnetic } from "../motion/Magnetic";
export function Header() { return <header className="nli-header"><a href="#top" className="nli-header__logo"><Logo /></a><nav aria-label="Main navigation"><a href="#line">The line</a><a href="#cabins">Cabins</a><a href="#night">The night</a></nav><Magnetic><a className="nli-button nli-button--small" href="#book">Plan a night <span>↗</span></a></Magnetic></header>; }
