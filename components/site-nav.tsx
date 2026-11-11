"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { Mark } from "@/components/mark";
import { nav, site } from "@/content/site";

export function SiteNav({
  current,
}: {
  current?: "home" | "tutorials";
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={root}
      className="sticky top-0 z-40 px-[clamp(12px,3vw,32px)] pt-[14px] pb-2 transition-[background-color] duration-300"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--color-surface) 72%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(10px)" : undefined,
      }}
    >
      <nav
        aria-label="Primary"
        className="soft relative mx-auto grid max-w-[76rem] grid-cols-[1fr_auto] items-center gap-2 rounded-full py-2 pr-2 pl-3 transition-opacity duration-300 sm:pl-[22px] min-[1061px]:grid-cols-[1fr_auto_1fr]"
        style={{ opacity: scrolled ? 0.82 : 1 }}
      >
        <Link
          href="/#top"
          aria-label={nav.homeLabel}
          className="inline-flex min-h-11 items-center gap-2 justify-self-start text-ink no-underline sm:gap-2.5"
        >
          <Mark />
          <span className="disp text-lg font-extrabold sm:text-xl">
            {site.name}
          </span>
        </Link>

        <div
          id={menuId}
          className="nav-links justify-self-center gap-0.5"
          data-open={open ? "true" : "false"}
        >
          {nav.links.map((link) => {
            const isTutorials = link.href === "/tutorials";
            return (
              <Link
                key={link.href}
                href={link.href}
                className="navl"
                aria-current={
                  current === "tutorials" && isTutorials ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-self-end gap-2">
          <Link
            href={nav.cta.href}
            className="btn btn-p min-h-[46px] px-4 text-sm sm:px-[26px] sm:text-base"
            onClick={() => setOpen(false)}
          >
            <span className="sm:hidden">Onboard</span>
            <span className="hidden sm:inline">{nav.cta.label}</span>
          </Link>
          <button
            type="button"
            className="btn btn-s nav-burger min-h-[46px] px-3.5"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
