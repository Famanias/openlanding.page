export type ProduceCategory = 'all' | 'vegetables' | 'fruit' | 'pantry';

export type ProduceId =
  | 'tomato'
  | 'carrot'
  | 'lemon'
  | 'kale'
  | 'pepper'
  | 'eggplant'
  | 'apple'
  | 'bread';

export interface MesaMarketAssets {
  tomato: string;
  carrot: string;
  lemon: string;
  kale: string;
  pepper: string;
  eggplant: string;
  apple: string;
  bread: string;
  kitchenEditorial: string;
  growerPortrait: string;
  marketTable: string;
  paperTexture: string;
}

export const MESA_MARKET_ASSETS: MesaMarketAssets = {
  tomato: '/templates/mesamarket/01-produce-tomato-alpha.webp',
  carrot: '/templates/mesamarket/02-carrot-alpha.webp',
  lemon: '/templates/mesamarket/03-lemon-alpha.webp',
  kale: '/templates/mesamarket/04-kale-alpha.webp',
  pepper: '/templates/mesamarket/05-pepper-alpha.webp',
  eggplant: '/templates/mesamarket/06-eggplant-alpha.webp',
  apple: '/templates/mesamarket/07-apple-alpha.webp',
  bread: '/templates/mesamarket/08-bread-alpha.webp',
  kitchenEditorial: '/templates/mesamarket/09-kitchen-editorial.webp',
  growerPortrait: '/templates/mesamarket/10-grower-portrait.webp',
  marketTable: '/templates/mesamarket/11-market-table.webp',
  paperTexture: '/templates/mesamarket/12-printed-paper-texture.webp',
};

export interface ProduceProduct {
  id: ProduceId;
  name: string;
  category: Exclude<ProduceCategory, 'all'>;
  unit: string;
  samplePrice: number; // in USD, strictly illustrative
  originDescriptor: string;
  seasonalNote: string;
  maxQty: number;
  image: string;
  heroSlot: string;
}

export const PRODUCE_CATALOG: ProduceProduct[] = [
  {
    id: 'tomato',
    name: 'Early Girl Vine Tomatoes',
    category: 'vegetables',
    unit: '1 lb cluster',
    samplePrice: 5.5,
    originDescriptor: 'Dry-farmed · Capay Valley, CA (Sample)',
    seasonalNote: 'Picked sun-warm with concentrated sweet acidity.',
    maxQty: 8,
    image: MESA_MARKET_ASSETS.tomato,
    heroSlot: 'top-left',
  },
  {
    id: 'carrot',
    name: 'Nantes Bunched Carrots',
    category: 'vegetables',
    unit: '1 bunch with tops',
    samplePrice: 4.25,
    originDescriptor: 'Sandy loam · Salinas Bench (Sample)',
    seasonalNote: 'Crisp snap with feathery greens for herb salsa.',
    maxQty: 8,
    image: MESA_MARKET_ASSETS.carrot,
    heroSlot: 'top-center',
  },
  {
    id: 'lemon',
    name: 'Meyer Orchard Lemons',
    category: 'fruit',
    unit: 'Bag of 4',
    samplePrice: 4.75,
    originDescriptor: 'Hillside groves · Ojai Valley (Sample)',
    seasonalNote: 'Thin fragrant rind with floral mandarin notes.',
    maxQty: 8,
    image: MESA_MARKET_ASSETS.lemon,
    heroSlot: 'top-right',
  },
  {
    id: 'kale',
    name: 'Lacinato Cavolo Nero',
    category: 'vegetables',
    unit: 'Large field bunch',
    samplePrice: 3.75,
    originDescriptor: 'Coastal fog belt · Pescadero (Sample)',
    seasonalNote: 'Deep blue-green leaves sweetened by cool nights.',
    maxQty: 8,
    image: MESA_MARKET_ASSETS.kale,
    heroSlot: 'mid-left',
  },
  {
    id: 'pepper',
    name: 'Sweet Jimmy Nardello Peppers',
    category: 'vegetables',
    unit: '1/2 lb basket',
    samplePrice: 5.0,
    originDescriptor: 'Sunlit rows · Brentwood (Sample)',
    seasonalNote: 'Thin-skinned frying peppers that blister in minutes.',
    maxQty: 8,
    image: MESA_MARKET_ASSETS.pepper,
    heroSlot: 'mid-right',
  },
  {
    id: 'eggplant',
    name: 'Rosa Bianca Eggplant',
    category: 'vegetables',
    unit: 'Single globe (~1.2 lb)',
    samplePrice: 5.25,
    originDescriptor: 'Heirloom plot · Sonoma Creek (Sample)',
    seasonalNote: 'Creamy lavender flesh with zero bitterness when roasted.',
    maxQty: 6,
    image: MESA_MARKET_ASSETS.eggplant,
    heroSlot: 'bottom-left',
  },
  {
    id: 'apple',
    name: 'Pink Pearl & Gravenstein Apples',
    category: 'fruit',
    unit: '2 lb tote',
    samplePrice: 6.5,
    originDescriptor: 'Dry-farmed · Sebastopol Ridge (Sample)',
    seasonalNote: 'Tart rose-fleshed crunch ideal for galettes or slicing raw.',
    maxQty: 8,
    image: MESA_MARKET_ASSETS.apple,
    heroSlot: 'bottom-center',
  },
  {
    id: 'bread',
    name: 'Country Red Fife Sourdough',
    category: 'pantry',
    unit: '850g hearth boule',
    samplePrice: 8.5,
    originDescriptor: 'Stone-milled · Mesa Bakehouse (Sample)',
    seasonalNote: 'Naturally leavened 28 hours with blistered crust.',
    maxQty: 4,
    image: MESA_MARKET_ASSETS.bread,
    heroSlot: 'bottom-right',
  },
];

