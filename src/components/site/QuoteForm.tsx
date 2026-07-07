import { useState, type FormEvent } from "react";
import { business } from "@/config/business";

type Status = "idle" | "success";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only for now. Connect backend later to deliver submissions.
    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm">
        <div className="eyebrow">Thank you</div>
        <h3 className="heading-display text-3xl md:text-4xl mt-3 text-primary">
          We'll be in touch shortly.
        </h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Your enquiry has been received. A member of the Owl View studio will respond within one
          working day.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Note: Connect backend to deliver submissions.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone (optional)" name="phone" type="tel" />
        <div>
          <label className="block text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Scope
          </label>
          <select
            name="scope"
            required
            defaultValue=""
            className="mt-2 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>Select a service…</option>
            {business.quoteScopes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-xs font-medium tracking-wider uppercase text-muted-foreground">
          Tell us about your project
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Location, rough scope, timeline, and anything we should see."
          className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full md:w-auto"
      >
        Send enquiry
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        We reply within one working day. Your details are used only to respond to this enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium tracking-wider uppercase text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
