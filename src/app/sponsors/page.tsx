import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/i18n/server";
import { withLocale } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "es" ? "Trabaja con nosotros" : "Work With Us";
  const description = locale === "es"
    ? "Contrata a ClawPlex o colabora con la comunidad DFW de builders de IA: proyectos de IA, patrocinios, sedes, talleres y talento local."
    : "Hire ClawPlex or partner with the DFW AI builder community: AI projects, sponsorships, venue partnerships, workshops, and local AI talent.";
  return {
    title,
    description,
    alternates: {
      canonical: withLocale("/work-with-us", locale),
    },
    openGraph: {
      title: `${title} — ClawPlex DFW`,
      description,
      type: "website",
      url: withLocale("/work-with-us", locale),
    },
  };
}

export default function SponsorsPage() {
  redirect("/work-with-us");
  return null;
}
