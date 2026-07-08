import { createFileRoute, Link } from "@tanstack/react-router";
import { business } from "@/config/business";
import kitchenHero from "@/assets/real-hero-kitchen.jpg";
import kitchenWhite from "@/assets/real-kitchen-white.jpg";
import kitchenGrey from "@/assets/real-kitchen-grey.jpg";
import wardrobe from "@/assets/real-wardrobe.jpg";
import curtains from "@/assets/real-curtains.jpg";
import blinds from "@/assets/real-blinds.jpg";
import exterior from "@/assets/real-exterior.jpg";

const imageBySlug: Record<string, string> = {
  "interior-design": kitchenHero,
  "kitchens-wardrobes": wardrobe,
  "curtains-blinds": curtains,
  "painting-finishing": kitchenWhite,
  "renovation": kitchenGrey,
  "construction-maintenance": exterior,
};

const extraImageBySlug: Record<string, string> = {
  "curtains-blinds": blinds,
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Owl View Service Lines" },
      {
        name: "description",
        content:
          "Explore Owl View's project categories: interior design, kitchens, wardrobes, curtains, blinds, painting, renovation and construction across Lagos & Ogun State.",
      },
      { property: "og:title", content: "Projects — Owl View" },
      { property: "og:description", content: "Every service line, with recent work." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: business.services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: s.title, description: s.summary },
          })),
        }),
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <div className="eyebrow">Projects</div>
        <h1 className="heading-display text-5xl md:text-7xl mt-4 text-primary max-w-4xl">
          Every service line, delivered end to end.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Below are the six project categories Owl View delivers. Each is handled by our in-house
          team with a single point of contact — from first sketch to final snag.
        </p>
      </section>

      <section className="container-page mt-14 md:mt-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {business.services.map((s, i) => (
            <article
              key={s.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/60 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={imageBySlug[s.slug]}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {extraImageBySlug[s.slug] && (
                  <img
                    src={extraImageBySlug[s.slug]}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute bottom-3 right-3 h-16 w-20 rounded-md object-cover border-2 border-brand-ivory shadow-lg"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">0{i + 1}</span>
                  <span className="text-xs text-muted-foreground">{s.slug.replace(/-/g, " · ")}</span>
                </div>
                <h2 className="heading-display text-2xl mt-4 text-primary">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {s.summary}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-primary/30 px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Enquire about {s.title.toLowerCase()}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page mt-24">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center">
          <div className="eyebrow text-accent">Not sure where to start?</div>
          <h2 className="heading-display text-4xl md:text-5xl mt-3">
            Send us the room. We'll send back a plan.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
