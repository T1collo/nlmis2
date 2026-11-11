"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

import { intro } from "@/content/site";

export function LineIntro({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(intro.storageKey)) {
        onDone?.();
        setReady(true);
        return;
      }
    } catch {
      /* ignore */
    }

    if (reduce) {
      try {
        localStorage.setItem(intro.storageKey, "1");
      } catch {
        /* ignore */
      }
      onDone?.();
      setReady(true);
      return;
    }

    setShow(true);
    setReady(true);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [reduce, onDone]);

  function finish() {
    try {
      localStorage.setItem(intro.storageKey, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.style.overflow = "";
    setShow(false);
    onDone?.();
  }

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-surface px-5 py-16 sm:px-6"
          role="dialog"
          aria-label="NLMIS introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          <button
            type="button"
            className="btn btn-s absolute top-4 right-4 z-10 min-h-11 px-4 text-sm sm:top-5 sm:right-5"
            onClick={finish}
          >
            {intro.skip}
          </button>

          <div className="relative flex w-full max-w-md flex-col items-center">
            <svg
              width="4"
              height="220"
              viewBox="0 0 4 220"
              className="mb-8"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="intro-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22539B" />
                  <stop offset="100%" stopColor="#2F8A92" />
                </linearGradient>
              </defs>
              <motion.path
                d="M2 0 L2 220"
                stroke="url(#intro-line)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              {[24, 110, 196].map((y, i) => (
                <motion.circle
                  key={y}
                  cx="2"
                  cy={y}
                  r={i === 2 ? 9 : 7}
                  fill={i === 2 ? "#2F8A92" : "#FFFFFF"}
                  stroke={i === 2 ? "#2F8A92" : "#22539B"}
                  strokeWidth="3"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.45,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </svg>

            <div className="flex w-full flex-col gap-4 text-center">
              {intro.beats.map((beat, i) => (
                <motion.p
                  key={beat.label}
                  className="m-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.45, duration: 0.4 }}
                >
                  <span className="mono mb-1 block text-[11px] tracking-[0.08em] text-primary uppercase">
                    {beat.label}
                  </span>
                  <span className="disp text-base font-bold text-ink sm:text-lg">
                    {beat.line}
                  </span>
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-10 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.45 }}
              onAnimationComplete={() => {
                window.setTimeout(finish, 700);
              }}
            >
              <span className="disp text-2xl font-extrabold">{intro.wordmark}</span>
              <span className="text-xs text-ink-muted sm:text-sm">
                {intro.fullName}
              </span>
              <span className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                {intro.lede}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
