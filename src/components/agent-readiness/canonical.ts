import { Metadata } from "next";

/**
 * Canonical URL metadata for any page.
 * Uses the metadataBase from layout.tsx + the given path.
 */
export function makeCanonicalMetadata(path: string = ""): Metadata {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://agentbuildersclub.dev";
  const canonical = `${base}${path}`;
  return {
    alternates: {
      canonical,
    },
  };
}