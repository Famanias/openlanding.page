import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Footer } from "./Footer";

describe("landing page sections", () => {
  it("Header renders lowercase templateflow wordmark and nav links", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain("templateflow");
    expect(html).toContain('href="#gallery"');
    expect(html).toContain('href="#how-it-works"');
    expect(html).toContain("GitHub");
  });

  it("Hero renders Issue #01 badge and smooth-scroll CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Issue #01");
    expect(html).toContain("Award-grade landing pages");
    expect(html).toContain('href="#gallery"');
    expect(html).toContain("3 Bespoke Drops");
  });

  it("HowItWorks renders 3-step guide and Orrery proof-of-work snippet", () => {
    const html = renderToStaticMarkup(<HowItWorks />);
    expect(html).toContain("Browse");
    expect(html).toContain("Copy");
    expect(html).toContain("Build");
    expect(html).toContain("#0E0F13");
    expect(html).toContain("clip-path inset");
    expect(html).toContain('id="how-it-works"');
  });

  it("Footer renders editorial columns and copyright notice", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain("templateflow");
    expect(html).toContain("GitHub");
    expect(html).toContain('href="#gallery"');
    expect(html).toContain('href="#how-it-works"');
  });
});
