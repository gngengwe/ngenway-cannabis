import { useEffect, useState } from "react";
import { useReveal } from "../lib/useReveal";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CountUp({ to, durationMs = 900 }: { to: number; durationMs?: number }) {
  const { ref, isVisible } = useReveal<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, to, durationMs]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}
