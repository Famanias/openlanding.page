export const assets = {
  poseA: "/assets/kinfield/01-movement-triptych-a.webp",
  poseB: "/assets/kinfield/02-triptych-b.webp",
  poseC: "/assets/kinfield/03-triptych-c.webp",
  instructorA: "/assets/kinfield/04-instructor-a.webp",
  instructorB: "/assets/kinfield/04-instructor-b.webp",
  studio: "/assets/kinfield/06-studio-room.webp",
  motion: "/assets/kinfield/07-movement-loop.mp4",
} as const;

export function responsivePhoto(src: string): string {
  const variant = (width: number) => src.replace(/\.webp$/, "-" + width + ".webp");
  return variant(480) + " 480w, " + variant(896) + " 896w" + (src === assets.studio ? ", " + src + " 1376w" : "");
}
