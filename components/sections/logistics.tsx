import { logistics } from "@/content/site";

export function Logistics() {
  return (
    <section
      id="logistics"
      className="sec bg-logistics"
      aria-labelledby="lg-t"
    >
      <p className="tag mb-3.5 text-teal">{logistics.eyebrow}</p>
      <h2 id="lg-t" className="h2 text-display max-w-[44rem]">
        {logistics.headline[0]}{" "}
        <span className="text-teal">{logistics.headline[1]}</span>
      </h2>
      <p className="lede mt-3.5 max-w-[34rem]">{logistics.body}</p>
      <ol className="soft mt-8 grid list-none grid-cols-1 gap-x-4 gap-y-6 rounded-[22px] p-[clamp(18px,3vw,32px)] min-[420px]:grid-cols-[repeat(auto-fit,minmax(10.5rem,1fr))]">
        {logistics.legs.map((leg) => (
          <li key={leg.number} className="flex flex-col gap-2">
            <div aria-hidden="true" className="flex items-center gap-0">
              <span className="size-4 shrink-0 rounded-full border-[3px] border-teal bg-canvas box-border" />
              <span
                className="h-[3px] flex-1"
                style={{
                  background: "linear-gradient(90deg, #2F8A92, #22539B)",
                }}
              />
            </div>
            <span className="mono text-[11px] text-teal">{leg.number}</span>
            <h3 className="disp m-0 text-[17px] font-bold sm:text-lg">
              {leg.title}
            </h3>
            <p className="m-0 text-[13px] leading-relaxed text-ink-muted sm:text-sm">
              {leg.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
