"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = document.querySelector<HTMLElement>(".am-page");
    if (!page) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".am-line > span")
          .forEach((line, i) => {
            gsap.from(line, {
              yPercent: 110,
              duration: 1.1,
              delay: (i % 2) * 0.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: line.parentElement,
                start: "top 95%",
                once: true,
              },
            });
          });
        gsap.utils
          .toArray<HTMLElement>(".am-chapter-copy > p, .am-kicker")
          .forEach((el) =>
            gsap.from(el, {
              filter: "blur(5px)",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 97%", once: true },
            }),
          );
        gsap.utils.toArray<HTMLElement>("[data-roll]").forEach((el) => {
          const count = { value: 0 };
          gsap.to(count, {
            value: Number(el.dataset.roll),
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 96%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(count.value));
            },
          });
        });
        gsap.from(".am-vertical", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.7,
          delay: 0.6,
          ease: "power2.inOut",
        });
      }, page);
      return () => context.revert();
    });
    const cursor = document.querySelector<HTMLElement>(".am-cursor");
    const move = (event: PointerEvent) => {
      if (
        !matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)")
          .matches
      )
        return;
      if (cursor) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.dataset.active = String(
          Boolean((event.target as Element).closest("button,a,input")),
        );
      }
      const button = (event.target as Element).closest<HTMLElement>(
        ".am-button",
      );
      if (button) {
        const rect = button.getBoundingClientRect();
        button.style.setProperty(
          "--magnet-x",
          `${(event.clientX - rect.left - rect.width / 2) * 0.09}px`,
        );
        button.style.setProperty(
          "--magnet-y",
          `${(event.clientY - rect.top - rect.height / 2) * 0.13}px`,
        );
        button.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        );
      }
    };
    const leave = (event: PointerEvent) => {
      const button = (event.target as Element).closest?.<HTMLElement>(
        ".am-button",
      );
      if (button) {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      }
    };
    const press = (event: PointerEvent) => {
      const button = (event.target as Element).closest<HTMLElement>(
        ".am-button",
      );
      if (!button || matchMedia("(prefers-reduced-motion:reduce)").matches)
        return;
      const ripple = document.createElement("i"),
        r = button.getBoundingClientRect();
      ripple.className = "am-press-ripple";
      ripple.style.left = `${event.clientX - r.left}px`;
      ripple.style.top = `${event.clientY - r.top}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), {
        once: true,
      });
    };
    page.addEventListener("pointermove", move);
    page.addEventListener("pointerout", leave);
    page.addEventListener("pointerdown", press);
    return () => {
      media.revert();
      page.removeEventListener("pointermove", move);
      page.removeEventListener("pointerout", leave);
      page.removeEventListener("pointerdown", press);
    };
  }, []);
  return <div className="am-cursor" aria-hidden="true" />;
}
