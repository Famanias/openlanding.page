export type FlavorTag = "fruity" | "floral" | "tangy";
export type FlavorTone = "bubblegum" | "butter" | "mint" | "sky" | "lilac" | "blush";

export type Flavor = {
  id: string;
  name: string;
  line: string;
  tags: FlavorTag[];
  tone: FlavorTone;
  price: number;
  /** The one-line note the cook pencils on the lid. */
  lid: string;
};

export const FLAVORS: Flavor[] = [
  { id: "strawberry-basil", name: "Strawberry & Basil", line: "Tuesday's strawberries and a fistful of basil from the windowsill.", tags: ["fruity"], tone: "bubblegum", price: 9, lid: "No. 01" },
  { id: "meyer-lemon", name: "Meyer Lemon Marmalade", line: "Thin-cut peel, slow-cooked until it glows. Bright, a little bossy.", tags: ["tangy"], tone: "butter", price: 9, lid: "No. 02" },
  { id: "pear-vanilla", name: "Pear & Vanilla Bean", line: "Soft pears, real vanilla seeds, a whisper of lemon. Toast's best friend.", tags: ["fruity"], tone: "mint", price: 9, lid: "No. 03" },
  { id: "blueberry-thyme", name: "Blueberry & Thyme", line: "Wild blueberries with a thyme sprig. Tangy, deep, very good on yoghurt.", tags: ["fruity", "tangy"], tone: "sky", price: 9, lid: "No. 04" },
  { id: "plum-lavender", name: "Plum & Lavender", line: "Dark plums, culinary lavender, a pinch of sea salt. Our most-written-about jar.", tags: ["floral"], tone: "lilac", price: 9, lid: "No. 05" },
  { id: "peach-chamomile", name: "Peach & Chamomile", line: "Ripe peaches steeped with chamomile flowers. Tastes like a nap in a hammock.", tags: ["floral", "fruity"], tone: "blush", price: 9, lid: "No. 06" },
];

export const FILTERS: { id: "all" | FlavorTag; label: string }[] = [
  { id: "all", label: "All six" },
  { id: "fruity", label: "Fruity" },
  { id: "floral", label: "Floral" },
  { id: "tangy", label: "Tangy" },
];

export function filterFlavors(filter: "all" | FlavorTag): Flavor[] {
  return filter === "all" ? FLAVORS : FLAVORS.filter((f) => f.tags.includes(filter));
}

export type Stop = { id: string; label: string; title: string; when: string; body: string };

export const STOPS: Stop[] = [
  { id: "ordered", label: "Order placed", title: "Ding. Your order is on the kitchen phone.", when: "Mon 9:41", body: "Orders close Monday at 6. Yours is the 412th this season, and it gets a ticket with your name spelled right." },
  { id: "cooked", label: "Cooking", title: "Tuesday, the big pot goes on.", when: "Tue 7:30", body: "Thirty-six jars per batch, one slow stir, no pectin shortcuts. Your jar is filled while it is still too hot to touch." },
  { id: "packed", label: "Packed", title: "Lidded, labelled, tucked in tissue.", when: "Wed 2:10", body: "Every lid is pencilled by hand. Jars ride in a recycled-paper box with room to wiggle and a note from whoever packed it." },
  { id: "road", label: "Out for delivery", title: "The courier picks up at four.", when: "Thu 4:00", body: "One pickup a week keeps the kitchen calm and the shipping honest. You get a tracking link the minute the van doors close." },
  { id: "door", label: "Delivered", title: "Knock, knock. Lid off.", when: "Fri 11:20", body: "Your box lands on the doorstep, the lid lifts and the first spoonful is yours. Seventy-two hours, stove to door." },
];

export const STATS = [
  { value: 36, suffix: "", label: "jars in every batch" },
  { value: 2, suffix: "", label: "cooks, one kitchen" },
  { value: 72, suffix: " h", label: "from stove to doorstep" },
  { value: 1208, suffix: "", label: "doorstep notes so far" },
];

export const WEEK = [
  { day: "Mon", job: "Orders close at 6", tone: "sky" },
  { day: "Tue", job: "Cook day", tone: "bubblegum" },
  { day: "Wed", job: "Label and pack", tone: "butter" },
  { day: "Thu", job: "Courier pickup", tone: "lilac" },
  { day: "Fri", job: "On your doorstep", tone: "mint" },
] as const;

export type Note = { id: string; who: string; where: string; text: string; tone: FlavorTone };

export const NOTES: Note[] = [
  { id: "n1", who: "Ines R.", where: "Lisbon, PT", text: "Opened the box and the whole hallway smelled like July. The plum jar was gone by Sunday.", tone: "lilac" },
  { id: "n2", who: "Dev P.", where: "Leeds, UK", text: "The little pencilled lid note made me tear up a bit. Ordering a six-box for my mum.", tone: "blush" },
  { id: "n3", who: "Maya O.", where: "Austin, TX", text: "Tracking said Friday, doorstep said 11:20. Not a minute off. Strawberry basil on eggs is unreal.", tone: "bubblegum" },
  { id: "n4", who: "Tomás A.", where: "Valencia, ES", text: "My kid asked who Pipkin was and I said two people with a very big pot.", tone: "butter" },
  { id: "n5", who: "Hana K.", where: "Osaka, JP", text: "Travelled in perfect shape. The tissue paper is now a gift bag decoration.", tone: "mint" },
  { id: "n6", who: "Grace L.", where: "Toronto, CA", text: "Blueberry thyme on a cheese board. People asked for the recipe. I sent them your link.", tone: "sky" },
  { id: "n7", who: "Omar S.", where: "Berlin, DE", text: "Subscribed for the Friday list just to see which flavour is next. Never miss it now.", tone: "lilac" },
  { id: "n8", who: "Priya N.", where: "Melbourne, AU", text: "Peach chamomile is my new personality. Thank you for the extra spoon sticker.", tone: "blush" },
];

export const FAQS = [
  { q: "When does my order actually ship?", a: "Orders close Monday at 6 pm. We cook Tuesday, pack Wednesday and the courier collects on Thursday afternoon. Most boxes arrive Friday; far-away ones, Monday." },
  { q: "How long does a jar keep?", a: "Unopened, a year in a cool cupboard. Once opened, three weeks in the fridge, which has never once been a challenge." },
  { q: "Do you ship outside the country?", a: "We ship to 31 countries. The checkout shows your doorstep date before you pay, so there are no surprises." },
  { q: "What if a jar arrives broken?", a: "Send us a photo and we remake and ship it at no cost on the next Thursday. We have packed 4,300 jars and lost nine." },
  { q: "Is there anything in it besides fruit and sugar?", a: "Fruit, cane sugar, lemon juice and the herbs on the label. No pectin, no preservatives and no mystery syrup." },
];

export const SHIPPING_FLAT = 6;
export const FREE_SHIPPING_AT = 6;
