// Featured case studies — one per combined service + project card.
// Single source of truth so homepage cards, /projects and detail pages stay consistent.

import kitchenGrey from "@/assets/real-kitchen-grey.jpg";
import kitchenGreyAvif from "@/assets/real-kitchen-grey.jpg?w=480;768;1024;1280&format=avif&as=srcset";
import kitchenGreyWebp from "@/assets/real-kitchen-grey.jpg?w=480;768;1024;1280&format=webp&as=srcset";
import kitchenGreyJpg from "@/assets/real-kitchen-grey.jpg?w=480;768;1024;1280&format=jpg&as=srcset";

import wardrobe from "@/assets/real-wardrobe.jpg";
import wardrobeAvif from "@/assets/real-wardrobe.jpg?w=480;768;1024;1280&format=avif&as=srcset";
import wardrobeWebp from "@/assets/real-wardrobe.jpg?w=480;768;1024;1280&format=webp&as=srcset";
import wardrobeJpg from "@/assets/real-wardrobe.jpg?w=480;768;1024;1280&format=jpg&as=srcset";

import exterior from "@/assets/real-exterior.jpg";
import exteriorAvif from "@/assets/real-exterior.jpg?w=480;768;1024;1280&format=avif&as=srcset";
import exteriorWebp from "@/assets/real-exterior.jpg?w=480;768;1024;1280&format=webp&as=srcset";
import exteriorJpg from "@/assets/real-exterior.jpg?w=480;768;1024;1280&format=jpg&as=srcset";

import kitchenWhite from "@/assets/real-kitchen-white.jpg";
import heroKitchen from "@/assets/real-hero-kitchen.jpg";
import curtains from "@/assets/real-curtains.jpg";
import blinds from "@/assets/real-blinds.jpg";

