import type { CSSProperties } from "react";

/**
 * A heading split into word masks for the rise-in. Rendered on the server, so the words are
 * there before any script and read as one heading to assistive tech.
 */
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="nm-w" style={{ "--i": from + i } as CSSProperties}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
