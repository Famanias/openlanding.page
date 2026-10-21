import { PrismDissection } from "../spatial/PrismDissection";

export function DissectionSection() {
  return (
    <section
      id="dissection"
      className="py-24 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1520px] mx-auto space-y-8 relative"
      aria-label="Optical Dissection"
    >
      <PrismDissection />
    </section>
  );
}
