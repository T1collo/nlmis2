import Link from "next/link";

import { Mark } from "@/components/mark";
import { nav, notFound, site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col bg-surface px-[clamp(16px,4vw,64px)] pt-[18px] pb-[clamp(48px,6vw,80px)] text-ink">
      <nav
        aria-label="Primary"
        className="soft mx-auto flex w-full max-w-[76rem] items-center gap-3 rounded-full py-2 pr-2 pl-[22px]"
      >
        <Link
          href="/"
          aria-label={nav.homeLabel}
          className="inline-flex min-h-11 items-center gap-2.5 text-ink no-underline"
        >
          <Mark />
          <span className="disp text-xl font-extrabold">{site.name}</span>
        </Link>
        <Link
          href={nav.cta.href}
          className="btn btn-p ml-auto min-h-[46px] px-4 text-sm sm:px-[26px] sm:text-base"
        >
          <span className="sm:hidden">Onboard</span>
          <span className="hidden sm:inline">{nav.cta.label}</span>
        </Link>
      </nav>

      <div className="nf mx-auto w-full max-w-[76rem] flex-1 pt-[clamp(48px,7vw,96px)]">
        <div className="flex flex-col gap-[22px]">
          <p className="mono m-0 text-xs tracking-[0.08em] text-ink-soft">
            {notFound.tag}
          </p>
          <h1 className="disp text-display-lg m-0 leading-[1.02] font-extrabold">
            {notFound.headline[0]}{" "}
            <span className="text-primary">{notFound.headline[1]}</span>
          </h1>
          <p className="lede m-0 max-w-[30rem]">{notFound.body}</p>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <Link
              href={notFound.primary.href}
              className="btn btn-p w-full justify-center sm:w-auto"
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
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {notFound.primary.label}
            </Link>
            <Link
              href={notFound.secondary.href}
              className="btn btn-s w-full justify-center sm:w-auto"
            >
              {notFound.secondary.label}
            </Link>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1.5 p-0">
            {notFound.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="nf-map soft relative aspect-square overflow-hidden rounded-[32px]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundSize: "40px 40px",
              backgroundImage:
                "linear-gradient(to right, #EEF2F7 1px, transparent 1px), linear-gradient(to bottom, #EEF2F7 1px, transparent 1px)",
            }}
          />
          <span className="absolute top-[10%] left-[22%] ml-[-1.5px] h-[34%] w-[3px] bg-primary" />
          <span
            className="absolute top-[44%] left-[22%] ml-[-1.5px] h-[20%] w-[3px]"
            style={{
              background:
                "repeating-linear-gradient(180deg, #9AAEC8 0 10px, transparent 10px 22px)",
            }}
          />
          <span
            className="absolute top-[64%] left-[22%] mt-[-1.5px] h-[3px] w-[52%]"
            style={{
              background:
                "repeating-linear-gradient(90deg, #9AAEC8 0 10px, transparent 10px 22px)",
            }}
          />
          <span className="absolute top-[10%] left-[22%] size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary bg-canvas box-border" />
          <span className="absolute top-[44%] left-[22%] size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary bg-canvas box-border" />
          <span className="absolute top-[64%] left-[74%] size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#9AAEC8] bg-canvas box-border" />
          <span className="mono absolute top-[calc(10%-8px)] left-[calc(22%+24px)] text-xs text-primary">
            {notFound.map.home}
          </span>
          <span className="mono absolute top-[calc(44%-8px)] left-[calc(22%+24px)] text-xs text-primary">
            {notFound.map.last}
          </span>
          <div className="absolute top-[28%] left-[64%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="soft rounded-[14px] px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap">
              {notFound.map.here}
            </span>
            <svg width="34" height="46" viewBox="0 0 34 46" className="mt-1.5">
              <path
                d="M17 45s15-15.5 15-27A15 15 0 0 0 2 18c0 11.5 15 27 15 27z"
                fill="#2F8A92"
              />
              <circle cx="17" cy="18" r="6" fill="#FFFFFF" />
            </svg>
          </div>
          <p className="disp absolute right-[8%] bottom-[6%] m-0 text-[clamp(3rem,8vw,5.5rem)] leading-none font-extrabold text-[#E8EEF6]">
            404
          </p>
        </div>
      </div>
    </main>
  );
}
