"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { screens, tutorials } from "@/content/site";

type Filter = (typeof tutorials.filters)[number];

export function TutorialsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const videos = useMemo(
    () =>
      tutorials.groups.filter(
        (g) => filter === "all" || g.audience === filter,
      ),
    [filter],
  );

  const tints: Record<string, string> = {
    "Health facilities": "#DCE6F4",
    "County health teams": "#DDEFF0",
    "Distributors & suppliers": "#E6F0DC",
  };

  return (
    <div className="stage min-h-svh">
      <SiteNav current="tutorials" />
      <main className="sec" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <p className="tag mb-3.5">{tutorials.eyebrow}</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="h2 text-display max-w-[36rem]">{tutorials.headline}</h1>
          <p className="mono m-0 text-xs tracking-[0.08em] text-primary">
            {tutorials.showing(videos.length)}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tutorials.filters.map((opt) => {
            const pressed = filter === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={pressed}
                className="btn min-h-11 rounded-full text-sm"
                style={{
                  background: pressed ? "#22539B" : "#FFFFFF",
                  color: pressed ? "#FFFFFF" : "#10243D",
                  boxShadow: pressed ? "none" : "inset 0 0 0 1px #D8E3EF",
                }}
                onClick={() => setFilter(opt)}
              >
                {opt === "all" ? tutorials.allLabel : opt}
              </button>
            );
          })}
        </div>

        <ol className="relative mt-14 m-0 list-none p-0">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-3 w-[3px] -translate-x-1/2"
            style={{
              background: "linear-gradient(180deg, #22539B, #2F8A92)",
            }}
          />
          {videos.map((video) => {
            const screen = video.screen ? screens[video.screen] : null;
            return (
              <li
                key={video.number}
                className="relative mb-10 grid gap-5 pl-10 sm:gap-6 sm:pl-12 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] sm:items-center"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-3 size-[22px] -translate-x-1/2 rounded-full border-[3px] border-solid bg-canvas box-border"
                  style={{
                    borderColor: screen ? "#22539B" : "#9AAEC8",
                  }}
                />
                <div>
                  <p className="mono m-0 text-xs text-primary">{video.number}</p>
                  <h2 className="disp mt-1.5 text-xl font-bold sm:text-[22px]">
                    {video.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                    {video.outcome}
                  </p>
                  <span
                    className="mt-4 inline-flex rounded-full px-3 py-1.5 text-[12px] font-semibold"
                    style={{ background: tints[video.audience] || "#EEF2F7" }}
                  >
                    {video.audience}
                  </span>
                </div>
                <div className="soft overflow-hidden rounded-[20px]">
                  {screen ? (
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={screen.width}
                      height={screen.height}
                      className="block h-auto w-full opacity-80"
                      sizes="288px"
                    />
                  ) : (
                    <div className="grid aspect-video place-items-center bg-band px-4 text-center">
                      <span className="disp text-lg font-bold text-ink-soft">
                        {video.title}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-line px-4 py-4">
                    <button
                      type="button"
                      disabled
                      className="btn btn-s min-h-11 w-full justify-center text-sm opacity-70"
                    >
                      {tutorials.pending}
                    </button>
                    <p className="mono mt-2 m-0 text-center text-[11px] tracking-[0.08em] text-ink-soft">
                      {tutorials.pendingNote}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="soft mt-16 flex flex-col items-start gap-5 rounded-[26px] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <h2 className="disp m-0 text-xl font-bold sm:text-2xl">
              {tutorials.cta.title}
            </h2>
            <p className="mt-2 mb-0 max-w-xl text-[15px] text-ink-muted">
              {tutorials.cta.body}
            </p>
          </div>
          <Link href={tutorials.cta.href} className="btn btn-p w-full sm:w-auto">
            {tutorials.cta.label}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
