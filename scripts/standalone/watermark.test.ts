import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  COPYRIGHT_LINE,
  FULL_MIT_LICENSE_TEXT,
  GENERATOR_META,
  MIT_PERMISSION_TEXT,
  resolveTemplateTitle,
  stripOlpChrome,
  upsertFooterCredit,
  upsertGeneratorMeta,
  upsertLicenseHeader,
  validateWatermarkedDocument,
  watermarkHtml,
} from "./watermark";

const MINIMAL_DOC =
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Fallback Title</title></head><body><main><h1>Hello</h1></main></body></html>\n';

describe("download watermarking", () => {
  it("matches the repository LICENSE file text", () => {
    const repoLicense = fs.readFileSync(path.resolve("LICENSE"), "utf8").replace(/\r\n/g, "\n");
    expect(FULL_MIT_LICENSE_TEXT).toBe(repoLicense);
    expect(repoLicense).toContain(COPYRIGHT_LINE);
    expect(repoLicense).toContain(MIT_PERMISSION_TEXT);
  });

  it("resolves template title from TEMPLATES and falls back to <title>", () => {
    expect(resolveTemplateTitle("tolvar", MINIMAL_DOC)).toBe("TOLVAR EARTHWORKS");
    expect(resolveTemplateTitle("orbitbeyond", MINIMAL_DOC)).toBe("ORBIT & BEYOND");
    expect(resolveTemplateTitle("unregistered-sample", MINIMAL_DOC)).toBe("Fallback Title");
    expect(
      resolveTemplateTitle(
        "unregistered-sample",
        "<!doctype html><html><head><title>Tom &amp; Jerry</title></head><body></body></html>",
      ),
    ).toBe("Tom & Jerry");
    expect(
      resolveTemplateTitle("unregistered-sample", "<!doctype html><html><head></head><body></body></html>"),
    ).toBe("unregistered-sample");
  });

  it("inserts the MIT license header directly after <!DOCTYPE html> and keeps generator comments below", () => {
    const withExistingComment =
      '<!DOCTYPE html>\n<!-- Generated from the current tolvar components. -->\n<html><head><title>T</title></head><body><h1>Hi</h1></body></html>';
    const out = upsertLicenseHeader(withExistingComment, { slug: "tolvar" });
    expect(out.startsWith("<!DOCTYPE html>\n<!-- openlanding.page:license\nTOLVAR EARTHWORKS\nhttps://www.openlanding.page/templates/tolvar\n")).toBe(true);
    expect(out).toContain("MIT License");
    expect(out).toContain(COPYRIGHT_LINE);
    expect(out).toContain(MIT_PERMISSION_TEXT);
    expect(out).toContain("<!-- Generated from the current tolvar components. -->");
    expect(out.indexOf("openlanding.page:license")).toBeLessThan(
      out.indexOf("<!-- Generated from the current tolvar components. -->"),
    );

    // Leading UTF-8 BOM before doctype is stripped cleanly so doctype is first.
    const withBom = "\uFEFF<!doctype html><html><head><title>X</title></head><body></body></html>";
    expect(upsertLicenseHeader(withBom, { slug: "tolvar" }).startsWith("<!doctype html>\n<!-- openlanding.page:license")).toBe(true);
  });

  it("inserts exactly one generator meta tag in <head> and deduplicates pre-existing ones", () => {
    const added = upsertGeneratorMeta(MINIMAL_DOC);
    expect(added.match(/name="generator"/g)).toHaveLength(1);
    expect(added).toContain(`<meta charset="utf-8">\n${GENERATOR_META}<title>`);

    const duplicated =
      '<!DOCTYPE html><html><head><meta charset="utf-8">\n<meta name="generator" content="Other">\n<meta name="generator" content="Another">\n<title>A</title></head><body></body></html>';
    const deduped = upsertGeneratorMeta(duplicated);
    expect(deduped.match(/name="generator"/gi)).toHaveLength(1);
    expect(deduped).toContain(GENERATOR_META);
    expect(deduped).not.toContain("Other");
    expect(deduped).not.toContain("Another");

    // Ignores `<head>` text inside inline scripts.
    const scriptMention =
      '<!DOCTYPE html><html><head><title>A</title></head><body><script>const s="<head></head>";</script></body></html>';
    const withScript = upsertGeneratorMeta(scriptMention);
    expect(withScript.match(/name="generator"/g)).toHaveLength(1);
    expect(withScript.indexOf(GENERATOR_META)).toBeLessThan(withScript.indexOf("</head>"));
  });

  it("injects an optional visible footer credit before </body> with plain links and escaped title", () => {
    const out = upsertFooterCredit(MINIMAL_DOC, { slug: "orbitbeyond" });
    expect(out).toContain("<!-- Optional attribution: MIT License does not require this credit");
    expect(out).toContain("data-olp-credit");
    expect(out).toContain(
      '<a href="https://www.openlanding.page/templates/orbitbeyond" title="ORBIT &amp; BEYOND on openlanding.page" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">free landing page template</a>',
    );
    // The template name must not appear in the credit's visible text (strict selectors, duplicate copy).
    const visible = out.slice(out.indexOf("<p data-olp-credit")).replace(/<[^>]+>/g, "");
    expect(visible).not.toMatch(/ORBIT/);
    expect(out).toContain(
      '<a href="https://www.openlanding.page/" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">openlanding.page</a>',
    );
    expect(out).not.toContain("nofollow");
    expect(out).toContain("color:inherit;opacity:.7");
    expect(out).toContain("font-family:inherit");
    expect(out.indexOf("data-olp-credit")).toBeLessThan(out.lastIndexOf("</body>"));
  });

  it("removes any element carrying data-olp-chrome including nested same-tag elements and chrome styles/scripts", () => {
    const withChrome = [
      "<!DOCTYPE html><html><head><title>Test</title>",
      '<style data-olp-chrome>.olp-bar{color:red}</style>',
      "</head><body>",
      '<div class="keep-wrapper">',
      '<div data-olp-chrome id="bar" title="a > b"><div class="inner"><span>Back to gallery</span></div><a href="/">Home</a></div>',
      "<main><h1>Keep me</h1></main>",
      "</div>",
      '<aside data-olp-chrome="info"><p>Info</p><script>const close="</aside>";</script></aside>',
      '<div data-note="data-olp-chrome" data-olp-chrome-extra="1">Keep attribute lookalike</div>',
      '<script>const code = "<div data-olp-chrome>inside script</div>";</script>',
      "</body></html>",
    ].join("\n");

    const cleaned = stripOlpChrome(withChrome);
    expect(cleaned).not.toContain(".olp-bar{color:red}");
    expect(cleaned).not.toContain("Back to gallery");
    expect(cleaned).not.toContain("id=\"bar\"");
    expect(cleaned).not.toContain("<aside");
    expect(cleaned).toContain('<div class="keep-wrapper">');
    expect(cleaned).toContain("<main><h1>Keep me</h1></main>");
    expect(cleaned).toContain('data-note="data-olp-chrome"');
    expect(cleaned).toContain('data-olp-chrome-extra="1"');
    expect(cleaned).toContain('const code = "<div data-olp-chrome>inside script</div>"');
  });

  it("is strictly idempotent and updates titles without duplicating markers", () => {
    const withChrome =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Demo</title></head><body><nav data-olp-chrome><div>Bar</div></nav><main><h1>Demo</h1></main></body></html>\n';
    const first = watermarkHtml(withChrome, { slug: "tolvar" });
    const second = watermarkHtml(first, { slug: "tolvar" });
    expect(second).toBe(first);

    // Updating title updates both license header and footer credit cleanly.
    const renamed = watermarkHtml(first, { slug: "tolvar", title: "Tolvar Renamed" });
    expect(renamed).toContain("Tolvar Renamed");
    expect(renamed).not.toContain("TOLVAR EARTHWORKS");
    expect(renamed.match(/openlanding\.page:license/g)).toHaveLength(1);
    expect(renamed.match(/name="generator"/g)).toHaveLength(1);
    expect(renamed.match(/data-olp-credit/g)).toHaveLength(1);
    expect(watermarkHtml(renamed, { slug: "tolvar", title: "Tolvar Renamed" })).toBe(renamed);

    const validation = validateWatermarkedDocument(first);
    expect(validation).toEqual({ ok: true, errors: [] });
  });

  it("handles inline scripts containing <style or <script strings and CRLF before </body> idempotently", () => {
    const doc =
      '<!doctype html>\r\n<html lang="en">\r\n<head>\r\n<meta charset="utf-8"><title>Orbit</title>\r\n</head>\r\n<body>\r\n<div id="root"><h1>Orbit</h1></div>\r\n<script>const x = "<style>.a{}</style><script>";</script>\r\n</body>\r\n</html>\r\n';
    const first = watermarkHtml(doc, { slug: "orbitbeyond" });
    const second = watermarkHtml(first, { slug: "orbitbeyond" });
    expect(second).toBe(first);
    expect(validateWatermarkedDocument(second)).toEqual({ ok: true, errors: [] });
  });
});
