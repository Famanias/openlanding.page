import type { Project } from "./model";
export function ProjectArt({ kind }: { kind: Project["art"] }) {
  return (
    <svg
      viewBox="0 0 360 220"
      fill="none"
      aria-hidden="true"
      className="fd-project-art"
    >
      <ellipse
        cx="180"
        cy="185"
        rx="95"
        ry="13"
        fill="var(--fd-ink)"
        opacity=".06"
      />
      {kind === "blocks" && (
        <g stroke="var(--fd-moss)" strokeWidth=".6">
          <path d="m91 128 69-36 69 36-69 37z" fill="var(--fd-paper)" />
          <path d="M91 128v29l69 37v-29z" fill="var(--fd-sage)" />
          <path
            d="m160 165 69-37v29l-69 37z"
            fill="var(--fd-moss)"
            opacity=".3"
          />
          <path d="m136 74 69-36 69 36-69 37z" fill="var(--fd-white)" />
          <path d="M136 74v35l69 37v-35z" fill="var(--fd-paper)" />
          <path d="m205 111 69-37v35l-69 37z" fill="var(--fd-sage)" />
          <path d="m137 49 24-13 24 13-24 13z" fill="var(--fd-white)" />
          <path d="M137 49v19l24 13V62z" fill="var(--fd-stone)" />
          <path
            d="m161 62 24-13v19l-24 13z"
            fill="var(--fd-moss)"
            opacity=".4"
          />
        </g>
      )}
      {kind === "rings" && (
        <g transform="translate(180 110) rotate(-26)">
          <ellipse
            rx="81"
            ry="71"
            stroke="var(--fd-ink)"
            strokeWidth="24"
            opacity=".13"
            transform="translate(0 10)"
          />
          <ellipse rx="81" ry="71" stroke="var(--fd-white)" strokeWidth="24" />
          <ellipse rx="37" ry="32" fill="var(--fd-blue)" />
          <rect
            x="51"
            y="-80"
            width="43"
            height="43"
            rx="9"
            fill="var(--fd-ink)"
          />
          <path
            d="m66-65 14 14m-14 0 14-14"
            stroke="var(--fd-white)"
            strokeWidth="2"
          />
        </g>
      )}
      {kind === "bars" && (
        <g>
          {[0, 1, 2, 3, 4].map((n) => (
            <g key={n} transform={`translate(${94 + n * 38} ${140 - n * 20})`}>
              <path d={`M0 0 19-10 38 0 19 10Z`} fill="var(--fd-white)" />
              <path
                d={`M0 0v${40 + n * 15}l19 10V10Z`}
                fill="var(--fd-paper)"
              />
              <path
                d={`m19 10 19-10v${40 + n * 15}l-19 10Z`}
                fill="var(--fd-peach)"
              />
            </g>
          ))}
        </g>
      )}
      {kind === "nodes" && (
        <g stroke="var(--fd-ink)" strokeWidth="2">
          <path
            d="m100 137 80-88 83 88-83 46zM180 49v134M100 137h163"
            strokeDasharray="3 5"
            opacity=".3"
          />
          {[
            [100, 137],
            [180, 49],
            [263, 137],
            [180, 183],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="27"
                fill={i === 1 ? "var(--fd-ink)" : "var(--fd-white)"}
                stroke="none"
              />
              <path
                d={`m${x - 8} ${y}h16m-8-8v16`}
                stroke={i === 1 ? "var(--fd-white)" : "var(--fd-ink)"}
              />
            </g>
          ))}
        </g>
      )}
      {kind === "target" && (
        <g transform="translate(180 113) rotate(-20)">
          <ellipse rx="90" ry="73" fill="var(--fd-white)" />
          <ellipse rx="62" ry="49" stroke="var(--fd-sage)" strokeWidth="17" />
          <ellipse rx="25" ry="20" fill="var(--fd-moss)" />
          <path
            d="M0 0 84-83m-3 21 3-21-22 5"
            stroke="var(--fd-ink)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}
      {kind === "book" && (
        <g transform="translate(80 55) rotate(-8 100 70)">
          <path
            d="M0 15Q50-10 100 15Q150-10 200 15v114q-50-25-100 0Q50 104 0 129Z"
            fill="var(--fd-white)"
          />
          <path d="M100 15v114" stroke="var(--fd-stone)" strokeWidth="3" />
          {[40, 58, 76, 94].map((n) => (
            <path
              key={n}
              d={`M20 ${n}q29-9 60 0m40 0q29-9 60 0`}
              stroke="var(--fd-ink)"
              strokeWidth="2"
              opacity=".2"
            />
          ))}
          <path d="M150 6v49l12-9 12 9V8" fill="var(--fd-peach)" />
        </g>
      )}
    </svg>
  );
}
