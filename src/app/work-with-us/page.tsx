import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkWithUsClient } from "./work-with-us-client";
import { getRequestLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "es" ? "Trabaja con nosotros" : "Work With Us";
  const description = locale === "es"
    ? "Contrata a ClawPlex o colabora con la comunidad DFW de builders de IA: proyectos de IA, patrocinios, partnerships, sedes, talleres y talento local."
    : "Hire ClawPlex or partner with the DFW AI builder community: AI projects, sponsorships, venue partnerships, workshops, and local AI talent.";
  return {
    title,
    description,
    alternates: {
      canonical: locale === "es" ? "/es/work-with-us" : "/en/work-with-us",
    },
    openGraph: {
      title: `${title} — ClawPlex DFW`,
      description,
      type: "website",
      url: locale === "es" ? "/es/work-with-us" : "/en/work-with-us",
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
