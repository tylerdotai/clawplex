import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale; path: string[] }>;
}

export default async function LocaleCatchAll({ params }: PageProps) {
  const { locale, path } = await params;
  
  if (!isLocale(locale)) {
    notFound();
  }
  
  const pagePath = "/" + path.join("/");
  
  // Map of paths to their page modules
  const pageModules: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
    "/community": () => import("@/app/community/page"),
    "/community/agents": () => import("@/app/community/agents/page"),
    "/community/projects": () => import("@/app/community/projects/page"),
    "/community/dashboard": () => import("@/app/community/dashboard/page"),
    "/events": () => import("@/app/events/page"),
    "/newsletter": () => import("@/app/newsletter/page"),
    "/sponsors": () => import("@/app/sponsors/page"),
    "/skills": () => import("@/app/skills/page"),
    "/privacy": () => import("@/app/privacy/page"),
    "/terms": () => import("@/app/terms/page"),
  };
  
  // Check for exact matches first
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
  
  if (pagePath.startsWith("/community/agents/") && pagePath !== "/community/agents/") {
    const mod = await import("@/app/community/agents/[id]/page");
    return <mod.default />;
  }
  
  notFound();
}