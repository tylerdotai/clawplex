import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Block AI training crawlers explicitly
        userAgent: [
          "CCBot",
          "ChatGPT-User",
          "GPTBot",
          "Google-Extended",
          "Claude-Web",
          "PerplexityBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://agentbuildersclub.dev/sitemap.xml",
    // Content-Signal directive: ai-train=no, search=yes, ai-input=yes
    // This signals to AI crawlers how to treat our content:
    // - ai-train=no: Do not use content for model training
    // - search=yes: OK to surface in search results
    // - ai-input=yes: LLMs may read for context/grounding
  };
}

// Export CSP header to opt out of AI training via meta tag injection
// The "no-ai-training: (self)" directive blocks AI training use of first-party content
export const ContentSecurityPolicy = "no-ai-training: (self)";