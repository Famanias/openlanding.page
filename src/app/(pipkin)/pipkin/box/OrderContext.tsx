"use client";
import { createContext, useContext, useMemo, useReducer, useState, type Dispatch, type ReactNode } from "react";
import { boxReducer, initialBox, jarCount, type BoxAction, type BoxState } from "./logic";

type OrderValue = {
  box: BoxState;
  count: number;
  dispatch: Dispatch<BoxAction>;
  /** how many orders this visitor placed in this session; drives the ticket number */
  placed: number;
  placeOrder: () => void;
};

const OrderContext = createContext<OrderValue | null>(null);

/** Holds the box so the shelf, the header counter and the box builder all see the same jars. */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [box, dispatch] = useReducer(boxReducer, initialBox);
  const [placed, setPlaced] = useState(0);
  const value = useMemo<OrderValue>(
    () => ({ box, count: jarCount(box.jars), dispatch, placed, placeOrder: () => setPlaced((n) => n + 1) }),
    [box, placed],
  );
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
