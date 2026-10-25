export type Look = {
  n: number;
  frame: number;
  image: string;
  detail: string;
  name: string;
  cloth: string;
  origin: string;
  price: number;
  note: string;
  detailAlt: string;
};

/** The six selects, each a look. `image` is the roll frame, `detail` a close crop shot separately. */
export const LOOKS: Look[] = [
  { n: 1, frame: 2, image: "roll-02", detail: "detail-01", name: "Box Coat", cloth: "Navy melton, 680 g", origin: "Huddersfield mill end, 1968", price: 640, note: "Dropped shoulder, no lining, one button you'll never use.", detailAlt: "Close crop of navy melton lapel and a single horn button under flash" },
  { n: 2, frame: 4, image: "roll-04", detail: "detail-02", name: "Work Jacket", cloth: "Black waxed cotton", origin: "Dundee surplus, 1990s", price: 420, note: "Cropped at the hip, four pockets, rewaxed by hand.", detailAlt: "Close crop of black waxed cotton creasing at a chest pocket, flash catching the wax" },
  { n: 3, frame: 5, image: "roll-05", detail: "detail-03", name: "Pleat Trouser", cloth: "Charcoal flannel", origin: "Biella offcuts", price: 290, note: "Two deep pleats, a wide leg and a hem that breaks once.", detailAlt: "Close crop of charcoal flannel pleats in motion, wet tarmac below" },
  { n: 4, frame: 7, image: "roll-07", detail: "detail-04", name: "Rollneck", cloth: "Bone boiled wool", origin: "Scottish yarn ends", price: 260, note: "Boiled until it barely moves. Wears like a jacket.", detailAlt: "Close crop of bone boiled-wool rollneck texture against corrugated metal" },
  { n: 5, frame: 10, image: "roll-10", detail: "detail-05", name: "DB Suit", cloth: "Rain-grey gabardine", origin: "Lancashire deadstock", price: 980, note: "Six-on-two, soft shoulder, trousers cut to sit on the shoe.", detailAlt: "Close crop of double-breasted gabardine buttons and a peak lapel" },
  { n: 6, frame: 12, image: "roll-12", detail: "detail-06", name: "Car Coat", cloth: "Oxblood leather offcuts", origin: "Northampton tannery seconds", price: 1120, note: "Pieced from offcuts, so no two have the same seams.", detailAlt: "Close crop of oxblood leather panels meeting at a seam, hard flash" },
];
