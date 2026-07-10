## Merge "What we do" + "Selected work" into 3 combined cards

Replace the two separate sections on the homepage with a single section containing **3 cards**. Each card pairs one service with one real project photo — the service line is the headline; the project acts as the visual proof.

### Proposed 3 pairings

| # | Service (from `business.services`) | Project image | Location tag |
|---|---|---|---|
| 1 | Kitchens & Wardrobes | `real-kitchen-grey.jpg` | Ikoyi — Graphite & stone kitchen |
| 2 | Interior Design | `real-wardrobe.jpg` | Lekki — Walk-in wardrobe joinery |
| 3 | Construction & Maintenance | `real-exterior.jpg` | Abeokuta — Construction to finish |

(Drops: Curtains & Blinds, Painting & Finishing, Renovation from the featured grid — still available on the Services/Projects pages.)

### Card anatomy

```text
┌───────────────────────────────┐
│  [ project image, ~4:3 ]      │
│                               │
│  eyebrow: 01 · Ikoyi          │
│  H3: Kitchens & Wardrobes     │
│  p:  Custom-built kitchens…   │
│  →   See project              │
└───────────────────────────────┘
```

- Image on top (rounded, object-cover), text below on a card surface.
- Eyebrow shows index + location tag.
- Headline = service title.
- Body = service `summary`.
- Link/arrow → `/projects` (single destination; project detail pages don't exist yet).
- Hover: subtle image zoom + border/accent shift (keeps the current design language).

### Section header

- Eyebrow: "What we do · Selected work"
- H2: "One studio for design, build and everything after."
- Right-side link: "All projects →" → `/projects`

### Files to change

- `src/routes/index.tsx` — remove the current "Services grid" and "Portfolio preview" sections; insert one new section with 3 cards built from a local `showcase` array (service + image + tag). No changes to `business.ts`, no new components, no route changes.

### Out of scope

- No changes to hero, stats, testimonials, or CTA sections.
- No new routes or per-project detail pages.
- No image regeneration — reuse existing `real-*.jpg` assets.
