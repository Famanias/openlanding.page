type Switchable = { setOn(on: boolean): void; dispose(): void };

/**
 * The Sound toggle's state machine. One creation at a time however fast the button is pressed;
 * the latest press wins once the soundscape exists; a soundscape that arrives after dispose is disposed.
 */
export function createSoundSwitch<T extends Switchable>(create: () => Promise<T>, onChange?: (on: boolean) => void) {
  let want = false;
  let scape: T | null = null;
  let pending: Promise<void> | null = null;
  let disposed = false;

  const apply = () => scape?.setOn(want);
  const set = (on: boolean) => {
    want = on;
    onChange?.(on);
  };

  function ensure() {
    if (scape || pending) return;
    pending = create()
      .then((s) => {
        if (disposed) {
          s.dispose();
          return;
        }
        scape = s;
        apply();
      })
      .catch(() => set(false))
      .finally(() => {
        pending = null;
      });
  }

  return {
    toggle() {
      if (disposed) return;
      set(!want);
      if (want) ensure();
      apply();
    },
    isOn: () => want,
    get: () => scape,
    /** Resolves once any creation in flight has finished (for tests and teardown). */
    settled: () => pending ?? Promise.resolve(),
    dispose() {
      disposed = true;
      scape?.dispose();
      scape = null;
    },
  };
}
