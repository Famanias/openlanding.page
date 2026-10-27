import { notFound } from "next/navigation";
import { MorrowExperience } from "./MorrowExperience";

export default function MorrowPage() {
  notFound();
  return <MorrowExperience />;
}