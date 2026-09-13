import { useRef, useState } from "react";
import { SafetyBanner } from "./components/SafetyBanner";
import { Exhibit001 } from "./pages/Exhibit001";
import { Exhibit002 } from "./pages/Exhibit002";
import { Exhibit003 } from "./pages/Exhibit003";

type ExhibitId = "001" | "002" | "003";

const EXHIBIT_IDS: ExhibitId[] = ["001", "002", "003"];
const EXHIBITS: Record<ExhibitId, { label: string }> = {
  "001": { label: "001 — Dose ≠ High" },
  "002": { label: "002 — Potency ≠ Impairment" },
  "003": { label: "003 — Blood THC ≠ Cannabis BAC" },
};

export default function App() {
  const [active, setActive] = useState<ExhibitId>("001");
  const tabRefs = useRef<Partial<Record<ExhibitId, HTMLButtonElement>>>({});

  // WAI-ARIA tabs pattern: arrow keys move focus AND activate (roving tabindex),
  // Home/End jump to the first/last tab. Matches https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % EXHIBIT_IDS.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + EXHIBIT_IDS.length) % EXHIBIT_IDS.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = EXHIBIT_IDS.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    const nextId = EXHIBIT_IDS[nextIndex];
    setActive(nextId);
    tabRefs.current[nextId]?.focus();
  };

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
        <div role="tablist" aria-label="Exhibits" style={{ display: "flex", gap: 4 }}>
          {EXHIBIT_IDS.map((id, index) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  if (el) tabRefs.current[id] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
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
        </div>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px 60px" }}>
        {EXHIBIT_IDS.map((id) => (
          <div key={id} role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={id !== active}>
            {id === "001" && <Exhibit001 />}
            {id === "002" && <Exhibit002 />}
            {id === "003" && <Exhibit003 />}
          </div>
        ))}
      </main>
    </div>
  );
}
