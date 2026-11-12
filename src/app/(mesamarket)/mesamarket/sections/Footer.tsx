'use client';

/**
 * MESA MARKET — Living Countryside Footer (white illustrated edition)
 * A completely code-authored light countryside rendered as the entire footer background.
 * No CTA chapter, no bitmap images, no third-party animation dependencies.
 * React 18+; import ./Footer.css
 */
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import './Footer.css';

export type MesaFooterNavItem = { label: string; href: string };
export type MesaMarketFooterProps = {
  className?: string;
  navigation?: MesaFooterNavItem[];
  interactive?: boolean;
  harvestHref?: string;
  basketHref?: string;
};

const defaultNavigation: MesaFooterNavItem[] = [
  { label: 'Market shelf', href: '#mm-shelf' },
  { label: 'Meal kits', href: '#mm-kits' },
  { label: 'Grower strip', href: '#mm-growers' },
  { label: 'Sample receipt', href: '#mm-checkout' },
];

/** Pure hand-authored SVG geometry. No <image>, external SVG, CSS background URL, or raster asset. */
const landscapeSVG = String.raw`<svg class="mmf-landscape-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 610" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<defs>
  <linearGradient id="__MMF__-ground" x1="0" x2=".1" y1="0" y2="1"><stop stop-color="#FFFFFF"/><stop offset=".65" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>
  <radialGradient id="__MMF__-light"><stop stop-color="#F0CD78" stop-opacity=".28"/><stop offset=".35" stop-color="#F0CD78" stop-opacity=".12"/><stop offset="1" stop-color="#F0CD78" stop-opacity="0"/></radialGradient>
  <linearGradient id="__MMF__-hillone" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#E9DEBE" stop-opacity=".57"/><stop offset="1" stop-color="#F8F1DF" stop-opacity=".78"/></linearGradient>
  <linearGradient id="__MMF__-hilltwo" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#E5E7CB" stop-opacity=".6"/><stop offset="1" stop-color="#F0E8D0" stop-opacity=".73"/></linearGradient>
  <linearGradient id="__MMF__-shade" x1="0" x2="1" y1="0" y2="0"><stop stop-color="#FFFFFF" stop-opacity=".30"/><stop offset=".36" stop-color="#FFFFFF" stop-opacity=".10"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
  <filter id="__MMF__-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".52" numOctaves="2" seed="21" stitchTiles="stitch"/></filter>
</defs>
<rect width="1600" height="610" fill="url(#__MMF__-ground)"/>
<!-- Far layer: soft horizon, sun, drifting clouds, migratory birds. -->
<g class="mmf-plane mmf-plane-far">
  <circle cx="1255" cy="188" r="255" fill="url(#__MMF__-light)" class="mmf-light"/>
  <circle cx="1268" cy="164" r="53" fill="#F2CC81" opacity=".58" class="mmf-sun"/>
  <g class="mmf-cloud mmf-cloud-a" fill="none" stroke="#B7A27E" stroke-opacity=".48" stroke-width="1.25" stroke-linecap="round"><path d="M924 150Q943 134 969 138Q986 109 1009 115Q1030 92 1054 113Q1081 105 1092 129Q1113 124 1122 145"/><path d="M929 156Q1030 160 1120 151" stroke-opacity=".13"/></g>
  <g class="mmf-cloud mmf-cloud-b" fill="none" stroke="#B8A17D" stroke-opacity=".47" stroke-width="1.3" stroke-linecap="round"><path d="M1279 86Q1297 72 1314 79Q1334 56 1357 71Q1382 55 1394 80Q1413 76 1423 93"/></g>
  <g class="mmf-birds" fill="none" stroke="#958165" stroke-opacity=".74" stroke-width="2" stroke-linecap="round"><path d="M1290 109q7 -8 15 -1q6 -10 14 -7 M1366 131q6 -8 13 0q7 -8 15 -6 M1437 105q6 -8 13 0q6 -8 14 -6"/></g>
  <path class="mmf-hill mmf-hill-a" d="M-50 372 C85 298 165 310 264 322C400 342 470 286 611 292C771 295 821 256 960 257C1111 255 1150 218 1284 238C1412 249 1514 207 1660 226V620H-50Z" fill="url(#__MMF__-hillone)"/>
  <path d="M-50 372 C85 298 165 310 264 322C400 342 470 286 611 292C771 295 821 256 960 257C1111 255 1150 218 1284 238C1412 249 1514 207 1660 226" fill="none" stroke="#B5A082" stroke-opacity=".49" stroke-width="1.6"/>
</g>
<!-- Midground: orchard hillside and softly illustrated rows of crops. -->
<g class="mmf-plane mmf-plane-mid">
  <path class="mmf-hill mmf-hill-b" d="M-40 458C119 429 241 367 391 385C535 406 635 365 791 347C939 327 1034 319 1136 339C1280 369 1412 323 1650 275V635H-40Z" fill="url(#__MMF__-hilltwo)"/>
  <path d="M-40 458C119 429 241 367 391 385C535 406 635 365 791 347C939 327 1034 319 1136 339C1280 369 1412 323 1650 275" fill="none" stroke="#C8D2A6" stroke-width="1.25" stroke-opacity=".21"/>
  <g class="mmf-crop-rows" stroke="#AB9274" stroke-opacity=".56" stroke-width="1.2" fill="none">
    <path d="M1014 354Q975 400 899 465"/><path d="M1057 358Q1026 407 981 474"/><path d="M1101 360Q1085 412 1064 488"/><path d="M1149 362Q1146 419 1143 494"/><path d="M1197 364Q1216 421 1229 500"/><path d="M1245 361Q1290 433 1321 512"/><path d="M1299 359Q1360 433 1412 518"/>
    <path d="M738 388Q845 363 924 386 M714 409Q827 379 920 405 M698 429Q815 397 918 425"/>
  </g>
  <!-- Hand-inked tiny orchard crowns -->
  <g class="mmf-small-orchard" fill="#B7C39C" fill-opacity=".50" stroke="#85765B" stroke-opacity=".52" stroke-width="1.4">
    <g transform="translate(837 394) scale(.72)"><path d="M0 23V0" fill="none" stroke="#917959" stroke-width="3"/><path d="M-21-1q-13-13 4-22q0-22 21-20q18-13 29 8q19 12-1 24q-8 20-32 10Z"/></g>
    <g transform="translate(906 381) scale(.54)"><path d="M0 23V0" fill="none" stroke="#917959" stroke-width="3"/><path d="M-21-1q-13-13 4-22q0-22 21-20q18-13 29 8q19 12-1 24q-8 20-32 10Z"/></g>
    <g transform="translate(976 374) scale(.45)"><path d="M0 23V0" fill="none" stroke="#917959" stroke-width="3"/><path d="M-21-1q-13-13 4-22q0-22 21-20q18-13 29 8q19 12-1 24q-8 20-32 10Z"/></g>
    <g transform="translate(1035 369) scale(.4)"><path d="M0 23V0" fill="none" stroke="#917959" stroke-width="3"/><path d="M-21-1q-13-13 4-22q0-22 21-20q18-13 29 8q19 12-1 24q-8 20-32 10Z"/></g>
    <g transform="translate(1112 373) scale(.46)"><path d="M0 23V0" fill="none" stroke="#917959" stroke-width="3"/><path d="M-21-1q-13-13 4-22q0-22 21-20q18-13 29 8q19 12-1 24q-8 20-32 10Z"/></g>
  </g>
</g>
<!-- Near layer: barn, orchard and hand-drawn field fence, kept away from text. -->
<g class="mmf-plane mmf-plane-near">
  <g class="mmf-farmhouse" transform="translate(1410 286)" stroke="#8D7758" stroke-opacity=".62" stroke-width="2" fill="none" stroke-linejoin="round"><path d="M-42 18L0 -14L45 18M-30 16V69H32V16M-17 69V35H12V69M-40 18H44"/><path d="M-33 8L0 -27L50 8"/><path d="M-46 4L0 -32L49 6"/></g>
  <g class="mmf-apple-tree mmf-apple-tree-a" transform="translate(1324 463)"><g class="mmf-tree-sway"><path d="M1 69Q2 34 0 4M1 31L-20 13M0 28L22 5" stroke="#84694D" stroke-opacity=".68" fill="none" stroke-width="5" stroke-linecap="round"/><path d="M-43 6Q-59-11-42-27Q-46-52-17-56Q0-79 29-57Q59-56 56-27Q72-7 51 13Q41 32 17 26Q-13 38-30 20Q-45 20-43 6Z" fill="#C0CDA8" fill-opacity=".87" stroke="#7D7859" stroke-opacity=".62" stroke-width="1.9"/><g fill="#C86F45" fill-opacity=".92"><circle cx="-22" cy="-17" r="4"/><circle cx="25" cy="-28" r="5"/><circle cx="13" cy="12" r="4"/></g></g></g>
  <g class="mmf-apple-tree mmf-apple-tree-b" transform="translate(1531 483) scale(1.1)"><g class="mmf-tree-sway"><path d="M1 69Q2 34 0 4M1 31L-20 13M0 28L22 5" stroke="#84694D" stroke-opacity=".68" fill="none" stroke-width="5" stroke-linecap="round"/><path d="M-43 6Q-59-11-42-27Q-46-52-17-56Q0-79 29-57Q59-56 56-27Q72-7 51 13Q41 32 17 26Q-13 38-30 20Q-45 20-43 6Z" fill="#C0CDA8" fill-opacity=".87" stroke="#7D7859" stroke-opacity=".62" stroke-width="1.9"/><g fill="#C86F45" fill-opacity=".92"><circle cx="-22" cy="-17" r="4"/><circle cx="25" cy="-28" r="5"/><circle cx="13" cy="12" r="4"/></g></g></g>
  <g class="mmf-fence" fill="none" stroke="#876C50" stroke-opacity=".70" stroke-linecap="round" stroke-linejoin="round">
     <path class="mmf-fence-stroke" d="M982 549Q1130 516 1286 533Q1441 550 1610 475" stroke-width="3"/><path class="mmf-fence-stroke" d="M986 566Q1128 536 1287 553Q1434 570 1614 496" stroke-width="2.1"/>
     <path d="M1002 540L1000 582M1070 525L1068 572M1142 521L1140 562M1213 521L1210 570M1291 532L1288 574M1377 541L1375 574M1462 530L1460 567M1542 502L1541 543" stroke-width="5"/>
  </g>
  <path d="M1083 610Q1199 555 1287 576Q1443 599 1640 509L1640 660L1030 660Z" fill="#ECD9B5" fill-opacity=".50"/>
  <g class="mmf-grass" transform="translate(1216 556)" fill="none" stroke="#7F936E" stroke-opacity=".65" stroke-width="2.5" stroke-linecap="round"><path d="M0 0Q-7-25-22-34M0 0Q14-35 22-40M0 0Q1-39-3-54"/></g>
  <g class="mmf-grass mmf-grass-b" transform="translate(1471 551)" fill="none" stroke="#7F936E" stroke-opacity=".65" stroke-width="2.5" stroke-linecap="round"><path d="M0 0Q-7-25-22-34M0 0Q14-35 22-40M0 0Q1-39-3-54"/></g>
  <g class="mmf-grass mmf-grass-c" transform="translate(1107 596)" fill="none" stroke="#7F936E" stroke-opacity=".65" stroke-width="2.3" stroke-linecap="round"><path d="M0 0Q-7-25-22-34M0 0Q14-35 22-40M0 0Q1-39-3-54"/></g>
</g>
<!-- Authored vegetation at lower left, deliberately very subtle to preserve clean countryside expanse. -->
<g class="mmf-plane mmf-plane-front" stroke="#8A946D" stroke-opacity=".48" stroke-linecap="round" fill="none">
  <g class="mmf-grass" transform="translate(59 553)"><path d="M0 0Q-18-28-35-34M0 0Q7-36 29-58M0 0Q-7-45-6-69" stroke-width="2.8"/><path d="M-10-33Q-22-40-34-39M12-39Q28-38 36-49" stroke-width="1.6"/></g>
  <g class="mmf-grass mmf-grass-b" transform="translate(182 573)"><path d="M0 0Q-18-28-35-34M0 0Q7-36 29-58M0 0Q-7-45-6-69" stroke-width="2.8"/><path d="M-10-33Q-22-40-34-39M12-39Q28-38 36-49" stroke-width="1.6"/></g>
</g>
<rect width="1600" height="610" fill="url(#__MMF__-shade)" pointer-events="none"/>
<rect width="1600" height="610" filter="url(#__MMF__-grain)" opacity=".012" style="mix-blend-mode:multiply" pointer-events="none"/>
</svg>`;

