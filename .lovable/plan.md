# Walkthrough: real back/forward history sync

Today, clicking a room hotspot rewrites the URL with `replace: true`, so the browser never records a history entry — back leaves the homepage instead of stepping back through rooms. The seek guard also remembers the last applied timestamp forever, so returning to a room you already visited (via back/forward) does not re-seek the video.

## What will change

1. **Hotspots create history entries.** Selecting a room pushes a new URL (`?room=cinema&t=32`) instead of replacing the current one. Back returns to the previously selected room; forward returns to the later one, and in both cases the video seeks and resumes the slow tour at that exact point.
2. **URL is the single source of truth.** The seek effect reacts to every URL change (including browser-driven ones), not just clicks. The guard tracks the URL state that produced the last seek, so revisiting a room via history re-seeks correctly.
3. **Playback state stays in sync.** The active room chip, the aria-live announcement, and the play/pause buttons all follow the URL after a back/forward step, with no stale "active" highlight.
4. **Search params validated.** The homepage route will validate `room` and `t`, ignoring unknown or malformed values so a hand-typed or stale URL cannot break the page. Unknown rooms fall back to no selection; out-of-range timestamps clamp to the video.
5. **Button audit.** Every control in the walkthrough (both play/pause toggles, all five room chips, and the two CTAs) will be exercised and confirmed working, including the reduced-motion path where video controls are intentionally disabled.
6. **No initial-load history pollution.** Arriving at `/` without params leaves the URL untouched; only user actions add entries.

## Verification

A scripted browser pass will: click through several rooms, press browser back and forward repeatedly, and assert after each step that the URL, the highlighted chip, and the video's current time all agree, plus check the console for errors.

## Technical notes

- `src/components/site/WalkthroughSection.tsx`: drop `replace: true` on `jumpTo`; key the seek guard on the resolved `room|t` pair rather than the raw number; keep the same-room re-click behaviour as a replace (no duplicate entries for a no-op).
- `src/routes/index.tsx`: add `validateSearch` for `{ room?: string; t?: number }` and keep reads type-safe in the component.
- No backend, data, or styling changes.

## Recommendations (optional, not in this change unless you want them)

- Give each room its own shareable page (`/walkthrough/cinema`) for SEO and richer link previews; the current query-string approach is invisible to search engines.
- Add a thin progress/scrubber bar under the video so users can see where they are in the 60s tour.
- Auto-highlight the current room as playback passes each timestamp, so the chips act as a live chapter list.
- Add a "Copy link to this room" action to make sales sharing of a specific room trivial.
