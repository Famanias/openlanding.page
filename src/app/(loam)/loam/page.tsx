import { StaticFallbackPage } from "./components/StaticFallbackPage";
import { LoamApp } from "./experience/LoamApp";

export default function LoamPage() {
  return (
    <>
      <div id="loam-specimen-root">
        <StaticFallbackPage />
      </div>
      <LoamApp />
    </>
  );
}
