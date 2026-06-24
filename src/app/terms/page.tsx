import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ClawPlex DFW terms of service — community guidelines and usage terms.",
  openGraph: {
    title: "Terms of Service — ClawPlex DFW",
    description: "ClawPlex DFW terms of service — community guidelines and usage terms.",
    type: "website",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 md:px-8 py-32 md:py-40">
        <h1 className="font-display text-5xl md:text-6xl tracking-tight text-claw-text mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-invert prose-claw max-w-none space-y-6 text-claw-muted">
          <p>Last updated: June 2026.</p>
          <p>
            By participating in ClawPlex DFW events, community spaces, or using this
            website, you agree to the following terms.
          </p>
          <h2>Community conduct</h2>
          <p>
            ClawPlex DFW is committed to a harassment-free experience for everyone. We do not
            tolerate bullying, hate speech, or discriminatory behavior. Violations may result
            in removal from events and community spaces at the discretion of organizers.
          </p>
          <h2>No guarantees</h2>
          <p>
            All events, speakers, and content are provided as-is. ClawPlex DFW makes no
            warranties about the accuracy, completeness, or reliability of any information
            shared at meetups or on this site.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Content shared by community members remains the property of the respective authors.
            Do not reproduce others&#39; work without explicit permission.
          </p>
          <h2>External links</h2>
          <p>
            This site may link to third-party sites (Luma, Discord, GitHub, etc.). These are
            governed by their own terms and privacy policies.
          </p>
          <h2>Changes</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the
            community constitutes acceptance of updated terms.
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
