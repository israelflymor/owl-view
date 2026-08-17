## Project detail pages for each service + case study

Turn the three merged homepage cards into real, shareable project pages, backed by one shared data file so the same title, image, location and copy appear everywhere.

### 1. Shared project data (`src/config/projects.ts`)

One entry per combined service + case study, keyed by slug:

| Slug | Service | Project | Location |
|---|---|---|---|
| `ikoyi-graphite-stone-kitchen` | Kitchens & Wardrobes | Graphite & stone kitchen | Ikoyi |
| `lekki-walk-in-wardrobe` | Interior Design | Walk-in wardrobe joinery | Lekki |
| `abeokuta-construction-to-finish` | Construction & Maintenance | Construction to finish | Abeokuta |

Each entry holds: slug, service slug (links back to `business.services`), project title, location, descriptive alt text, short card summary, longer body copy (brief, scope of work, materials/finishes, outcome), gallery image list, and responsive image sources (AVIF/WebP/JPG srcsets via the existing `vite-imagetools` query imports, same pattern as the hero).

Because imagetools requires static import literals, the srcset imports live in this data module and are referenced by every consumer.

### 2. New route `src/routes/projects.$slug.tsx`

- `/projects/ikoyi-graphite-stone-kitchen`, etc.
- Throws `notFound()` for unknown slugs, with a simple "project not found" state linking back to `/projects`.
- Per-project `head()`: unique title, description, og:title/og:description, canonical, plus `og:image`/`twitter:image` only when an absolute image URL is available.
- Page layout: full-width hero image with location eyebrow + project title, an at-a-glance strip (service, location, scope), body copy sections, a small gallery of related photos, and a CTA to `/contact`.
- `src/routes/projects.tsx` stays the service-line list route and gets an `<Outlet />`-free sibling structure (the detail route is a separate file; no change needed to the list route beyond linking).

### 3. Card image quality and performance

Everywhere the three cards render (homepage merged showcase, projects list):
- `<picture>` with AVIF → WebP → JPG srcsets at 480/768/1024/1280w and `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`.
- Descriptive alt text from the data file (e.g. "Graphite and stone custom kitchen with integrated cabinetry, Ikoyi"), not a generic title dump.
- Loading priority: first card gets `loading="eager"` + `fetchPriority="high"`; the rest `loading="lazy"` + `fetchPriority="low"` + `decoding="async"`.
- Explicit `width`/`height` retained to prevent layout shift.

### 4. Linking

- Each merged homepage card links to `/projects/$slug` with a clear "View project →" CTA (replaces "See project →"), plus an accessible label.
- `/projects` service cards for the three featured slugs also link to their detail page; the existing "Enquire" CTA stays.
- Add the three detail URLs to `src/routes/sitemap[.]xml.ts`.
- Add `BreadcrumbList` + `Article`/`CreativeWork` JSON-LD on the detail page.

### Files

- new `src/config/projects.ts`
- new `src/routes/projects.$slug.tsx`
- edit `src/routes/index.tsx` (cards use shared data, `<picture>`, new link/CTA)
- edit `src/routes/projects.tsx` (link featured cards to detail pages)
- edit `src/routes/sitemap[.]xml.ts`

### Out of scope

- No changes to `business.ts` services, hero slider, testimonials, or contact form.
- No new photography — reuse existing `real-*.jpg` assets.
