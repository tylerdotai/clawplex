import { MetadataRoute } from "next";
import { locales, withLocale } from "@/lib/i18n/config";

const baseUrl = "https://clawplex.dev";

// Centralized lastModified for cache-busting and freshness signals
const today = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      path: "/",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: "/events",
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      path: "/community",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/community/projects",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/skills",
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      path: "/work-with-us",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/newsletter",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}${withLocale(route.path, locale)}`,
      lastModified: today,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((language) => [
            language,
            `${baseUrl}${withLocale(route.path, language)}`,
          ])
        ),
      },
    }))
  );
}
