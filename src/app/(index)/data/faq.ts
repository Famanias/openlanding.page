/** Answer-first FAQ copy. Rendered on the homepage and mirrored in FAQPage JSON-LD, so both always match. */
export interface FaqEntry {
  question: string;
  answer: string;
}

export function buildFaq(templateCount: number): FaqEntry[] {
  return [
    {
      question: "What is openlandingpage?",
      answer: `openlandingpage is a free, open-source gallery of ${templateCount} complete landing page templates, each designed from header to footer rather than just a hero section. Every template has a live page, its source code and an AI rebuild prompt.`,
    },
    {
      question: "Are the templates really free?",
      answer: "Yes. Every template and contributed HTML download is released under the MIT License, so you can use, modify and ship it in personal or commercial projects with no paywall or sign-up. Linked community websites keep their own terms.",
    },
    {
      question: "How do I use a template with an AI coding agent?",
      answer: "Copy the template's rebuild prompt and paste it into an agent such as Claude Code, Cursor, Codex or Antigravity. Each prompt is also published as plain Markdown at /copy/<slug>-prompt.md, and many templates offer a one-click HTML download.",
    },
    {
      question: "What stack are the templates built with?",
      answer: "Most templates use Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4, with Motion, GSAP, Lenis or Three.js for animation and 3D. Each card lists its exact stack, and every template respects prefers-reduced-motion.",
    },
    {
      question: "Can I get a landing page designed for my own site?",
      answer: "Yes. Use the request form at the bottom of the page to ask for a free design that joins the gallery as an MIT template, or a paid private commission whose code you own and which stays out of the gallery.",
    },
    {
      question: "Can I submit my own landing page?",
      answer: "Yes. The Community tab accepts submitted landing pages and HTML downloads. Submissions are reviewed, and accepted HTML is shared under the MIT License.",
    },
  ];
}
