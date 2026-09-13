import { useMemo, useState } from "react";
import { linearScale } from "../lib/scale";
import type { BiomarkerCorrelation } from "../lib/types";

const WIDTH = 620;
const ROW_H = 34;
const MARGIN = { top: 10, right: 20, bottom: 30, left: 190 };
const X_DOMAIN: [number, number] = [-0.6, 0.6];

/** The on-chart row label is shortened to what fits (route/combination detail moves to
 * the axis subtitle and the full text stays in the table view) -- the alternative was
 * clipping the SVG text off the left edge of the viewBox, which is worse than trimming. */
function shortLabel(biomarker: string): string {
  return biomarker.split(" (")[0];
}

/** Meta-analytic correlations are conventionally shown as a forest / point-range plot --
 * one row per biomarker, a dot at R, a horizontal whisker for the 95% CI, significance
 * distinguished by fill (not by re-using another exhibit's subject-matter colors). */
export function ForestPlot({
  title,
  values,
  caveat,
}: {
  title: string;
  values: BiomarkerCorrelation[];
  caveat?: string;
}) {
  const [showTable, setShowTable] = useState(false);
  const plotW = WIDTH - MARGIN.left - MARGIN.right;
  const height = values.length * ROW_H + MARGIN.top + MARGIN.bottom;

  const x = useMemo(() => linearScale(X_DOMAIN, [0, plotW]), [plotW]);

  const bands = [
    { limit: 0.2, opacity: 0.05 },
    { limit: 0.4, opacity: 0.09 },
    { limit: 0.6, opacity: 0.13 },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "var(--text-secondary)" }}>{title}</h4>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 11.5, cursor: "pointer", textDecoration: "underline" }}
        >
          {showTable ? "show chart" : "show as table"}
        </button>
      </div>
      {caveat && <p style={{ margin: "0 0 8px", fontSize: 11.5, color: "var(--text-muted)", fontStyle: "italic" }}>{caveat}</p>}

      {showTable ? (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>Biomarker</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>R</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "4px 6px" }}>95% CI</th>
            </tr>
          </thead>
          <tbody>
            {values.map((v) => (
              <tr key={v.biomarker}>
                <td style={{ padding: "4px 6px" }}>{v.biomarker}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>{v.R.toFixed(2)}</td>
                <td style={{ padding: "4px 6px", textAlign: "right" }}>
                  [{v.ci95[0].toFixed(2)}, {v.ci95[1].toFixed(2)}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <svg viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label={`${title}: correlation forest plot`}>
          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            {bands.map(({ limit, opacity }) => {
              const prevLimit = limit === 0.2 ? 0 : limit - 0.2;
              return (
                <g key={limit}>
                  <rect x={x(prevLimit)} y={0} width={x(limit) - x(prevLimit)} height={values.length * ROW_H} fill="var(--finding-significant)" opacity={opacity} />
                  <rect x={x(-limit)} y={0} width={x(-prevLimit) - x(-limit)} height={values.length * ROW_H} fill="var(--finding-significant)" opacity={opacity} />
                </g>
              );
            })}

            <line x1={x(0)} x2={x(0)} y1={0} y2={values.length * ROW_H} stroke="var(--baseline)" strokeWidth={1} />

            {values.map((v, i) => {
              const cy = i * ROW_H + ROW_H / 2;
              const color = v.significant === false ? "var(--finding-not-significant)" : "var(--finding-significant)";
              return (
                <g key={v.biomarker}>
                  <text x={-10} y={cy} dy={4} textAnchor="end" fontSize={11.5} fill="var(--text-secondary)">
                    {shortLabel(v.biomarker)}
                  </text>
                  <line x1={x(v.ci95[0])} x2={x(v.ci95[1])} y1={cy} y2={cy} stroke={color} strokeWidth={2} />
                  <line x1={x(v.ci95[0])} x2={x(v.ci95[0])} y1={cy - 4} y2={cy + 4} stroke={color} strokeWidth={2} />
                  <line x1={x(v.ci95[1])} x2={x(v.ci95[1])} y1={cy - 4} y2={cy + 4} stroke={color} strokeWidth={2} />
                  <circle cx={x(v.R)} cy={cy} r={5} fill={color} stroke="var(--surface-1)" strokeWidth={1.5} />
                  <text x={x(v.R)} y={cy - 10} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="var(--text-primary)">
                    {v.R.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((t) => (
              <text key={t} x={x(t)} y={values.length * ROW_H + 16} textAnchor="middle" fontSize={10} fill="var(--text-muted)">
                {t}
              </text>
            ))}
            <text x={plotW / 2} y={values.length * ROW_H + 28} textAnchor="middle" fontSize={10.5} fill="var(--text-muted)">
              correlation R (biomarker vs. impairment)
            </text>
          </g>
        </svg>
      )}
    </div>
  );
}
