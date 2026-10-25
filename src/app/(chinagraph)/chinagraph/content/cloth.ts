export type Cloth = { id: string; image: string; name: string; origin: string; year: string; metres: number; alt: string };

/** Every metre is deadstock: mill ends, surplus and seconds that would otherwise be burnt. */
export const CLOTH: Cloth[] = [
  { id: "melton", image: "cloth-01", name: "Melton", origin: "Huddersfield", year: "1968", metres: 420, alt: "Macro of dense navy melton wool fibres under raking flash" },
  { id: "wax", image: "cloth-02", name: "Waxed cotton", origin: "Dundee", year: "1994", metres: 260, alt: "Macro of black waxed cotton with cracked wax highlights" },
  { id: "flannel", image: "cloth-03", name: "Flannel", origin: "Biella", year: "2011", metres: 300, alt: "Macro of charcoal flannel weave, soft brushed surface" },
  { id: "gabardine", image: "cloth-04", name: "Gabardine", origin: "Lancashire", year: "1979", metres: 160, alt: "Macro of rain-grey gabardine twill lines at a diagonal" },
];

export const STOCKISTS = [
  { city: "London", shop: "Chinagraph Studio, Hackney Wick", note: "By appointment, Thu–Sat" },
  { city: "Antwerp", shop: "Pastiche", note: "Kloosterstraat" },
  { city: "Copenhagen", shop: "Nørd Room", note: "Vesterbro" },
  { city: "Tokyo", shop: "Kōsha", note: "Daikanyama" },
];
