export function Airflow({ moment }: { moment: number }) {
  const paths = [
    "M12 141 C94 141 100 82 182 82 S272 136 357 136 S447 72 528 72",
    "M12 152 C88 152 102 48 183 48 S277 160 360 160 S448 44 528 44",
    "M12 125 C100 125 105 102 185 102 S271 119 357 119 S447 100 528 100",
  ];
  return <svg className="ar-airflow" viewBox="0 0 540 220" fill="none" aria-hidden="true">
    <path d="M20 166H520M20 56H520M20 111H520" stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 8" />
    <path d="M95 180V40M190 180V40M285 180V40M380 180V40M475 180V40" stroke="currentColor" strokeOpacity=".1" />
    <path d={paths[moment]} stroke="currentColor" strokeOpacity=".16" strokeWidth="32" strokeLinecap="round" />
    <path key={moment} className="ar-airflow__trace" d={paths[moment]} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="760" />
    <circle cx="184" cy={moment === 0 ? 82 : moment === 1 ? 48 : 102} r="5" fill="currentColor" />
    <circle cx="357" cy={moment === 0 ? 136 : moment === 1 ? 160 : 119} r="5" fill="currentColor" />
  </svg>;
}
