import { useMemo, useState } from "react";
import { linearScale } from "../lib/scale";
import { DOSE_CONDITIONS, DOSE_LABELS, TIME_POINTS, type DoseCondition, type VasSeriesPoint } from "../lib/types";
import { doseColor } from "../components/DoseLegend";

const WIDTH = 560;
const HEIGHT = 300;
const MARGIN = { top: 16, right: 16, bottom: 32, left: 36 };
const Y_TICKS = [0, 15, 30, 45, 60, 75];

function nearestTime(minutes: number): number {
  return TIME_POINTS.reduce((closest, t) =>
    Math.abs(t - minutes) < Math.abs(closest - minutes) ? t : closest,
  );
}

export function TimeCourseChart({
  title,
  unit,
  series,
  selectedDose,
  selectedTime,
  onSelectTime,
  tableCaption,
}: {
  title: string;
  unit: string;
  series: Record<DoseCondition, VasSeriesPoint[]>;
  selectedDose: DoseCondition;
  selectedTime: number;
  onSelectTime: (t: number) => void;
  tableCaption: string;
}) {
  const [showTable, setShowTable] = useState(false);
  const plotW = WIDTH - MARGIN.left - MARGIN.right;
  const plotH = HEIGHT - MARGIN.top - MARGIN.bottom;

  const x = useMemo(() => linearScale([0, 210], [0, plotW]), [plotW]);
  const y = useMemo(() => linearScale([0, 75], [plotH, 0]), [plotH]);

  const handlePointerMove: React.PointerEventHandler<SVGRectElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const minutes = ((px / rect.width) * 210) as number;
    onSelectTime(nearestTime(Math.max(0, Math.min(210, minutes))));
  };

  const valuesAtSelectedTime = DOSE_CONDITIONS.map((c) => {
    const point = series[c].find((p) => p.t === selectedTime);
    return { condition: c, value: point?.v ?? null };
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "var(--text-secondary)" }}>{title}</h4>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: 11.5,
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {showTable ? "show chart" : "show as table"}
        </button>
      </div>

      {showTable ? (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <caption style={{ textAlign: "left", color: "var(--text-muted)", marginBottom: 4 }}>
            {tableCaption}
          </caption>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>
                Time (min)
              </th>
              {DOSE_CONDITIONS.map((c) => (
                <th
                  key={c}
                  style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}
                >
                  {DOSE_LABELS[c]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_POINTS.map((t) => (
              <tr key={t}>
                <td style={{ padding: "4px 6px", color: "var(--text-secondary)" }}>{t}</td>
                {DOSE_CONDITIONS.map((c) => (
                  <td key={c} style={{ padding: "4px 6px", textAlign: "right" }}>
                    {series[c].find((p) => p.t === t)?.v ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${title} over time by dose`}>
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
              {Y_TICKS.map((t) => (
                <g key={t}>
                  <line
                    x1={0}
                    x2={plotW}
                    y1={y(t)}
                    y2={y(t)}
                    stroke="var(--gridline)"
                    strokeWidth={1}
                  />
                  <text x={-8} y={y(t)} dy={4} textAnchor="end" fontSize={10.5} fill="var(--text-muted)">
                    {t}
                  </text>
                </g>
              ))}
              <line x1={0} x2={plotW} y1={plotH} y2={plotH} stroke="var(--baseline)" strokeWidth={1} />
              {[0, 60, 120, 180].map((t) => (
                <text key={t} x={x(t)} y={plotH + 18} textAnchor="middle" fontSize={10.5} fill="var(--text-muted)">
                  {t}
                </text>
              ))}

              {DOSE_CONDITIONS.map((c) => {
                const isFocused = c === selectedDose;
                const d = series[c]
                  .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.t)} ${y(p.v)}`)
                  .join(" ");
                return (
                  <g key={c} opacity={isFocused ? 1 : 0.35}>
                    <path d={d} fill="none" stroke={doseColor(c)} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    {series[c].map((p) => (
                      <circle
                        key={p.t}
                        cx={x(p.t)}
                        cy={y(p.v)}
                        r={4}
                        fill={doseColor(c)}
                        stroke="var(--surface-1)"
                        strokeWidth={2}
                      />
                    ))}
                  </g>
                );
              })}

              {/* crosshair */}
              <line
                x1={x(selectedTime)}
                x2={x(selectedTime)}
                y1={0}
                y2={plotH}
                stroke="var(--text-muted)"
                strokeWidth={1}
                strokeDasharray="3,3"
              />

              {/* hit area for hover/scrub */}
              <rect
                x={0}
                y={0}
                width={plotW}
                height={plotH}
                fill="transparent"
                onPointerMove={handlePointerMove}
                style={{ cursor: "crosshair" }}
              />
            </g>
          </svg>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              fontSize: 12.5,
              marginTop: 2,
              color: "var(--text-secondary)",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>at {selectedTime} min:</span>
            {valuesAtSelectedTime.map(({ condition, value }) => (
              <span
                key={condition}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontWeight: condition === selectedDose ? 700 : 400,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: doseColor(condition),
                    display: "inline-block",
                  }}
                />
                {value ?? "—"} {unit}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