export interface MealKitPreset {
  id: string;
  name: string;
  tag: string;
  prepTime: string;
  description: string;
  items: { productId: ProduceId; qty: number }[];
}

export const MEAL_KIT_PRESETS: MealKitPreset[] = [
  {
    id: 'sheet-pan-ratatouille',
    name: 'Charred Late-Summer Ratatouille & Boule',
    tag: 'RECIPE CARD 01 · 35 MIN',
    prepTime: '35 min · Serves 4',
    description:
      'Roast Rosa Bianca eggplant, sweet Nardello peppers, and Early Girl tomatoes in olive oil, finished with Meyer lemon zest and torn Red Fife sourdough.',
    items: [
      { productId: 'eggplant', qty: 1 },
      { productId: 'tomato', qty: 1 },
      { productId: 'pepper', qty: 1 },
      { productId: 'lemon', qty: 1 },
      { productId: 'bread', qty: 1 },
    ],
  },
  {
    id: 'harvest-slaw-toast',
    name: 'Cavolo Nero, Crisp Apple & Carrot Ribbons',
    tag: 'RECIPE CARD 02 · 20 MIN',
    prepTime: '20 min · Serves 3–4',
    description:
      'Massage Lacinato kale with Meyer lemon juice, shaved Nantes carrots, and tart Sebastopol apples alongside warm toasted hearth bread.',
    items: [
      { productId: 'kale', qty: 1 },
      { productId: 'carrot', qty: 1 },
      { productId: 'apple', qty: 1 },
      { productId: 'lemon', qty: 1 },
      { productId: 'bread', qty: 1 },
    ],
  },
  {
    id: 'weekend-farm-table',
    name: 'Full Mesa Weekend Crate (All 8 Harvest Items)',
    tag: 'RECIPE CARD 03 · FULL TABLE',
    prepTime: '3–4 Meals · Complete Box',
    description:
      'One of every seasonal harvest item on the stall—vegetables, orchard fruit, and fresh-baked sourdough boule in a single crate.',
    items: PRODUCE_CATALOG.map((p) => ({ productId: p.id, qty: 1 })),
  },
];

export type BasketQuantities = Partial<Record<ProduceId, number>>;

export interface BasketState {
  quantities: BasketQuantities;
  lastAnnouncement: string;
}

