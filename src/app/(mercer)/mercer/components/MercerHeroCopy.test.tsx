import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MercerHeroCopy from "./MercerHeroCopy";

describe("Mercer hero copy", () => {
  it("renders one three-line headline, the supplied description and both actions", () => {
    const html = renderToStaticMarkup(<MercerHeroCopy />);
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const text of ["I BUILD", "WHAT YOU", "IMAGINE.", "EXPLORE PROJECTS", "ABOUT ME", "code becomes creativity"]) expect(html).toContain(text);
    expect(html.match(/<button/g)).toHaveLength(2);
    expect(html).toContain('class="jm-headline-accent"');
  });
});
