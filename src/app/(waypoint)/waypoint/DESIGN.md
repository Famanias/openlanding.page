# Waypoint — Design Specification & AI Studio Implementation Guide

> **Design Authority for Google AI Studio & Modern Web Generators**  
> **Brand Name:** Waypoint  
> **Concept:** The calm, systematic direct-outreach pipeline for senior engineers and designers.  
> **Theme:** Light Pastel Brown Canvas • Soft Pastel Accents • Crisp Obsidian/Charcoal Typography (No Brown Text)

---

## 1. Brand Identity & Product Concept

**Waypoint** replaces chaotic spreadsheets and scattered inbox threads with an intentional, visual career pipeline. Job seekers compose targeted personal outreach to hiring decision-makers, track live candidate responses across stages, and pilot interview rounds through to offer letters.

* **Metaphor:** *A navigational flight deck and checkpoint map.*
* **Tone & Mood:** Calm, editorial, high-trust, deliberate, tactile. Warm natural light meets modern software precision.
* **Signature Experience:**
  1. **Full-Bleed Light Pastel Brown Hero Canvas:** An expansive, warm atmospheric horizon with soft sunlight haze and pastel sky tones.
  2. **Half-Shown Pipeline Deck (Fold Cutoff):** A crisp white floating card anchored at the bottom edge (45% visible on load) that elevates into full view through continuous parallax scroll as the user explores downward (zero wheel locking or scroll hijacking).
  3. **4-Card Feature Bento Grid:** Interactive client-side micro-sandboxes (interview round radar, draggable/clickable stage progression, zero-knowledge encryption toggle, and simulated recruiter reply toast).
  4. **Pricing Grid with Cadence Flip:** Monthly vs. Annual toggle with rolling odometer numbers animating prices smoothly (Starter at $0, Professional at $28 ↔ $22/mo, Studio/Team at $58 ↔ $48/mo).
  5. **FAQ Accordion:** 4 accessible collapsible items answering privacy, email deliverability, data export, and search volume questions.
  6. **Conversion Card & Deep Contrast Colophon:** An early access waitlist card with email capture and floating frosted company logo pills, resting on a deep charcoal/navy footer with a massive embossed `waypoint` watermark.

---

## 2. Color Palette & Design Tokens

### The Palette Rule
* **Backgrounds & Hero Canvas:** Light pastel brown, soft oatmeal, warm sand, and alabaster tones.
* **Text & Readability:** Strictly **Obsidian / Deep Charcoal / Cool Slate**. *(Brown is strictly forbidden for body and heading text to ensure WCAG AAA contrast and high editorial sharpness).*
* **Card Surfaces:** Pure Crisp White (`#FFFFFF`) for elevated contrast against pastel brown grounds.
* **Pastel Accent Tints:** Soft sage, pastel iris, gentle apricot, and muted lavender for status indicators and active states.

### Palette Tokens (CSS Custom Properties)

```css
:root {
  /* Primary Background Surfaces (Light Pastel Brown) */
  --wp-bg-primary: #EDE6DF;        /* Main light pastel brown canvas */
  --wp-bg-hero: #F5EFEB;           /* Soft pastel cream / light desert haze */
  --wp-bg-surface-tint: #E5DDD4;   /* Deeper pastel brown for borders & subtle fills */
  --wp-bg-card: #FFFFFF;           /* Crisp white for cards, inputs, and popovers */
  --wp-bg-card-subtle: #FAF8F5;    /* Very soft warm alabaster for inner card wells */

  /* Text & Ink Tokens (Strictly No Brown Text) */
  --wp-text-primary: #121417;      /* Deep Obsidian / Near-black for headings and high contrast */
  --wp-text-body: #2B2F38;         /* Dark Charcoal for paragraphs (7.8:1 contrast) */
  --wp-text-muted: #666E7D;        /* Slate Graphite for timestamps, labels, and secondary copy */
  --wp-border-subtle: #D8D0C5;     /* Warm graphite border */
  --wp-border-light: rgba(18, 20, 23, 0.08);

  /* Pastel Accent Tokens (Status & Badges) */
  --wp-pastel-sage: #D8EADF;       /* Soft mint/sage background */
  --wp-pastel-sage-ink: #216143;   /* High-contrast dark forest green for text inside sage badge */
  
  --wp-pastel-sky: #DBE8FA;        /* Soft iris/sky blue background */
  --wp-pastel-sky-ink: #1E4F94;    /* High-contrast blue ink for text inside sky badge */
  
  --wp-pastel-apricot: #FCE8DC;    /* Gentle peach/apricot background for deadlines */
  --wp-pastel-apricot-ink: #8A3E1B;/* Dark terracotta ink for text inside apricot badge */
  
  --wp-pastel-lavender: #ECE6F6;   /* Soft lavender background for security indicator */
  --wp-pastel-lavender-ink: #4B3878;/* Dark violet ink for text inside lavender badge */

  /* Colophon / Deep Section Accent */
  --wp-colophon-bg: #16181D;       /* Deep obsidian navy footer */
  --wp-colophon-text: #F5EFEB;     /* Pale warm cream text on dark footer */
  --wp-colophon-watermark: rgba(245, 239, 235, 0.05);
}
```

