import type { UiToPluginMessage } from "../shared/types";

figma.showUI(__html__, { width: 420, height: 560 });

figma.ui.onmessage = (raw: unknown) => {
  const msg = raw as UiToPluginMessage;
  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
