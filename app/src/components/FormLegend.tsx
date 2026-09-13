import { CANNABIS_FORMS, FORM_LABELS, type CannabisForm } from "../lib/types";

const FORM_COLOR: Record<CannabisForm, string> = {
  flower: "var(--form-flower)",
  concentrate: "var(--form-concentrate)",
};

export function FormLegend() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 13 }}>
      {CANNABIS_FORMS.map((f) => (
        <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-secondary)" }}>
          <span
            aria-hidden
            style={{ width: 12, height: 3, borderRadius: 2, background: FORM_COLOR[f], display: "inline-block" }}
          />
          {FORM_LABELS[f]}
        </span>
      ))}
    </div>
  );
}
