import { StaticFallbackPage } from "./components/StaticFallbackPage";
import { Experience } from "./components/Experience";

export default function PerigeePage() {
  return (
    <>
      <div id="perigee-fallback-root">
        <StaticFallbackPage />
      </div>
      <Experience />
    </>
  );
}
