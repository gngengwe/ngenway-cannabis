import { SafetyBanner } from "./components/SafetyBanner";
import { Exhibit001 } from "./pages/Exhibit001";

export default function App() {
  return (
    <div>
      <SafetyBanner />
      <header
        style={{
          padding: "18px 24px 14px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-1)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>NGenWay Cannabis</p>
        <h1 style={{ margin: "2px 0 0", fontSize: 20 }}>
          Things we measure as though they were the same thing.
        </h1>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px 60px" }}>
        <Exhibit001 />
      </main>
    </div>
  );
}
