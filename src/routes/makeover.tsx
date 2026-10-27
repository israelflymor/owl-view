import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { streamImage } from "@/lib/ai/stream-image";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/makeover")({
  head: () => ({
    meta: [
      { title: "AI Room Makeover Studio | Owl View" },
      {
        name: "description",
        content:
          "Upload a photo of your room, tell us your renovation goals and see a personalised Owl View makeover concept in seconds.",
      },
      { property: "og:title", content: "AI Room Makeover Studio | Owl View" },
      {
        property: "og:description",
        content: "See your Lagos or Ogun space reimagined by Owl View before you renovate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MakeoverPage,
});

const ROOMS = ["Kitchen", "Wardrobe / closet", "Living room", "Bedroom", "Bathroom", "Home exterior"];
const STYLES = [
  { name: "Coastal luxury", desc: "Sand, ivory, brushed gold, soft ocean blues" },
  { name: "Graphite & stone minimalist", desc: "Matte black, marble, hidden handles" },
  { name: "Warm executive", desc: "Walnut wood, leather, layered warm light" },
  { name: "Modern organic", desc: "Oak, limewash, plants, natural textures" },
];

function MakeoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [room, setRoom] = useState(ROOMS[0]);
  const [style, setStyle] = useState(STYLES[0].name);
  const [goals, setGoals] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  const pick = (f: File | undefined) => {
    setError(null);
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) return setError("Please choose a JPG, PNG or WEBP photo.");
    if (f.size > 8 * 1024 * 1024) return setError("Please choose a photo under 8MB.");
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const generate = async () => {
    if (!file) return setError("Please add a photo of your room first.");
    setBusy(true);
    setError(null);
    setResult(null);
    setIsFinal(false);
    const form = new FormData();
    form.append("image", file);
    form.append("room", room);
    form.append("style", style);
    form.append("goals", goals);
    try {
      await streamImage("/api/makeover", form, (src, final) => {
        setResult(src);
        setIsFinal(final);
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message.replace(/^Image generation failed: \d+ ?/, "") : "";
      setError(msg || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <main className="container-page py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.28em] uppercase text-accent">Design studio</p>
          <h1 className="heading-display text-4xl md:text-6xl text-primary mt-3">See your room, reimagined.</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Upload a photo, tell us what you'd love to change, and get a personalised makeover concept from Owl View in
            under a minute.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="space-y-7">
            <div>
              <p className="text-sm font-medium mb-2">1. Your room photo</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  pick(e.dataTransfer.files[0]);
                }}
                className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-border hover:border-accent transition-colors overflow-hidden grid place-items-center bg-muted/40"
              >
                {preview ? (
                  <img src={preview} alt="Your uploaded room" className="w-full h-full object-cover" />
                ) : (
                  <span className="flex flex-col items-center gap-2 text-muted-foreground text-sm">
                    <ImagePlus className="h-7 w-7" /> Tap to upload or drop a photo
                  </span>
                )}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                aria-label="Upload room photo"
                onChange={(e) => pick(e.target.files?.[0])}
              />
            </div>

            <label className="block">
              <span className="text-sm font-medium">2. Which space is it?</span>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              >
                {ROOMS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend className="text-sm font-medium mb-2">3. Pick a style</legend>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    aria-pressed={style === s.name}
                    onClick={() => setStyle(s.name)}
                    className={cn(
                      "text-left rounded-xl border p-3 transition-colors",
                      style === s.name ? "border-accent bg-accent/10" : "border-border hover:border-accent/60",
                    )}
                  >
                    <span className="block text-sm font-medium">{s.name}</span>
                    <span className="block text-xs text-muted-foreground mt-1">{s.desc}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm font-medium">4. Your renovation goals</span>
              <textarea
                value={goals}
                maxLength={800}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                placeholder="e.g. More storage, an island with seating, warmer lighting, keep the window"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              />
            </label>

            <button
              type="button"
              onClick={generate}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {busy ? "Designing your concept…" : "Create my makeover concept"}
            </button>
            <p role="alert" aria-live="polite" className="text-sm text-destructive min-h-5">
              {error}
            </p>
          </div>

          <div aria-live="polite">
            {result && preview ? (
              <div className="space-y-5">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                  {isFinal ? (
                    <BeforeAfter
                      className="h-full w-full"
                      label="Your room before and after the Owl View concept"
                      before={{ src: preview, alt: "Your room today" }}
                      after={<img src={result} alt={`${style} makeover concept for your ${room.toLowerCase()}`} />}
                    />
                  ) : (
                    <img src={result} alt="Concept preview loading" className="w-full h-full object-cover blur-md" />
                  )}
                </div>
                {isFinal && (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Bring this concept to life
                    </Link>
                    <a
                      href={result}
                      download="owl-view-makeover.png"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-accent"
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  This is an AI-generated concept for inspiration. Final designs, materials and pricing are confirmed
                  after a site visit.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl aspect-[4/3] border border-border bg-muted/30 grid place-items-center text-center p-8">
                <div>
                  {busy ? (
                    <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto" />
                  ) : (
                    <Sparkles className="h-8 w-8 text-accent mx-auto" />
                  )}
                  <p className="mt-3 text-muted-foreground text-sm">
                    {busy ? "Our studio is reimagining your space…" : "Your makeover concept will appear here."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
