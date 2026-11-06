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
    let timer: ReturnType<typeof setTimeout> | undefined;
    const flourish = document.getElementById("human-flourish-path");
    if (flourish && !prefersReducedMotion) {
      flourish.style.strokeDashoffset = "320";
      timer = setTimeout(() => {
        flourish.style.strokeDashoffset = "0";
      }, 520);
    }

    // IntersectionObserver for [data-reveal]
    const revealNodes = document.querySelectorAll("[data-reveal]");
    let observer: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      revealNodes.forEach((node) => {
        node.classList.add("is-inview");
        node.setAttribute("data-inview", "true");
      });
    } else {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-inview");
              (entry.target as HTMLElement).setAttribute("data-inview", "true");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      revealNodes.forEach((node) => obs.observe(node));
      observer = obs;

      // Preserve is-inview class if React re-renders any component containing [data-reveal]
      if (typeof MutationObserver !== "undefined") {
        const mo = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === "attributes" && m.attributeName === "class") {
              const target = m.target as HTMLElement;
              if (
                target.getAttribute("data-inview") === "true" &&
                !target.classList.contains("is-inview")
              ) {
                target.classList.add("is-inview");
              }
            }
          }
        });

        revealNodes.forEach((node) => {
          mo.observe(node, { attributes: true, attributeFilter: ["class"] });
        });
        mutationObserver = mo;
      }
    }

    // Parallax on scroll for [data-parallax]
    let ticking = false;
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          const parallaxItems = document.querySelectorAll<HTMLElement>("[data-parallax]");
          parallaxItems.forEach((el) => {
            const speed = parseFloat(el.getAttribute("data-parallax") || "0");
            const offset = Math.max(-45, Math.min(45, scrollY * speed));
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Microinteractions (Magnetic CTAs, 3D Tilt Cards)
    const cleanupFns: (() => void)[] = [];
    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (finePointer && !prefersReducedMotion) {
      const magneticBtns = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      magneticBtns.forEach((btn) => {
        const handleMouseMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 6;
          const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 5;
          btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
        };
        const handleMouseLeave = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
        cleanupFns.push(() => {
          btn.removeEventListener("mousemove", handleMouseMove);
          btn.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      const tiltCards = document.querySelectorAll<HTMLElement>("[data-tilt]");
      tiltCards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -3.2;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 3.2;
          card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        };
        const handleMouseLeave = () => {
          card.style.transform = "";
        };
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        cleanupFns.push(() => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    }

    return () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cleanupFns.forEach((fn) => fn());
      document.documentElement.classList.remove("js-anim-ready");
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
