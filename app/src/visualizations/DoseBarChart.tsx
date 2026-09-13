import { useMemo, useState } from "react";
import { linearScale } from "../lib/scale";
import type { DoseBarValue, DoseCondition } from "../lib/types";
import { doseColor } from "../components/DoseLegend";

const WIDTH = 320;
const HEIGHT = 220;
const MARGIN = { top: 20, right: 12, bottom: 28, left: 40 };

const CONDITION_TO_KEY: Record<string, DoseCondition> = {
  "0 puffs": "0_puffs",
  "2 puffs": "2_puffs",
  "4 puffs": "4_puffs",
  "6 puffs": "6_puffs",
};

export function DoseBarChart({
  title,
  unit,
  values,
  axisRange,
  selectedDose,
  timeResolutionNote,
}: {
  title: string;
  unit: string;
  values: DoseBarValue[];
  axisRange?: [number, number];
  selectedDose: DoseCondition;
  timeResolutionNote?: string;
}) {
  const [showTable, setShowTable] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const plotW = WIDTH - MARGIN.left - MARGIN.right;
  const plotH = HEIGHT - MARGIN.top - MARGIN.bottom;

  const domain = useMemo<[number, number]>(() => {
    if (axisRange) return axisRange;
    const max = Math.max(...values.map((v) => v.mean_est + v.sem_est));
    return [0, Math.ceil(max * 1.15)];
  }, [axisRange, values]);

  const y = useMemo(() => linearScale(domain, [plotH, 0]), [domain, plotH]);
  const barW = plotW / values.length;

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
      {timeResolutionNote && (
        <p style={{ margin: "0 0 6px", fontSize: 11.5, color: "var(--text-muted)", fontStyle: "italic" }}>
          {timeResolutionNote}
        </p>
      )}

      {showTable ? (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>
                Dose
              </th>
              <th style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>
                Mean ({unit})
              </th>
              <th style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>
                SEM
              </th>
              <th style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>
                vs 0 puffs
              </th>
            </tr>
          </thead>
          <tbody>
            {values.map((v) => (
              <tr key={v.condition}>
                <td style={{ padding: "4px 6px" }}>{v.condition}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{v.mean_est}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{v.sem_est}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{v.significance_marker ?? "ns"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${title} by dose`}>
          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            {[domain[0], (domain[0] + domain[1]) / 2, domain[1]].map((t) => (
              <g key={t}>
                <line x1={0} x2={plotW} y1={y(t)} y2={y(t)} stroke="var(--gridline)" strokeWidth={1} />
                <text x={-6} y={y(t)} dy={4} textAnchor="end" fontSize={10} fill="var(--text-muted)">
                  {Math.round(t * 100) / 100}
                </text>
              </g>
            ))}
            <line x1={0} x2={plotW} y1={plotH} y2={plotH} stroke="var(--baseline)" strokeWidth={1} />

            {values.map((v, i) => {
              const key = CONDITION_TO_KEY[v.condition] ?? "0_puffs";
              const isFocused = key === selectedDose;
              const cx = i * barW + barW / 2;
              const barPixelW = Math.min(24, barW * 0.5);
              const top = y(v.mean_est);
              const base = plotH;
              const errTop = y(v.mean_est + v.sem_est);
              const errBottom = y(v.mean_est - v.sem_est);
              const isHovered = hovered === v.condition;

              return (
                <g
                  key={v.condition}
                  opacity={isFocused ? 1 : 0.4}
                  onPointerEnter={() => setHovered(v.condition)}
                  onPointerLeave={() => setHovered(null)}
                  style={{ cursor: "default" }}
                >
                  <rect
                    x={cx - barPixelW / 2}
                    y={top}
                    width={barPixelW}
                    height={Math.max(0, base - top)}
                    rx={4}
                    fill={doseColor(key)}
                  />
                  <line x1={cx} x2={cx} y1={errTop} y2={errBottom} stroke="var(--text-secondary)" strokeWidth={1.5} />
                  <line x1={cx - 4} x2={cx + 4} y1={errTop} y2={errTop} stroke="var(--text-secondary)" strokeWidth={1.5} />
                  <line
                    x1={cx - 4}
                    x2={cx + 4}
                    y1={errBottom}
                    y2={errBottom}
                    stroke="var(--text-secondary)"
                    strokeWidth={1.5}
                  />
                  {v.significance_marker && (
                    <text x={cx} y={errTop - 6} textAnchor="middle" fontSize={11} fill="var(--text-secondary)">
                      {v.significance_marker}
                    </text>
                  )}
                  <text x={cx} y={plotH + 16} textAnchor="middle" fontSize={10.5} fill="var(--text-muted)">
                    {v.condition.replace(" puffs", "")}
                  </text>
                  {isHovered && (
                    <text x={cx} y={top - 6} textAnchor="middle" fontSize={11} fill="var(--text-primary)">
                      {v.mean_est} ± {v.sem_est}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
}
