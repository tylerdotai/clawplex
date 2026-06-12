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
    name: "ClawPlex X FWTX DAO: AI Builders Event",
    startDate: "2026-07-15T17:00:00-05:00",
    endDate: "2026-07-15T19:00:00-05:00",
    location: "The DEC Network @ Fort Worth, 600 Bryan Ave #220, Fort Worth, TX 76104",
    description:
      locale === "es"
        ? "Encuentro casual de ClawPlex DFW en Fort Worth, co-organizado con FWTX DAO. Build-and-chill: trae tu portátil, trabaja en tu proyecto, haz preguntas, muestra un demo si tienes uno. Sin agenda formal, sin diapositivas — solo constructores construyendo en persona."
        : "Casual ClawPlex DFW meetup in Fort Worth, co-organized with FWTX DAO. Build-and-chill: bring a laptop, work on your project, ask questions, show a demo if you've got one. No formal programming, no slides — just builders shipping in person.",
    url: "https://luma.com/evimcn31",
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
