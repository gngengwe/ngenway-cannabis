import { useMemo, useState } from "react";
import { linearScale } from "../lib/scale";
import {
  BIDWELL_TIMEPOINTS,
  BIDWELL_TIMEPOINT_LABELS,
  CANNABIS_FORMS,
  FORM_LABELS,
  type BidwellMeasure,
  type CannabisForm,
} from "../lib/types";

const WIDTH = 340;
const HEIGHT = 220;
const MARGIN = { top: 14, right: 14, bottom: 30, left: 42 };

const FORM_COLOR: Record<CannabisForm, string> = {
  flower: "var(--form-flower)",
  concentrate: "var(--form-concentrate)",
};

const X_POS: Record<string, number> = { preuse: 0, short_term_postuse: 1, "1h_postuse": 2 };

export function GroupTimeCourseChart({ measure }: { measure: BidwellMeasure }) {
  const [showTable, setShowTable] = useState(false);
  const plotW = WIDTH - MARGIN.left - MARGIN.right;
  const plotH = HEIGHT - MARGIN.top - MARGIN.bottom;

  const allValues = CANNABIS_FORMS.flatMap((f) =>
    BIDWELL_TIMEPOINTS.flatMap((t) => {
      const [mean, se] = measure.means_se[f][t];
      return [mean - se, mean + se];
    }),
  );
  const yMin = Math.min(0, Math.floor(Math.min(...allValues) * 10) / 10);
  const yMax = Math.ceil(Math.max(...allValues) * 10) / 10;

  const x = useMemo(() => linearScale([0, 2], [0, plotW]), [plotW]);
  const y = useMemo(() => linearScale([yMin, yMax], [plotH, 0]), [yMin, yMax, plotH]);

  const yTicks = [yMin, (yMin + yMax) / 2, yMax];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h4 style={{ margin: "0 0 2px", fontSize: 13.5, color: "var(--text-secondary)" }}>{measure.measure}</h4>
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}
        >
          {showTable ? "show chart" : "show as table"}
        </button>
      </div>
      <p style={{ margin: "0 0 6px", fontSize: 11, color: "var(--text-muted)" }}>{measure.unit}</p>

      {showTable ? (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid var(--gridline)", padding: "3px 5px" }}>Timepoint</th>
              {CANNABIS_FORMS.map((f) => (
                <th key={f} style={{ textAlign: "right", borderBottom: "1px solid var(--gridline)", padding: "3px 5px" }}>
                  {FORM_LABELS[f]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BIDWELL_TIMEPOINTS.map((t) => (
              <tr key={t}>
                <td style={{ padding: "3px 5px", color: "var(--text-secondary)" }}>{BIDWELL_TIMEPOINT_LABELS[t]}</td>
                {CANNABIS_FORMS.map((f) => {
                  const [mean, se] = measure.means_se[f][t];
                  return (
                    <td key={f} style={{ padding: "3px 5px", textAlign: "right" }}>
                      {mean} ± {se}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${measure.measure} over time by cannabis form`}>
          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            {yTicks.map((t) => (
              <g key={t}>
                <line x1={0} x2={plotW} y1={y(t)} y2={y(t)} stroke="var(--gridline)" strokeWidth={1} />
                <text x={-6} y={y(t)} dy={4} textAnchor="end" fontSize={10} fill="var(--text-muted)">
                  {Math.round(t * 1000) / 1000}
                </text>
              </g>
            ))}
            {BIDWELL_TIMEPOINTS.map((t) => (
              <text key={t} x={x(X_POS[t])} y={plotH + 16} textAnchor="middle" fontSize={9.5} fill="var(--text-muted)">
                {BIDWELL_TIMEPOINT_LABELS[t].replace(" postuse", "")}
              </text>
            ))}

            {CANNABIS_FORMS.map((f) => {
              const d = BIDWELL_TIMEPOINTS.map((t, i) => `${i === 0 ? "M" : "L"} ${x(X_POS[t])} ${y(measure.means_se[f][t][0])}`).join(" ");
              return (
                <g key={f}>
                  <path d={d} fill="none" stroke={FORM_COLOR[f]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {BIDWELL_TIMEPOINTS.map((t) => {
                    const [mean, se] = measure.means_se[f][t];
                    const cx = x(X_POS[t]);
                    return (
                      <g key={t}>
                        <line x1={cx} x2={cx} y1={y(mean - se)} y2={y(mean + se)} stroke={FORM_COLOR[f]} strokeWidth={1.5} opacity={0.6} />
                        <circle cx={cx} cy={y(mean)} r={4} fill={FORM_COLOR[f]} stroke="var(--surface-1)" strokeWidth={2} />
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
}
