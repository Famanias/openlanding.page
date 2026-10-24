export function SplitText({ lines }: { lines: string[] }) {
  return <>{lines.map((line, i) => <span className="kz-line-mask" key={line}><span style={{ animationDelay: `${250 + i * 100}ms` }}>{line}</span></span>)}</>;
}
