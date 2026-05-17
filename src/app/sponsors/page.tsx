import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SponsorsClient } from "./sponsors-client";
import { getRequestLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "es" ? "Patrocina" : "Sponsor";
  const description = locale === "es"
    ? "Patrocina la comunidad de builders de IA en DFW. ClawPlex es una comunidad operada por voluntarios para builders de DFW que lanzan productos de IA."
    : "Sponsor the DFW AI builder community. ClawPlex is a volunteer-run community for DFW builders shipping AI products. Sponsors make it free to attend and keep the focus on building.";
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

export default function SponsorsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <SponsorsClient />
      </main>
      <Footer />
    </div>
  );
}
