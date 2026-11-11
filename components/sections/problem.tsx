import { problem } from "@/content/site";

export function Problem() {
  return (
    <section
      id="problem"
      className="sec bg-band"
      aria-labelledby="pb-t"
    >
      <p className="tag mb-3.5 text-ink-soft">{problem.eyebrow}</p>
      <h2 id="pb-t" className="h2 text-display max-w-[42rem]">
        {problem.headline}
      </h2>
      <p className="lede mt-4 max-w-[36rem]">{problem.body}</p>
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-3.5">
        {problem.breaks.map((item) => (
          <div key={item.number} className="soft rounded-[18px] p-5 sm:p-6">
            <p className="mono mb-3 text-[11px] text-ink-soft">{item.number}</p>
            <h3 className="disp mb-2 text-lg font-bold sm:text-xl">
              {item.title}
            </h3>
            <p className="m-0 text-sm leading-relaxed text-ink-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
