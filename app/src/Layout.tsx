import { NavLink, Outlet } from "react-router-dom";
import { SafetyBanner } from "./components/SafetyBanner";

const NAV_ITEMS = [
  { to: "/", label: "Story", end: true },
  { to: "/exhibits/001", label: "001 — Dose ≠ High" },
  { to: "/exhibits/002", label: "002 — Potency ≠ Impairment" },
  { to: "/exhibits/003", label: "003 — Blood THC ≠ Cannabis BAC" },
];

export function Layout() {
  return (
    <div>
      <SafetyBanner />
      <header
        style={{
          padding: "18px 24px 0",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/assets/brand-mark.svg" alt="" width={28} height={28} />
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>NGenWay Cannabis</p>
          </div>
          <h1 style={{ margin: "2px 0 14px", fontSize: 20 }}>
            Things we measure as though they were the same thing.
          </h1>
        </NavLink>
        <nav aria-label="Site" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                textDecoration: "none",
                borderBottom: `2px solid ${isActive ? "var(--text-primary)" : "transparent"}`,
                padding: "8px 12px",
                fontSize: 13.5,
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: isActive ? 600 : 400,
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
