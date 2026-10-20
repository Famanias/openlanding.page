export function ChapterRail({
  chapters,
  active,
  tone,
  onSelect,
}: {
  chapters: string[];
  active: number;
  tone: "bone" | "ink";
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="orr-rail" data-tone={tone} aria-label="Chapters">
      <ol>
        {chapters.map((chapter, i) => (
          <li key={chapter}>
            <button type="button" aria-current={i === active ? "step" : undefined} onClick={() => onSelect(i)}>
              <span>{chapter}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
