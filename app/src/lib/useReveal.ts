import { useEffect, useRef, useState } from "react";

/** Fires once when the element first enters the viewport. Used to drive the `.reveal`
 * CSS class and animated counters -- kept as a hook (not baked into a single component)
 * so both can share one observer per element. */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting covers the normal case (user scrolls, element enters view).
        // boundingClientRect.top < 0 covers a fast scroll, an anchor jump, or a
        // restored scroll position landing PAST the element before it ever gets a
        // chance to "enter" -- without this, that content stays opacity:0 forever,
        // which is a real reliability bug, not just an edge case.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
