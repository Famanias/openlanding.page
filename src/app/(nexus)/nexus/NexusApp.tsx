"use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Work } from "./components/Work";
import { Testimonials } from "./components/Testimonials";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";

export function NexusApp() {
  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      document.documentElement.classList.add("js-anim-ready");
    }

    // Flourish stroke drawing
    const flourish = document.getElementById("human-flourish-path");
    if (flourish && !prefersReducedMotion) {
      flourish.style.strokeDashoffset = "320";
      const timer = setTimeout(() => {
        flourish.style.strokeDashoffset = "0";
      }, 520);
      return () => clearTimeout(timer);
    }

    // IntersectionObserver for [data-reveal]
    const revealNodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
