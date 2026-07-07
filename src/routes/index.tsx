import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-interior.jpg";
import projWardrobe from "@/assets/project-wardrobe.jpg";
import projCurtains from "@/assets/project-curtains.jpg";
import projLiving from "@/assets/project-living.jpg";
import projExterior from "@/assets/project-exterior.jpg";
import { business } from "@/config/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Owl View — Bespoke Interiors & Building Maintenance in Lagos & Ogun" },
      {
        name: "description",
        content:
          "Coastal-luxury interiors, renovation and building maintenance across Lagos and Ogun State. Kitchens, wardrobes, curtains, painting and construction to finish.",
      },
      { property: "og:title", content: "Owl View — Bespoke Interiors & Building Maintenance" },
      { property: "og:description", content: "Coastal-luxury interiors and renovation across Lagos & Ogun State." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = business.services.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8 items-end">
          <div className="md:col-span-6">
            <div className="eyebrow">Interiors · Renovation · Maintenance</div>
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-5 text-primary">
              Spaces designed for the <em className="text-accent not-italic">wow view</em>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              {business.longDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Request a quote <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5"
              >
                View projects
              </Link>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
              <img
                src={hero}
                alt="Modern luxury kitchen interior with warm cove lighting"
                width={1600}
                height={1100}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-brand-obsidian/80 to-transparent">
                <div className="eyebrow text-brand-gold-soft">Recent · Kitchen</div>
                <div className="heading-display text-2xl md:text-3xl text-brand-ivory mt-1">
                  Waterfall island · matte cabinetry
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / proof strip */}
      <section className="container-page mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-y border-border py-10">
          {[
            { k: "80+", v: "Homes finished" },
            { k: "12", v: "In-house craftsmen" },
            { k: "6", v: "Service lines" },
            { k: "2", v: "States covered" },
          ].map((s) => (
            <div key={s.v}>
              <div className="heading-display text-4xl md:text-5xl text-primary">{s.k}</div>
              <div className="eyebrow mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="container-page mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="eyebrow">What we do</div>
            <h2 className="heading-display text-4xl md:text-5xl mt-3 text-primary max-w-2xl">
              One studio for design, build and everything after.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-medium text-primary hover:text-accent underline underline-offset-4"
          >
            All services →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <div
              key={s.slug}
              className="group rounded-2xl border border-border bg-card p-6 md:p-7 hover:border-accent/60 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">0{i + 1}</span>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-accent transition-colors"
                />
              </div>
              <h3 className="heading-display text-2xl mt-6 text-primary">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="container-page mt-24">
        <div className="eyebrow">Selected work</div>
        <h2 className="heading-display text-4xl md:text-5xl mt-3 text-primary max-w-2xl">
          A quiet confidence in every finish.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-6">
          {[
            { src: projWardrobe, title: "Walk-in wardrobe", tag: "Lekki", span: "md:col-span-3" },
            { src: projLiving, title: "Aubergine lounge", tag: "Ikoyi", span: "md:col-span-3" },
            { src: projCurtains, title: "Champagne drapery", tag: "Magodo", span: "md:col-span-4" },
            { src: projExterior, title: "Construction to finish", tag: "Abeokuta", span: "md:col-span-2" },
          ].map((p) => (
            <figure key={p.title} className={`relative overflow-hidden rounded-2xl ${p.span}`}>
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                width={1200}
                height={900}
                className="w-full h-72 md:h-96 object-cover transition-transform duration-700 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-brand-obsidian/80 to-transparent">
                <div className="eyebrow text-brand-gold-soft">{p.tag}</div>
                <div className="heading-display text-xl text-brand-ivory mt-1">{p.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page mt-24">
        <div className="eyebrow">Client words</div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {business.testimonials.map((t) => (
            <blockquote key={t.author} className="rounded-2xl border border-border bg-card p-7">
              <p className="heading-display text-2xl text-primary leading-snug">"{t.quote}"</p>
              <footer className="mt-6 text-sm text-muted-foreground">
                <div className="font-medium text-foreground">{t.author}</div>
                <div>{t.role}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16">
          <div className="max-w-2xl relative z-10">
            <div className="eyebrow text-accent">Start a project</div>
            <h2 className="heading-display text-4xl md:text-6xl mt-4">
              Tell us what you're building. We'll bring the view.
            </h2>
            <p className="mt-5 text-primary-foreground/80 max-w-lg">
              Send us a brief and we'll come back within one working day with next steps, timing
              and a working budget range.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              Request a quote <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />
        </div>
      </section>
    </>
  );
}
