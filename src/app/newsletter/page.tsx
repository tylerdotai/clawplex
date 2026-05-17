import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getLatestIssue, getAllIssues } from "@/lib/newsletter";
import { NewsletterClient } from "@/components/newsletter/newsletter-client";
import { getRequestLocale } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

const newsletterPageCopy = {
  en: {
    title: "The Drop — ClawPlex Newsletter",
    description: "Monthly dispatches from the DFW AI builder community",
    heading: "THE DROP.",
  },
  es: {
    title: "The Drop — Newsletter de ClawPlex",
    description: "Despachos mensuales de la comunidad de builders de IA en DFW",
    heading: "THE DROP.",
  },
} satisfies Record<Locale, { title: string; description: string; heading: string }>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = newsletterPageCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "website",
    },
  };
}

export default async function NewsletterPage() {
  const locale = await getRequestLocale();
  const copy = newsletterPageCopy[locale];
  const latest = getLatestIssue();
  const allIssues = getAllIssues();
  const pastIssues = allIssues.slice(1).map((i) => ({
    slug: i.slug,
    number: i.number,
    date: i.date,
    subject: i.subject,
  }));

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              ClawPlex DFW
            </p>
            <h1 className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none">
              {copy.heading}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-claw-dim">
              {copy.description}
            </p>
          </div>
        </section>

        {latest && (
          <NewsletterClient
            latest={{
              slug: latest.slug,
              number: latest.number,
              date: latest.date,
              from: latest.from,
              subject: latest.subject,
              body: latest.body,
              nextNode: latest.nextNode,
              signature: latest.signature,
              signatureTitle: latest.signatureTitle,
            }}
            pastIssues={pastIssues}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
