export type Finish = "graphite" | "tangerine" | "cream";
export type Tire = "city" | "gravel";
export type Accessory = "rack" | "basket" | "lights";

export interface BuildSelection {
  finish: Finish;
  tire: Tire;
  accessories: Record<Accessory, boolean>;
}

export type BuildAction =
  | { type: "finish"; finish: Finish }
  | { type: "tire"; tire: Tire }
  | { type: "accessory"; accessory: Accessory; checked: boolean }
  | { type: "reset" };

export const INITIAL_BUILD: BuildSelection = {
  finish: "graphite",
  tire: "city",
  accessories: { rack: false, basket: false, lights: false },
};

const ACCESSORIES: Accessory[] = ["rack", "basket", "lights"];

export function buildReducer(state: BuildSelection, action: BuildAction): BuildSelection {
  switch (action.type) {
    case "finish":
      return { ...state, finish: action.finish };
    case "tire":
      return { ...state, tire: action.tire };
    case "accessory":
      return {
        ...state,
        accessories: { ...state.accessories, [action.accessory]: action.checked },
      };
    case "reset":
      return { ...INITIAL_BUILD, accessories: { ...INITIAL_BUILD.accessories } };
  }
}

export function buildSummary(build: BuildSelection): string {
  const finish = `${build.finish[0].toUpperCase()}${build.finish.slice(1)}`;
  const selected = ACCESSORIES.filter((accessory) => build.accessories[accessory]);
  const accessories = selected.length > 0
    ? `Accessories: ${selected.join(", ")}.`
    : "No accessories selected.";
  return `${finish} finish, ${build.tire} tires. ${accessories}`;
}
