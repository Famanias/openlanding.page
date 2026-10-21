/**
 * Two screens, one DOM. At or above this size the pages are a two-page spread you turn by hand;
 * below it they are single pages in a normal vertical scroll. wowflutter.css uses the same numbers
 * in its @media rule, so the markup never changes between the two.
 */
export const BOOK_QUERY = "(min-width: 1000px) and (min-height: 640px) and (scripting: enabled)";
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
