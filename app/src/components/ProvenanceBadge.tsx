import { useId, useState } from "react";
import type { Provenance } from "../lib/types";

const LABELS: Record<Provenance, string> = {
  exact: "Exact",
  calculated: "Calculated",
  digitized: "Digitized",
  estimated: "Estimated",
  unavailable: "Unavailable",
};

const EXPLANATIONS: Record<Provenance, string> = {
  exact: "Reported directly as a number in the source paper's text or tables.",
  calculated: "Derived by straightforward arithmetic from numbers the source reports.",
  digitized:
    "Extracted from a published chart image using a calibrated tool (e.g. WebPlotDigitizer) with registered axis points.",
  estimated:
    "Read by visual inspection of a published chart image, without a calibrated digitization tool. Treat as approximate.",
  unavailable:
    "Not reported anywhere in the source at usable precision. No number is shown rather than guessed.",
};

const COLORS: Record<Provenance, string> = {
  exact: "var(--status-good)",
  calculated: "var(--status-good)",
  digitized: "var(--dose-2)",
  estimated: "var(--status-warning)",
  unavailable: "var(--text-muted)",
};

/** A small inline badge that discloses how a displayed number was sourced, on hover/focus. */
export function ProvenanceBadge({
  provenance,
  note,
}: {
  provenance: Provenance;
  note?: string;
}) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle" }}>
      <button
        type="button"
        aria-describedby={tooltipId}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        style={{
          font: "inherit",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          color: COLORS[provenance],
          background: "transparent",
          border: `1px solid ${COLORS[provenance]}`,
          borderRadius: 999,
          padding: "1px 7px",
          cursor: "default",
          lineHeight: 1.6,
        }}
      >
        {LABELS[provenance]}
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: 0,
            zIndex: 10,
            width: 240,
            background: "var(--surface-1)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 12.5,
            lineHeight: 1.4,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {EXPLANATIONS[provenance]}
          {note && (
            <>
              <br />
              <span style={{ color: "var(--text-secondary)" }}>{note}</span>
            </>
          )}
        </span>
      )}
    </span>
  );
}
