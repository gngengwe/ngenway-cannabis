/** One node of the Exhibit 002 "signal chain": a single bar on a shared
 * percent-difference axis, showing how much concentrate users' change (from preuse to
 * short-term-postuse) differed from flower users' change at this step of the chain.
 * A row of these, sharing one axis, is what lets "the gap compresses" read at a glance --
 * a per-measure dumbbell in raw units couldn't be compared across panels this way. */

const WIDTH = 150;
const HEIGHT = 150;
const ZERO_Y = 70;
const ARM = 45; // pixels available each direction from the zero line
const AXIS_MAX = 150; // %, shared across all panels in the row

export function GapChart({
  label,
  percent,
  significant,
}: {
  label: string;
  percent: number;
  significant: boolean;
}) {
  const scale = ARM / AXIS_MAX;
  const barLen = Math.min(Math.abs(percent), AXIS_MAX) * scale;
  const positive = percent >= 0;
  const labelY = ZERO_Y + (positive ? -barLen - 10 : barLen + 20);

  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${label}: ${percent.toFixed(0)}% gap`}>
        <line x1={10} x2={WIDTH - 10} y1={ZERO_Y} y2={ZERO_Y} stroke="var(--gridline)" strokeWidth={1} />
        <g transform={`translate(${WIDTH / 2}, ${ZERO_Y})`}>
          <rect
            x={-14}
            y={positive ? -barLen : 0}
            width={28}
            height={barLen}
            rx={4}
            fill={significant ? "var(--form-concentrate)" : "var(--text-muted)"}
            opacity={significant ? 1 : 0.55}
          />
        </g>
        <text x={WIDTH / 2} y={labelY} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text-primary)">
          {percent > 0 ? "+" : ""}
          {percent.toFixed(0)}%
        </text>
      </svg>
      <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.3 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 10.5, color: significant ? "var(--form-concentrate)" : "var(--text-muted)" }}>
        {significant ? "form effect significant" : "not significant"}
      </p>
    </div>
  );
}
