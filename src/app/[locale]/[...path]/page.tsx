import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import React from "react";
import { isLocale, type Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale; path: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, path } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const pagePath = `/${path.join("/")}`;

  if (pagePath === "/work-with-us" || pagePath === "/sponsors") {
    const title = locale === "es" ? "Trabaja con nosotros" : "Work With Us";
    const description = locale === "es"
      ? "Contrata a ClawPlex o colabora con la comunidad DFW de builders de IA: proyectos de IA, patrocinios, socios, sedes, talleres y talento local."
      : "Hire ClawPlex or partner with the DFW AI builder community: AI projects, sponsorships, venue partnerships, workshops, and local AI talent.";
    const canonicalPath = `/${locale}/work-with-us`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: `${title} — ClawPlex DFW`,
        description,
        type: "website",
        url: canonicalPath,
      },
    };
  }

  return {};
}

export default async function LocaleCatchAll({ params }: PageProps) {
  const { locale, path } = await params;
  
  if (!isLocale(locale)) {
    notFound();
  }
  
  const pagePath = "/" + path.join("/");
  
  // Map of paths to their page modules
  type PageComponentType = React.ComponentType<object>;
  const pageModules: Record<string, () => Promise<{ default: PageComponentType }>> = {
    "/community": () => import("@/app/community/page"),
    "/community/projects": () => import("@/app/community/projects/page"),
    "/events": () => import("@/app/events/page"),
    "/newsletter": () => import("@/app/newsletter/page"),
    "/sponsors": () => import("@/app/sponsors/page"),
    "/work-with-us": () => import("@/app/work-with-us/page"),
    "/skills": () => import("@/app/skills/page"),
    "/privacy": () => import("@/app/privacy/page"),
    "/terms": () => import("@/app/terms/page"),
  };
  
  // Check for exact matches first
  if (pagePath === "/sponsors") {
    redirect(`/${locale}/work-with-us`);
  }

  const exactMatch = pageModules[pagePath];
  if (exactMatch) {
    const mod = await exactMatch();
    const PageComponent = mod.default;
    return <PageComponent />;
  }
  
  // Handle dynamic routes
  if (pagePath.startsWith("/newsletter/") && pagePath !== "/newsletter/") {
    const slug = pagePath.slice("/newsletter/".length);
    const mod = await import("@/app/newsletter/[slug]/page");
    return <mod.default params={Promise.resolve({ slug })} />;
  }
  
  notFound();
}