export interface ProjectImage {
  src: string;
  avif: string;
  webp: string;
  jpg: string;
  alt: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  serviceSlug: string;
  serviceTitle: string;
  title: string;
  location: string;
  scope: string;
  year: string;
  cardSummary: string;
  intro: string;
  sections: ProjectSection[];
  image: ProjectImage;
  gallery: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    slug: "ikoyi-graphite-stone-kitchen",
    serviceSlug: "kitchens-wardrobes",
    serviceTitle: "Kitchens & Wardrobes",
    title: "Graphite & stone kitchen",
    location: "Ikoyi, Lagos",
    scope: "Kitchen design, joinery, stone worktops, lighting",
    year: "2024",
    cardSummary:
      "Custom-built kitchens, walk-in wardrobes and cabinetry in premium finishes.",
    intro:
      "A compact Ikoyi apartment kitchen rebuilt around graphite cabinetry, veined stone and warm concealed lighting — a quiet, hard-wearing room that still reads as the best space in the home.",
    sections: [
      {
        heading: "The brief",
        body: "The owners cooked daily but hated the dated, cramped layout and poor lighting. They wanted a darker, calmer palette that would not show wear, more usable storage, and a worktop run long enough for two people to work side by side.",
      },
      {
        heading: "Scope of work",
        body: "Full strip-out, re-planned services, bespoke floor-to-ceiling cabinetry, integrated appliance housings, stone worktops and upstands, under-cabinet and plinth lighting, and final snagging before handover.",
      },
      {
        heading: "Materials & finishes",
        body: "Graphite matte lacquer fronts with shadow-gap handles, veined stone surfaces, brushed metal ironmongery, and a warm 2700K cove and task lighting scheme layered for evening use.",
      },
      {
        heading: "Outcome",
        body: "Storage volume increased by roughly a third with no change to the footprint, and the kitchen now carries the whole ground floor visually — delivered on schedule with a single point of contact throughout.",
      },
    ],
    image: {
      src: kitchenGrey,
      avif: kitchenGreyAvif,
      webp: kitchenGreyWebp,
      jpg: kitchenGreyJpg,
      alt: "Graphite matte kitchen cabinetry with veined stone worktop and warm under-cabinet lighting in an Ikoyi apartment",
    },
    gallery: [
      {
        src: heroKitchen,
        alt: "Black and gold cove-lit kitchen island with stone surfaces",
      },
      {
        src: kitchenWhite,
        alt: "Cove-lit family kitchen with pale cabinetry and integrated appliances",
      },
    ],
  },
  {
    slug: "lekki-walk-in-wardrobe",
    serviceSlug: "interior-design",
    serviceTitle: "Interior Design",
    title: "Walk-in wardrobe joinery",
    location: "Lekki, Lagos",
    scope: "Space planning, bespoke joinery, finishing, styling",
    year: "2024",
    cardSummary:
      "Bespoke residential and commercial interiors — space planning, joinery, finishing and styling.",
    intro:
      "An underused Lekki guest room converted into a full walk-in dressing room, planned around how the clients actually store and choose their clothes.",
    sections: [
      {
        heading: "The brief",
        body: "Two wardrobes were overflowing while a spare room sat empty. The clients wanted a hotel-suite dressing experience: everything visible, nothing stacked, and lighting good enough to dress by.",
      },
      {
        heading: "Scope of work",
        body: "Space planning and elevations, bespoke open and closed joinery runs, drawer internals, a central island with jewellery inserts, mirrored panels, wall finishing and full styling at handover.",
      },
      {
        heading: "Materials & finishes",
        body: "Warm oak veneer carcasses with soft-close hardware, fluted glass fronts, brushed brass rails and handles, and integrated LED strips inside every hanging and shelf run.",
      },
      {
        heading: "Outcome",
        body: "Hanging capacity more than doubled, morning routines shortened, and the room now functions as a genuine extension of the master suite rather than dead space.",
      },
    ],
    image: {
      src: wardrobe,
      avif: wardrobeAvif,
      webp: wardrobeWebp,
      jpg: wardrobeJpg,
      alt: "Walk-in wardrobe with warm oak joinery, LED-lit hanging rails and a central drawer island in Lekki",
    },
    gallery: [
      { src: curtains, alt: "Champagne drapery with sheer inner curtains" },
      { src: blinds, alt: "Day and night roller blinds in a bright room" },
    ],
  },
  {
    slug: "abeokuta-construction-to-finish",
    serviceSlug: "construction-maintenance",
    serviceTitle: "Construction & Maintenance",
    title: "Construction to finish",
    location: "Abeokuta, Ogun State",
    scope: "Construction, exterior finishing, painting, maintenance plan",
    year: "2023",
    cardSummary:
      "Construction-to-finish handover and ongoing general building maintenance.",
    intro:
      "A family home taken from structure to move-in condition: exterior finishing, painting, internal fit-out and a maintenance schedule the owners still run today.",
    sections: [
      {
        heading: "The brief",
        body: "The clients had a partially completed structure and no appetite for managing separate trades. They wanted one team accountable for finishing the building and handing it over ready to live in.",
      },
      {
        heading: "Scope of work",
        body: "Structural completion, screeding and plastering, exterior render and finishing, full interior and exterior painting, joinery installation, snagging, and a written maintenance schedule after handover.",
      },
      {
        heading: "Materials & finishes",
        body: "Weather-resistant exterior coatings suited to Ogun's rainfall, durable washable interior emulsions, POP ceiling detailing, and hardwood joinery finished on site.",
      },
      {
        heading: "Outcome",
        body: "Handed over with zero outstanding snags at move-in, and the family remains on an ongoing general maintenance arrangement with our team.",
      },
    ],
    image: {
      src: exterior,
      avif: exteriorAvif,
      webp: exteriorWebp,
      jpg: exteriorJpg,
      alt: "Completed residential building exterior with fresh render and finished painting in Abeokuta, Ogun State",
    },
    gallery: [
      { src: kitchenWhite, alt: "Finished interior kitchen after handover" },
      { src: heroKitchen, alt: "Interior finishing detail with cove lighting" },
    ],
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectByServiceSlug = (slug: string) =>
  projects.find((p) => p.serviceSlug === slug);

export const cardSizes =
  "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
