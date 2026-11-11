import { footer, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-start gap-3 border-t border-line bg-canvas px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-[clamp(16px,5vw,64px)] sm:py-9">
      <span className="disp text-xl font-extrabold">{site.name}</span>
      <p className="m-0 max-w-md text-sm leading-relaxed text-ink-soft sm:max-w-none sm:text-right">
        {footer.note}
      </p>
    </footer>
  );
}
