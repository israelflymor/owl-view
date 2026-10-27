import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Fields = z.object({
  room: z.string().min(1).max(40),
  style: z.string().min(1).max(60),
  goals: z.string().max(800).default(""),
});

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

export const Route = createFileRoute("/api/makeover")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("AI is not configured", { status: 500 });

        const form = await request.formData();
        const photo = form.get("image");
        if (!(photo instanceof File) || photo.size === 0) {
          return new Response("Please upload a room photo.", { status: 400 });
        }
        if (photo.size > MAX_BYTES || !TYPES.includes(photo.type)) {
          return new Response("Photo must be a JPG, PNG or WEBP under 8MB.", { status: 400 });
        }
        const parsed = Fields.safeParse({
          room: form.get("room"),
          style: form.get("style"),
          goals: form.get("goals") ?? "",
        });
        if (!parsed.success) return new Response("Please choose a room and style.", { status: 400 });
        const { room, style, goals } = parsed.data;

        const prompt = [
          `Photorealistic interior renovation concept of this exact ${room}.`,
          `Keep the same camera angle, room shape, windows, doors and proportions.`,
          `Redesign it in a ${style} style by Owl View, a high-end Lagos interior and cabinetry studio:`,
          `premium bespoke cabinetry, refined materials, warm cove LED lighting, elegant finishes.`,
          goals ? `Client goals: ${goals}.` : "",
          `Architectural magazine photography, natural light, no text or watermarks.`,
        ].join(" ");

        const out = new FormData();
        out.set("model", "openai/gpt-image-2.5-sunburst");
        out.set("prompt", prompt);
        out.set("image", photo, photo.name || "room.jpg");
        const streaming = form.get("stream") !== "false";
        if (streaming) {
          out.set("stream", "true");
          out.set("partial_images", "1");
        }

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/edits", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}` },
          body: out,
        });

        if (!upstream.ok) {
          const text = await upstream.text().catch(() => "");
          let message = "We couldn't create your concept right now. Please try again shortly.";
          if (upstream.status === 429) message = "Our design studio is busy. Please try again in a minute.";
          if (upstream.status === 402) message = "The design studio is temporarily unavailable.";
          try {
            const j = JSON.parse(text);
            if (upstream.status === 400 && j?.error?.message) message = j.error.message;
          } catch {}
          return new Response(message, { status: upstream.status });
        }

        const headers = new Headers({
          "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
          "Cache-Control": "no-cache, no-transform",
        });
        upstream.headers.forEach((v, k) => {
          if (k.toLowerCase().startsWith("x-lovable-aig-")) headers.set(k, v);
        });
        return new Response(upstream.body, { status: 200, headers });
      },
    },
  },
});
