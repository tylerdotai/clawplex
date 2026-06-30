import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Playfair_Display, Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
    { media: "(prefers-color-scheme: light)", color: "#0a0908" },
  ],
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://agentbuildersclub.dev";

  return {
    metadataBase: new URL(base),
    alternates: {
      canonical: base,
    },
    title: {
      default: "Agent Builders Club — Global AI Builder Community",
      template: "%s | Agent Builders Club",
    },
    description:
      "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
    keywords: [
      "AI builder community",
      "AI agents",
      "DFW AI meetup",
      "Dallas Fort Worth tech meetup",
      "agent builders",
      "local AI models",
      "DFW tech community",
      "Fort Worth AI",
      "Dallas AI builders",
      "AI workflow automation",
      "agentic AI",
      "agentbuildersclub.dev",
    ],
    openGraph: {
      type: "website",
      siteName: "Agent Builders Club",
      url: base,
      locale: "en",
      title: "Agent Builders Club — Global AI Builder Community",
      description:
        "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
      images: [
        {
          url: "/abc-banner.jpg",
          width: 1200,
          height: 630,
          alt: "Agent Builders Club — Global AI Builder Community",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Agent Builders Club — Global AI Builder Community",
      description:
        "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
      images: ["/abc-banner.jpg"],
    },
    other: {
      "geo.region": "US-TX",
      "geo.placename": "Fort Worth, Dallas-Fort Worth Metroplex",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${playfair.variable} ${karla.variable} bg-background text-foreground font-sans antialiased`}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-void focus:font-mono focus:text-sm focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
