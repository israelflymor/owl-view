import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import walkthroughAsset from "@/assets/walkthrough.mp4.asset.json";
import walkthroughWebm from "@/assets/walkthrough.webm.asset.json";
import posterAsset from "@/assets/walkthrough-poster.jpg.asset.json";

const HOTSPOTS = [
  { label: "Living", time: 4 },
  { label: "Kitchen", time: 24 },
  { label: "Cinema", time: 32 },
  { label: "Bedrooms", time: 40 },
  { label: "Gym", time: 48 },
];

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
  const [active, setActive] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

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

  // Slow, cinematic pace; pause when scrolled away. Reduced motion never autoplays.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reducedMotion) return;
    if (!inView) {
      if (!v.paused) v.pause();
      return;
    }
    v.playbackRate = 0.6;
    v.play().catch(() => undefined);
  }, [inView, reducedMotion]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.playbackRate = 0.6;
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  };

  const jumpTo = (label: string, time: number) => {
    const v = videoRef.current;
    setActive(label);
    if (!v) return;
    try {
      v.currentTime = time;
    } catch {
      /* metadata not ready yet */
    }
    if (!reducedMotion) {
      v.playbackRate = 0.6;
      v.play().catch(() => undefined);
    }
  };

  return (
    <section ref={sectionRef} className="container-page mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-brand-obsidian text-brand-ivory">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 p-6 sm:p-10 lg:p-14 items-center">
          {/* Phone-format walkthrough */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-ivory/15 bg-black aspect-[9/16] shadow-2xl">
              {reducedMotion ? (
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
                controls={false}
                aria-label="Walkthrough tour of a completed Owl View apartment interior"
                className={`absolute inset-0 h-full w-full object-cover ${reducedMotion ? "sr-only" : ""}`}
              >
                {inView && !reducedMotion ? (
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
              {!reducedMotion ? (
                <button
                  type="button"
                  onClick={toggle}
                  aria-pressed={playing}
                  aria-label={playing ? "Pause walkthrough video" : "Play walkthrough video"}
                  className="absolute bottom-4 right-4 grid place-items-center h-11 w-11 rounded-full border border-brand-ivory/30 bg-brand-obsidian/50 backdrop-blur text-brand-ivory hover:bg-brand-obsidian/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                </button>
              ) : null}
            </div>
            {reducedMotion ? (
              <p className="mt-3 text-xs text-brand-ivory/70">
                Motion is reduced in your system settings, so a still frame is shown instead of the
                autoplaying tour.
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
                      onClick={() => jumpTo(h.label, h.time)}
                      aria-pressed={isActive}
                      aria-label={`Jump walkthrough to the ${h.label} section`}
                      disabled={reducedMotion}
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
            <p aria-live="polite" className="sr-only">
              {active ? `Walkthrough moved to the ${active} section.` : ""}
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
