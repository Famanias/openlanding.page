import { Hanko } from "./Hanko";
export function Logo() {
  return (
    <a className="am-logo" href="#top" aria-label="AMAOTO home">
      <Hanko />
      <span className="am-logo__wordmark">AMAOTO</span>
    </a>
  );
}
