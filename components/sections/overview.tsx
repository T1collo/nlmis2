import Link from "next/link";

import { overview } from "@/content/site";

export function Overview() {
  return (
    <section
      id="overview"
      className="sec"
      aria-labelledby="ov-t"
    >
      <p className="tag mb-3.5">{overview.eyebrow}</p>
      <h2 id="ov-t" className="h2 text-display max-w-[48rem]">
        {overview.headline}
      </h2>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] items-start gap-6 gap-x-12">
        <p className="lede m-0">{overview.body}</p>
        <ol className="m-0 flex list-none flex-col gap-2 p-0">
          {overview.links.map((link) => (
            <li key={link.number}>
              <Link
                href={link.href}
                className="soft flex items-center gap-3 rounded-2xl px-4 py-3.5 text-ink no-underline sm:px-5 sm:py-4"
              >
                <span className="mono text-xs text-primary">{link.number}</span>
                <span className="disp text-lg font-bold sm:text-[19px]">
                  {link.title}
                </span>
                <svg
                  className="ml-auto"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22539B"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
