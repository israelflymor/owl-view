import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/config/business";
import { projectByServiceSlug } from "@/config/projects";
import kitchenHero from "@/assets/real-hero-kitchen.jpg";
import kitchenWhite from "@/assets/real-kitchen-white.jpg";
import kitchenGrey from "@/assets/real-kitchen-grey.jpg";
import wardrobe from "@/assets/real-wardrobe.jpg";
import curtains from "@/assets/real-curtains.jpg";
import blinds from "@/assets/real-blinds.jpg";
import exterior from "@/assets/real-exterior.jpg";

const serviceDetails: Record<string, { scope: string; description: string; image: string; alt: string }> = {
  "interior-design": {
    scope: "Space planning · Material selection · Styling",
    description: "A complete interior direction shaped around how you live: considered layouts, coordinated finishes, bespoke details and a cohesive final installation.",
    image: kitchenHero,
    alt: "Warm, layered kitchen interior with bespoke cabinetry and cove lighting",
  },
  "kitchens-wardrobes": {
    scope: "Kitchen design · Custom joinery · Wardrobe fit-outs",
    description: "Made-to-measure kitchens and storage, planned for daily use and built with durable hardware, refined finishes and practical detailing.",
    image: wardrobe,
    alt: "Bespoke walk-in wardrobe with warm joinery and integrated lighting",
  },
  "curtains-blinds": {
    scope: "Made-to-measure curtains · Sheers · Roller blinds",
    description: "Window treatments tailored to each room, from layered sheers and full-length drapery to day-and-night blinds and precise fitting.",
    image: curtains,
    alt: "Tailored curtains and sheer window dressing in a bright room",
  },
  "painting-finishing": {
    scope: "Interior and exterior paint · Ceilings · Wall finishes",
    description: "A polished finish begins with careful preparation. Our team handles surface repairs, colour application, ceiling details and decorative treatments.",
    image: kitchenWhite,
    alt: "Finished bright family kitchen with clean paintwork and detailed ceiling lighting",
  },
  renovation: {
    scope: "Room remodelling · Whole-home upgrades · Snagging",
    description: "Refresh a single room or rethink an entire property with coordinated trades, clear sequencing and one accountable project team.",
    image: kitchenGrey,
    alt: "Renovated graphite kitchen with stone worktops and contemporary detailing",
  },
  "construction-maintenance": {
    scope: "Construction to finish · Exterior works · Ongoing maintenance",
    description: "From an unfinished structure to move-in handover, we coordinate construction, finishing and ongoing building care across Lagos and Ogun.",
    image: exterior,
    alt: "Completed modern home exterior with fresh render and finished painting",
  },
};

const secondaryImages = [blinds, kitchenWhite, kitchenGrey, exterior, kitchenHero, wardrobe];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Interior Design, Joinery & Construction | Owl View" },
      { name: "description", content: "Explore Owl View's six service lines: interior design, kitchens and wardrobes, curtains and blinds, painting, renovation, and construction and maintenance across Lagos and Ogun." },
      { property: "og:title", content: "Services — Interior Design, Joinery & Construction | Owl View" },
      { property: "og:description", content: "Six considered service lines, delivered by one accountable studio across Lagos and Ogun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://owl-view.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <div className="eyebrow">Services · Lagos &amp; Ogun</div>
        <h1 className="heading-display mt-4 max-w-4xl text-5xl text-primary md:text-7xl">
          One studio, from first sketch to final finish.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Six connected disciplines, delivered with one point of contact and a team that sees every detail through.
        </p>
      </section>

      <section className="container-page mt-12 md:mt-16" aria-label="Owl View services">
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {business.services.map((service, index) => {
            const detail = serviceDetails[service.slug];
            const project = projectByServiceSlug(service.slug);
            return (
              <article key={service.slug} className="min-w-0">
                {project ? (
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    aria-label={`View work related to ${service.title}`}
                    className="group relative block overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                  <img
                    src={detail.image}
                    alt={detail.alt}
                    width={1200}
                    height={900}
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-sm text-primary">
                    0{index + 1}
                  </span>
                  <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-primary transition-colors group-hover:bg-accent">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  </Link>
                ) : (
                  <Link
                    to="/projects"
                    aria-label={`Browse completed work related to ${service.title}`}
                    className="group relative block overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <img
                      src={detail.image}
                      alt={detail.alt}
                      width={1200}
                      height={900}
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-sm text-primary">0{index + 1}</span>
                    <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-primary transition-colors group-hover:bg-accent"><ArrowUpRight size={18} aria-hidden="true" /></span>
                  </Link>
                )}

                <div className="mt-5">
                  <h2 className="heading-display text-3xl text-primary">{service.title}</h2>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-accent">{detail.scope}</p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{detail.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                    {project ? (
                      <Link to="/projects/$slug" params={{ slug: project.slug }} className="inline-flex items-center gap-2 font-medium text-primary underline underline-offset-4 hover:text-accent">
                        View {project.title} <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link to="/projects" className="inline-flex items-center gap-2 font-medium text-primary underline underline-offset-4 hover:text-accent">
                        Browse completed work <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                    <Link to="/contact" className="font-medium text-muted-foreground underline underline-offset-4 hover:text-primary">
                      Get a quote
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-20 border-y border-border bg-card">
        <div className="container-page grid gap-8 py-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div className="eyebrow">Related work</div>
            <h2 className="heading-display mt-3 text-4xl text-primary">See the details in the finished spaces.</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 md:col-span-5">
            {secondaryImages.slice(0, 3).map((image, index) => (
              <Link key={image} to="/projects" aria-label={`Browse Owl View projects, image ${index + 1}`} className="overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <img src={image} alt="" aria-hidden="true" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="eyebrow">Start a conversation</div>
            <h2 className="heading-display mt-3 text-4xl text-primary md:text-5xl">Tell us what your space needs.</h2>
          </div>
          <Link to="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Request a quote <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}