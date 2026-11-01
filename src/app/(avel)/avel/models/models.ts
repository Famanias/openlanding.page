export const models = [
  { id: "core", name: "Avel Core", tag: "YOUR EVERYDAY THINKING PARTNER", heading: "A little more clarity, every day.", description: "A thoughtful, versatile model for writing, learning, planning, and all the questions in between.", prompt: "Help me turn my notes into a clear plan.", example: "Of course. Let’s start with the big picture, then turn each idea into a practical next step.", symbol: "✳" },
  { id: "reason", name: "Avel Reason", tag: "FOR THE BIGGER QUESTIONS", heading: "Good thinking goes deeper.", description: "Take on complex decisions and detailed research with a model made to reason through the layers.", prompt: "Compare the paths we could take.", example: "Let’s weigh the tradeoffs. Here are the strongest options, the assumptions behind each, and where to begin.", symbol: "✺" },
  { id: "spark", name: "Avel Spark", tag: "FOR MAKING THINGS HAPPEN", heading: "From first thought to first draft.", description: "A quick, creative collaborator for finding new angles, exploring ideas, and making a start.", prompt: "Give me a fresh idea for our launch.", example: "What if the launch began with a simple question? Here are three directions we can make our own.", symbol: "✦" },
] as const;
export type ModelId = (typeof models)[number]["id"];
export function getModel(id: string) { return models.find((model) => model.id === id) ?? models[0]; }
