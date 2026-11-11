"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { howItWorks, screens, site, type ScreenKey } from "@/content/site";

const KEYS = Object.keys(screens) as ScreenKey[];
const DESKTOP_MQ = "(min-width: 960px)";
const ASIDE_MIN_TOP = 72;
const FADE_BAND = 180;

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [frameOpacity, setFrameOpacity] = useState(0);
  const current = howItWorks.steps[active]?.screen ?? null;

  useEffect(() => {
    const rootEl = root.current;
    const list = listRef.current;
    const aside = asideRef.current;
    if (!rootEl || !list || !aside) return;

    const steps = Array.from(
      list.querySelectorAll<HTMLElement>("[data-step]"),
    );

    const holdFrame = () => {
      if (!window.matchMedia(DESKTOP_MQ).matches) {
        aside.style.top = "";
        return;
      }

      // Pin the browser frame in the vertical centre of the viewport.
      const top = Math.max(
        ASIDE_MIN_TOP,
        (window.innerHeight - aside.offsetHeight) / 2,
      );
      aside.style.top = `${top}px`;
    };

    const activationLine = () => {
      if (!window.matchMedia(DESKTOP_MQ).matches) {
        return window.innerHeight * 0.42;
      }
      const top = parseFloat(aside.style.top || "0");
      return (
        (Number.isFinite(top) ? top : ASIDE_MIN_TOP) + aside.offsetHeight / 2
      );
    };

    const sync = () => {
      const line = activationLine();
      let next = 0;
      for (let i = 0; i < steps.length; i++) {
        const rect = steps[i].getBoundingClientRect();
        if (rect.top <= line && rect.bottom >= line) {
          next = i;
          break;
        }
        if (rect.top < line) next = i;
      }
      setActive((prev) => (prev === next ? prev : next));

      if (!window.matchMedia(DESKTOP_MQ).matches) {
        setFrameOpacity(1);
        return;
      }

      const first = steps[0]?.getBoundingClientRect();
      const last = steps[steps.length - 1]?.getBoundingClientRect();
      if (!first || !last) {
        setFrameOpacity(0);
        return;
      }

      let opacity = 1;
      if (first.top > line) {
        opacity = 1 - (first.top - line) / FADE_BAND;
      } else if (last.bottom < line) {
        opacity = (last.bottom - (line - FADE_BAND)) / FADE_BAND;
      }
      opacity = Math.max(0, Math.min(1, opacity));
      setFrameOpacity((prev) =>
        Math.abs(prev - opacity) < 0.01 ? prev : opacity,
      );
    };

    holdFrame();
    sync();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    const onResize = () => {
      holdFrame();
      sync();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(rootEl);
    ro.observe(aside);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      ref={root}
      id="how-it-works"
      className="sec"
      aria-labelledby="hw-t"
    >
      <p className="tag mb-4 text-[12px] tracking-[0.12em]">{howItWorks.eyebrow}</p>
      <h2 id="hw-t" className="h2 text-display">
        {howItWorks.headline}
      </h2>
      <p className="lede mt-4 mb-8 max-w-[36rem] md:mb-12">
        {howItWorks.body}
      </p>

      <div className="hiw">
        <ol
          ref={listRef}
          className="m-0 flex list-none flex-col gap-1 p-0 md:gap-2"
        >
          {howItWorks.steps.map((step, i) => {
            const isActive = i === active;
            const reached = i <= active;
            return (
              <li
                key={step.number}
                data-step
                aria-current={isActive ? "step" : undefined}
                className="grid min-h-[22vh] grid-cols-[40px_minmax(0,1fr)] content-center gap-3.5 rounded-[16px] px-3 py-5 transition-[opacity,background-color,box-shadow] duration-250 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-4 sm:px-4 md:min-h-[28vh] md:py-7"
                style={{
                  opacity: isActive ? 1 : 0.38,
                  background: isActive ? "#FFFFFF" : "transparent",
                  boxShadow: isActive
                    ? "0 1px 2px rgba(16,36,61,.06), 0 14px 32px -20px rgba(16,36,61,.28)"
                    : "none",
                }}
              >
                <span
                  aria-hidden="true"
                  className="disp inline-flex size-10 items-center justify-center rounded-full text-[15px] font-semibold tabular-nums sm:size-11 sm:text-base"
                  style={{
                    background: reached ? "#22539B" : "#E4EAF2",
                    color: reached ? "#FFFFFF" : "#44556B",
                  }}
                >
                  {step.number}
                </span>
                <span className="flex flex-col gap-2 pt-1 sm:gap-2.5">
                  <span className="disp text-[1.1875rem] leading-snug font-semibold tracking-[-0.02em] sm:text-[1.375rem]">
                    {step.title}
                  </span>
                  <span className="max-w-[38ch] text-[15px] leading-[1.55] text-ink-muted sm:text-base sm:leading-relaxed">
                    {step.body}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>

        <aside
          ref={asideRef}
          className="hiw-frame"
          style={{
            opacity: frameOpacity,
            pointerEvents: frameOpacity < 0.08 ? "none" : undefined,
            transition: "opacity 0.35s ease",
          }}
        >
          <figure className="m-0">
            <div
              data-screen-frame
              className="soft rounded-[20px] p-2 sm:rounded-[26px] sm:p-2.5"
            >
              <div
                aria-hidden="true"
                className="flex items-center gap-2 px-2 pt-1 pb-2.5"
              >
                <span className="size-2 rounded-full bg-[#FF5F57]" />
                <span className="size-2 rounded-full bg-[#FEBC2E]" />
                <span className="size-2 rounded-full bg-[#28C840]" />
                <span className="mx-auto rounded-full bg-[#F2F6FA] px-3 py-1 text-[11px] text-ink-soft">
                  {site.consoleUrl}
                </span>
              </div>
              <div
                className="relative overflow-hidden rounded-xl bg-[#F2F6FA] sm:rounded-2xl"
                style={{ aspectRatio: "1920 / 973" }}
              >
                {KEYS.map((key) => {
                  const screen = screens[key];
                  const shown = key === current;
                  return (
                    <Image
                      key={key}
                      src={screen.src}
                      alt={screen.alt}
                      width={screen.width}
                      height={screen.height}
                      className="absolute inset-0 h-full w-full object-cover object-left-top transition-[opacity,transform] duration-[650ms] ease-in-out"
                      style={{
                        opacity: shown ? 1 : 0,
                        transform: shown ? "scale(1)" : "scale(1.02)",
                      }}
                      sizes="(max-width: 960px) 100vw, 55vw"
                      aria-hidden={!shown}
                    />
                  );
                })}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#F2F6FA] transition-opacity duration-[650ms] ease-in-out"
                  style={{ opacity: current ? 0 : 1 }}
                  aria-hidden={!!current}
                >
                  <span className="text-[13px] tracking-[0.06em] text-primary uppercase">
                    {howItWorks.awaitingLabel}
                  </span>
                  <span className="disp text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                    {howItWorks.awaitingTitle}
                  </span>
                </div>
              </div>
            </div>
          </figure>
        </aside>
      </div>
    </section>
  );
}
