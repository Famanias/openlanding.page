const artwork = {
  1: {
    key: "waypoint-01-hero-dashboard",
    alt: "Supplied Waypoint dashboard concept with a front-facing pipeline, tasks, and activity panel.",
  },
  2: {
    key: "waypoint-02-pipeline-board",
    alt: "Supplied Waypoint pipeline board concept with saved, applied, screening, interview, and offer columns.",
  },
  3: {
    key: "waypoint-03-candidate-profile",
    alt: "Supplied Waypoint profile concept with contextual notes, a checklist, and a stage tracker.",
  },
  4: {
    key: "waypoint-04-outreach-workspace",
    alt: "Supplied Waypoint outreach workspace concept showing a message draft and follow-up panels.",
  },
  5: {
    key: "waypoint-05-insights-dashboard",
    alt: "Supplied Waypoint insights concept with charts and illustrative hiring metrics.",
  },
  6: {
    key: "waypoint-06-ui-fragments",
    alt: "Supplied Waypoint interface fragments on their original opaque sand and topographic background.",
  },
  7: {
    key: "waypoint-07-mobile-screens",
    alt: "Supplied Waypoint mobile screen concepts presented as four flat interface panels.",
  },
  8: {
    key: "waypoint-08-topographic-background",
    alt: "Supplied Waypoint sand-colored topographic artwork.",
  },
  9: {
    key: "waypoint-09-feature-collage",
    alt: "Supplied Waypoint feature collage combining profile, pipeline, tasks, and activity concepts.",
  },
  10: {
    key: "waypoint-10-journal-workspace",
    alt: "Supplied Waypoint journal workspace concept with a central writing area and saved observations.",
  },
} as const;

export type ArtworkId = keyof typeof artwork;

export function SuppliedArtwork({
  id,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 800px",
  className = "",
}: {
  id: ArtworkId;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const image = artwork[id];
  const base = `/templates/waypoint/${image.key}`;
  return (
    // These are optimized copies of the supplied ZIP artwork; the images are never reconstructed or relabeled.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`wyp-supplied-artwork ${className}`}
      src={`${base}-1600.webp`}
      srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
      sizes={sizes}
      width={2752}
      height={1536}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      data-supplied-artwork={id}
    />
  );
}
