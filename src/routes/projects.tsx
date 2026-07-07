import { createFileRoute } from "@tanstack/react-router";
import projWardrobe from "@/assets/project-wardrobe.jpg";
import projCurtains from "@/assets/project-curtains.jpg";
import projLiving from "@/assets/project-living.jpg";
import projExterior from "@/assets/project-exterior.jpg";
import projBlinds from "@/assets/project-blinds.jpg";
import hero from "@/assets/hero-interior.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Selected Work | Owl View" },
      {
        name: "description",
        content:
          "A selection of Owl View interiors, kitchens, wardrobes, drapery and construction projects across Lagos and Ogun State.",
      },
      { property: "og:title", content: "Projects — Owl View" },
      { property: "og:description", content: "Selected interior, renovation and construction work." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  { src: hero, title: "Cinematic kitchen", tag: "Kitchen · Lekki Phase 1", span: "md:col-span-8" },
  { src: projWardrobe, title: "Walk-in wardrobe", tag: "Joinery · Ikoyi", span: "md:col-span-4" },
  { src: projLiving, title: "Aubergine lounge", tag: "Interior · Victoria Island", span: "md:col-span-4" },
  { src: projCurtains, title: "Champagne drapery", tag: "Window dressing · Magodo", span: "md:col-span-8" },
  { src: projExterior, title: "Construction to finish", tag: "Build · Abeokuta", span: "md:col-span-6" },
  { src: projBlinds, title: "Day & night blinds", tag: "Blinds · Ogba", span: "md:col-span-6" },
];

function ProjectsPage() {
  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <div className="eyebrow">Selected work</div>
        <h1 className="heading-display text-5xl md:text-7xl mt-4 text-primary max-w-4xl">
          Rooms with the wow view.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
          A visual record of recent Owl View projects across Lagos and Ogun State. Full case
          studies coming soon.
        </p>
      </section>

      <section className="container-page mt-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {projects.map((p) => (
            <figure
              key={p.title}
              className={`relative overflow-hidden rounded-2xl border border-border ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                width={1200}
                height={900}
                className="w-full h-80 md:h-[28rem] object-cover transition-transform duration-700 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-brand-obsidian/85 to-transparent">
                <div className="eyebrow text-brand-gold-soft">{p.tag}</div>
                <div className="heading-display text-2xl text-brand-ivory mt-1">{p.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
