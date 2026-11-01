export const JOURNAL = [
  { id: "balanced", index: "01", image: "everyday-market", title: "For the everyday yes.", copy: "The flowers. The good coffee. The small things that make an ordinary day yours.", label: "A little of both", goal: 48000, alt: "A woman carrying market flowers while walking her dog" },
  { id: "steady", index: "02", image: "rainy-morning", title: "For a softer landing.", copy: "A quiet cushion for the days life does its own thing. A little breathing room goes a long way.", label: "A softer landing", goal: 24000, alt: "A man enjoying a quiet rainy morning with his cat" },
  { id: "adventure", index: "03", image: "weekend-cove", title: "For the someday soon.", copy: "Two train tickets. A room by the sea. Turn that tab you keep open into a plan.", label: "Something to look forward to", goal: 84000, alt: "A coffee table overlooking a peaceful rocky cove" },
] as const;
export const QUOTES = [
  { quote: "I stopped asking if I could afford a weekend away. I could finally see the little plan getting me there.", name: "Maya Bennett", role: "The weekend planner", plan: "adventure" },
  { quote: "Seeing a rainy day fund next to my everyday balance makes the whole month feel a little less noisy.", name: "Daniel Reed", role: "The breathing room believer", plan: "steady" },
  { quote: "The small things still get a yes. I just know where that yes fits now.", name: "June Park", role: "The everyday optimist", plan: "balanced" },
] as const;
export const QUESTIONS = [
  { question: "What is Pello?", answer: "Pello is a fictional personal finance app concept. This page lets you try a sample balance planner and explore a calmer way to organize money. It does not connect to real accounts or offer financial services." },
  { question: "Does trying the planner move real money?", answer: "No. The planner uses a sample balance of $2,400. You can try different plans and move the goal slider as much as you like. All amounts are illustrative." },
  { question: "Can I change my mind about a goal?", answer: "Of course. Choose another plan or adjust the weekend amount. The everyday allocation updates to keep the complete sample balance accounted for." },
  { question: "Is there a fee or an app to download?", answer: "This is a free interactive preview. There is no paid subscription, real app download or payment step on this concept page." },
  { question: "What happens when I leave my email?", answer: "You will see a local demonstration of a welcome confirmation. Your email is not sent to a server, added to a list or stored after leaving the page." },
] as const;
