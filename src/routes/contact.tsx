import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/site/QuoteForm";
import { business } from "@/config/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Request a Quote | Owl View" },
      {
        name: "description",
        content:
          "Tell Owl View about your project. Interiors, renovation and building maintenance across Lagos and Ogun State. We respond within one working day.",
      },
      { property: "og:title", content: "Contact — Owl View" },
      { property: "og:description", content: "Send a brief. We'll respond within one working day." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="container-page pt-16 md:pt-24">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="eyebrow">Contact</div>
          <h1 className="heading-display text-5xl md:text-6xl mt-4 text-primary">
            Send us the brief.
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The more we know up front — location, rough scope, timeline, reference images — the
            better we can respond. Every enquiry is read by a member of the studio and answered
            within one working day.
          </p>

          <div className="mt-10 space-y-6 text-sm">
            <div>
              <div className="eyebrow">Serving</div>
              <p className="mt-2 text-foreground">
                {business.serviceArea.regions.join(" · ")}
                <br />Based in {business.serviceArea.baseCity}, Nigeria.
              </p>
            </div>
            <div>
              <div className="eyebrow">Studio email</div>
              <p className="mt-2">
                <a
                  href={`mailto:${business.contact.email}`}
                  className="text-primary underline underline-offset-4 hover:text-accent"
                >
                  {business.contact.email}
                </a>
              </p>
            </div>
            <div>
              <div className="eyebrow">Instagram</div>
              <p className="mt-2">
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary underline underline-offset-4 hover:text-accent"
                >
                  @owlview_decor
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
