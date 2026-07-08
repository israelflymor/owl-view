import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import realHero from "@/assets/real-hero-kitchen.jpg";
import realKitchenWhite from "@/assets/real-kitchen-white.jpg";
import realKitchenGrey from "@/assets/real-kitchen-grey.jpg";
import realWardrobe from "@/assets/real-wardrobe.jpg";
import realCurtains from "@/assets/real-curtains.jpg";
import realBlinds from "@/assets/real-blinds.jpg";
import realExterior from "@/assets/real-exterior.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Owl View" },
      {
        name: "description",
        content:
          "A visual gallery of Owl View interiors, kitchens, wardrobes, drapery, blinds and exterior work across Lagos and Ogun State.",
      },
      { property: "og:title", content: "Gallery — Owl View" },
      { property: "og:description", content: "Selected finished rooms and spaces." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

type Category = "All" | "Kitchens" | "Wardrobes" | "Drapery" | "Blinds" | "Exteriors";

const items: {
  src: string;
  title: string;
  tag: string;
  category: Exclude<Category, "All">;
  span: string;
}[] = [
  { src: realHero, title: "Black & gold cove-lit kitchen", tag: "Kitchen · Lekki Phase 1", category: "Kitchens", span: "md:col-span-8 md:row-span-2" },
  { src: realWardrobe, title: "Walk-in wardrobe joinery", tag: "Wardrobe · Ikoyi", category: "Wardrobes", span: "md:col-span-4" },
  { src: realKitchenWhite, title: "Cove-lit family kitchen", tag: "Kitchen · Magodo", category: "Kitchens", span: "md:col-span-4" },
  { src: realCurtains, title: "Champagne drapery", tag: "Curtains · Magodo", category: "Drapery", span: "md:col-span-6" },
  { src: realKitchenGrey, title: "Graphite & stone kitchen", tag: "Kitchen · Ikoyi", category: "Kitchens", span: "md:col-span-6" },
  { src: realExterior, title: "Construction to finish", tag: "Build · Abeokuta", category: "Exteriors", span: "md:col-span-8" },
  { src: realBlinds, title: "Day & night blinds", tag: "Blinds · Ogba", category: "Blinds", span: "md:col-span-4" },
];

const categories: Category[] = ["All", "Kitchens", "Wardrobes", "Drapery", "Blinds", "Exteriors"];

function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active],
  );

  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <div className="eyebrow">Gallery</div>
        <h1 className="heading-display text-5xl md:text-7xl mt-4 text-primary max-w-4xl">
          Rooms with the <em className="text-accent not-italic">wow view</em>.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
          A visual record of recent Owl View work across Lagos and Ogun State. Filter by category
          to explore.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/70 hover:border-accent hover:text-primary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section className="container-page mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[16rem] md:auto-rows-[14rem]">
          {filtered.map((p) => (
            <figure
              key={p.title}
              className={`relative overflow-hidden rounded-2xl border border-border row-span-1 ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                width={1600}
                height={1200}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
