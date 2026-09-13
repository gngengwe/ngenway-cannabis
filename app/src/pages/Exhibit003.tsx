import { useEvidenceData, findClaim } from "../lib/useEvidenceData";
import { biomarkerValues } from "../lib/types";
import { ProvenanceBadge } from "../components/ProvenanceBadge";
import { StatTile } from "../components/StatTile";
import { MethodologyPanel } from "../components/MethodologyPanel";
import { ForestPlot } from "../visualizations/ForestPlot";

export function Exhibit003() {
  const state = useEvidenceData();
  if (state.status === "loading") {
    return <p style={{ padding: 24, color: "var(--text-muted)" }}>Loading evidence data…</p>;
  }
  if (state.status === "error") {
    return <p style={{ padding: 24, color: "var(--status-warning)" }}>Could not load evidence data: {state.error}</p>;
  }
  const { data } = state;
  const study = data.studies["mccartney-2021"];
  const corpus = study as unknown as {
    n_publications: number;
    n_participants: number;
    n_trials: number;
    n_outcomes: number;
  };
  const occasionalClaim = findClaim(data.claims, "mccartney-2021-biomarkers-weak-in-occasional-users");
  const regularClaim = findClaim(data.claims, "mccartney-2021-no-biomarker-relationship-in-regular-users");
  const scaleClaim = findClaim(data.claims, "mccartney-2021-corpus-scale");

  const occasionalValues = biomarkerValues(occasionalClaim);
  const regularValues = biomarkerValues(regularClaim);

  return (
    <div>
      <header style={{ marginBottom: 18 }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: 0.4, color: "var(--text-muted)", textTransform: "uppercase" }}>
          Exhibit 003
        </p>
        <h2 style={{ margin: "2px 0 6px", fontSize: 24 }}>Blood THC ≠ Cannabis BAC</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 640 }}>
          A breathalyzer number predicts driving impairment well enough to anchor a legal
          limit. Does a blood THC number do the same job? A meta-regression pooling 28
          studies says: not really — and for regular users, not at all.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          gap: 28,
          flexWrap: "wrap",
          padding: "14px 16px",
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <StatTile label="publications" value={String(corpus.n_publications)} />
        <StatTile label="participants" value={String(corpus.n_participants)} />
        <StatTile label="trials" value={String(corpus.n_trials)} />
        <StatTile label="outcomes analyzed" value={String(corpus.n_outcomes)} />
        <ProvenanceBadge provenance={scaleClaim?.magnitude_provenance ?? "exact"} note={scaleClaim?.relationship} />
      </div>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, margin: "0 0 4px" }}>
          Occasional cannabis users
          {occasionalClaim?.magnitude_provenance && (
            <ProvenanceBadge provenance={occasionalClaim.magnitude_provenance} note={occasionalClaim.magnitude_note} />
          )}
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-secondary)", maxWidth: 620 }}>
          Every biomarker here <em>is</em> significantly associated with impairment in the expected
          direction — the shaded bands mark the very-weak / weak / moderate strength zones a
          meta-analyst would use to read these. Even the single strongest relationship found in
          the whole review (blood 11-COOH-THC) only reaches "moderate."
        </p>
        <ForestPlot title="Correlation with impairment (R, 95% CI) — inhaled route unless noted" values={occasionalValues} />
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, margin: "0 0 4px" }}>
          Regular (weekly+) cannabis users
          {regularClaim?.magnitude_provenance && (
            <ProvenanceBadge provenance={regularClaim.magnitude_provenance} note={regularClaim.magnitude_note} />
          )}
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-secondary)", maxWidth: 620 }}>
          Same biomarkers, same method, a different population — and every confidence interval
          now crosses zero. Note this rests on a smaller, less robust sample than the panel
          above (see the caveat below the chart); "no relationship detected" is not the same
          claim as "proven no relationship."
        </p>
        <ForestPlot
          title="Correlation with impairment (R, 95% CI) — inhaled route"
          values={regularValues}
          caveat="No eligible studies measured oral-route THC or oral-fluid THC in regular users at all — those rows are absent because the data doesn't exist yet, not because it was tested and found null."
        />
      </section>

      <div
        style={{
          marginTop: 8,
          padding: "14px 16px",
          borderLeft: "3px solid var(--finding-significant)",
          background: "var(--surface-1)",
          borderRadius: "0 10px 10px 0",
        }}
      >
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          A per se legal limit assumes one blood THC number means roughly the same thing for
          everyone. This pooled evidence says the number barely means anything for the
          population — regular users — most likely to be tested. The authors put it plainly:{" "}
          <em>blood and oral fluid THC concentrations are relatively poor indicators of
          cannabis-induced impairment.</em>
        </p>
      </div>

      <MethodologyPanel study={study} />
    </div>
  );
}
