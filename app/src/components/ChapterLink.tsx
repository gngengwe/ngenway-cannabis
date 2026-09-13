import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export function ChapterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        marginTop: 14,
        padding: "10px 18px",
        borderRadius: 999,
        background: "var(--accent)",
        color: "var(--accent-ink)",
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
