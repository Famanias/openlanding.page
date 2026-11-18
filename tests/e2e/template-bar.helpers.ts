/** Tag the static route.ts templates add to their live response (docs/seo.md, "Live template info bar"). */
export const TEMPLATE_BAR_TAG = '<script src="/olp-template-bar.js" defer data-olp-chrome></script>';

/** Expected live HTML of a static template: its download file plus the bar tag before the last </body>. */
export function withTemplateBar(html: string): string {
  const end = html.lastIndexOf("</body>");
  return end < 0 ? html + TEMPLATE_BAR_TAG : html.slice(0, end) + TEMPLATE_BAR_TAG + html.slice(end);
}
