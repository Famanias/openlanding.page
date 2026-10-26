/**
 * The hero's shared state between the scroll director (which writes the cleave) and the glass
 * engine (which reads it every frame). A plain object, so scrolling never touches React state.
 */
export const heroBus = {
  /** 0 = the slab is whole, 1 = every shard has flown */
  cleave: 0,
  /** set by the running engine: call after changing the cleave so a sleeping loop renders it */
  wake: null as null | (() => void),
};
