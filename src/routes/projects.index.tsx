import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/config/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Owl View | Selected Work" },
      {
        name: "description",
        content: "Explore completed Owl View case studies in bespoke kitchens, wardrobe joinery and construction across Lagos and Ogun State.",
      },
      { property: "og:title", content: "Projects — Owl View | Selected Work" },
      { property: "og:description", content: "Completed interiors, joinery and construction case studies from Owl View." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://owl-view.lovable.app/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://owl-view.lovable.app/projects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: projects.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "CreativeWork", name: project.title, description: project.intro },
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
        <div className="eyebrow">Selected work · Lagos &amp; Ogun</div>
        <h1 className="heading-display text-5xl md:text-7xl mt-4 text-primary max-w-4xl">
          Considered spaces. Carefully finished.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          A closer look at completed Owl View projects, from bespoke joinery and interior design to construction and finishing.
        </p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4 hover:text-accent">
          Explore all six services <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="container-page mt-14 md:mt-20 mb-20">
        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.slug} className="group">
              <Link to="/projects/$slug" params={{ slug: project.slug }} className="block overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <picture>
                  <source type="image/avif" srcSet={project.image.avif} sizes="(min-width: 768px) 50vw, 100vw" />
                  <source type="image/webp" srcSet={project.image.webp} sizes="(min-width: 768px) 50vw, 100vw" />
                  <img
                    src={project.image.src}
                    srcSet={project.image.jpg}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    alt={project.image.alt}
                    width={1280}
                    height={853}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </picture>
              </Link>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">{project.serviceTitle} · {project.location}</div>
                  <h2 className="heading-display mt-2 text-3xl text-primary">{project.title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.intro}</p>
                </div>
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  aria-label={`View project: ${project.title}`}
                  className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="eyebrow">From idea to handover</div>
            <h2 className="heading-display mt-2 text-3xl text-primary">See what we can do for your space.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground">Browse services</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Request a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
