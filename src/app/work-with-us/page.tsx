import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkWithUsClient } from "./work-with-us-client";
import { getRequestLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "es" ? "Trabaja con nosotros" : "Work With Us";
  const description = locale === "es"
    ? "¿Quieres colaborar con ClawPlex? Cuéntanos en qué estás trabajando: patrocinios, partnerships, sedes, talleres y colaboraciones de la comunidad DFW de builders de IA."
    : "Want to partner with ClawPlex? Tell us what you're working on — sponsorships, partnerships, venues, workshops, and collaborations with the DFW AI builder community.";
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

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <WorkWithUsClient />
      </main>
      <Footer />
    </div>
  );
}
