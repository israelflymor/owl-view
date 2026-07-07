import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { business } from "@/config/business";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center container-page">
      <div className="max-w-md text-center">
        <div className="eyebrow">404</div>
        <h1 className="heading-display text-5xl mt-3 text-primary">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[70vh] items-center justify-center container-page">
      <div className="max-w-md text-center">
        <h1 className="heading-display text-4xl text-primary">This page didn't load</h1>
        <p className="mt-3 text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center rounded-full border border-input px-5 py-2.5 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.legalName,
  alternateName: business.name,
  description: business.longDescription,
  areaServed: business.serviceArea.regions.map((r) => ({ "@type": "AdministrativeArea", name: r })),
  address: {
    "@type": "PostalAddress",
    addressRegion: business.serviceArea.baseCity,
    addressCountry: business.serviceArea.country,
  },
  email: business.contact.email,
  sameAs: [business.social.instagram],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Owl View — Bespoke Interiors & Building Maintenance in Lagos & Ogun" },
      {
        name: "description",
        content:
          "Owl View is a Lagos and Ogun State interior, renovation and building maintenance studio. Bespoke kitchens, wardrobes, curtains, painting and construction to finish.",
      },
      { property: "og:site_name", content: business.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Owl View — Bespoke Interiors & Building Maintenance in Lagos & Ogun" },
      { name: "twitter:title", content: "Owl View — Bespoke Interiors & Building Maintenance in Lagos & Ogun" },
      { name: "description", content: "Coastal-luxury interiors, renovation and building maintenance across Lagos and Ogun State. Kitchens, wardrobes, curtains, painting and construction to finish." },
      { property: "og:description", content: "Coastal-luxury interiors, renovation and building maintenance across Lagos and Ogun State. Kitchens, wardrobes, curtains, painting and construction to finish." },
      { name: "twitter:description", content: "Coastal-luxury interiors, renovation and building maintenance across Lagos and Ogun State. Kitchens, wardrobes, curtains, painting and construction to finish." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a782eb82-b9ae-457c-9326-3fc9b89bfeac" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a782eb82-b9ae-457c-9326-3fc9b89bfeac" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
