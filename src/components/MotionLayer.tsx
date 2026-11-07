"use client";

import Lenis from "lenis";
import { inView } from "motion";
import { useEffect } from "react";

/**
 * Smooth scroll (Lenis), in-page anchor handling and section reveals.
 * With prefers-reduced-motion: no Lenis, no transforms; reveals render in
 * their final state (handled in CSS) and anchors jump natively.
 */
export default function MotionLayer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveals: CSS hides [data-reveal] only when motion is allowed; mark visible on enter.
    const stopReveal = inView(
      "[data-reveal]",
      (el) => {
        (el as HTMLElement).dataset.visible = "true";
      },
      { amount: 0.12 },
    );

    if (reduced) return () => stopReveal();

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true });

    // In-page anchors: smooth scroll, then move focus to the target so
    // keyboard and screen-reader users continue from the new section.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = decodeURIComponent(a.hash.slice(1));
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      const focusTarget = () => {
        if (target === document.body) return;
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      // Offset comes from CSS (scroll-padding-top + scroll-margin-top), which Lenis reads.
      lenis.scrollTo(id ? target : 0, { onComplete: focusTarget });
      history.pushState(null, "", id ? `#${id}` : window.location.pathname);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      stopReveal();
    };
  }, []);

  return null;
}
