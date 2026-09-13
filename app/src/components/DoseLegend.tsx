import { DOSE_CONDITIONS, DOSE_LABELS, type DoseCondition } from "../lib/types";

const DOSE_COLOR_VAR: Record<DoseCondition, string> = {
  "0_puffs": "var(--dose-0)",
  "2_puffs": "var(--dose-2)",
  "4_puffs": "var(--dose-4)",
  "6_puffs": "var(--dose-6)",
};

export function doseColor(condition: DoseCondition): string {
  return DOSE_COLOR_VAR[condition];
}

/** Legend + dose selector in one control: clicking a swatch sets the focused dose.
 * Doubles as the required legend (>=2 series) and the primary cross-track control. */
export function DoseLegend({
  selected,
  onSelect,
}: {
  selected: DoseCondition;
  onSelect: (c: DoseCondition) => void;
}) {
  return (
    <fieldset
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        border: "none",
        padding: 0,
        margin: 0,
      }}
    >
      <legend
        style={{
          fontSize: 12,
          color: "var(--text-secondary)",
          padding: 0,
          marginBottom: 4,
        }}
      >
        Active THC puffs (nominal dose)
      </legend>
      {DOSE_CONDITIONS.map((c) => {
        const isSelected = c === selected;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c)}
            aria-pressed={isSelected}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: isSelected ? "var(--gridline)" : "transparent",
              border: `1px solid ${isSelected ? doseColor(c) : "var(--border)"}`,
              borderRadius: 999,
              padding: "4px 10px 4px 6px",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: 13,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: doseColor(c),
                display: "inline-block",
              }}
            />
            {DOSE_LABELS[c]}
          </button>
        );
      })}
    </fieldset>
  );
}
