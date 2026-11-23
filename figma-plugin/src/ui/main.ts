import { DEFAULT_VIEWPORT_WIDTH } from "../shared/types";

declare const __BRIDGE_SCRIPT__: string;

export function getBridgeBootstrap(): { defaultWidth: number; scriptLength: number } {
  return {
    defaultWidth: DEFAULT_VIEWPORT_WIDTH,
    scriptLength: __BRIDGE_SCRIPT__.length,
  };
}
