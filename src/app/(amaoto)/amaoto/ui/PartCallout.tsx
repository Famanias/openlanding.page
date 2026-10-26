import { PARTS } from "../data/parts";
export function PartCallout({ selected, onSelect }: { selected?: string; onSelect: (id: string) => void }) {
  return <div className="am-parts" aria-label="Wagasa parts">{PARTS.map((part) => <button key={part.id} className={selected === part.id ? "is-active" : ""} onClick={() => onSelect(part.id)}><span>{part.name}</span><i>{selected === part.id ? part.description : "View detail"}</i></button>)}</div>;
}
