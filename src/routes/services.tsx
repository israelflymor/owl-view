import { createFileRoute, Link } from "@tanstack/react-router";
import { business } from "@/config/business";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Interiors, Renovation & Maintenance | Owl View" },
      {
        name: "description",
        content:
          "Interior design, kitchens, wardrobes, curtains, painting, renovation and construction-to-finish across Lagos and Ogun State.",
      },
      { property: "og:title", content: "Services — Owl View" },
      { property: "og:description", content: "Full-service interior, renovation and maintenance studio." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <div className="eyebrow">Services</div>
        <h1 className="heading-display text-5xl md:text-7xl mt-4 text-primary max-w-4xl">
          Design, build and maintain — under one roof.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          A single studio for every stage of your project. Concept to construction, curtains to
          long-term maintenance — delivered with a coastal-luxury sensibility.
        </p>
      </section>

      <section className="container-page mt-16 md:mt-24">
        <div className="grid gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {business.services.map((s, i) => (
            <article key={s.slug} className="bg-card p-8 md:p-10 grid md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2">
                <div className="heading-display text-4xl text-accent">0{i + 1}</div>
              </div>
              <div className="md:col-span-6">
                <h2 className="heading-display text-3xl md:text-4xl text-primary">{s.title}</h2>
                <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">{s.summary}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
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
