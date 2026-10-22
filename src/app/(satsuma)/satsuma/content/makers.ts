import type { SceneId } from "./reels";

export type Maker = {
  id: string;
  name: string;
  craft: string;
  city: string;
  scene: SceneId;
  /** Per reel, in dollars. */
  rate: number;
  turnaroundDays: number;
  reelsShipped: number;
  rating: number;
  line: string;
};

export const MAKERS: readonly Maker[] = [
  { id: "imani", name: "Imani Okafor", craft: "Sneakers & streetwear", city: "Lagos", scene: "sneaker", rate: 90, turnaroundDays: 3, reelsShipped: 412, rating: 4.9, line: "Hard light, fast cuts, a heel you can hear." },
  { id: "tove", name: "Tove Lindqvist", craft: "Skincare & serums", city: "Malmö", scene: "skincare", rate: 85, turnaroundDays: 4, reelsShipped: 288, rating: 4.9, line: "Glass, water and one slow macro drop." },
  { id: "mateo", name: "Mateo Ruiz", craft: "Coffee & cafés", city: "Valencia", scene: "latte-pour", rate: 70, turnaroundDays: 3, reelsShipped: 536, rating: 4.8, line: "Steam, pour, swirl: three seconds that sell a menu." },
  { id: "hana", name: "Hana Sato", craft: "Ceramics & pottery", city: "Kyoto", scene: "pottery", rate: 75, turnaroundDays: 5, reelsShipped: 197, rating: 5.0, line: "The wheel does the talking. She just frames it." },
  { id: "priya", name: "Priya Nair", craft: "Florals & plant shops", city: "Pune", scene: "bouquet", rate: 65, turnaroundDays: 3, reelsShipped: 341, rating: 4.8, line: "Wrapped by hand, filmed in window light." },
  { id: "jonas", name: "Jonas Weber", craft: "Audio gear", city: "Leipzig", scene: "headphones", rate: 95, turnaroundDays: 4, reelsShipped: 254, rating: 4.9, line: "Product films that actually sound like something." },
];

export function makerById(id: string): Maker | undefined {
  return MAKERS.find((m) => m.id === id);
}
