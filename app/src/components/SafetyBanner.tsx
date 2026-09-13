/** Persistent disclaimer -- shown on every view, not just a footer, per the MVP safeguards
 * in DEVELOPMENT_PLAN.md and the Deep Research results' "Do not" list. */
export function SafetyBanner() {
  return (
    <div
      role="note"
      style={{
        background: "color-mix(in srgb, var(--status-warning) 14%, var(--surface-1))",
        borderBottom: "1px solid var(--border)",
        padding: "8px 16px",
        fontSize: 13,
        lineHeight: 1.5,
        color: "var(--text-secondary)",
      }}
    >
      <strong style={{ color: "var(--text-primary)" }}>Not medical, dosing, or legal advice.</strong>{" "}
      This page visualizes findings from specific published studies, each with its own
      population, product, and measurement limits. It does not recommend a dose, estimate
      your personal impairment, or imply a safe-to-drive threshold. A lack of dose-response
      in one measure does not mean an absence of impairment.
    </div>
  );
}
