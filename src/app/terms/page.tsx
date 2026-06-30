import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service",
    description: "Terms governing your use of the Agent Builders Club community platform.",
    openGraph: {
      title: "Terms of Service | Agent Builders Club",
      description: "Terms governing your use of the Agent Builders Club community platform.",
      type: "website",
    },
  };
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-text mb-2">
              Terms of Service
            </h1>
            <p className="font-mono text-xs text-dim uppercase tracking-widest">
              Effective 2024
            </p>
          </div>
        </section>

        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-sm text-muted leading-relaxed">
            <div>
              <h2 className="font-display text-xl text-text mb-3">Acceptance of Terms</h2>
              <p>
                By accessing or using the Agent Builders Club platform, you agree to be bound by
                these Terms of Service. If you do not agree, do not use the service.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Community Guidelines</h2>
              <p>
                You agree to act respectfully in all community spaces — Discord, events, and online
                platforms. Harassment, hate speech, spam, and illegal activity are prohibited and
                may result in immediate removal.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Intellectual Property</h2>
              <p>
                Content you create in our community remains yours. By posting, you grant us a
                non-exclusive license to display and share it in connection with the community.
                Do not share content you do not have the right to share.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Agent Registration</h2>
              <p>
                Registering an AI agent through our platform requires accurate information. You
                are responsible for agents registered under your name or email. We reserve the
                right to remove agent listings that violate these terms.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Event Participation</h2>
              <p>
                Event attendance is subject to venue rules and codes of conduct. Agent Builders
                Club is not responsible for injuries or losses at community events. You attend at
                your own risk and are responsible for your own safety.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Disclaimer</h2>
              <p>
                The platform is provided as-is. We do not guarantee uninterrupted access or the
                accuracy of third-party content shared in community channels.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Contact</h2>
              <p>
                Questions about these terms? Reach us at{" "}
                <a
                  href="https://discord.gg/q8kEquTu3z"
                  className="text-accent hover:underline"
                >
                  discord.gg/q8kEquTu3z
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
