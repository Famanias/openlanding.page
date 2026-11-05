import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

function createSvg(width: number, height: number): string {
  const scale = width / 1600;
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="canvasGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F5EFEB" />
      <stop offset="100%" stop-color="#EDE6DF" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#121417" flood-opacity="0.08" />
    </filter>
    <filter id="subtleShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#121417" flood-opacity="0.04" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#canvasGrad)" />

  <g transform="scale(${scale})">
    <!-- Header Bar -->
    <g transform="translate(140, 48)">
      <rect width="1320" height="64" rx="32" fill="#FFFFFF" fill-opacity="0.9" stroke="#E5DDD4" stroke-width="1.5" filter="url(#subtleShadow)" />
      
      <!-- Logo -->
      <g transform="translate(28, 16)">
        <rect width="32" height="32" rx="8" fill="#121417" />
        <path d="M10 20 L16 12 L22 20" stroke="#D8EADF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <text x="44" y="22" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="700" fill="#121417" letter-spacing="-0.5">waypoint</text>
      </g>

      <!-- Nav Links -->
      <g transform="translate(540, 37)" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#666E7D">
        <text x="0" y="0">Pipeline</text>
        <text x="90" y="0">Intelligence</text>
        <text x="210" y="0">Security</text>
        <text x="305" y="0">Pricing</text>
      </g>

      <!-- Header CTA -->
      <g transform="translate(1140, 14)">
        <rect width="150" height="36" rx="18" fill="#121417" />
        <text x="75" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF" text-anchor="middle">Request Invite</text>
      </g>
    </g>

    <!-- Hero Content -->
    <!-- Pill Badge -->
    <g transform="translate(800, 170)">
      <rect x="-140" y="-14" width="280" height="28" rx="14" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" />
      <circle cx="-118" cy="0" r="4" fill="#D8EADF" />
      <text x="-106" y="4" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#2B2F38">Direct outreach for senior engineers</text>
    </g>

    <!-- Main Headline -->
    <text x="800" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="800" fill="#121417" text-anchor="middle" letter-spacing="-1.5">
      Pitch with intention. Land the offer.
    </text>

    <!-- Subhead -->
    <text x="800" y="300" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#666E7D" text-anchor="middle">
      The calm, systematic career outreach pipeline for senior engineers and designers.
    </text>

    <!-- Hero Dashboard Card -->
    <g transform="translate(140, 360)">
      <!-- Deck Container -->
      <rect width="1320" height="520" rx="20" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1.5" filter="url(#cardShadow)" />

      <!-- Deck Header -->
      <g transform="translate(32, 28)">
        <text x="0" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="700" fill="#121417">Active Search: Senior Principal / Staff Infrastructure</text>
        <g transform="translate(980, 0)">
          <rect width="110" height="26" rx="13" fill="#D8EADF" />
          <text x="55" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#121417" text-anchor="middle">24-hr SLA Active</text>
        </g>
        <g transform="translate(1105, 0)">
          <rect width="145" height="26" rx="13" fill="#DBE8FA" />
          <text x="72" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#121417" text-anchor="middle">Zero-Knowledge E2EE</text>
        </g>
      </g>

      <!-- 4 Columns -->
      <!-- Column 1: Pitched -->
      <g transform="translate(32, 75)">
        <rect width="294" height="415" rx="12" fill="#F5EFEB" stroke="#E5DDD4" stroke-width="1" />
        <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#121417">PITCHED</text>
        <rect x="76" y="15" width="22" height="18" rx="9" fill="#E5DDD4" />
        <text x="87" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#666E7D" text-anchor="middle">4</text>

        <!-- Card 1: Linear -->
        <g transform="translate(12, 44)">
          <rect width="270" height="74" rx="8" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" filter="url(#subtleShadow)" />
          <text x="14" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#121417">Linear</text>
          <text x="14" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">Staff Product Engineer</text>
          <rect x="14" y="52" width="60" height="14" rx="4" fill="#DBE8FA" />
          <text x="44" y="63" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#121417" text-anchor="middle">Warm Pitch</text>
        </g>

        <!-- Card 2: Stripe -->
        <g transform="translate(12, 126)">
          <rect width="270" height="74" rx="8" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" filter="url(#subtleShadow)" />
          <text x="14" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#121417">Stripe</text>
          <text x="14" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">Principal Architect</text>
          <rect x="14" y="52" width="68" height="14" rx="4" fill="#FCE8DC" />
          <text x="48" y="63" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#121417" text-anchor="middle">Exec Referral</text>
        </g>

        <!-- Card 3: Figma -->
        <g transform="translate(12, 208)">
          <rect width="270" height="74" rx="8" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" filter="url(#subtleShadow)" />
          <text x="14" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#121417">Figma</text>
          <text x="14" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">Design Systems Lead</text>
          <rect x="14" y="52" width="54" height="14" rx="4" fill="#ECE6F6" />
          <text x="41" y="63" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#121417" text-anchor="middle">VP Reach</text>
        </g>
      </g>

      <!-- Column 2: In Review -->
      <g transform="translate(346, 75)">
        <rect width="294" height="415" rx="12" fill="#F5EFEB" stroke="#E5DDD4" stroke-width="1" />
        <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#121417">IN REVIEW</text>
        <rect x="94" y="15" width="22" height="18" rx="9" fill="#E5DDD4" />
        <text x="105" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#666E7D" text-anchor="middle">2</text>

        <!-- Card 1: OpenAI -->
        <g transform="translate(12, 44)">
          <rect width="270" height="74" rx="8" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" filter="url(#subtleShadow)" />
          <text x="14" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#121417">OpenAI</text>
          <text x="14" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">Compute &amp; Infrastructure</text>
          <text x="14" y="64" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#2B2F38">Recruiter Screen Complete</text>
        </g>

        <!-- Card 2: Datadog -->
        <g transform="translate(12, 126)">
          <rect width="270" height="74" rx="8" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" filter="url(#subtleShadow)" />
          <text x="14" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#121417">Datadog</text>
          <text x="14" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">Platform Reliability</text>
          <text x="14" y="64" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#2B2F38">Async Review (Day 2)</text>
        </g>
      </g>

      <!-- Column 3: Panel Round -->
      <g transform="translate(660, 75)">
        <rect width="294" height="415" rx="12" fill="#F5EFEB" stroke="#E5DDD4" stroke-width="1" />
        <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#121417">PANEL ROUND</text>
        <rect x="116" y="15" width="22" height="18" rx="9" fill="#E5DDD4" />
        <text x="127" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#666E7D" text-anchor="middle">1</text>

        <!-- Card: Airbnb -->
        <g transform="translate(12, 44)">
          <rect width="270" height="96" rx="8" fill="#FFFFFF" stroke="#E5DDD4" stroke-width="1" filter="url(#subtleShadow)" />
          <text x="14" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#121417">Airbnb</text>
          <text x="14" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">Guest Experience Platform</text>
          <rect x="14" y="54" width="94" height="16" rx="4" fill="#DBE8FA" />
          <text x="61" y="66" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#121417" text-anchor="middle">System Design</text>
          <text x="14" y="86" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#666E7D">Scheduled Nov 12 · 2:00 PM</text>
        </g>
      </g>

      <!-- Column 4: Offer Stage -->
      <g transform="translate(974, 75)">
        <rect width="314" height="415" rx="12" fill="#F5EFEB" stroke="#D8EADF" stroke-width="1.5" />
        <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#121417">OFFER STAGE</text>
        <rect x="116" y="15" width="22" height="18" rx="9" fill="#D8EADF" />
        <text x="127" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#121417" text-anchor="middle">1</text>

        <!-- Card: Anthropic -->
        <g transform="translate(12, 44)">
          <rect width="290" height="148" rx="10" fill="#FFFFFF" stroke="#D8EADF" stroke-width="2" filter="url(#subtleShadow)" />
          <g transform="translate(14, 20)">
            <text x="0" y="4" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#121417">Anthropic</text>
            <rect x="180" y="-12" width="80" height="22" rx="11" fill="#D8EADF" />
            <text x="220" y="3" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#121417" text-anchor="middle">OFFER EXTENDED</text>
            
            <text x="0" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#666E7D">Staff Research Systems</text>
            
            <rect x="0" y="38" width="262" height="1" fill="#EDE6DF" />
            
            <text x="0" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#666E7D">Total Compensation</text>
            <text x="0" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#121417">$420,000</text>
            <text x="110" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#666E7D">+ Significant Equity</text>

            <rect x="0" y="96" width="262" height="26" rx="6" fill="#121417" />
            <text x="131" y="113" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF" text-anchor="middle">Review Formal Letter &amp; Terms</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>
`;
}

async function run() {
  const previewSvg = Buffer.from(createSvg(1600, 900));
  const gallerySvg = Buffer.from(createSvg(1920, 1080));

  const previewOut = path.resolve("public/templates/waypoint/preview-1600.webp");
  const galleryOut = path.resolve("public/gallery/waypoint.webp");

  await sharp(previewSvg).webp({ quality: 90 }).toFile(previewOut);
  console.log(`Generated ${previewOut}`);

  await sharp(gallerySvg).webp({ quality: 90 }).toFile(galleryOut);
  console.log(`Generated ${galleryOut}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
