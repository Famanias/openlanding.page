import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "../lib/seo";
import { SITE_NAME } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: free landing page templates`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    // Mirrors --color-paper / --color-accent in src/app/(index)/tokens.css.
    background_color: "#101211",
    theme_color: "#101211",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
