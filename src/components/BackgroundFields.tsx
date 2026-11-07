"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Two large, soft, blurred colour fields behind the glass (teal-green + warm stone).
 * Light parallax on scroll; static with reduced motion. Hidden with reduced transparency.
 */
export default function BackgroundFields() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 4000], [0, -240]);
  const yB = useTransform(scrollY, [0, 4000], [0, 160]);

  return (
    <div className="bg-fields" aria-hidden="true">
      <motion.div
        className="bg-field"
        style={{
          y: reduced ? 0 : yA,
          width: "min(70vw, 760px)",
          height: "min(70vw, 760px)",
          top: "-12%",
          right: "-18%",
          background: "var(--field-a)",
        }}
      />
      <motion.div
        className="bg-field"
        style={{
          y: reduced ? 0 : yB,
          width: "min(80vw, 880px)",
          height: "min(60vw, 640px)",
          top: "48%",
          left: "-24%",
          background: "var(--field-b)",
        }}
      />
    </div>
  );
}
