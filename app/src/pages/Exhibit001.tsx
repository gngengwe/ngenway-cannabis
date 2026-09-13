import { useState } from "react";
import { useEvidenceData, findClaim } from "../lib/useEvidenceData";
import type { DoseCondition } from "../lib/types";
import { DoseLegend } from "../components/DoseLegend";
import { ProvenanceBadge } from "../components/ProvenanceBadge";
import { MethodologyPanel } from "../components/MethodologyPanel";
import { TimeCourseChart } from "../visualizations/TimeCourseChart";
import { DoseBarChart } from "../visualizations/DoseBarChart";
import { Figure } from "../components/Figure";

const TIME_NOTE =
  "Heart rate, expired CO, and craving are reported in the source only as an average across all post-smoking timepoints -- the paper does not publish a time-resolved series for these measures. This value does not change as you move the time slider above; only the Experience track is time-resolved.";

export function Exhibit001() {
  const state = useEvidenceData();
  const [selectedDose, setSelectedDose] = useState<DoseCondition>("6_puffs");
  const [selectedTime, setSelectedTime] = useState<number>(30);

  if (state.status === "loading") {
    return <p style={{ padding: 24, color: "var(--text-muted)" }}>Loading evidence data…</p>;
  }
  if (state.status === "error") {
    return (
      <p style={{ padding: 24, color: "var(--status-warning)" }}>
        Could not load evidence data: {state.error}
      </p>
    );
  }

  const { data } = state;
  const study = data.studies["ramesh-2013"];
  const highPanel = data.ramesh2013.vas.panels.find((p) => p.variable === "high")!;
  const stimulatedPanel = data.ramesh2013.vas.panels.find((p) => p.variable === "stimulated")!;
  const hrSeries = data.ramesh2013.hrCo.series.find((s) => s.variable === "heart rate")!;
  const coSeries = data.ramesh2013.hrCo.series.find((s) => s.variable === "expired CO")!;
  const cravingValues = data.ramesh2013.craving.values;

  const highClaim = findClaim(data.claims, "ramesh-2013-vas-high-not-dose-dependent");
  const hrClaim = findClaim(data.claims, "ramesh-2013-hr-dose");
  const coClaim = findClaim(data.claims, "ramesh-2013-co-dose");
  const cravingClaim = findClaim(data.claims, "ramesh-2013-craving-dose");

  return (
    <div>
      <header style={{ marginBottom: 18 }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: 0.4, color: "var(--text-muted)", textTransform: "uppercase" }}>
          Exhibit 001
        </p>
        <h2 style={{ margin: "2px 0 6px", fontSize: 24 }}>Dose ≠ High</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 640 }}>
          The nominal dose kept rising with each step (0 → 2 → 4 → 6 active puffs). Watch which
          tracks below actually kept rising with it, and which ones separated from placebo once
          and then stopped moving.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          padding: "12px 16px",
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <DoseLegend selected={selectedDose} onSelect={setSelectedDose} />
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
          Time after smoking: <strong>{selectedTime} min</strong>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={[15, 30, 60, 90, 120, 180, 210].indexOf(selectedTime)}
            onChange={(e) => setSelectedTime([15, 30, 60, 90, 120, 180, 210][Number(e.target.value)])}
            style={{ width: 160 }}
          />
        </label>
      </div>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, margin: "0 0 4px" }}>
          EXPERIENCE — self-reported "high" / "stimulated"
          {highClaim?.magnitude_provenance && (
            <ProvenanceBadge provenance={highClaim.magnitude_provenance} note={highClaim.magnitude_note} />
          )}
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-secondary)" }}>
          {highClaim?.relationship}
        </p>
        <div style={{ marginBottom: 16 }}>
          <Figure
            src="/assets/exhibit-001-high-flatline.svg"
            alt=""
            caption="Illustration previewing the contrast below -- not source data. See the charts and provenance badges for the actual measured values."
            maxWidth={680}
            aspectRatio="800 / 360"
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <TimeCourseChart
            title="I feel high"
            unit="mm VAS"
            series={highPanel.series}
            selectedDose={selectedDose}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            tableCaption="Self-reported 'high', visually estimated from Figure 2 (Ramesh et al. 2013)."
          />
          <TimeCourseChart
            title="I feel stimulated"
            unit="mm VAS"
            series={stimulatedPanel.series}
            selectedDose={selectedDose}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            tableCaption="Self-reported 'stimulated', visually estimated from Figure 2 (Ramesh et al. 2013)."
          />
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          marginBottom: 12,
        }}
      >
        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, margin: "0 0 4px" }}>
            BODY — heart rate
            {hrClaim?.magnitude_provenance && (
              <ProvenanceBadge provenance={hrClaim.magnitude_provenance} note={hrClaim.magnitude_note} />
            )}
          </h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-secondary)" }}>{hrClaim?.relationship}</p>
          <Figure src="/assets/exhibit-001-pulse.svg" alt="" maxWidth={160} aspectRatio="800 / 360" />
          <DoseBarChart
            title="Heart rate"
            unit="bpm"
            values={hrSeries.values}
            axisRange={hrSeries.axis_range}
            selectedDose={selectedDose}
            timeResolutionNote={TIME_NOTE}
          />
        </div>

        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, margin: "0 0 4px" }}>
            WANT — marijuana craving
            {cravingClaim?.magnitude_provenance && (
              <ProvenanceBadge provenance={cravingClaim.magnitude_provenance} note={cravingClaim.magnitude_note} />
            )}
          </h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-secondary)" }}>
            {cravingClaim?.relationship}
          </p>
          <DoseBarChart
            title="'I want marijuana' (VAS)"
            unit="mm"
            values={cravingValues}
            selectedDose={selectedDose}
            timeResolutionNote={TIME_NOTE}
          />
        </div>

        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, margin: "0 0 4px" }}>
            BEHAVIOR — expired CO
            {coClaim?.magnitude_provenance && (
              <ProvenanceBadge provenance={coClaim.magnitude_provenance} note={coClaim.magnitude_note} />
            )}
          </h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-secondary)" }}>{coClaim?.relationship}</p>
          <DoseBarChart
            title="Expired carbon monoxide"
            unit="ppm"
            values={coSeries.values}
            axisRange={coSeries.axis_range}
            selectedDose={selectedDose}
            timeResolutionNote={TIME_NOTE}
          />
        </div>
      </section>

      <div
        style={{
          marginTop: 20,
          padding: "14px 16px",
          borderLeft: "3px solid var(--dose-6)",
          background: "var(--surface-1)",
          borderRadius: "0 10px 10px 0",
        }}
      >
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--text-primary)" }}>What you'd expect:</strong> dose ↑ → everything ↑.{" "}
          <strong style={{ color: "var(--text-primary)" }}>What appeared:</strong> heart rate and craving tracked
          dose, but self-reported "high" separated from placebo once and then largely stopped moving across 2, 4,
          and 6 puffs — while participants also measurably inhaled less as active puffs increased (see{" "}
          <em>self-titration</em> in the methodology panel below), meaning less of that rising nominal dose
          reached the body than the puff count alone suggests.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
        <Figure
          src="/assets/exhibit-001-inhale.svg"
          alt=""
          caption="Illustration: more active puffs did not mean proportionately more inhaled -- see self-titration below."
          maxWidth={220}
          aspectRatio="520 / 420"
        />
      </div>

      <MethodologyPanel study={study} />
    </div>
  );
}
