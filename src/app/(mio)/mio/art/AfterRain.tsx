export function AfterRain({ prefix }: { prefix: string }) {
  return <svg viewBox="0 0 800 600" fill="none" aria-hidden="true">
    <defs><linearGradient id={`${prefix}-sky`} x2="0" y2="1"><stop stopColor="var(--mh-hydrangea)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient><linearGradient id={`${prefix}-sea`} x2="0" y2="1"><stop stopColor="var(--mh-cloud)"/><stop offset="1" stopColor="var(--mh-sea)"/></linearGradient></defs>
    <path fill={`url(#${prefix}-sky)`} d="M0 0h800v600H0z"/>
    <path d="M-60 113c46-40 70-12 99-20C26 60 62 36 96 53c10-50 76-52 100-10 31-13 68 5 68 28 51-7 70 25 78 40-99 20-228 25-402 2Zm460 97c38-27 61-12 78-23-8-19 10-38 31-34 30-38 66-27 77 3 34-18 65-3 62 20 24-5 45 5 54 21-89 18-203 23-302 13Z" fill="var(--mh-paper)" opacity=".7"/>
    <circle cx="627" cy="140" r="32" fill="var(--mh-paper)" opacity=".7"/>
    <path d="m0 342 98-65 82 24 131-93 122 74 84-37 112 78 101-31 70 40v162H0Z" fill="var(--mh-hydrangea)"/>
    <path d="m0 358 130-38 71 17 70-38 90 41 161-43 100 51 178-29v161H0Z" fill="var(--mh-sea)" opacity=".5"/>
    <path d="M0 368q192 1 360-9t440 9v232H0Z" fill={`url(#${prefix}-sea)`}/>
    <path d="m0 388 126 2m20 26 147 2m-91 38 121 1m40-73 190 2m-88 42 228 3M39 509l264 5m125-30 184 2m-111 41 239 3" stroke="var(--mh-paper)" opacity=".5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M800 324c-82-20-128 8-176 55-41 40-84 52-138 75-69 31-119 75-155 146h469Z" fill="var(--mh-plum)"/>
    <path d="M800 313c-82-20-140 10-189 61-40 41-79 55-135 82l-3 19c108-10 142-59 228-63 27-1 61 18 99 17Z" fill="var(--mh-sea)"/>
    <path d="M699 406c-71 49-60 81-127 109-68 28-66 54-88 85h49c-4-38 23-49 58-59 85-24 53-67 131-110Z" fill="var(--mh-apricot)"/>
    <g transform="translate(574 199)" stroke="var(--mh-ink)" strokeWidth="2" strokeLinejoin="round"><path d="M-3 98 68 23l100 23 30 61-30 12-97-65-58 62Z" fill="var(--mh-plum)"/><path d="m69 31-58 70h118l38-55 26 52 8 17-43 4-87-65-58 62-16-18Z" fill="var(--mh-coral)"/><path d="M15 105h115v99H15Z" fill="var(--mh-paper)"/><path d="m130 105 53 10v89h-53Z" fill="var(--mh-cloud)"/><path d="M30 126h35v42H30Zm55-2h30v43H85Z" fill="var(--mh-apricot)"/><path d="M48 127v40m-18-20h35m35-23v43M43 183h29v21H43"/><path d="M144 140h25v35h-25Z" fill="var(--mh-apricot)"/><path d="m15 177 115-3 55 11-9 8-46-10-115 2Z" fill="var(--mh-plum)"/><path d="M9 205h179M25 209h70"/><path d="M129 0h18v45h-18Z" fill="var(--mh-plum)"/><path d="m25 83 92-4M35 70l89-4M45 57l88-4M54 45l65 1" opacity=".4"/></g>
    <g transform="translate(569 465)" stroke="var(--mh-ink)" strokeWidth="2"><circle cy="-19" r="6" fill="var(--mh-plum)"/><path d="m-6-11-5 25h22L6-11Z" fill="var(--mh-coral)"/><path d="m-4 14-2 14m10-14 3 14m-14-36-7 17m23-18 8 15"/></g>
    <g stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round"><path d="M0 498q41 24 70 102m-51-99 17 99m-4-45 41-27m-3 72q-1-51 30-77m-8 77q15-47 51-58m-16 58q26-24 67-17"/><path d="M0 544q38 8 57 56h159l-69-23-53-13-33-24-33 8Z" fill="var(--mh-ink)"/><path d="M741 600q-2-99 39-152m-23 93 40-26m-45 85q-29-83-17-117"/></g>
    <g fill="var(--mh-apricot)"><circle cx="736" cy="481" r="5"/><circle cx="780" cy="448" r="4"/><circle cx="108" cy="529" r="4"/></g>
    <path d="m364 182 6-8 7 6m-45 18 7-6 6 7" stroke="var(--mh-plum)" strokeWidth="2"/>
  </svg>;
}
