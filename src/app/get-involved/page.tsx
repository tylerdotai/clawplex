import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkWithUsClient } from "@/app/work-with-us/work-with-us-client";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Get Involved";
  const description =
    "Partner with the DFW AI builder community: sponsorships, venue partnerships, and AI credits.";
  return {
    title,
    description,
    alternates: {
      canonical: "/get-involved",
    },
    openGraph: {
      title: `${title} — Agent Builders Club`,
      description,
      type: "website",
      url: "/get-involved",
    },
  };
}

export default function GetInvolvedPage() {
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
