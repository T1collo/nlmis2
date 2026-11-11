import { partners, standards } from "@/content/site";

export function Standards() {
  return (
    <section
      id="standards"
      className="sec bg-band"
      aria-labelledby="st-t"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-12 gap-x-[72px]">
        <div>
          <p className="tag mb-3.5">{standards.eyebrow}</p>
          <h2 id="st-t" className="h2 text-display">
            {standards.headline}
          </h2>
          <p className="lede mt-3.5">{standards.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {standards.chips.map((chip) => (
              <span
                key={chip}
                className="soft rounded-full px-3.5 py-2 text-sm font-semibold"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div id="partners">
          <p className="tag mb-3.5">{partners.eyebrow}</p>
          <h2 className="h2 text-display">{partners.headline}</h2>
          <ul className="mt-5 flex list-none flex-col gap-2 p-0">
            {partners.organisations.map((org) => (
              <li key={org.name} className="soft rounded-2xl px-4 py-3.5 sm:px-5">
                <strong className="disp text-base sm:text-lg">{org.name}</strong>
                <span className="mt-1 block text-sm text-ink-muted">
                  {org.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
