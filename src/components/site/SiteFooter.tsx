import { Link } from "@tanstack/react-router";
import { business } from "@/config/business";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="container-page py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
              <span className="heading-display text-xl leading-none">O</span>
            </span>
            <span className="heading-display text-2xl">{business.name}</span>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
            {business.shortDescription}
          </p>
          <div className="mt-6 eyebrow text-accent">{business.registrationNumber}</div>
        </div>

        <div>
          <div className="eyebrow text-accent">Studio</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-accent">Serving</div>
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80">
            {business.serviceArea.regions.join(" · ")}
            <br />Based in {business.serviceArea.baseCity}, Nigeria.
          </p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${business.contact.email}`} className="text-accent hover:underline">
              {business.contact.email}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent"
            >
              @owlview_decor
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page py-6 flex flex-col md:flex-row justify-between text-xs text-primary-foreground/60 gap-2">
          <span>© {year} {business.legalName}. All rights reserved.</span>
          <span>Designed for the wow view.</span>
        </div>
      </div>
    </footer>
  );
}
