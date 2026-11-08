import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { TEMPLATES } from "../../src/app/(index)/data/templates";

for (const template of TEMPLATES) {
  test(`${template.slug}: new URL is direct and old URL redirects once`, async ({ request }) => {
    const destination = `/templates/${template.slug}`;
    const current = await request.get(destination, { maxRedirects: 0 });
    expect(current.status()).toBe(200);
    expect(current.headers().location).toBeUndefined();
    const legacy = await request.get(`/${template.slug}`, { maxRedirects: 0 });
    expect(legacy.status()).toBe(308);
    expect(new URL(legacy.headers().location, legacy.url()).pathname).toBe(destination);
  });
}

for (const [alias, slug] of [["kinetix", "synapxe"], ["cyberpunk", "synapxe"], ["cairn", "keytu"]]) {
  for (const prefix of ["", "/templates"]) {
    test(`${prefix}/${alias}: aliases preserve query without a chain`, async ({ request }) => {
      const response = await request.get(`${prefix}/${alias}?campaign=launch`, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      const target = new URL(response.headers().location, response.url());
      expect(target.pathname).toBe(`/templates/${slug}`);
      expect(target.searchParams.get("campaign")).toBe("launch");
      expect((await request.get(target.href, { maxRedirects: 0 })).status()).toBe(200);
    });
  }
}

test("aliases preserve generated metadata suffixes", async ({ page, request }) => {
  await page.goto("/templates/keytu");
  const href = await page.locator('link[rel="icon"]').first().getAttribute("href");
  expect(href).toBeTruthy();
  const icon = new URL(href!, page.url());
  const suffix = icon.pathname.replace(/^\/(?:templates\/)?keytu\//, "");
  expect(suffix).not.toContain("/");
  const response = await request.get(`/cairn/${suffix}${icon.search}`, { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  const target = new URL(response.headers().location, response.url());
  expect(target.pathname).toBe(`/templates/keytu/${suffix}`);
  expect([...target.searchParams]).toEqual([...icon.searchParams]);
  expect((await request.get(target.href, { maxRedirects: 0 })).status()).toBe(200);
});

test("legacy navigation retains query and browser fragment", async ({ page }) => {
  await page.goto("/keytu?campaign=launch#c3");
  const url = new URL(page.url());
  expect(url.pathname).toBe("/templates/keytu");
  expect(url.search).toBe("?campaign=launch");
  expect(url.hash).toBe("#c3");
});

test("public media wins over the template rewrite", async ({ request }) => {
  const response = await request.get("/templates/orrery/og-base-800.webp", { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  expect(response.headers().location).toBeUndefined();
  expect(response.headers()["content-type"]).toContain("image/");
  expect(await response.body()).toEqual(await readFile("public/templates/orrery/og-base-800.webp"));
});

for (const slug of ["stillwater", "cirro"]) {
  test(`${slug}: imported HTML bytes and downloads stay intact`, async ({ request }) => {
    const original = await readFile(`public/downloads/${slug}.html`);
    for (const href of [`/templates/${slug}`, `/downloads/${slug}.html`]) {
      const response = await request.get(href, { maxRedirects: 0 });
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html");
      expect(await response.body()).toEqual(original);
    }
  });
}

test("unrelated routes remain available and unknown templates stay missing", async ({ request }) => {
  for (const href of ["/", "/community-terms", "/community-privacy"]) {
    expect((await request.get(href, { maxRedirects: 0 })).status()).toBe(200);
  }
  const votes = await request.get("/api/votes", { maxRedirects: 0 });
  expect(votes.status()).toBe(200);
  expect(votes.headers().location).toBeUndefined();
  expect(Object.keys(await votes.json()).sort()).toEqual(TEMPLATES.map(template => template.slug).sort());
  for (const href of ["/templates/not-a-registered-template", "/not-a-registered-template", "/templates/orrery/not-a-real-page"]) {
    const response = await request.get(href, { maxRedirects: 0 });
    expect(response.status()).toBe(404);
    expect(response.headers().location).toBeUndefined();
  }
});

test("rendered icon and Open Graph endpoints resolve", async ({ page, request }) => {
  await page.goto("/templates/orrery");
  const icon = await page.locator('link[rel="icon"]').first().getAttribute("href");
  const image = await page.locator('meta[property="og:image"]').first().getAttribute("content");
  for (const href of [icon, image]) {
    expect(href).toBeTruthy();
    const url = new URL(href!, page.url());
    const response = await request.get(url.pathname + url.search);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/");
  }
});
