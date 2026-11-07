"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Content, SectionId } from "@/content/types";
import { CloseIcon, GlobeIcon, MenuIcon, MoonIcon, SunIcon } from "./icons";

const SCROLL_SHRINK = 24;

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage blocked: the choice lasts for this page view */
  }
}

/** Floating glass nav: shrinks on scroll, highlights the active section, mobile disclosure menu. */
export default function Nav({ content }: { content: Content }) {
  const { ui, nav } = content;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_SHRINK);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: the one crossing the middle band of the viewport.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [nav]);

  // Mobile menu: close on Escape (focus back to the button) and on outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !menuButton.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const langHref = `${ui.langToggle.href}${active ? `#${active}` : ""}`;

  const linkClass = (id: SectionId) =>
    `pressable inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium ${
      active === id ? "bg-chip text-fg" : "text-muted hover:text-fg"
    }`;

  const iconButton =
    "pressable inline-flex h-11 w-11 items-center justify-center rounded-full text-fg hover:bg-chip";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <div
        className="nav-shell pointer-events-auto w-full max-w-[1040px] origin-top transition-transform duration-500 ease-[var(--ease-out-soft)]"
        style={{ transform: scrolled ? "scale(0.97) translateY(-4px)" : undefined }}
      >
        <nav
          aria-label={ui.primaryNav}
          className="glass flex items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-4 sm:pl-5"
        >
          <a href="#top" aria-label={ui.homeLink} className="pressable inline-flex min-h-11 items-center rounded-full pr-2 font-semibold tracking-[-0.01em]">
            {content.person.name}
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={linkClass(n.id)} aria-current={active === n.id ? "location" : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-0.5">
            <Link
              href={langHref}
              hrefLang={ui.langToggle.hrefLang}
              lang={ui.langToggle.hrefLang}
              aria-label={ui.langToggle.label}
              className="pressable inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-[0.9375rem] font-medium text-fg hover:bg-chip"
            >
              <GlobeIcon />
              <span>{ui.langToggle.short}</span>
            </Link>
            <button type="button" onClick={toggleTheme} aria-label={ui.themeToggle} title={ui.themeToggle} className={iconButton}>
              <SunIcon className="icon-when-dark" />
              <MoonIcon className="icon-when-light" />
            </button>
            <button
              ref={menuButton}
              type="button"
              className={`${iconButton} lg:hidden`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.menuClose : ui.menuOpen}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <div
          ref={panel}
          id="mobile-menu"
          hidden={!open}
          className="glass mt-2 rounded-[24px] p-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? "location" : undefined}
                  className={`pressable flex min-h-12 items-center rounded-2xl px-4 text-[1.0625rem] font-medium ${
                    active === n.id ? "bg-chip text-fg" : "text-fg"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
