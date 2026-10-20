export function ChapterRail({
  chapters,
  active,
  onSelect,
}: {
  chapters: string[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="orr-rail" aria-label="Chapters">
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
