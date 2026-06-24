import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ClawPlex DFW privacy policy — how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy — ClawPlex DFW",
    description: "ClawPlex DFW privacy policy — how we collect, use, and protect your data.",
    type: "website",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 md:px-8 py-32 md:py-40">
        <h1 className="font-display text-5xl md:text-6xl tracking-tight text-claw-text mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-claw max-w-none space-y-6 text-claw-muted">
          <p>Last updated: June 2026.</p>
          <p>
            ClawPlex DFW is an informal community collective. We do not sell your data,
            run targeted ads, or share personal information with third parties for commercial
            purposes.
          </p>
          <h2>What we collect</h2>
          <p>
            When you RSVP to events or join our Discord, you may provide a name and email
            address. This information is used solely for event coordination and community
            communications.
          </p>
          <h2>Event RSVPs</h2>
          <p>
            RSVP data is stored with our processor (Luma) and is accessible only to organizers.
            You can request deletion at any time by contacting us.
          </p>
          <h2>Discord</h2>
          <p>
            Our Discord server is governed by its own{" "}
            <a href="https://discord.com/terms" className="text-claw-blue hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="https://discord.com/privacy" className="text-claw-blue hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <h2>Cookies</h2>
          <p>
            This site does not use tracking cookies. We use only essential session cookies
            required for the site to function.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Reach us on{" "}
            <a href="https://discord.gg/q8kEquTu3z" className="text-claw-blue hover:underline">
              Discord
            </a>{" "}
            or open an issue on{" "}
            <a href="https://github.com/ClawPlexDFW" className="text-claw-blue hover:underline">
              GitHub
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