---

## 3. Typography & Hierarchy

* **Font Family:** Clean geometric sans-serif (such as `Inter`, `Plus Jakarta Sans`, `Geist`, or system fonts `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
* **Letter Tracking:** Tight tracking on uppercase headings (`-0.035em`) for a modern Swiss editorial feel; normal tracking (`-0.01em`) on body text.
* **Tabular Numbers:** Currency figures, calendar day cells, and countdown chips must use tabular figures (`font-variant-numeric: tabular-nums`).

### Scale Guide
* **Hero Headline (H1):** `clamp(2.5rem, 1.8rem + 3.8vw, 4.5rem)` — font weight `800`, leading `1.08`.
* **Section Title (H2):** `clamp(1.85rem, 1.4rem + 2.2vw, 3rem)` — font weight `800`, leading `1.15`.
* **Card Title (H3):** `clamp(1.15rem, 1rem + 0.5vw, 1.35rem)` — font weight `700`, leading `1.25`.
* **Eyebrow Badges:** `11px` to `12px` (`0.75rem`), font weight `600`, tracking `+0.04em`.
* **Body Copy:** `clamp(0.925rem, 0.85rem + 0.3vw, 1.05rem)` — color `var(--wp-text-body)`, leading `1.55`.

---

## 4. Section-by-Section Structural Blueprint

### 1. Navigation Header
* **Placement:** Fixed or sticky at viewport top, full width, `backdrop-filter: blur(14px)`.
* **Background:** Semi-transparent light pastel brown (`rgba(245, 239, 235, 0.82)`) with a hairline bottom border (`rgba(18, 20, 23, 0.06)`).
* **Components:**
  * **Brand Lockup (Left):** Modern geometric waypoint icon (an upward-pointing navigation chevron inside a soft rounded badge) + wordmark **Waypoint** in bold obsidian font (`#121417`).
  * **Navigation Links (Center):** `Features` (`#features`), `Pipeline` (`#pipeline`), `Pricing` (`#pricing`), `FAQ` (`#faq`). Slate text with smooth hover darkening.
  * **Action Controls (Right):** "Sign in" anchor link + "Get started" CTA button (Obsidian background `#121417`, warm cream text `#F5EFEB`, rounded-full pill, subtle shadow).
  * **Mobile:** Responsive hamburger button triggering a full-width drawer on touch screens.

---

### 2. Full-Bleed Pastel Hero & Parallax Pipeline Deck
* **Canvas:** Full viewport height (`min-h-[92vh]`), background rendered in soft, full-bleed light pastel brown tones (`#EDE6DF` to `#F5EFEB`). A subtle warm atmospheric gradient represents early-morning sunlight across a calm horizon.
* **Hero Content:**
  * **Category Pill:** `bg-white/80 backdrop-blur border border-black/5 px-3.5 py-1 text-xs text-[#2B2F38] font-medium rounded-full shadow-sm`.
    * Copy: *"Direct career outreach & pipeline tracking • Free to start"*
  * **Headline:**
    ```
    Pitch with intention.
    Land the offer.
    ```
    *(Rendered in deep obsidian `#121417`, centered, bold weight).*
  * **Subtitle:**
    *"Waypoint turns unstructured job hunting into an automated flight deck. Personalize outreach to engineering leaders, track replies in real time, and pilot every application from first note to signed offer."*
  * **CTA Row:**
    * Primary CTA: *"Start your pipeline →"* (Obsidian button `#121417`, cream text `#F5EFEB`, rounded-lg, font-bold, shadow-md).
    * Secondary CTA: *"See the flight deck"* (Crisp white button, subtle border, obsidian text).
  * **Proof Badge:** 4 overlapping rounded user avatars + text: *"Trusted by 3,400+ engineers and designers searching this month"*.
* **Half-Shown Pipeline Deck (The Fold Peek Mechanic):**
  * **Positioning:** Centered horizontally (`max-w-5xl mx-auto`), sitting at the bottom fold.
  * **Initial State:** At load time (`scroll = 0`), the top 45% of the card is visible peeking above the viewport bottom edge.
  * **Continuous Parallax Scroll Formula:**
    * Listens passively to window scroll via `requestAnimationFrame`.
    * Computes: `translateY = Math.min(scrollY * 0.22, 110)`.
    * The card glides smoothly upward as the visitor scrolls down, settling cleanly onto the page canvas before handing off to the features section.
    * No wheel hijacking or lock.
    * Reduced motion fallback: `transform: none`.
  * **Deck UI Anatomy:**
    * **Deck Header Bar:** Left tab indicator `Searches / Q4 Active Pipeline` (blue waypoint dot) + Right status pill `Elena at Anthropic replied • 12m ago` (pastel sage pill).
    * **4 Progression Columns:**
      1. `Pitched (3)`: Cards for *Linear* (Staff Design Engineer) and *Stripe* (Core Infra Engineer).
      2. `In Review (2)`: Card for *Figma* (Founding Systems Engineer).
      3. `Panel Round (1)`: Card for *Vercel* (Lead Framework Architect).
      4. `Offer Stage (1)`: Card for *Anthropic* (Research Systems) with highlighted pastel sky border and popover chip: *"Offer received • Total Comp $420k • 14 days from pitch"*.

---

### 3. Feature Bento Grid (4 Playable Micro-Widgets)
* **Background:** Warm canvas `#EDE6DF`.
* **Container:** 2 columns with asymmetric visual weight on desktop, single column on mobile.

#### Card 1: "Rounds in Focus" (Top Left, 45% width)
* **Headline:** *Rounds in focus*
* **Description:** *Calendar schedules, round requirements, and preparation notes anchored directly to each company.*
* **Interactive Widget:**
  * Calendar header with month selector (`November • Week 45`).
  * Clickable weekday grid (Mon–Sun).
  * Selecting a day highlights the date in pastel sky blue and reveals the round detail card: *"Anthropic • Final Architecture Round (In 2 days)"* with direct checklist notes.

#### Card 2: "One board for every stage" (Top Right, 55% width)
* **Headline:** *One board for every stage*
* **Description:** *Pitched, review, panel, offer. Drag or tap a card when discussions progress, and your entire job search stays legible at a glance.*
* **Interactive Widget:**
  * 4 compact stage slots.
  * Draggable and clickable candidate company cards.
  * Clicking any card cycles it to the next column with a smooth spring translate, immediately updating the column counters in real time.

#### Card 3: "Zero-Knowledge Privacy" (Bottom Left, 48% width)
* **Headline:** *Private by architecture*
* **Description:** *Client-side encryption ensures your outreach templates, target contacts, and compensation notes are readable only on your hardware.*
* **Interactive Widget:**
  * Rounded glowing pastel lavender security badge with shield/lock icon.
  * Interactive switch toggling encryption status.
  * Readout: *"E2EE AES-256 active • Zero telemetry on recruiter addresses • Client-only decrypt"*.

#### Card 4: "Live Recruiter Signal" (Bottom Right, 52% width)
* **Headline:** *Know the moment they reply*
* **Description:** *Follow-ups, scheduling links, and offer documents arrive in a live notification stream that advances the application automatically.*
* **Interactive Widget:**
  * Inbox toast card: *"Elena at Anthropic replied • + Replied"*.
  * Message excerpt: *"Loved your distributed systems write-up. Are you available for a technical discussion this Wednesday?"*
  * Button: *"Simulate Recruiter Inbound"* that triggers an animated toast sliding into the feed with a real-time timestamp.

---

### 4. Pricing Grid with Cadence Flip & Rolling Odometer
* **Headline:** *Transparent while you search.*
* **Subtitle:** *No headhunter fees. No recruiting agencies taking 25% of your signing bonus. You own the direct connection, and your first 25 tracked pitches cost nothing.*
* **Cadence Switcher:**
  * Segmented pill control: `Monthly` vs `Annual (Save 20%)`.
  * Switching state drives an animated rolling odometer counter for both paid plans:
* **3 Pricing Tiers:**
  1. **Starter Plan:**
     * Price: `$0 / permanent free` (with pastel sage `Free` pill).
     * Ideal for: *Individual engineers tracking their initial outreach*.
     * Includes: 25 active tracked pitches/month, verified recruiter email lookup, personal inbox SMTP/OAuth, standard follow-up sequences.
     * CTA: *"Get started free"* (White card with obsidian button).
  2. **Professional Plan (Featured Hero Card):**
     * Visual: Clean white card framed with an elevated pastel sky outline and drop shadow.
     * Badge: `Most Popular` pill in pastel sky blue.
     * Price: `$28 / a month` on monthly, flipping to `$22 / a month` on annual via rolling odometer.
     * Ideal for: *Active job seekers running a multi-company interview loop*.
     * Includes: 350 tracked pitches/month, AI pitch drafting & background tailoring, automated multi-step follow-ups, read receipts & engagement telemetry.
     * CTA: *"Start 14-day trial"* (Obsidian button `#121417`, cream text).
  3. **Studio & Coaching Plan:**
     * Price: `$58 / a month` on monthly, flipping to `$48 / a month` on annual via rolling odometer.
     * Ideal for: *Bootcamp mentors, career coaches, and collaborative pipelines*.
     * Includes: Unlimited pitches & applications, custom domain sender addresses, team shared pipeline dashboard, priority AI drafting queue.
     * CTA: *"Join the waitlist"* (Subtle border button).
* **Footer Note:** *"All plans include client-side encryption. Cancel or export anytime."*

---

### 5. FAQ Accordion Section
* **Placement:** Positioned with anchor `id="faq"`, container `max-w-3xl mx-auto py-16 px-6`.
* **Title:** *Frequently Asked Questions*
* **4 Accordion Cards:**
  1. **How does the email sending integration work?**  
     *Answer:* Waypoint connects directly to your Gmail or Google Workspace inbox via secure OAuth with send-on-behalf permissions. Your outreach sends directly from your personal account, ensuring 100% authentic delivery and zero spam-filter flags.
  2. **Is my outreach data kept private from recruiters and third parties?**  
     *Answer:* Absolutely. All contact lists, email bodies, and salary notes are encrypted client-side. We never monetize candidate contacts or train public language models on your outreach data.
  3. **Can I export my pipeline data to CSV or Notion?**  
     *Answer:* Yes. You can export your full pipeline history, contact emails, conversation notes, and timestamp logs in one click to standard CSV or JSON format at any time.
  4. **What occurs when I reach the 25 application limit on the free Starter plan?**  
     *Answer:* You maintain permanent access to view, update, and manage all existing applications and replies. You can upgrade to the Professional plan only when you wish to expand your outreach volume.
* **Interaction:** Clicking an item smoothly expands its answer using CSS grid height transitions; accessible with `aria-expanded` and keyboard navigation.

---

### 6. Early Access Conversion Card & Colophon Footer
* **Early Access Card:**
  * **Surfacing:** Crisp white card (`#FFFFFF`) with rounded corners (`rounded-2xl`) and shadow, set against the pastel brown background.
  * **Left Side (Copy & Form):**
    * Eyebrow: `Early Access • Pro & Studio` in pastel sky ink.
    * Headline: *"Give every outreach conversation a clear paper trail."*
    * Subcopy: *"Every cold pitch, follow-up ping, and technical interview in one calm interface, so you always know which conversations are moving forward."*
    * Form: Email input (`placeholder="you@domain.com"`) + *"Join early access"* button. Submitting triggers an immediate in-memory confirmation alert: *"You're confirmed on the early access queue!"*
    * Disclaimer: *"Starter stays free forever • No credit card required • Client-side encrypted"*.
  * **Right Side (Company Logo Cluster):**
    * Floating cluster of frosted circular badge pills representing aspirational tech employers (Linear, Stripe, Figma, Anthropic, Vercel, Airbnb) with gentle floating CSS keyframes.
* **Colophon Footer (Deep Obsidian Contrast):**
  * **Background:** Deep Obsidian Navy (`#16181D`), providing an authoritative ground for the bottom of the page.
  * **Typography:** Warm cream `#F5EFEB` and muted slate `#8B93A2`.
  * **Top Row:**
    * Brand Mark: Navigation chevron icon + **Waypoint**.
    * Description: *"The career outreach pipeline for senior engineers and product designers. Pitch directly, track momentum, and land the role."*
    * Quick newsletter subscription field.
    * 4 Link Columns:
      * **Product:** Features, Pipeline, Pricing, Pitch Drafter (New).
      * **Company:** About, Manifesto, Press, Contact.
      * **Resources:** Outreach Guides, Cold Email Templates, Changelog, Status.
      * **Legal:** Privacy, Terms, Security, Data Protection.
  * **Massive Embossed Watermark:**
    * The word **`waypoint`** in lowercase, spanning edge-to-edge across the base.
    * Styling: `font-size: clamp(4rem, 12vw, 9.5rem)`, `font-weight: 900`, `letter-spacing: -0.05em`, color `rgba(245, 239, 235, 0.05)`.
  * **Colophon Bottom Bar:** Copyright notices, disclaimer: *"Company marks and logos are depicted for portfolio illustration purposes only."*

---

## 5. Animation & Interaction Specifications

1. **Parallax Board Reveal:**
   * Calculated via passive scroll listener: `Math.min(scrollY * 0.22, 110)`.
   * Applied as `transform: translateY(-${offset}px)` on the wrapper.
   * Smooth, unpinned, zero scroll-hijacking.
2. **Rolling Number Odometer:**
   * When flipping cadence from Monthly to Annual, the numbers `$28` → `$22` and `$58` → `$48` roll vertically using stacked `translateY` spans with a cubic-bezier easing `cubic-bezier(0.16, 1, 0.3, 1)`.
3. **Card Progression Physics:**
   * Moving a card between columns triggers a slight scale `scale(1.04)` on grab, followed by smooth placement into the target column list.
4. **Accessible Reduced-Motion Mode:**
   * When `prefers-reduced-motion: reduce` is detected:
     - Parallax offset defaults to `0px`.
     - Rolling counters transition immediately without vertical translation.
     - All bento widgets remain fully playable with instantaneous state changes.

---

## 6. Copyable Prompt for Google AI Studio

Copy and paste this prompt directly into Google AI Studio to generate the complete website:

```text
Build a complete, responsive landing page for "Waypoint" (a calm, high-agency career outreach and pipeline tracker for senior engineers and designers) based on the attached DESIGN.md specification.

Design & Color Requirements:
1. Palette: The primary background color must be Light Pastel Brown (#EDE6DF / #F5EFEB) with pure crisp white (#FFFFFF) card surfaces and soft pastel accent badges (pastel sage #D8EADF, pastel sky #DBE8FA, pastel apricot #FCE8DC, pastel lavender #ECE6F6).
2. Typography Rule: NEVER use brown for text colors. Use deep obsidian/charcoal (#121417 / #2B2F38) for headings and paragraphs for high editorial contrast and readability.
3. Hero Section: Full-bleed light pastel brown atmospheric canvas with headline "Pitch with intention. Land the offer." Anchored at the bottom fold is a half-shown white pipeline dashboard (45% visible at load) that smoothly reveals into full view via a continuous parallax scroll calculation (translateY offset on scroll, no scroll-hijacking or wheel locking).
4. Feature Bento Grid: 4 interactive client-side widgets (selectable interview calendar, draggable/clickable Kanban card pipeline, E2EE privacy shield toggle, and live simulated recruiter response toast).
5. Pricing Grid: 3 plans (Starter $0, Professional $28, Studio $58) with an interactive Monthly / Annual toggle that animates the prices to $22 and $48 with rolling odometer numbers.
6. FAQ Accordion: 4-question accessible expandable accordion.
7. Conversion Card & Footer: Early access card with validated email input and floating tech logo cluster, resting on a deep obsidian navy footer (#16181D) with an enormous embossed lowercase watermark "waypoint".
8. Deliver complete, production-ready code with responsive layouts (desktop to mobile) and clean CSS variables.
```
