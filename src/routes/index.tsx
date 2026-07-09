import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import heroLiving from "@/assets/hero-slide-1.jpg";
import heroKitchenLux from "@/assets/hero-slide-2.jpg";
import projWardrobe from "@/assets/real-wardrobe.jpg";
import projKitchenWhite from "@/assets/real-kitchen-white.jpg";
import projKitchenGrey from "@/assets/real-kitchen-grey.jpg";
import projExterior from "@/assets/real-exterior.jpg";
import { business } from "@/config/business";

const heroSlides = [
  {
    src: heroLiving,
    alt: "Lagoon-view living room with bouclé sofas and travertine table at golden hour",
    eyebrow: "Interiors · Renovation · Maintenance",
    headline: (
      <>
        Spaces designed for the <em className="text-brand-gold not-italic">wow view</em>.
      </>
    ),
    description:
      "One studio for interiors, renovation and building maintenance across Lagos & Ogun — design, build and finish, in-house.",
  },
  {
    src: heroKitchenLux,
    alt: "Bespoke walnut and Calacatta marble kitchen with brass tap and warm cove lighting",
    eyebrow: "Kitchens · Stone · Cabinetry",
    headline: (
      <>
        Kitchens with a <em className="text-brand-gold not-italic">quiet</em> confidence.
      </>
    ),
    description:
      "From layout to lighting, stone tops to soft-close doors — kitchens that work as beautifully as they look.",
  },
];


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
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroLiving, fetchpriority: "high" },
    ],

  }),
  component: Home,
});

function Home() {
  const featured = business.services.slice(0, 6);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (paused) return;
    const mq = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    if (mq?.matches) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  // Prefetch the next slide's image right after mount so autoplay never blocks on network.
  useEffect(() => {
    const next = (slide + 1) % heroSlides.length;
    if (loaded.has(next)) return;
    const img = new Image();
    img.decoding = "async";
    img.src = heroSlides[next].src;
    img.onload = () => setLoaded((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
  }, [slide, loaded]);

  const goTo = (i: number) => setSlide((i + heroSlides.length) % heroSlides.length);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(slide - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); goTo(slide + 1); }
    else if (e.key === "Home") { e.preventDefault(); goTo(0); }
    else if (e.key === "End") { e.preventDefault(); goTo(heroSlides.length - 1); }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "touch") return;
    touchStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerEnd = (e: PointerEvent) => {
    if (e.pointerType !== "touch" || !touchStart.current) return;
    const dx = e.clientX - touchStart.current.x;
    const dy = e.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      goTo(slide + (dx < 0 ? 1 : -1));
    }
  };

  const current = heroSlides[slide];

  return (
    <>
      {/* Hero — full-bleed slider banner */}
      <section
        aria-roledescription="carousel"
        aria-label="Featured projects"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false); }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerEnd}
        onPointerCancel={() => { touchStart.current = null; }}
        className="relative min-h-[560px] h-[calc(100svh-4rem)] md:h-[calc(100vh-5rem)] md:min-h-[640px] lg:min-h-[720px] max-h-[900px] flex items-end overflow-hidden focus-within:outline-none touch-pan-y select-none"
      >
        <div className="absolute inset-0" aria-live="polite" aria-atomic="true">
          {heroSlides.map((s, i) => {
            const shouldLoad = i === 0 || loaded.has(i) || i === slide;
            return (
              <div
                key={s.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${heroSlides.length}: ${s.alt}`}
                aria-hidden={i !== slide}
                className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none ${
                  i === slide ? "opacity-100" : "opacity-0"
                }`}
              >
                {shouldLoad ? (
                  <img
                    src={s.src}
                    alt={i === slide ? s.alt : ""}
                    width={1920}
                    height={1280}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : null}
              </div>
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/95 via-brand-obsidian/60 to-brand-obsidian/25" />
        </div>

        <div className="container-page relative z-10 pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32 w-full">
          <div className="max-w-3xl">
            <div key={`eb-${slide}`} className="eyebrow text-brand-gold-soft animate-in fade-in slide-in-from-bottom-2 duration-700 motion-reduce:animate-none">
              {current.eyebrow}
            </div>
            <h1
              key={`h-${slide}`}
              className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-4 sm:mt-5 text-brand-ivory leading-[1.05] animate-in fade-in slide-in-from-bottom-3 duration-700 motion-reduce:animate-none"
            >
              {current.headline}
            </h1>
            <p
              key={`p-${slide}`}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-brand-ivory/85 max-w-xl leading-relaxed animate-in fade-in duration-1000 motion-reduce:animate-none"
            >
              {current.description}
            </p>
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-medium text-brand-obsidian hover:bg-brand-gold-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
              >
                Request a quote <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/40 px-6 py-3 text-sm font-medium text-brand-ivory hover:bg-brand-ivory/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
              >
                View projects
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brand-ivory/80 hover:text-brand-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
              >
                Browse gallery →
              </Link>
            </div>

            {/* Slider controls */}
            <div className="mt-10 sm:mt-12 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(slide - 1)}
                  aria-label="Previous slide"
                  className="grid place-items-center h-11 w-11 rounded-full border border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(slide + 1)}
                  aria-label="Next slide"
                  className="grid place-items-center h-11 w-11 rounded-full border border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  aria-pressed={paused}
                  className="grid place-items-center h-11 w-11 rounded-full border border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                </button>
              </div>
              <div role="tablist" aria-label="Choose slide" className="flex items-center gap-3">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    role="tab"
                    aria-selected={i === slide}
                    aria-label={`Show slide ${i + 1} of ${heroSlides.length}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian ${
                      i === slide ? "w-10 bg-brand-gold" : "w-6 bg-brand-ivory/30 hover:bg-brand-ivory/50"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="sr-only" aria-live="polite">Slide {slide + 1} of {heroSlides.length}</span>
          </div>
        </div>
      </section>


      {/* Stats / proof strip */}
      <section className="container-page mt-16 md:mt-24">

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
            to="/projects"
            className="text-sm font-medium text-primary hover:text-accent underline underline-offset-4"
          >
            All projects →
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
            { src: projWardrobe, title: "Walk-in wardrobe joinery", tag: "Lekki", span: "md:col-span-3" },
            { src: projKitchenGrey, title: "Graphite & stone kitchen", tag: "Ikoyi", span: "md:col-span-3" },
            { src: projKitchenWhite, title: "Cove-lit family kitchen", tag: "Magodo", span: "md:col-span-4" },
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
