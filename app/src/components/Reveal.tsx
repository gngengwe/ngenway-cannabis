import type { ReactNode } from "react";
import { useReveal } from "../lib/useReveal";

export function Reveal({ children, delayMs = 0 }: { children: ReactNode; delayMs?: number }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal${isVisible ? " is-visible" : ""}`} style={{ transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}
