/** Three stacked stones: the KEYTU mark. Uses currentColor so it works white-on-navy or black-on-white. */
export function KeytuMark({ size = 28, title }: { size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <ellipse cx="16" cy="7.5" rx="5" ry="3.4" />
      <ellipse cx="16" cy="15.5" rx="8.5" ry="4" />
      <ellipse cx="16" cy="24.8" rx="12.5" ry="4.6" />
    </svg>
  );
}

export const CairnMark = KeytuMark;

export function Logo() {
  return (
    <a href="#top" className="crn-logo" aria-label="KEYTU, back to top">
      <KeytuMark size={26} />
      <span>KEYTU</span>
    </a>
  );
}
