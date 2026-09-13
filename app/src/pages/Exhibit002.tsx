import { useEvidenceData, findClaim } from "../lib/useEvidenceData";
import { isFormEffectSignificant } from "../lib/types";
import { ProvenanceBadge } from "../components/ProvenanceBadge";
import { FormLegend } from "../components/FormLegend";
import { MethodologyPanel } from "../components/MethodologyPanel";
import { GapChart } from "../visualizations/GapChart";
import { GroupTimeCourseChart } from "../visualizations/GroupTimeCourseChart";

const CHAIN_MEASURES = [
  { measureName: "THC", gapClaimId: "bidwell-2020-gap-thc", label: "Blood THC" },
  {
    measureName: "Intoxication (avg. of feeling high/mentally stoned/physically stoned)",
    gapClaimId: "bidwell-2020-gap-intoxication",
    label: "Subjective intoxication",
  },
  {
    measureName: "Verbal recall errors (shopping list, delayed)",
    gapClaimId: "bidwell-2020-gap-verbal-recall",
    label: "Verbal recall errors",
  },
  { measureName: "Sway, eyes closed", gapClaimId: "bidwell-2020-gap-balance", label: "Balance (eyes closed)" },
];

export function Exhibit002() {
  const state = useEvidenceData();
  if (state.status === "loading") {
    return <p style={{ padding: 24, color: "var(--text-muted)" }}>Loading evidence data…</p>;
  }
  if (state.status === "error") {
    return <p style={{ padding: 24, color: "var(--status-warning)" }}>Could not load evidence data: {state.error}</p>;
  }
  const { data } = state;
  const study = data.studies["bidwell-2020"];
  const thcClaim = findClaim(data.claims, "bidwell-2020-plasma-thc-concentrate-gt-flower");
  const intoxClaim = findClaim(data.claims, "bidwell-2020-intoxication-not-different-by-form");

  const chainData = CHAIN_MEASURES.map(({ measureName, gapClaimId, label }) => {
    const measure = data.bidwell2020.table2.measures.find((m) => m.measure === measureName)!;
    const gapClaim = findClaim(data.claims, gapClaimId)!;
    const percent = (gapClaim.significance as { result_pct: number }).result_pct;
    return { measure, gapClaim, label, percent, significant: isFormEffectSignificant(measure.stats.form) };
  });

  return (
    <div>
      <header style={{ marginBottom: 18 }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: 0.4, color: "var(--text-muted)", textTransform: "uppercase" }}>
          Exhibit 002
        </p>
        <h2 style={{ margin: "2px 0 6px", fontSize: 24 }}>Potency ≠ Impairment</h2>
        <p style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 640 }}>
          Concentrate users bought products labeled 70–90% THC; flower users bought 16–24% THC.
          Follow that difference down the chain from blood to behavior — where does the gap hold,
          and where does it close?
        </p>
      </header>

      <div
        style={{
          padding: "12px 16px",
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <FormLegend />
      </div>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15 }}>The signal chain</h3>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "var(--text-secondary)" }}>
          Each bar is the % by which concentrate users' change from before use differed from flower
          users' change, at that step of the chain (0% = identical change in both groups).
        </p>
        <p style={{ margin: "0 0 14px", fontSize: 11.5, color: "var(--text-muted)" }}>
          <ProvenanceBadge provenance="calculated" note="Every bar here is an NGenWay-calculated summary metric for cross-measure comparison, not a statistic the original authors tested. See each panel's source note." />{" "}
          this row is a derived view for comparison, not a reported statistic.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "space-around" }}>
          {chainData.map(({ label, percent, significant }) => (
            <GapChart key={label} label={label} percent={percent} significant={significant} />
          ))}
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          Blood THC is the one step where the gap is large <em>and</em> statistically significant.
          By subjective intoxication the gap has nearly vanished (not significant); at verbal
          recall and balance, concentrate users' point estimates move <em>less</em> than flower
          users', not more — neither of those gaps was statistically tested as significant either.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {chainData.map(({ measure, gapClaim, label }) => (
          <div key={label}>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: "0 0 2px",
                fontSize: 13.5,
                color: "var(--text-primary)",
              }}
            >
              {label}
              <ProvenanceBadge provenance="exact" note="Means and SEs at every timepoint are reported directly in Table 2." />
            </h4>
            <p style={{ margin: "0 0 6px", fontSize: 12, color: "var(--text-muted)" }}>{gapClaim.relationship}</p>
            <GroupTimeCourseChart measure={measure} />
          </div>
        ))}
      </section>

      <div
        style={{
          marginTop: 8,
          padding: "14px 16px",
          borderLeft: "3px solid var(--form-concentrate)",
          background: "var(--surface-1)",
          borderRadius: "0 10px 10px 0",
        }}
      >
        <h4 style={{ margin: "0 0 6px", fontSize: 13.5 }}>
          <ProvenanceBadge provenance={thcClaim?.magnitude_provenance ?? "exact"} /> {thcClaim?.variable}
        </h4>
        <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          {thcClaim?.relationship}
        </p>
        <h4 style={{ margin: "0 0 6px", fontSize: 13.5 }}>
          <ProvenanceBadge provenance={intoxClaim?.magnitude_provenance ?? "exact"} /> {intoxClaim?.variable}
        </h4>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          {intoxClaim?.relationship}
        </p>
      </div>

      <MethodologyPanel study={study} />
    </div>
  );
}
