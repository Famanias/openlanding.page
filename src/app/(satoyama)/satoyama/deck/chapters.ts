export const CHAPTERS = [
  { id: "welcome", label: "Welcome", japanese: "はじまり", title: "A little closer to nature.\nA little closer to yourself.", note: "An illustrated journey into rural Japan" },
  { id: "the-landscape", label: "The landscape", japanese: "里山の風景", title: "Between the mountains,\na world of its own.", note: "Mountains, rice fields, and the places in between" },
  { id: "a-slower-rhythm", label: "A slower rhythm", japanese: "日々の暮らし", title: "Here, the little things\nfill the whole day.", note: "A day shaped by sunlight, shared meals, and small rituals" },
  { id: "little-adventures", label: "Little adventures", japanese: "小さな冒険", title: "Leave room for\na little wandering.", note: "Ordinary moments. Rather extraordinary memories." },
  { id: "the-seasons", label: "The seasons", japanese: "めぐる季節", title: "The same little village.\nFour different worlds.", note: "A life that changes with the turning of the seasons" },
  { id: "until-next-time", label: "Until next time", japanese: "また、いつか", title: "Take a little of\nthe quiet with you.", note: "Some places stay with you, long after you leave." },
] as const;

export const ACTIVITIES = [
  { id: "fields", japanese: "田んぼの時間", title: "Into the rice fields", description: "Follow the narrow paths between paddies. Watch the water catch the sky, and let the afternoon take its time.", tag: "OUT IN THE OPEN", scene: "fields" },
  { id: "tea", japanese: "お茶のひととき", title: "A cup, and a pause", description: "Sit by the open window with a warm cup of tea. In the distance, a breeze moves through the bamboo.", tag: "A SMALL DAILY RITUAL", scene: "tea" },
  { id: "cycle", japanese: "自転車で、どこまでも", title: "Take the scenic way", description: "Pedal past wooden houses and kitchen gardens. Turn down the lane you almost missed. There is no hurry to arrive.", tag: "FOLLOW YOUR CURIOSITY", scene: "cycle" },
  { id: "garden", japanese: "畑から食卓へ", title: "From garden to table", description: "Pick what is ready, wash it in cool water, and make something simple. The best ingredient is the season.", tag: "GROWN CLOSE TO HOME", scene: "garden" },
  { id: "river", japanese: "川辺の午後", title: "An afternoon by the river", description: "Find a smooth stone and a shady spot beside the stream. Stay for the sound of water making its own way home.", tag: "NOWHERE ELSE TO BE", scene: "river" },
] as const;

export const SEASONS = [
  { name: "Spring", japanese: "春", line: "New beginnings, on every branch.", description: "Blossoms soften the lanes. Seedlings find their place in the paddies, and the village begins again." },
  { name: "Summer", japanese: "夏", line: "Long days, and the song of cicadas.", description: "Rice grows green, rivers run cool, and open windows let the warm evening wander through the house." },
  { name: "Autumn", japanese: "秋", line: "A golden field. A grateful table.", description: "The harvest brings busy hands and shared meals. Mountain paths turn copper, one leaf at a time." },
  { name: "Winter", japanese: "冬", line: "The quiet has a season, too.", description: "Bare branches trace the sky. Tea steams by the window, and the hills rest beneath a pale winter light." },
] as const;
