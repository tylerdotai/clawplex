import { MetadataRoute } from "next";
import { events } from "@/lib/dict";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://clawplex.dev";

  const statics: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/events`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/skills`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/projects`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/partner`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/community`, lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/privacy`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const eventPages: MetadataRoute.Sitemap = events.events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...statics, ...eventPages];
}
