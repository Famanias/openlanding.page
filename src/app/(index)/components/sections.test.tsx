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
    expect(html).toContain('href="#contribute"');
    expect(html).toContain("GitHub");
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
  });

  it("Hero renders centered title, subtitle with MIT License, and GitHub star CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Landing Pages your Agent can build");
    expect(html).toContain("A list of landing page one-shotted by different AI agents that you can use");
    expect(html).toContain("MIT License");
    expect(html).toContain("Give a star on GitHub");
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
    expect(html).not.toContain("Issue #01");
    expect(html).not.toContain("3 Bespoke Drops");
    expect(html).toContain("items-center");
    expect(html).toContain("text-center");
  });

  it("Contribute renders open-source contribution CTA with GitHub redirect", () => {
    const html = renderToStaticMarkup(<Contribute />);
    expect(html).toContain("Want to Contribute?");
    expect(html).toContain("OpenLanding.page is open-sourced, share your landing page for everyone to use.");
    expect(html).toContain('id="contribute"');
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
    expect(html).toContain("Contribute on GitHub");
  });

  it("Footer renders minimal copyright notice with MIT license and craft attribution", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain("OpenLanding.page. MIT Licensed.");
    expect(html).not.toContain("Award-grade web designs");
    expect(html).not.toContain('href="#gallery"');
    expect(html).not.toContain('href="#how-it-works"');
    expect(html).not.toContain("<span>openlandingpage</span>");
  });
});
