import { TEMPLATES } from "../../src/app/(index)/data/templates";
import { SITE_URL } from "../../src/lib/site";

export const LICENSE_MARKER = "openlanding.page:license";
export const CREDIT_ATTRIBUTE = "data-olp-credit";
export const CHROME_ATTRIBUTE = "data-olp-chrome";
export const GENERATOR_META = '<meta name="generator" content="openlanding.page">';
export const COPYRIGHT_LINE = "Copyright (c) 2026 Famanias";

export const MIT_PERMISSION_TEXT = `Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export const FULL_MIT_LICENSE_TEXT = `MIT License\n\n${COPYRIGHT_LINE}\n\n${MIT_PERMISSION_TEXT}\n`;

const CREDIT_COMMENT =
  "<!-- Optional attribution: MIT License does not require this credit and you may remove it, though credit is appreciated. -->";

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const TEMPLATE_TITLES = new Map<string, string>(TEMPLATES.map((t) => [t.slug, t.title]));

export interface WatermarkOptions {
  slug: string;
  title?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeBasicEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'");
}

function sanitizeCommentText(value: string): string {
  // HTML comments cannot contain `--` or `-->`.
  return value.replace(/--+/g, "\u2014").replace(/\r?\n/g, " ").trim();
}

/** Resolve the display title from TEMPLATES, falling back to `<title>` in `<head>` or the slug. */
export function resolveTemplateTitle(slug: string, html: string, titleOverride?: string): string {
  if (titleOverride?.trim()) return titleOverride.trim();
  const registered = TEMPLATE_TITLES.get(slug);
  if (registered) return registered;
  const headRange = findHeadRange(html);
  const headSlice = headRange ? html.slice(headRange.openStart, headRange.closeEnd) : html.slice(0, 65536);
  const titleMatch = headSlice.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const decoded = decodeBasicEntities(titleMatch[1]).replace(/\s+/g, " ").trim();
    if (decoded) return decoded;
  }
  return slug;
}

/** Build the MIT license HTML comment placed directly after `<!DOCTYPE html>`. */
export function buildLicenseComment(slug: string, title: string): string {
  const safeTitle = sanitizeCommentText(title);
  const url = `${SITE_URL}/templates/${slug}`;
  return [
    `<!-- ${LICENSE_MARKER}`,
    safeTitle,
    url,
    "",
    "MIT License",
    "",
    COPYRIGHT_LINE,
    "",
    MIT_PERMISSION_TEXT,
    "-->",
  ].join("\n");
}

/**
 * Build the optional visible attribution block placed right before `</body>`.
 * The template's own name stays out of the visible text (it is only in `title`) so the credit never
 * duplicates an accessible name or copy inside the template, which would break strict selectors.
 */
export function buildFooterCredit(slug: string, title: string): string {
  const url = `${SITE_URL}/templates/${slug}`;
  const safeTitle = escapeHtml(title);
  return [
    CREDIT_COMMENT,
    `<p ${CREDIT_ATTRIBUTE} style="margin:0;padding:14px 16px;text-align:center;font-family:inherit;font-size:12px;line-height:1.5;color:inherit;opacity:.7;background:transparent;width:100%;box-sizing:border-box;">Built from a <a href="${url}" title="${safeTitle} on openlanding.page" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">free landing page template</a> on <a href="${SITE_URL}/" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">openlanding.page</a>.</p>`,
  ].join("\n");
}

/** Find the end index of a start/close HTML tag starting at `start`, respecting quoted attributes. */
function findTagEnd(html: string, start: number): number {
  let quote: string | null = null;
  for (let i = start + 1; i < html.length; i++) {
    const ch = html[i];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ">") {
      return i + 1;
    }
  }
  return html.length;
}

/** Parse HTML attributes from a tag slice and return whether `attrName` is present (and optional value). */
function readAttribute(attrsSlice: string, targetName: string): { found: boolean; value: string } {
  let i = 0;
  const len = attrsSlice.length;
  const targetLower = targetName.toLowerCase();
  while (i < len) {
    while (i < len && /[\s/]/.test(attrsSlice[i])) i++;
    if (i >= len) break;
    const nameStart = i;
    while (i < len && !/[\s=/>]/.test(attrsSlice[i])) i++;
    const name = attrsSlice.slice(nameStart, i).toLowerCase();
    while (i < len && /\s/.test(attrsSlice[i])) i++;
    let value = "";
    if (i < len && attrsSlice[i] === "=") {
      i++;
      while (i < len && /\s/.test(attrsSlice[i])) i++;
      if (i < len && (attrsSlice[i] === '"' || attrsSlice[i] === "'")) {
        const q = attrsSlice[i++];
        const valStart = i;
        while (i < len && attrsSlice[i] !== q) i++;
        value = attrsSlice.slice(valStart, i);
        if (i < len) i++;
      } else {
        const valStart = i;
        while (i < len && !/[\s>]/.test(attrsSlice[i])) i++;
        value = attrsSlice.slice(valStart, i);
      }
    }
    if (name === targetLower) return { found: true, value };
  }
  return { found: false, value: "" };
}

function findRawTextClose(html: string, from: number, tagName: "script" | "style"): number {
  let idx = from;
  while (idx < html.length) {
    // Native indexOf("</") jumps across multi-megabyte embedded scripts/styles in C++.
    const found = html.indexOf("</", idx);
    if (found === -1) return html.length;
    const candidate = html.slice(found + 2, found + 2 + tagName.length).toLowerCase();
    const after = html[found + 2 + tagName.length];
    if (candidate === tagName && (after === ">" || (after !== undefined && /\s/.test(after)))) {
      return findTagEnd(html, found);
    }
    idx = found + 2;
  }
  return html.length;
}

/** Find the closing end offset for an open non-void element starting right after its start tag. */
function findMatchingElementClose(html: string, afterOpenTag: number, tagName: string): number {
  if (tagName === "script" || tagName === "style") {
    return findRawTextClose(html, afterOpenTag, tagName);
  }
  let depth = 1;
  let pos = afterOpenTag;
  while (pos < html.length) {
    const lt = html.indexOf("<", pos);
    if (lt === -1) return html.length;
    if (html.startsWith("<!--", lt)) {
      const commentEnd = html.indexOf("-->", lt + 4);
      pos = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }
    if (html[lt + 1] === "!" || html[lt + 1] === "?") {
      pos = findTagEnd(html, lt);
      continue;
    }
    if (html[lt + 1] === "/") {
      const closeMatch = html.slice(lt, lt + tagName.length + 16).match(/^<\/([a-zA-Z][a-zA-Z0-9:-]*)\s*>/);
      const tagEnd = findTagEnd(html, lt);
      if (closeMatch && closeMatch[1].toLowerCase() === tagName) {
        depth--;
        if (depth === 0) return tagEnd;
      }
      pos = tagEnd;
      continue;
    }
    const nameMatch = html.slice(lt + 1, lt + 65).match(/^([a-zA-Z][a-zA-Z0-9:-]*)(?=[\s/>])/);
    const tagEnd = findTagEnd(html, lt);
    if (!nameMatch) {
      pos = tagEnd;
      continue;
    }
    const childTag = nameMatch[1].toLowerCase();
    const attrsSlice = html.slice(lt + 1 + childTag.length, tagEnd - 1);
    const isSelfClosing = attrsSlice.trimEnd().endsWith("/") || VOID_ELEMENTS.has(childTag);
    if (!isSelfClosing && (childTag === "script" || childTag === "style")) {
      pos = findRawTextClose(html, tagEnd, childTag);
      continue;
    }
    if (!isSelfClosing && childTag === tagName) {
      depth++;
    }
    pos = tagEnd;
  }
  return html.length;
}

/**
 * Remove any HTML element carrying `data-olp-chrome` (and its full nested contents),
 * ignoring occurrences inside HTML comments, non-chrome `<script>`/`<style>` blocks, or quoted values.
 */
export function stripOlpChrome(html: string): string {
  // Fast path avoids scanning multi-megabyte standalone files when the marker is absent.
  if (!/data-olp-chrome/i.test(html)) return html;

  let out = "";
  let cursor = 0;
  let pos = 0;

  while (pos < html.length) {
    const lt = html.indexOf("<", pos);
    if (lt === -1) break;
    if (html.startsWith("<!--", lt)) {
      const commentEnd = html.indexOf("-->", lt + 4);
      pos = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }
    if (html[lt + 1] === "!" || html[lt + 1] === "?" || html[lt + 1] === "/") {
      pos = findTagEnd(html, lt);
      continue;
    }
    const nameMatch = html.slice(lt + 1, lt + 65).match(/^([a-zA-Z][a-zA-Z0-9:-]*)(?=[\s/>])/);
    const tagEnd = findTagEnd(html, lt);
    if (!nameMatch) {
      pos = tagEnd;
      continue;
    }
    const tagName = nameMatch[1].toLowerCase();
    const attrsSlice = html.slice(lt + 1 + tagName.length, tagEnd - 1);
    if (readAttribute(attrsSlice, CHROME_ATTRIBUTE).found) {
      const isSelfClosing = attrsSlice.trimEnd().endsWith("/") || VOID_ELEMENTS.has(tagName);
      const elementEnd = isSelfClosing ? tagEnd : findMatchingElementClose(html, tagEnd, tagName);
      out += html.slice(cursor, lt);
      cursor = elementEnd;
      pos = elementEnd;
      continue;
    }
    if ((tagName === "script" || tagName === "style") && !attrsSlice.trimEnd().endsWith("/")) {
      pos = findRawTextClose(html, tagEnd, tagName);
      continue;
    }
    pos = tagEnd;
  }

  if (cursor === 0) return html;
  return out + html.slice(cursor);
}

/** Locate the document `<head>...</head>` outside HTML comments and raw-text blocks. */
function findHeadRange(
  html: string,
): { openStart: number; openEnd: number; closeStart: number; closeEnd: number } | null {
  let pos = 0;
  let openStart = -1;
  let openEnd = -1;

  while (pos < html.length) {
    const lt = html.indexOf("<", pos);
    if (lt === -1) break;
    if (html.startsWith("<!--", lt)) {
      const commentEnd = html.indexOf("-->", lt + 4);
      pos = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }
    if (html[lt + 1] === "!" || html[lt + 1] === "?") {
      pos = findTagEnd(html, lt);
      continue;
    }
    if (html[lt + 1] === "/") {
      const tagEnd = findTagEnd(html, lt);
      if (openStart !== -1 && /^<\/head\s*>/i.test(html.slice(lt, tagEnd))) {
        return { openStart, openEnd, closeStart: lt, closeEnd: tagEnd };
      }
      pos = tagEnd;
      continue;
    }
    const nameMatch = html.slice(lt + 1, lt + 32).match(/^([a-zA-Z][a-zA-Z0-9:-]*)(?=[\s/>])/);
    const tagEnd = findTagEnd(html, lt);
    if (!nameMatch) {
      pos = tagEnd;
      continue;
    }
    const tagName = nameMatch[1].toLowerCase();
    if (openStart === -1 && tagName === "head") {
      openStart = lt;
      openEnd = tagEnd;
    } else if (openStart === -1 && tagName === "body") {
      return null;
    } else if (tagName === "script" || tagName === "style") {
      pos = findRawTextClose(html, tagEnd, tagName);
      continue;
    }
    pos = tagEnd;
  }
  return null;
}

/** Insert or update the MIT license header comment directly after `<!DOCTYPE html>`. */
export function upsertLicenseHeader(html: string, options: WatermarkOptions): string {
  const doctypeMatch = html.match(/^\uFEFF?\s*(<!doctype\b[^>]*>)/i);
  if (!doctypeMatch) {
    throw new Error(`Expected <!DOCTYPE html> at start of ${options.slug}`);
  }
  const title = resolveTemplateTitle(options.slug, html, options.title);
  const comment = buildLicenseComment(options.slug, title);
  const doctype = doctypeMatch[1];
  let afterDoctype = html.slice(doctypeMatch[0].length);
  const existing = afterDoctype.match(
    new RegExp(`^\\s*<!--\\s*${LICENSE_MARKER.replace(".", "\\.")}\\b[\\s\\S]*?-->\\s*`),
  );
  if (existing) {
    afterDoctype = afterDoctype.slice(existing[0].length);
  } else {
    afterDoctype = afterDoctype.replace(/^\s+/, "");
  }
  return `${doctype}\n${comment}\n${afterDoctype}`;
}

/** Ensure `<head>` contains exactly one `<meta name="generator" content="openlanding.page">`. */
export function upsertGeneratorMeta(html: string): string {
  const head = findHeadRange(html);
  if (!head) {
    throw new Error("Expected <head>...</head> in document");
  }
  const headInner = html.slice(head.openEnd, head.closeStart);
  const generatorRanges: Array<{ start: number; end: number }> = [];
  let charsetEnd = -1;
  let pos = 0;

  while (pos < headInner.length) {
    const lt = headInner.indexOf("<", pos);
    if (lt === -1) break;
    if (headInner.startsWith("<!--", lt)) {
      const commentEnd = headInner.indexOf("-->", lt + 4);
      pos = commentEnd === -1 ? headInner.length : commentEnd + 3;
      continue;
    }
    if (headInner[lt + 1] === "!" || headInner[lt + 1] === "?" || headInner[lt + 1] === "/") {
      pos = findTagEnd(headInner, lt);
      continue;
    }
    const nameMatch = headInner.slice(lt + 1, lt + 32).match(/^([a-zA-Z][a-zA-Z0-9:-]*)(?=[\s/>])/);
    const tagEnd = findTagEnd(headInner, lt);
    if (!nameMatch) {
      pos = tagEnd;
      continue;
    }
    const tagName = nameMatch[1].toLowerCase();
    if (tagName === "script" || tagName === "style") {
      pos = findRawTextClose(headInner, tagEnd, tagName);
      continue;
    }
    if (tagName === "meta") {
      const attrsSlice = headInner.slice(lt + 5, tagEnd - 1);
      const nameAttr = readAttribute(attrsSlice, "name");
      if (nameAttr.found && nameAttr.value.toLowerCase() === "generator") {
        generatorRanges.push({ start: lt, end: tagEnd });
      } else if (charsetEnd === -1 && readAttribute(attrsSlice, "charset").found) {
        charsetEnd = tagEnd;
      }
    }
    pos = tagEnd;
  }

  let updatedHeadInner: string;
  if (generatorRanges.length > 0) {
    let result = "";
    let cursor = 0;
    for (let i = 0; i < generatorRanges.length; i++) {
      const range = generatorRanges[i];
      result += headInner.slice(cursor, range.start);
      if (i === 0) {
        result += GENERATOR_META;
        cursor = range.end;
      } else {
        // Drop orphaned line break after duplicate generator tags.
        const after = headInner.slice(range.end);
        const trailingLine = after.match(/^[ \t]*\r?\n/);
        cursor = range.end + (trailingLine ? trailingLine[0].length : 0);
      }
    }
    updatedHeadInner = result + headInner.slice(cursor);
  } else if (charsetEnd !== -1) {
    updatedHeadInner = `${headInner.slice(0, charsetEnd)}\n${GENERATOR_META}${headInner.slice(charsetEnd)}`;
  } else {
    const leading = headInner.startsWith("\n") || headInner.startsWith("\r\n") ? "" : "\n";
    updatedHeadInner = `${leading}${GENERATOR_META}${headInner.startsWith("\n") || headInner.startsWith("\r\n") ? "" : "\n"}${headInner}`;
  }

  return `${html.slice(0, head.openEnd)}${updatedHeadInner}${html.slice(head.closeStart)}`;
}

/** Find the closing `</body>` tag near the end of the document. */
function findClosingBodyIndex(html: string): number {
  // Search the tail first to avoid scanning multi-megabyte embedded media payloads.
  const tailOffset = Math.max(0, html.length - 65536);
  const tailMatch = html.slice(tailOffset).match(/<\/body>\s*(?=<\/html>\s*$)/i);
  if (tailMatch && tailMatch.index !== undefined) {
    return tailOffset + tailMatch.index;
  }
  const fallback = html.match(/<\/body>(?![\s\S]*<\/body>)/i);
  if (fallback && fallback.index !== undefined) {
    return fallback.index;
  }
  return -1;
}

function isInsideRawTextOrComment(html: string, targetIndex: number): boolean {
  let pos = 0;
  while (pos < targetIndex) {
    const lt = html.indexOf("<", pos);
    if (lt === -1 || lt >= targetIndex) return false;
    if (html.startsWith("<!--", lt)) {
      const commentEnd = html.indexOf("-->", lt + 4);
      if (commentEnd === -1 || commentEnd + 3 > targetIndex) return true;
      pos = commentEnd + 3;
      continue;
    }
    const tagEnd = findTagEnd(html, lt);
    const nameMatch = html.slice(lt + 1, lt + 16).match(/^(script|style)(?=[\s/>])/i);
    if (nameMatch) {
      const tagName = nameMatch[1].toLowerCase() as "script" | "style";
      const attrsSlice = html.slice(lt + 1 + tagName.length, tagEnd - 1);
      if (!attrsSlice.trimEnd().endsWith("/")) {
        const closeEnd = findRawTextClose(html, tagEnd, tagName);
        if (targetIndex >= tagEnd && targetIndex < closeEnd) return true;
        pos = closeEnd;
        continue;
      }
    }
    pos = tagEnd;
  }
  return false;
}

/** Insert or update the optional visible footer attribution right before `</body>`. */
export function upsertFooterCredit(html: string, options: WatermarkOptions): string {
  const bodyClose = findClosingBodyIndex(html);
  if (bodyClose === -1) {
    throw new Error(`Expected </body> in ${options.slug}`);
  }
  const title = resolveTemplateTitle(options.slug, html, options.title);
  const creditBlock = buildFooterCredit(options.slug, title);

  // Check for an existing credit block outside raw-text script/style tags and comments.
  const tailStart = Math.max(0, bodyClose - 16384);
  const tail = html.slice(tailStart, bodyClose);
  const creditPattern = new RegExp(
    `(?:<!--\\s*Optional attribution:[\\s\\S]*?-->\\s*)?<p\\b[^>]*\\b${CREDIT_ATTRIBUTE}\\b[^>]*>[\\s\\S]*?<\\/p>`,
    "i",
  );
  const tailMatch = tail.match(creditPattern);
  if (tailMatch && tailMatch.index !== undefined) {
    const absStart = tailStart + tailMatch.index;
    const creditTagStart = absStart + tailMatch[0].toLowerCase().lastIndexOf("<p");
    if (!isInsideRawTextOrComment(html, creditTagStart)) {
      const absEnd = absStart + tailMatch[0].length;
      return `${html.slice(0, absStart)}${creditBlock}${html.slice(absEnd)}`;
    }
  }

  const beforeBodyClose = html.slice(0, bodyClose).replace(/[ \t]*$/, "");
  const prefixNewline = beforeBodyClose.endsWith("\n") ? "" : "\n";
  return `${beforeBodyClose}${prefixNewline}${creditBlock}\n${html.slice(bodyClose)}`;
}

/** Strip gallery chrome and apply idempotent license, generator, and attribution watermarks. */
export function watermarkHtml(html: string, options: WatermarkOptions): string {
  const stripped = stripOlpChrome(html);
  const title = resolveTemplateTitle(options.slug, stripped, options.title);
  const resolved: WatermarkOptions = { slug: options.slug, title };
  return upsertFooterCredit(upsertGeneratorMeta(upsertLicenseHeader(stripped, resolved)), resolved);
}

/** Structural parse check verifying doctype first, single head/body outside scripts, and watermark presence. */
export function validateWatermarkedDocument(html: string): {
  ok: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!/^<!doctype\s+html>/i.test(html)) {
    errors.push("Document must begin with <!DOCTYPE html>");
  }

  let headOpen = 0;
  let headClose = 0;
  let bodyOpen = 0;
  let bodyClose = 0;
  let generatorCount = 0;
  let creditCount = 0;
  let chromeCount = 0;
  let pos = 0;

  while (pos < html.length) {
    const lt = html.indexOf("<", pos);
    if (lt === -1) break;
    if (html.startsWith("<!--", lt)) {
      const commentEnd = html.indexOf("-->", lt + 4);
      pos = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }
    if (html[lt + 1] === "!" || html[lt + 1] === "?") {
      pos = findTagEnd(html, lt);
      continue;
    }
    if (html[lt + 1] === "/") {
      const tagEnd = findTagEnd(html, lt);
      const closeName = html.slice(lt + 2, tagEnd - 1).trim().toLowerCase();
      if (closeName === "head") headClose++;
      else if (closeName === "body") bodyClose++;
      pos = tagEnd;
      continue;
    }
    const nameMatch = html.slice(lt + 1, lt + 32).match(/^([a-zA-Z][a-zA-Z0-9:-]*)(?=[\s/>])/);
    const tagEnd = findTagEnd(html, lt);
    if (!nameMatch) {
      pos = tagEnd;
      continue;
    }
    const tagName = nameMatch[1].toLowerCase();
    const attrsSlice = html.slice(lt + 1 + tagName.length, tagEnd - 1);
    if (tagName === "head") headOpen++;
    else if (tagName === "body") bodyOpen++;
    else if (tagName === "meta") {
      const nameAttr = readAttribute(attrsSlice, "name");
      if (nameAttr.found && nameAttr.value.toLowerCase() === "generator") generatorCount++;
    }
    if (readAttribute(attrsSlice, CREDIT_ATTRIBUTE).found) creditCount++;
    if (readAttribute(attrsSlice, CHROME_ATTRIBUTE).found) chromeCount++;

    if ((tagName === "script" || tagName === "style") && !attrsSlice.trimEnd().endsWith("/")) {
      pos = findRawTextClose(html, tagEnd, tagName);
      continue;
    }
    pos = tagEnd;
  }

  if (headOpen !== 1 || headClose !== 1) errors.push(`Expected single <head>...</head>, got ${headOpen}/${headClose}`);
  if (bodyOpen !== 1 || bodyClose !== 1) errors.push(`Expected single <body>...</body>, got ${bodyOpen}/${bodyClose}`);
  if (generatorCount !== 1) errors.push(`Expected 1 generator meta tag, got ${generatorCount}`);
  if (creditCount !== 1) errors.push(`Expected 1 data-olp-credit element, got ${creditCount}`);
  if (chromeCount !== 0) errors.push(`Expected 0 data-olp-chrome elements, got ${chromeCount}`);
  if (!html.includes(`<!-- ${LICENSE_MARKER}`)) errors.push("Missing license header comment");

  return { ok: errors.length === 0, errors };
}
