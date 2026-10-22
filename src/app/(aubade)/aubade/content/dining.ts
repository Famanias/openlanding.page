export type Course = { time: string; title: string; dish: string; where: string };

export const MENU: Course[] = [
  { time: "19:40", title: "First seating", dish: "Gougères warm from the oven, a glass of Crémant de Bourgogne", where: "Leaving the Paris suburbs" },
  { time: "20:30", title: "The main", dish: "Œuf en meurette, then Charolais beef with pommes Anna", where: "Through the vineyards of the Côte" },
  { time: "21:15", title: "Second seating", dish: "The same menu for later diners, and Comté aged for 24 months", where: "After Dijon" },
  { time: "22:40", title: "The bar", dish: "Vin jaune from the Jura. The kitchen closes at Vallorbe; the bar doesn't", where: "Climbing to the border" },
  { time: "07:10", title: "Coffee", dish: "Brought to your door with the morning timetable", where: "Past Verona" },
  { time: "08:30", title: "Breakfast", dish: "Cornetti, blood-orange juice, eggs as you like them", where: "Leaving Padova" },
];

export const DINING_STATS = [
  { value: 2, suffix: "", label: "seatings each night" },
  { value: 38, suffix: "", label: "covers, one per cabin" },
  { value: 24, suffix: " mo", label: "the Comté's age" },
] as const;
