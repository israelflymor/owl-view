// Owl View — single source of truth for business data.
// Update these values to redeploy for another brand.

export const business = {
  name: "Owl View",
  legalName: "Owl View Home Decor",
  tagline: "The wow view.",
  shortDescription:
    "Interior design, exterior finishing, renovation, painting and general building maintenance across Lagos and Ogun State.",
  longDescription:
    "Owl View is a Lagos/Ogun-based interior and building maintenance studio. We design, finish, renovate and maintain private homes and commercial spaces — from bespoke kitchens and wardrobes to curtains, blinds, painting and full construction handover.",
  founded: 2018,
  registrationNumber: "RC: 2580011",

  // Contact — form-only per client preference. Email kept as fallback in footer.
  contact: {
    formOnly: true,
    email: "hello@owlview.design",
    // Publicly displayed? No. Kept for form-side notifications later.
    phoneInternal: "+2348132386226",
  },

  // Service area (no public address — LocalBusiness with areaServed)
  serviceArea: {
    type: "regional" as const,
    baseCity: "Lagos",
    regions: ["Lagos State", "Ogun State"],
    country: "NG",
  },

  social: {
    instagram: "https://instagram.com/owlview_decor",
  },

  services: [
    {
      slug: "interior-design",
      title: "Interior Design",
      summary:
        "Bespoke residential and commercial interiors — space planning, joinery, finishing and styling.",
    },
    {
      slug: "kitchens-wardrobes",
      title: "Kitchens & Wardrobes",
      summary:
        "Custom-built kitchens, walk-in wardrobes and cabinetry in premium finishes.",
    },
    {
      slug: "curtains-blinds",
      title: "Curtains & Blinds",
      summary:
        "Made-to-measure curtains, sheers, day-and-night roller blinds and window dressings.",
    },
    {
      slug: "painting-finishing",
      title: "Painting & Finishing",
      summary:
        "Interior and exterior painting, POP ceilings, wall panels and decorative finishing.",
    },
    {
      slug: "renovation",
      title: "Renovation & Remodelling",
      summary:
        "Full-room and whole-property renovations delivered on schedule and on budget.",
    },
    {
      slug: "construction-maintenance",
      title: "Construction & Maintenance",
      summary:
        "Construction-to-finish handover and ongoing general building maintenance.",
    },
  ],

  quoteScopes: [
    "Interior Design",
    "Kitchen or Wardrobe",
    "Curtains or Blinds",
    "Painting & Finishing",
    "Renovation / Remodelling",
    "Construction to Finish",
    "General Maintenance",
    "Other",
  ],

  // Placeholder testimonials — replace with real reviews before launch.
  testimonials: [
    {
      quote:
        "Owl View reimagined our entire ground floor. Every finish felt considered — the kind of work you notice a year later and still love.",
      author: "[Replace with real review]",
      role: "Private residence, Lekki",
    },
    {
      quote:
        "Delivered our kitchen and wardrobes on schedule. Craftsmanship and communication were both excellent.",
      author: "[Replace with real review]",
      role: "Homeowner, Ikoyi",
    },
    {
      quote:
        "They handled our construction-to-finish handover end to end. We moved in without a single snag.",
      author: "[Replace with real review]",
      role: "Family home, Abeokuta",
    },
  ],
} as const;

export type Business = typeof business;
