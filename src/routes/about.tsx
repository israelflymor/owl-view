import { createFileRoute, Link } from "@tanstack/react-router";
import { business } from "@/config/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Owl View Studio" },
      {
        name: "description",
        content:
          "Owl View is a Lagos-based interior and building maintenance studio serving Lagos and Ogun State since 2018.",
      },
      { property: "og:title", content: "About — Owl View" },
      { property: "og:description", content: "The studio behind the wow view." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: business.legalName,
          alternateName: business.name,
          foundingDate: `${business.founded}`,
          description: business.longDescription,
          areaServed: business.serviceArea.regions,
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const years = new Date().getFullYear() - business.founded;
  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="eyebrow">About</div>
            <h1 className="heading-display text-5xl md:text-7xl mt-4 text-primary">
              The studio behind the <em className="text-accent not-italic">wow view</em>.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Owl View began in {business.founded} as a small interior team obsessed with the
              details most studios overlook — the seam of a curtain, the shadow line under a
              cabinet, the moment a room finally holds together. {years} years and dozens of homes
              later, we've grown into a full studio covering design, construction, painting,
              joinery and long-term maintenance.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work across {business.serviceArea.regions.join(" and ")}, with a small in-house
              team and a hand-picked network of craftspeople. Every project runs through a single
              point of contact — no confusion, no chain of subcontractors, no surprises.
            </p>
          </div>
          <aside className="md:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="eyebrow">Studio</div>
              <dl className="mt-6 space-y-5 text-sm">
                <Row k="Founded" v={`${business.founded}`} />
                <Row k="Registration" v={business.registrationNumber} />
                <Row k="Based in" v={`${business.serviceArea.baseCity}, Nigeria`} />
                <Row k="Serving" v={business.serviceArea.regions.join(" · ")} />
                <Row k="Services" v={`${business.services.length} lines under one roof`} />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page mt-24">
        <div className="eyebrow">How we work</div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Listen", d: "You send a brief. We visit, measure and understand how you actually live in the space." },
            { n: "02", t: "Design & plan", d: "We return with a plan, moodboard, working budget and a schedule you can hold us to." },
            { n: "03", t: "Build & hand over", d: "In-house teams execute; you get one point of contact from first sketch to final snag." },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl border border-border bg-card p-7">
              <div className="heading-display text-4xl text-accent">{p.n}</div>
              <div className="heading-display text-2xl text-primary mt-3">{p.t}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-24 text-center">
        <h2 className="heading-display text-4xl md:text-5xl text-primary max-w-2xl mx-auto">
          Ready when you are.
        </h2>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
        >
          Start a project
        </Link>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
      <dt className="text-muted-foreground uppercase tracking-wider text-xs">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}
