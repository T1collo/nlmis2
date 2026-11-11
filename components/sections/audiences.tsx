import { ServiceCard } from "@/components/ui/service-card";
import { audiences } from "@/content/site";
import { cn } from "@/lib/utils";

export function Audiences() {
  return (
    <section id="audiences" className="sec" aria-labelledby="au-t">
      <p className="tag mb-3.5">{audiences.eyebrow}</p>
      <h2 id="au-t" className="h2 text-display">
        {audiences.headline}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {audiences.groups.map((group) => (
          <ServiceCard
            key={group.title}
            title={group.title}
            description={group.body}
            href={group.href}
            imgSrc={group.imgSrc}
            imgAlt={group.imgAlt}
            variant={group.variant}
            className={cn("min-h-[200px] sm:min-h-[220px]", group.span)}
          />
        ))}
      </div>
    </section>
  );
}
