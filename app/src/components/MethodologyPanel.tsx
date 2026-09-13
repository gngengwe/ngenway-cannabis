import { useState } from "react";
import type { Study } from "../lib/types";

export function MethodologyPanel({ study }: { study: Study }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, marginTop: 20 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "10px 14px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          color: "var(--text-primary)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Methodology & source
        <span aria-hidden style={{ color: "var(--text-muted)" }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px", fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>{study.citation.authors}</strong> (
            {study.citation.year}). {study.citation.title}. <em>{study.citation.journal}</em>.
            {study.citation.doi && (
              <>
                {" "}
                <a href={`https://doi.org/${study.citation.doi}`} target="_blank" rel="noreferrer">
                  doi:{study.citation.doi}
                </a>
              </>
            )}
          </p>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>Design:</strong> {study.design}
          </p>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>Population:</strong> {study.population}
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong style={{ color: "var(--text-primary)" }}>How to read the provenance badges:</strong>{" "}
            <span style={{ color: "var(--status-good)" }}>Exact</span> = reported directly in the paper's text/
            tables. <span style={{ color: "var(--status-warning)" }}>Estimated</span> = read visually off a
            published chart image, without a calibrated digitization tool — treat as approximate, not final.{" "}
            <span style={{ color: "var(--text-muted)" }}>Unavailable</span> = not reported anywhere at usable
            precision; no number is shown rather than guessed.
          </p>
        </div>
      )}
    </div>
  );
}
