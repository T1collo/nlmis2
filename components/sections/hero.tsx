import Image from "next/image";
import Link from "next/link";

import { hero } from "@/content/site";

function bars(seed: number, count: number) {
  let s = seed;
  let x = 8;
  let d = "M0 0h2v64h-2zM4 0h2v64h-2z";
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  for (let i = 0; i < count; i++) {
    const w = 1 + Math.floor(rnd() * 4);
    const gap = 1 + Math.floor(rnd() * 3);
    d += `M${x} 0h${w}v64h-${w}z`;
    x += w + gap;
  }
  d += `M${x} 0h2v64h-2zM${x + 4} 0h2v64h-2z`;
  return { d, w: x + 6 };
}

export function Hero() {
  const bar = bars(7, 70);

  return (
    <header
      id="top"
      className="sec"
      style={{
        paddingTop: "clamp(48px, 6vw, 88px)",
        paddingBottom: "clamp(48px, 8vw, 120px)",
      }}
    >
      <div className="mx-auto flex max-w-[62rem] flex-col items-center text-center">
        <p className="tag mb-[22px]">{hero.eyebrow}</p>
        <h1 className="disp text-display-lg m-0 leading-[1.02] font-extrabold text-ink">
          {hero.headline[0]}{" "}
          <span className="text-primary">{hero.headline[1]}</span>
        </h1>
        <p className="lede mt-5 max-w-[34rem]">
          {hero.body}
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
          <Link
            href={hero.primaryCta.href}
            className="btn btn-p w-full justify-center sm:w-auto"
          >
            {hero.primaryCta.label}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="btn btn-s w-full justify-center sm:w-auto"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative mt-[clamp(48px,6vw,80px)]">
        <div className="soft rounded-[20px] p-1.5 sm:rounded-[28px] sm:p-2.5">
          <Image
            src={hero.screen.src}
            alt={hero.screen.alt}
            width={hero.screen.width}
            height={hero.screen.height}
            className="block h-auto w-full rounded-[16px] sm:rounded-[20px]"
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>

        <div className="hero-matched soft absolute top-[-28px] right-[clamp(-8px,-1vw,0px)] flex items-center gap-3 rounded-[18px] px-[18px] py-3.5">
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-full bg-[#E6F2F3]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2F8A92"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>
            <strong className="block text-[15px]">{hero.matched.title}</strong>
            <span className="text-[13px] text-ink-soft">{hero.matched.note}</span>
          </span>
        </div>

        <div
          className="ship-label absolute bottom-[-84px] left-[-2%] w-[min(28rem,46%)] -rotate-[2.5deg] overflow-visible border-2 border-ink bg-canvas shadow-[0_30px_60px_-24px_rgba(16,36,61,.45)]"
          role="img"
          aria-label={hero.ship.aria}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-58px] right-[-46px] flex size-[7.5rem] -rotate-[10deg] flex-col items-center justify-center rounded-full border-[3px] border-primary bg-white/88 text-center text-primary shadow-[inset_0_0_0_4px_rgba(255,255,255,.9),inset_0_0_0_5px_#22539B] max-[900px]:top-[-36px] max-[900px]:right-[-12px] max-[900px]:size-[6.25rem]"
          >
            <span className="mono text-[8px] tracking-[0.16em] sm:text-[9px]">
              {hero.ship.stamp.eyebrow}
            </span>
            <span className="disp text-[17px] leading-[0.95] font-extrabold tracking-[-0.01em] sm:text-[21px]">
              {hero.ship.stamp.lines[0]}
              <br />
              {hero.ship.stamp.lines[1]}
            </span>
            <span className="mono text-[8px] tracking-[0.16em] sm:text-[9px]">
              {hero.ship.stamp.year}
            </span>
          </div>

          <div className="flex items-baseline gap-3.5 px-3.5 py-3">
            <span className="disp text-lg font-extrabold tracking-[-0.02em]">
              NLMIS
            </span>
            <span className="mono text-[11px] tracking-[0.1em] text-ink-muted">
              {hero.ship.code}
            </span>
          </div>
          {(
            [
              [hero.ship.fromLabel, hero.ship.from],
              [hero.ship.toLabel, hero.ship.to],
              [hero.ship.contentsLabel, hero.ship.contents],
              [hero.ship.recordLabel, hero.ship.record],
              [hero.ship.statusLabel, hero.ship.status],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[4.75rem_minmax(0,1fr)] border-t border-ink sm:grid-cols-[6.5rem_minmax(0,1fr)]"
            >
              <span className="mono border-r border-ink px-2 py-2.5 text-[10px] tracking-[0.1em] sm:px-3 sm:text-[11px]">
                {label}
              </span>
              <span className="min-w-0 px-2 py-2.5 text-[13px] leading-snug font-semibold break-words sm:px-3 sm:text-sm">
                {value}
              </span>
            </div>
          ))}
          <div className="border-t border-ink px-3 py-2.5">
            <svg
              width={bar.w}
              height="28"
              viewBox={`0 0 ${bar.w} 64`}
              className="h-7 w-full"
              aria-hidden="true"
            >
              <path d={bar.d} fill="#10243D" />
            </svg>
            <p className="mono mt-2 mb-0 text-center text-xs tracking-[0.16em]">
              {hero.ship.barcodeCaption}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
