import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Check, Link2, Pause, Play } from "lucide-react";
import walkthroughAsset from "@/assets/walkthrough.mp4.asset.json";
import walkthroughWebm from "@/assets/walkthrough.webm.asset.json";
import posterAsset from "@/assets/walkthrough-poster.jpg.asset.json";

const HOTSPOTS = [
  { label: "Living", slug: "living", time: 4 },
  { label: "Kitchen", slug: "kitchen", time: 24 },
  { label: "Cinema", slug: "cinema", time: 32 },
  { label: "Bedrooms", slug: "bedrooms", time: 40 },
  { label: "Gym", slug: "gym", time: 48 },
];

const SLOW_RATE = 0.6;
// Rooms play in HOTSPOT order; a room is "current" from its timestamp until the
// next room's timestamp. Tour length is taken from the loaded video duration.
function roomAt(time: number) {
  let current = HOTSPOTS[0];
  for (const h of HOTSPOTS) {
    if (time >= h.time) current = h;
  }
  return current;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function WalkthroughSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  // With reduced motion on, the tour stays a still frame until the visitor
  // explicitly asks to play it. Everything else stays interactive.
  const [motionOptIn, setMotionOptIn] = useState(false);
  const motionOk = !reducedMotion || motionOptIn;
  const navigate = useNavigate();
  const search = useRouterState({ select: (s) => s.location.search as Record<string, unknown> });

  const roomParam = typeof search?.room === "string" ? search.room : null;
  const tParam = Number(search?.t);
  const activeSpot = HOTSPOTS.find((h) => h.slug === roomParam) ?? null;
  const active = activeSpot?.label ?? null;
  // While the tour plays, the currently-shown room is derived from playback
  // time; an explicit hotspot/deep-link selection wins until playback moves on.
  const liveSpot = roomAt(currentTime);
  const currentSlug = playing || currentTime > 0 ? liveSpot.slug : (activeSpot?.slug ?? null);
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const deepLinkTime = Number.isFinite(tParam) ? tParam : activeSpot?.time ?? null;
  // Key the seek guard on the full URL state so history navigation re-seeks
  // even when returning to a room that was visited before.
  const urlKey = `${roomParam ?? ""}|${deepLinkTime ?? ""}`;
  const appliedKey = useRef<string | null>(null);


  // Only attach the source once the section is close to the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const startSlowPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = SLOW_RATE;
    v.play().catch(() => undefined);
  }, []);

  // Seek to the deep-linked timestamp once the video can accept a seek.
  // Runs for every URL change, including browser back/forward.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || deepLinkTime == null || !motionOk) return;
    if (appliedKey.current === urlKey) return;
    const apply = () => {
      appliedKey.current = urlKey;
      try {
        v.currentTime = deepLinkTime;
      } catch {
        /* metadata not ready yet */
      }
      startSlowPlay();
    };
    if (v.readyState >= 1) apply();
    else v.addEventListener("loadedmetadata", apply, { once: true });
    return () => v.removeEventListener("loadedmetadata", apply);
  }, [urlKey, deepLinkTime, motionOk, inView, startSlowPlay]);

  // Attach + play sources only once the section scrolls near the viewport.
  const loadedRef = useRef(false);
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !motionOk) return;
    if (!inView) {
      if (!v.paused) v.pause();
      return;
    }
    if (!loadedRef.current) {
      loadedRef.current = true;
      v.load();
    }
    startSlowPlay();
  }, [inView, motionOk, startSlowPlay]);


  const toggle = () => {
    if (!motionOk) {
      // Visitor asked for motion despite the system preference: honour it.
      setMotionOptIn(true);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) startSlowPlay();
    else v.pause();
  };

  const copyRoomLink = async (slug: string, time: number) => {
    const url = `${window.location.origin}/?room=${slug}&t=${time}#walkthrough`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fall back.
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopiedSlug(slug);
    window.setTimeout(() => setCopiedSlug((s) => (s === slug ? null : s)), 2500);
  };

  const jumpTo = (slug: string, time: number) => {
    const isSameRoom = roomParam === slug && deepLinkTime === time;
    if (isSameRoom) {
      // Re-clicking the active room replays it without a duplicate history entry.
      appliedKey.current = null;
      const v = videoRef.current;
      if (v && motionOk) {
        try {
          v.currentTime = time;
        } catch {
          /* metadata not ready yet */
        }
        appliedKey.current = urlKey;
        startSlowPlay();
      }
      return;
    }
    navigate({
      to: "/",
      search: { room: slug, t: time } as never,
      hash: "walkthrough",
    });
  };




  return (
    <section id="walkthrough" ref={sectionRef} className="container-page mt-24 scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-brand-obsidian text-brand-ivory">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 p-6 sm:p-10 lg:p-14 items-center">
          {/* Phone-format walkthrough */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-ivory/15 bg-black aspect-[9/16] shadow-2xl">
              {!motionOk ? (
                <img
                  src={posterAsset.url}
                  alt="Interior of a completed Owl View apartment — cove-lit living room with bespoke joinery"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <video
                ref={videoRef}
                poster={posterAsset.url}
                muted
                loop
                playsInline
                preload="none"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration || 0);
                  setCurrentTime(e.currentTarget.currentTime);
                }}
                onDurationChange={(e) => setDuration(e.currentTarget.duration || 0)}
                controls={false}
                aria-label="Walkthrough tour of a completed Owl View apartment interior"
                className={`absolute inset-0 h-full w-full object-cover ${motionOk ? "" : "sr-only"}`}
              >
                {inView && motionOk ? (
                  <>
                    <source src={walkthroughWebm.url} type="video/webm" />
                    <source src={walkthroughAsset.url} type="video/mp4" />
                  </>
                ) : null}
              </video>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-obsidian/80 to-transparent"
                aria-hidden
              />
              <button
                type="button"
                onClick={toggle}
                aria-pressed={playing}
                aria-label={playing ? "Pause walkthrough video" : "Play walkthrough video"}
                className="absolute bottom-4 right-4 grid place-items-center h-11 w-11 rounded-full border border-brand-ivory/30 bg-brand-obsidian/50 backdrop-blur text-brand-ivory hover:bg-brand-obsidian/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
              </button>
            </div>
            {reducedMotion && !motionOptIn ? (
              <p className="mt-3 text-xs text-brand-ivory/70">
                Motion is reduced in your system settings, so a still frame is shown. Press play to
                start the slow tour anyway.
              </p>
            ) : null}
          </div>


          <div>
            <div className="eyebrow text-brand-gold-soft">Walkthrough · Completed home</div>
            <h2 className="heading-display text-4xl md:text-5xl mt-3 leading-[1.05]">
              Take a slow walk through a finished Owl View home.
            </h2>
            <p className="mt-5 text-brand-ivory/80 leading-relaxed max-w-lg">
              A full handover tour — cove-lit ceilings, bespoke joinery, stone worktops and a
              blacked-out cinema room. Every surface here was designed, built and finished in-house.
            </p>

            <h3 id="walkthrough-rooms" className="mt-7 text-xs uppercase tracking-[0.2em] text-brand-ivory/60">
              Jump to a room
            </h3>
            <ul aria-labelledby="walkthrough-rooms" className="mt-3 flex flex-wrap gap-2">
              {HOTSPOTS.map((h) => {
                const isActive = active === h.label;
                return (
                  <li key={h.label}>
                    <button
                      type="button"
                      onClick={() => jumpTo(h.slug, h.time)}
                      aria-pressed={isActive}
                      aria-label={`Jump walkthrough to the ${h.label} section`}

                      className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian disabled:opacity-40 disabled:cursor-not-allowed ${
                        isActive
                          ? "border-brand-gold bg-brand-gold text-brand-obsidian"
                          : "border-brand-ivory/20 text-brand-ivory/80 hover:border-brand-gold hover:text-brand-ivory"
                      }`}
                    >
                      {h.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={playing}
                className="inline-flex items-center gap-2 rounded-full border border-brand-gold px-6 py-3 text-sm font-medium text-brand-gold hover:bg-brand-gold hover:text-brand-obsidian transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
              >
                {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                {playing ? "Pause slow tour" : "Play slow tour"}
              </button>
            </div>

            <p aria-live="polite" className="sr-only">
              {`${active ? `${active} selected. ` : ""}${
                motionOk
                  ? `Walkthrough is ${playing ? "playing" : "paused"}.`
                  : "Reduced motion is on; a still frame is shown. Press play to start the slow tour."
              }`}
            </p>


            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-medium text-brand-obsidian hover:bg-brand-gold-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
              >
                Request a quote <ArrowUpRight size={16} aria-hidden />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/40 px-6 py-3 text-sm font-medium text-brand-ivory hover:bg-brand-ivory/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
              >
                See more finishes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
