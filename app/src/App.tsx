import { useState } from "react";
import { SafetyBanner } from "./components/SafetyBanner";
import { Exhibit001 } from "./pages/Exhibit001";
import { Exhibit002 } from "./pages/Exhibit002";

type ExhibitId = "001" | "002";

const EXHIBITS: Record<ExhibitId, { label: string; enabled: boolean }> = {
  "001": { label: "001 — Dose ≠ High", enabled: true },
  "002": { label: "002 — Potency ≠ Impairment", enabled: true },
};

export default function App() {
  const [active, setActive] = useState<ExhibitId>("001");

  return (
    <div>
      <SafetyBanner />
      <header
        style={{
          padding: "18px 24px 0",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-1)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>NGenWay Cannabis</p>
        <h1 style={{ margin: "2px 0 14px", fontSize: 20 }}>
          Things we measure as though they were the same thing.
        </h1>
        <nav style={{ display: "flex", gap: 4 }}>
          {(Object.keys(EXHIBITS) as ExhibitId[]).map((id) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-current={isActive ? "page" : undefined}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${isActive ? "var(--text-primary)" : "transparent"}`,
                  padding: "8px 12px",
                  fontSize: 13.5,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {EXHIBITS[id].label}
              </button>
            );
          })}
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px 60px" }}>
        {active === "001" ? <Exhibit001 /> : <Exhibit002 />}
      </main>
    </div>
  );
}
