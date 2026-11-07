"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType, type PointerEvent } from "react";

const MAX_TILT = 4; // degrees, reached on cards up to ~360px tall
const TILT_REF_HEIGHT = 360;
// Critically damped spring (apple-design: damping 1.0, response ~0.4s): no overshoot.
const SPRING = { bounce: 0, visualDuration: 0.4 };
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type GlassCardProps<T extends ElementType> = {
  as?: T;
  /** Pointer tilt + specular highlight. Only active on fine-pointer hover devices. */
  interactive?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/** Reusable Liquid Glass surface. Falls back to a solid surface in CSS (see .glass in globals.css). */
export default function GlassCard<T extends ElementType = "div">({
  as,
  interactive = false,
  className = "",
  children,
  ...rest
}: GlassCardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);

  const rx = useSpring(useMotionValue(0), SPRING);
  const ry = useSpring(useMotionValue(0), SPRING);

  useEffect(() => {
    if (!interactive) return;
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia(REDUCED_MOTION);
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, [interactive]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!enabled || !el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    // Tall cards tilt less: same edge displacement, and text stays crisp.
    const max = Math.min(MAX_TILT, (MAX_TILT * TILT_REF_HEIGHT) / r.height);
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const onEnter = () => {
    if (enabled) ref.current?.setAttribute("data-hover", "true");
  };
  const onLeave = () => {
    ref.current?.removeAttribute("data-hover");
    rx.set(0);
    ry.set(0);
  };

  if (!interactive) {
    return (
      <Tag ref={ref} className={`glass ${className}`} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <motion.div
      style={enabled ? { rotateX: rx, rotateY: ry, transformPerspective: 1200 } : undefined}
      className="h-full"
    >
      <Tag
        ref={ref}
        className={`glass h-full ${className}`}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        {...rest}
      >
        <span className="glass-specular" aria-hidden="true" />
        <div className="relative z-[2] h-full">{children}</div>
      </Tag>
    </motion.div>
  );
}
