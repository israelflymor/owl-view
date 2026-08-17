import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { business } from "@/config/business";
import { projectBySlug, projects } from "@/config/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Owl View" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    const title = `${p.title}, ${p.location} — Owl View`;
    const description = p.intro.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${p.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Projects", item: "/projects" },
                  { "@type": "ListItem", position: 3, name: p.title, item: `/projects/${p.slug}` },
                ],
              },
              {
                "@type": "CreativeWork",
                name: p.title,
                description: p.intro,
                about: p.serviceTitle,
                dateCreated: p.year,
                creator: { "@type": "Organization", name: business.name },
                locationCreated: { "@type": "Place", name: p.location },
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetailPage,
});

function ProjectNotFound() {
  return (
    <section className="container-page pt-24 pb-24 text-center">
      <div className="eyebrow">404</div>
      <h1 className="heading-display text-4xl md:text-5xl mt-4 text-primary">
        We couldn't find that project.
      </h1>
      <p className="mt-4 text-muted-foreground">
        It may have moved. Browse our full list of project lines instead.
      </p>
      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
      >
        All projects
      </Link>
    </section>
  );
}

function ProjectDetailPage() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter((o) => o.slug !== p.slug);

  return (
    <>
      <section className="container-page pt-10 md:pt-14">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} /> All projects
        </Link>
      </section>

      <section className="container-page mt-6">
        <figure className="relative overflow-hidden rounded-3xl border border-border">
          <picture>
            <source type="image/avif" srcSet={p.image.avif} sizes="100vw" />
            <source type="image/webp" srcSet={p.image.webp} sizes="100vw" />
            <img
              src={p.image.src}
              srcSet={p.image.jpg}
              sizes="100vw"
              alt={p.image.alt}
              width={1600}
              height={1067}
              loading="eager"
              fetchPriority="high"
              className="w-full h-[46vh] min-h-[18rem] md:h-[60vh] object-cover"
            />
          </picture>
          <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-brand-obsidian/90 to-transparent">
            <div className="eyebrow text-brand-gold-soft">
              {p.serviceTitle} · {p.location}
            </div>
            <h1 className="heading-display text-3xl sm:text-4xl md:text-6xl mt-2 text-brand-ivory">
              {p.title}
            </h1>
          </figcaption>
        </figure>
      </section>

      <section className="container-page mt-10">
        <dl className="grid gap-6 sm:grid-cols-3 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div>
            <dt className="eyebrow">Service</dt>
            <dd className="mt-2 text-primary">{p.serviceTitle}</dd>
          </div>
          <div>
            <dt className="eyebrow">Location</dt>
            <dd className="mt-2 text-primary">{p.location}</dd>
          </div>
          <div>
            <dt className="eyebrow">Scope</dt>
            <dd className="mt-2 text-primary">{p.scope}</dd>
          </div>
        </dl>
      </section>

      <section className="container-page mt-14 max-w-3xl">
        <p className="text-lg md:text-xl text-primary leading-relaxed">{p.intro}</p>
        <div className="mt-12 space-y-10">
          {p.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="heading-display text-2xl md:text-3xl text-primary">{s.heading}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {p.gallery.map((g) => (
            <figure key={g.src} className="overflow-hidden rounded-2xl border border-border">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
                className="w-full aspect-[4/3] object-cover"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="container-page mt-24">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center">
          <div className="eyebrow text-accent">Something similar in mind?</div>
          <h2 className="heading-display text-3xl md:text-5xl mt-3">
            Tell us about your space.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground"
          >
            Request a quote
          </Link>
        </div>
      </section>

      <section className="container-page mt-20 mb-8">
        <div className="eyebrow">More work</div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/projects/$slug"
              params={{ slug: o.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/60 transition-colors"
            >
              <img
                src={o.image.src}
                alt={o.image.alt}
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
                className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="eyebrow">{o.location}</div>
                <h3 className="heading-display text-xl mt-2 text-primary">{o.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
