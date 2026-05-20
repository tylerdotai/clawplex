import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { eventSchema, faqSchema } from "@/components/agent-readiness/json-ld-schemas";
import { EventsClient } from "./events-client";
import { getRequestLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "es" ? "Nodes y eventos" : "Nodes & Events";
  const description = locale === "es"
    ? "Encuentros semanales para builders de IA en DFW. Sin charlas. Sin diapositivas. Solo gente con laptops y café."
    : "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} — ClawPlex DFW`,
      description,
      type: "website",
    },
  };
}

export default async function EventsPage() {
  const locale = await getRequestLocale();
  const nextEventSchema = eventSchema({
    name: "DFW Node 05 — Fort Worth",
    startDate: "2026-06-03T14:00:00-05:00",
    endDate: "2026-06-03T15:00:00-05:00",
    location: "CreateFW, Fort Worth TX",
    description:
      locale === "es"
        ? "Encuentro semanal de ClawPlex DFW en Fort Worth, organizado con FTW DAO en CreateFW. Sin agenda, sin diapositivas — solo builders mostrando en qué están trabajando."
        : "Weekly ClawPlex DFW meetup in Fort Worth, hosted with FTW DAO at CreateFW. No agenda, no slides — just builders showing what they are working on.",
    url: "https://luma.com/7lcfouly",
    status: "confirmed",
  });

  const faq = faqSchema();

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="pt-16">
        <EventsClient
          eventSchemaJson={JSON.stringify(nextEventSchema)}
          faqSchemaJson={JSON.stringify(faq)}
        />
      </main>
      <Footer />
    </div>
  );
}
