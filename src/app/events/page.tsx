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
    name: "DFW Node 06 — Hermes",
    startDate: "2026-06-10T16:00:00-05:00",
    endDate: "2026-06-10T17:30:00-05:00",
    location: "Spark Coworking, Arlington TX",
    description:
      locale === "es"
        ? "Meetup semanal de ClawPlex DFW en Arlington, organizado en Spark Coworking. Tema: Hermes Agent — el agente autónomo de código abierto de Nous Research que se vuelve más inteligente con el uso. Sin agenda, sin diapositivas — solo constructores explorando agentes de IA auto-mejorables."
        : "Weekly ClawPlex DFW meetup in Arlington, hosted at Spark Coworking. Topic: Hermes Agent — the open-source, self-improving AI agent from Nous Research. No agenda, no slides — just builders exploring self-improving agents in person.",
    url: "https://luma.com/di2osni7",
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
