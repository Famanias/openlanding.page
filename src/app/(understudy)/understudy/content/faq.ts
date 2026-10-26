/** Ask Understudy: the FAQ is a question you type. Each answer lists the words that call it. */
export type Faq = { id: string; question: string; answer: string; keywords: string[] };

export const FAQ: Faq[] = [
  { id: "price", question: "How much does it cost?", keywords: ["cost", "price", "pay", "money", "fee", "expensive", "month", "free", "89"],
    answer: "Opening night is free: your first part's first week costs nothing. After that it's $89 a month, and you can stop between runs." },
  { id: "experience", question: "Do I need any experience?", keywords: ["experience", "beginner", "degree", "background", "junior", "start", "new", "zero"],
    answer: "No. Every part starts at the first table read. Your director pitches the brief at your level and raises it as you go." },
  { id: "time", question: "How many hours a week?", keywords: ["hours", "time", "week", "weekly", "schedule", "evenings", "part-time", "long"],
    answer: "About 10 hours a week. Call times are set with your cast, and most runs fit around a day job." },
  { id: "real", question: "Are the companies real?", keywords: ["real", "fake", "simulated", "companies", "company", "studio", "pretend"],
    answer: "The companies inside the studio are simulated, but the work is real: real data, real briefs, a real reel at the end. The 3,400 companies casting from it are hiring for real." },
  { id: "hired", question: "Will I actually get hired?", keywords: ["hired", "job", "jobs", "guarantee", "offer", "cast", "casting", "interview", "recruiter"],
    answer: "We can't promise an offer, but your reel goes to the companies casting for your part. Last season, 62% of finished reels got a callback within six weeks." },
  { id: "team", question: "Who is in my cast?", keywords: ["team", "cast", "people", "group", "alone", "peers", "others"],
    answer: "A cast is four to six people rehearsing the same company, each in a different part, so you work the way a real team does." },
  { id: "director", question: "What does a director do?", keywords: ["director", "coach", "mentor", "manager", "notes", "feedback", "review"],
    answer: "Your director has done the job for years. They set the brief, give notes on every draft and sign off your reel." },
  { id: "reel", question: "What is a reel?", keywords: ["reel", "portfolio", "proof", "resume", "cv", "show", "work"],
    answer: "Your reel is a page of the work you shipped, with your director's notes and the numbers you moved. Recruiters can open every project." },
];

export const SUGGESTED = ["price", "experience", "hired", "time"] as const;

export const FALLBACK =
  "I don't have that one yet. Try asking about price, hours, your cast, your director or your reel, or write to hello@understudy.example.";
