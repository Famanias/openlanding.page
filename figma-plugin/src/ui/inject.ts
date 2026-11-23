/**
 * Injects the serialized bridge script into an HTML string before the closing
 * </body> or </html> tag, or appends it for bare HTML fragments.
 */
export function injectBridgeScript(html: string, bridgeCode: string): string {
  const escaped = bridgeCode.replace(/<\/script/gi, "<\\/script");
  const scriptTag = `<script>${escaped}</script>`;
  const lower = html.toLowerCase();

  const bodyIndex = lower.lastIndexOf("</body>");
  if (bodyIndex !== -1) {
    return html.slice(0, bodyIndex) + scriptTag + html.slice(bodyIndex);
  }

  const htmlIndex = lower.lastIndexOf("</html>");
  if (htmlIndex !== -1) {
    return html.slice(0, htmlIndex) + scriptTag + html.slice(htmlIndex);
  }

  return html + scriptTag;
}
