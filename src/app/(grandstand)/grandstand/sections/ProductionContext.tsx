"use client";
import { createContext, useContext, useState } from "react";

const ProductionContext = createContext<{ active: number; setActive: (index: number) => void }>({ active: 0, setActive: () => {} });
export const productionNames = ["The Last Light", "A Room of Echoes", "After the Rain"] as const;
export function ProductionProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return <ProductionContext.Provider value={{ active, setActive }}>{children}</ProductionContext.Provider>;
}
export function useProduction() { return useContext(ProductionContext); }
