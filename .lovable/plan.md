# Restructure Plan

## Navigation change
New menu: **Home · About · Projects · Gallery** + `Request a quote` button.
Removes "Services" and "Contact" from the top nav (Contact still reachable via the Request a quote button, which routes to `/contact`).

## Route changes

1. **`/about`** — expand content
   - Keep existing intro + "How we work" + CTA.
   - Add a new "What we do" section listing every service from `business.services` with title + full description (pulled/expanded from `summary`). This absorbs the old Services page copy so nothing is lost.
   - Add brief credentials/values block (materials, in-house team, single point of contact — expanded).

2. **`/services` → `/projects`** (rename file, repurpose)
   - Delete `src/routes/services.tsx`.
   - Rewrite `src/routes/projects.tsx` to become the **Projects** page: a list of each service line presented as a "project offering" card, each with a small representative image sourced from the homepage's real images (`real-hero-kitchen`, `real-kitchen-white`, `real-kitchen-grey`, `real-wardrobe`, `real-curtains`, `real-blinds`, `real-exterior`).
   - Each card: image (small, ~aspect-4/3), service title, short description, "Enquire" link → `/contact`.
   - Update head/meta to Projects wording; keep ItemList JSON-LD.

3. **Old `/projects` content → new `/gallery`**
   - Create `src/routes/gallery.tsx` with the current bento/masonry gallery grid (enhanced): larger hero item, hover zoom kept, add subtle category filter chips (Kitchens / Wardrobes / Drapery / Exteriors / Blinds) that filter the grid client-side, and add 2–3 more image tiles reusing existing real images for density.
   - Head/meta: "Gallery — Owl View".

4. **Header/Footer nav updates**
   - `SiteHeader` nav array: Home, About, Projects, Gallery. Keep "Request a quote" button linking to `/contact`.
   - `SiteFooter` Studio list: Home, About, Projects, Gallery, Contact.

5. **Home page (`/`)**
   - Update any internal links pointing to `/services` → `/projects`.
   - Any link to old `/projects` gallery-style section → `/gallery`.

6. **Sitemap** (`sitemap[.]xml.ts`)
   - Replace `/services` entry with `/gallery`; keep `/projects`, `/about`, `/contact`, `/`.

## Files touched
- edit: `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`
- edit: `src/routes/about.tsx` (add services content)
- rewrite: `src/routes/projects.tsx` (becomes service-projects list w/ images)
- create: `src/routes/gallery.tsx` (old projects grid, enhanced + filter)
- delete: `src/routes/services.tsx`
- edit: `src/routes/index.tsx` (link updates only)
- edit: `src/routes/sitemap[.]xml.ts`

No business-logic or config changes; `src/config/business.ts` stays the single source of truth.
