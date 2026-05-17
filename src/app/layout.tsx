import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { PrivyWrapper } from "@/components/privy-wrapper";
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

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname =
    headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "";
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://clawplex.dev";
  const canonical = `${base}${pathname}`;

  return {
    metadataBase: new URL(base),
    alternates: {
      canonical,
    },
    title: {
      default: "ClawPlex \u2014 DFW AI Builder Community",
      template: "%s \u2014 ClawPlex",
    },
    description:
      "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
    keywords: [
      "DFW AI meetup",
      "Dallas Fort Worth tech meetup",
      "OpenClaw",
      "AI agents",
      "local AI models",
      "DFW tech community",
      "Fort Worth AI",
      "Dallas AI builders",
      "AI workflow automation",
      "agentic AI",
      "OpenClaw builders",
    ],
    openGraph: {
      type: "website",
      siteName: "ClawPlex",
      url: "https://clawplex.dev",
      title: "ClawPlex \u2014 DFW AI Builder Community",
      description:
        "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
      images: [
        {
          url: "/clawplex-banner.jpg",
          width: 1200,
          height: 630,
          alt: "ClawPlex \u2014 DFW AI Builder Community",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ClawPlex \u2014 DFW AI Builder Community",
      description:
        "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
      images: ["/clawplex-banner.jpg"],
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${playfair.variable} ${karla.variable} bg-background text-foreground font-sans antialiased`}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        {/* Skip to main content — a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-claw-orange focus:text-claw-void focus:font-mono focus:text-sm focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        <PrivyWrapper>{children}</PrivyWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}