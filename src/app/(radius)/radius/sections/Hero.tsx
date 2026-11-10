import { Picture } from "../assets";

export function Hero() {
  return (
    <section className="rd-hero" id="top" aria-labelledby="rd-hero-title">
      <div className="rd-hero-field" aria-hidden="true"><div className="rd-hero-orange" /></div>
      <svg className="rd-hero-ghost" viewBox="0 0 800 400" aria-hidden="true"><defs><path id="rd-street-ghost" d="M357 704Q415 704 480.5 696.0Q546 688 604 668L585 530Q555 531 514.5 531.0Q474 531 430.0 531.5Q386 532 343 532Q326 532 314.0 530.5Q302 529 294.0 526.0Q286 523 281.5 517.5Q277 512 275 504Q274 497 276.5 490.0Q279 483 289.0 476.0Q299 469 319 459L435 404Q492 377 521.0 347.0Q550 317 558.5 278.5Q567 240 561 189Q552 110 522.0 65.5Q492 21 432.5 3.5Q373 -14 273 -14Q230 -14 156.5 -6.5Q83 1 4 21L24 172Q82 171 131.5 169.5Q181 168 215.0 167.5Q249 167 262 167Q293 167 310.5 170.0Q328 173 336.5 179.5Q345 186 347 196Q349 205 346.5 211.0Q344 217 336.0 222.5Q328 228 314 235L188 297Q130 326 101.0 358.5Q72 391 64.0 429.0Q56 467 61 509Q68 566 88.5 604.0Q109 642 145.0 663.5Q181 685 234.0 694.5Q287 704 357 704ZM990 690 893 0H676L773 690ZM1181 690 1158 528H560L583 690ZM1437 700Q1533 700 1597.0 680.0Q1661 660 1689.0 612.5Q1717 565 1706 482Q1701 443 1685.5 409.5Q1670 376 1638.0 354.0Q1606 332 1550 326L1549 319Q1566 317 1585.5 306.5Q1605 296 1620.5 273.0Q1636 250 1640 208L1666 0H1442L1424 209Q1423 238 1415.0 245.0Q1407 252 1384 252Q1307 253 1259.0 253.0Q1211 253 1178.5 254.0Q1146 255 1115 257L1131 405H1405Q1435 405 1451.5 411.0Q1468 417 1476.5 434.5Q1485 452 1490 484Q1494 508 1490.0 522.0Q1486 536 1473.0 541.5Q1460 547 1435 547Q1328 547 1256.5 545.5Q1185 544 1160 541L1158 690Q1203 695 1242.5 697.0Q1282 699 1328.0 699.5Q1374 700 1437 700ZM1370 690 1273 0H1061L1158 690ZM1893 694Q1954 694 2016.5 693.0Q2079 692 2137.0 689.5Q2195 687 2241 680L2217 528H1977Q1952 528 1940.5 519.5Q1929 511 1926 488L1886 201Q1883 182 1892.0 172.0Q1901 162 1923 162H2163L2159 8Q2111 1 2053.0 -1.0Q1995 -3 1935.0 -3.5Q1875 -4 1821 -4Q1736 -4 1696.0 49.0Q1656 102 1666 184L1716 541Q1726 611 1771.5 652.5Q1817 694 1893 694ZM1719 425H2166L2148 281H1696ZM2395 694Q2456 694 2518.5 693.0Q2581 692 2639.0 689.5Q2697 687 2743 680L2719 528H2479Q2454 528 2442.5 519.5Q2431 511 2428 488L2388 201Q2385 182 2394.0 172.0Q2403 162 2425 162H2665L2661 8Q2613 1 2555.0 -1.0Q2497 -3 2437.0 -3.5Q2377 -4 2323 -4Q2238 -4 2198.0 49.0Q2158 102 2168 184L2218 541Q2228 611 2273.5 652.5Q2319 694 2395 694ZM2221 425H2668L2650 281H2198ZM3111 690 3014 0H2797L2894 690ZM3302 690 3279 528H2681L2704 690Z" /></defs><use href="#rd-street-ghost" transform="translate(0 175) scale(.22 -.22)" /><use href="#rd-street-ghost" transform="translate(0 350) scale(.22 -.22)" /></svg>
      <div className="rd-hero-coordinate" aria-hidden="true">CITY / EVERYDAY / BEYOND</div>
      <div className="rd-hero-copy">
        <p className="rd-kicker rd-hero-kicker"><span /> ELECTRIC URBAN BICYCLE / 01</p>
        <h1 id="rd-hero-title" aria-label="Every street is yours."><span>EVERY</span><span>STREET</span><span>IS YOURS<i>.</i></span></h1>
        <p className="rd-hero-lead">Made for the way you move through the city.</p>
        <div className="rd-hero-actions">
          <a className="rd-button" href="#build"><span>Build your ride</span><b aria-hidden="true">↗</b></a>
          <a className="rd-link" href="#bike">Explore the bike <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="rd-hero-bike-wrap">
        <Picture assetKey="02-bike-side-graphite-alpha" alt="Graphite RADIUS electric bicycle with tangerine details, shown in side profile" className="rd-hero-bike" priority sizes="(min-width: 900px) 72vw, 100vw" />
        <svg className="rd-hero-wheel-intro" viewBox="0 0 2700 1800" aria-hidden="true">
          <g transform="translate(623 1124)"><g><circle r="455" /><path d="M-455 0H455 M0 -455V455 M-322 -322 322 322 M322 -322 -322 322" /></g></g>
          <g transform="translate(2126 1142)"><g><circle r="443" /><path d="M-443 0H443 M0 -443V443 M-313 -313 313 313 M313 -313 -313 313" /></g></g>
        </svg>
      </div>
      <a className="rd-wheel-selector" href="#build" aria-label="Choose your RADIUS bike configuration"><span>01 / 03</span><strong aria-hidden="true">↗</strong><small>CHOOSE<br />YOUR RIDE</small></a>
      <div className="rd-hero-bottom"><span>DESIGNED FOR THE EVERYDAY DETOUR</span><span>R / 01</span></div>
    </section>
  );
}
