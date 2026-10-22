const overrides: Record<string, string> = {
  stage: "presentationStage",
};

export const styles: Record<string, string> = new Proxy(overrides, {
  get(target, prop: string | symbol) {
    if (typeof prop !== "string") return "";
    return target[prop] ?? prop;
  },
});

export default styles;
