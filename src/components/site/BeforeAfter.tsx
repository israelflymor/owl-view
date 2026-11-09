import { useId, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  before: ComparisonImage;
  after: ComparisonImage;
  label: string;
  sizes?: string;
  className?: string;
  compact?: boolean;
}

interface ComparisonImage {
  src: string;
  avif: string;
  webp: string;
  jpg: string;
  alt: string;
}

/**
 * Accessible before/after comparison. A native range input drives the
 * divider, so keyboard (arrows, Home/End, PageUp/Down), touch and screen
 * readers work out of the box; pointer drag on the image also moves it.
 */
export function BeforeAfter({ before, after, label, sizes = "100vw", className, compact }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden select-none touch-pan-y", className)}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && fromPointer(e.clientX)}
    >
      <picture className="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
        <source type="image/avif" srcSet={after.avif} sizes={sizes} />
        <source type="image/webp" srcSet={after.webp} sizes={sizes} />
        <img
          src={after.src}
          srcSet={after.jpg}
          sizes={sizes}
          alt={after.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <picture
        className="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <source type="image/avif" srcSet={before.avif} sizes={sizes} />
        <source type="image/webp" srcSet={before.webp} sizes={sizes} />
        <img
          src={before.src}
          srcSet={before.jpg}
          sizes={sizes}
          alt={before.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <span className="absolute top-3 left-3 rounded-full bg-brand-obsidian/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-brand-ivory">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-accent-foreground">
        After
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-ivory shadow"
        style={{ left: `${pos}%` }}
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-brand-ivory text-brand-obsidian shadow-lg",
            compact ? "h-8 w-8" : "h-11 w-11",
          )}
        >
          <MoveHorizontal size={compact ? 14 : 18} />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        {label}: drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <div className="pointer-events-none absolute inset-0 ring-inset peer-focus-visible:ring-2 peer-focus-visible:ring-accent" />
    </div>
  );
}
