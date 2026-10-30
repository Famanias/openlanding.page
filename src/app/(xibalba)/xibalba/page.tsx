import { StaticFallbackPage } from "./components/StaticFallbackPage";
import { XibalbaExperience } from "./components/XibalbaExperience";

export default function XibalbaPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#040A0E] text-[#EEFAF6]">
      <StaticFallbackPage />
      <XibalbaExperience />
    </main>
  );
}
