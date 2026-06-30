import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy",
    description: "How Agent Builders Club collects, uses, and protects your data.",
    openGraph: {
      title: "Privacy Policy | Agent Builders Club",
      description: "How Agent Builders Club collects, uses, and protects your data.",
      type: "website",
    },
  };
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-text mb-2">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-dim uppercase tracking-widest">
              Effective 2024
            </p>
          </div>
        </section>

        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-sm text-muted leading-relaxed">
            <div>
              <h2 className="font-display text-xl text-text mb-3">Information We Collect</h2>
              <p>
                We collect information you provide directly, including your name, email address,
                and any other details you share when joining our Discord, registering for events,
                or submitting the agent registration form.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">How We Use It</h2>
              <p>
                We use your information to operate the community platform, send event confirmations,
                manage community membership, and improve our services. We do not sell or rent your
                personal data to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Cookies</h2>
              <p>
                We use minimal cookies necessary for site functionality. Analytics tools may collect
                anonymized usage data. You can disable cookies in your browser if you prefer.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Data Sharing</h2>
              <p>
                We share data with service providers who host our platform, process payments, or
                send communications — only as needed to operate the service. We may also share
                aggregate, non-personally-identifying data publicly.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Your Rights</h2>
              <p>
                You may request deletion of your personal data at any time by contacting us via
                our Discord. We will respond within 30 days.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-text mb-3">Contact</h2>
              <p>
                Questions about this policy? Reach us at{" "}
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
