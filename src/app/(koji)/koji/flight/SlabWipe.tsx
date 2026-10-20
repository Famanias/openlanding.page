/**
 * A flat concrete panel that sweeps across the flight in 450 ms, covering a cut between two dives whose
 * connector clip couldn't be made seamless. Re-keyed by the parent to replay.
 */
export function SlabWipe({ playKey }: { playKey: number }) {
  if (!playKey) return null;
  return <div key={playKey} className="kj-slabwipe" aria-hidden="true" />;
}