export const Footer: React.FC<MesaMarketFooterProps> = ({
  className = '',
  navigation = defaultNavigation,
  interactive = true,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const svgMarkup = useMemo(() => landscapeSVG.replaceAll('__MMF__', `mmf-${id}`), [id]);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.dataset.inview = 'true';
      node.dataset.entered = 'true';
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.inview = String(entry.isIntersecting);
        if (entry.isIntersecting) node.dataset.entered = 'true';
      },
      { threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !interactive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const tick = () => {
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      node.style.setProperty('--mmf-far-x', `${(-x * 5).toFixed(2)}px`);
      node.style.setProperty('--mmf-far-y', `${(-y * 3).toFixed(2)}px`);
      node.style.setProperty('--mmf-mid-x', `${(-x * 10).toFixed(2)}px`);
      node.style.setProperty('--mmf-mid-y', `${(-y * 5).toFixed(2)}px`);
      node.style.setProperty('--mmf-near-x', `${(-x * 15).toFixed(2)}px`);
      node.style.setProperty('--mmf-near-y', `${(-y * 8).toFixed(2)}px`);
      node.style.setProperty('--mmf-front-x', `${(-x * 19).toFixed(2)}px`);
      node.style.setProperty('--mmf-front-y', `${(-y * 9).toFixed(2)}px`);
      if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.003) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = node.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
      request();
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
      request();
    };
    node.addEventListener('pointermove', pointer, { passive: true });
    node.addEventListener('pointerleave', leave);
    return () => {
      node.removeEventListener('pointermove', pointer);
      node.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [interactive]);

  const returnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <footer
      ref={rootRef}
      id="mesa-footer"
      className={`mmf-footer ${className}`.trim()}
      data-entered="false"
      data-inview="false"
    >
      <div className="mmf-landscape" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
      <div className="mmf-bottom-grid">
        <div className="mmf-about">
          <a
            className="mmf-logo"
            href="#top"
            aria-label="Mesa Market, top of page"
            onClick={(e) => {
              e.preventDefault();
              returnToTop();
            }}
          >
            MESA<span className="mmf-logo-mark">✳</span>MARKET
          </a>
          <p>A little closer to the good stuff.</p>
        </div>
        <div className="mmf-nav-col">
          <span className="mmf-heading">EXPLORE</span>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={`${item.label}-${item.href}`} href={item.href}>
                {item.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="mmf-nav-col mmf-info">
          <span className="mmf-heading">THE FIELD NOTES</span>
          <p>
            Illustrative seasonal produce market concept. Item availability and pricing shown elsewhere on this site are examples.
          </p>
        </div>
        <div className="mmf-return">
          <span className="mmf-heading">BACK TO THE BEGINNING</span>
          <button
            type="button"
            onClick={returnToTop}
            className="mmf-back-top"
            aria-label="Scroll back to top"
          >
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
      <div className="mmf-bottom-line">
        <span>© {currentYear} MESA MARKET · OPENLANDING TEMPLATE 089</span>
        <span>FRESH FROM THE FIELD · MADE WITH CARE</span>
      </div>
    </footer>
  );
};

export default Footer;
