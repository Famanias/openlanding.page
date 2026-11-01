import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Contribute } from "./Contribute";
import { Footer } from "./Footer";

describe("landing page sections", () => {
  it("Header renders lowercase openlandingpage wordmark and nav links", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain("openlandingpage");
    expect(html).toContain('href="#gallery"');
    expect(html).toContain('href="#contact"');
    expect(html).toContain("GitHub");
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
  });

  it("Hero renders centered title, subtitle with MIT License, and GitHub star CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Landing Pages, from Header to Footer.");
    expect(html).toContain("Not Just A Hero Section. One Click Download, 100% Free, No Paywalls.");
    expect(html).toContain("MIT License");
    expect(html).toContain("Give a star on GitHub");
    expect(html).toContain('href="#contact"');
    expect(html).toContain("Request a template");
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
    expect(html).not.toContain("Issue #01");
    expect(html).not.toContain("3 Bespoke Drops");
    expect(html).toContain("items-center");
    expect(html).toContain("text-center");
  });

  it("renders the template request offer and email form", () => {
    const html = renderToStaticMarkup(<Contribute />);
    expect(html).toContain("Your site, templated.");
    expect(html).toContain("official OpenLanding.page gallery template, open source under the MIT license");
    expect(html).toContain("Paid private commission");
    expect(html).toContain("You own the code, and your design stays out of the gallery.");
    expect(html).toContain('name="project_type"');
    expect(html).toContain('action="https://formsubmit.co/famianas.dev@gmail.com"');
    expect(html).toContain('name="email"');
    expect(html).toContain('href="mailto:famianas.dev@gmail.com"');
    expect(html).toContain("Send request");
  });

  it("Footer renders minimal copyright notice with MIT license and craft attribution", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain('id="contact"');
    expect(html).toContain("Your site, templated.");
    expect(html).toContain("OpenLanding.page. MIT Licensed.");
    expect(html).not.toContain("Award-grade web designs");
    expect(html).not.toContain('href="#gallery"');
    expect(html).not.toContain('href="#how-it-works"');
    expect(html).not.toContain("<span>openlandingpage</span>");
  });
});
