import Image from "next/image";

import { platform, screens } from "@/content/site";

export function Platform() {
  return (
    <section
      id="platform"
      className="sec bg-band"
      aria-labelledby="pf-t"
    >
      <p className="tag mb-3.5">{platform.eyebrow}</p>
      <h2 id="pf-t" className="h2 text-display">
        {platform.headline[0]}{" "}
        <span className="text-primary">{platform.headline[1]}</span>
      </h2>
      <div className="bento mt-8">
        {platform.modules.map((mod) => {
          const screen = mod.screen ? screens[mod.screen] : null;
          return (
            <article
              key={mod.number}
              className={`soft flex flex-col gap-2 overflow-hidden ${
                mod.size === "big"
                  ? "b-big px-5 pt-5 pb-0 sm:px-6 sm:pt-6"
                  : "b-sm p-5"
              }`}
            >
              <p className="mono m-0 text-[11px] text-primary">{mod.number}</p>
              <h3
                className={`disp m-0 font-bold ${
                  mod.size === "big"
                    ? "text-xl sm:text-[22px]"
                    : "mb-1.5 text-lg"
                }`}
              >
                {mod.title}
              </h3>
              <p
                className={`m-0 leading-relaxed text-ink-muted ${
                  mod.size === "big"
                    ? "max-w-[28rem] text-sm"
                    : "text-[13px] sm:text-sm"
                }`}
              >
                {mod.body}
              </p>
              {screen ? (
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  className="mt-[18px] block h-auto w-full max-w-none rounded-tl-[14px] shadow-[0_0_0_1px_#D8E3EF] sm:w-[112%]"
                  sizes="(max-width: 980px) 100vw, 50vw"
                />
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
