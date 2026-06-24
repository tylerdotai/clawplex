import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Playfair_Display, Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SocialProofPopup } from "@/components/social-proof-popup";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

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
    { media: "(prefers-color-scheme: dark)",  color: "#0a0908" },
    { media: "(prefers-color-scheme: light)", color: "#0a0908" },
  ],
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname =
    headersList.get("x-claw-pathname") ??
    headersList.get("x-invoke-path") ??
    headersList.get("x-matched-path") ??
    "";
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://clawplex.dev";
  const canonical = `${base}${pathname || "/"}`;

  return {
    metadataBase: new URL(base),
    alternates: { canonical },
    title: {
      default: "ClawPlex — DFW AI Builder Community",
      template: "%s — ClawPlex",
    },
    description:
      "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
    keywords: [
      "DFW AI meetup", "Dallas Fort Worth tech meetup", "OpenClaw", "AI agents",
      "local AI models", "DFW tech community", "Fort Worth AI", "Dallas AI builders",
      "AI workflow automation", "agentic AI", "OpenClaw builders",
    ],
    openGraph: {
      type: "website",
      siteName: "ClawPlex",
      url: canonical,
      title: "ClawPlex — DFW AI Builder Community",
      description:
        "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ClawPlex — DFW AI Builder Community" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ClawPlex — DFW AI Builder Community",
      description:
        "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
      images: ["/og-image.jpg"],
    },
    other: {
      "geo.region": "US-TX",
      "geo.placename": "Fort Worth, Dallas-Fort Worth Metroplex",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-claw-blue focus:text-claw-void focus:font-mono focus:text-sm focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <SocialProofPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
