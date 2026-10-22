type FieldLogNoteProps = {
  index: string;
  title: string;
  body: string;
  tag: string;
  active?: boolean;
};

export function FieldLogNote({ index, title, body, tag, active = false }: FieldLogNoteProps) {
  return (
    <li className="tc-reel-note" data-active={active ? "true" : "false"}>
      <span className="tc-reel-note-index">{index}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <span className="tc-reel-note-tag">{tag}</span>
    </li>
  );
}