export type BasketAction =
  | { type: 'ADD'; productId: ProduceId }
  | { type: 'DECREMENT'; productId: ProduceId }
  | { type: 'REMOVE'; productId: ProduceId }
  | { type: 'CLEAR' }
  | { type: 'ADD_KIT'; kitId: string };

export const INITIAL_BASKET_STATE: BasketState = {
  quantities: {
    tomato: 1,
    bread: 1,
  },
  lastAnnouncement: 'Sample basket initialized with 2 seasonal items.',
};

export function basketReducer(state: BasketState, action: BasketAction): BasketState {
  switch (action.type) {
    case 'ADD': {
      const product = PRODUCE_CATALOG.find((p) => p.id === action.productId);
      if (!product) return state;
      const current = state.quantities[action.productId] || 0;
      if (current >= product.maxQty) {
        return {
          ...state,
          lastAnnouncement: `Maximum sample limit (${product.maxQty}) reached for ${product.name}.`,
        };
      }
      const nextQty = current + 1;
      return {
        quantities: { ...state.quantities, [action.productId]: nextQty },
        lastAnnouncement: `Added ${product.name} to basket (qty ${nextQty}).`,
      };
    }
    case 'DECREMENT': {
      const product = PRODUCE_CATALOG.find((p) => p.id === action.productId);
      const current = state.quantities[action.productId] || 0;
      if (current <= 0) return state;
      const nextQuantities = { ...state.quantities };
      if (current === 1) {
        delete nextQuantities[action.productId];
        return {
          quantities: nextQuantities,
          lastAnnouncement: `Removed ${product?.name || action.productId} from basket.`,
        };
      }
      nextQuantities[action.productId] = current - 1;
      return {
        quantities: nextQuantities,
        lastAnnouncement: `Decreased ${product?.name || action.productId} quantity to ${current - 1}.`,
      };
    }
    case 'REMOVE': {
      const product = PRODUCE_CATALOG.find((p) => p.id === action.productId);
      const nextQuantities = { ...state.quantities };
      delete nextQuantities[action.productId];
      return {
        quantities: nextQuantities,
        lastAnnouncement: `Removed ${product?.name || action.productId} from sample basket.`,
      };
    }
    case 'CLEAR': {
      return {
        quantities: {},
        lastAnnouncement: 'Cleared all items from sample produce basket.',
      };
    }
    case 'ADD_KIT': {
      const kit = MEAL_KIT_PRESETS.find((k) => k.id === action.kitId);
      if (!kit) return state;
      const nextQuantities = { ...state.quantities };
      const addedNames: string[] = [];
      for (const entry of kit.items) {
        const prod = PRODUCE_CATALOG.find((p) => p.id === entry.productId);
        if (!prod) continue;
        const current = nextQuantities[entry.productId] || 0;
        const updated = Math.min(prod.maxQty, current + entry.qty);
        nextQuantities[entry.productId] = updated;
        addedNames.push(prod.name);
      }
      return {
        quantities: nextQuantities,
        lastAnnouncement: `Added ${kit.name} ingredients (${addedNames.join(', ')}) to basket.`,
      };
    }
    default:
      return state;
  }
}

export interface BasketLineItem {
  product: ProduceProduct;
  qty: number;
  lineSubtotal: number;
}

export function calculateBasketTotals(quantities: BasketQuantities): {
  lines: BasketLineItem[];
  totalCount: number;
  sampleSubtotal: number;
} {
  const lines: BasketLineItem[] = [];
  let totalCount = 0;
  let sampleSubtotal = 0;

  for (const product of PRODUCE_CATALOG) {
    const qty = quantities[product.id] || 0;
    if (qty > 0) {
      const lineSubtotal = Number((qty * product.samplePrice).toFixed(2));
      lines.push({ product, qty, lineSubtotal });
      totalCount += qty;
      sampleSubtotal = Number((sampleSubtotal + lineSubtotal).toFixed(2));
    }
  }

  return {
    lines,
    totalCount,
    sampleSubtotal,
  };
}
