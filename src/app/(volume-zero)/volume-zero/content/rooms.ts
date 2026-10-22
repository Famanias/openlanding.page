export type Room = {
  code: string;
  name: string;
  city: string;
  seats: number;
  decaySeconds: number;
  discipline: string;
  summary: string;
  coordinates: string;
};

export const ROOMS: Room[] = [
  {
    code: "VZ-01",
    name: "The Listening Room",
    city: "Rotterdam · NL",
    seats: 18,
    decaySeconds: 0.48,
    discipline: "Private listening",
    summary: "A close field with no dead corners: the listener sits inside the first reflection.",
    coordinates: "51.9244° N / 4.4777° E",
  },
  {
    code: "VZ-04",
    name: "The Recital Room",
    city: "Oslo · NO",
    seats: 31,
    decaySeconds: 0.82,
    discipline: "Chamber music",
    summary: "Oak slats spread the upper field while a vellum ceiling keeps the room intimate.",
    coordinates: "59.9139° N / 10.7522° E",
  },
  {
    code: "VZ-07",
    name: "The Archive Hall",
    city: "Kyoto · JP",
    seats: 74,
    decaySeconds: 1.24,
    discipline: "Sound archive",
    summary: "A long, quiet volume that lets a single voice stay legible across 24 metres.",
    coordinates: "35.0116° N / 135.7681° E",
  },
];
