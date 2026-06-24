import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PartnerClient } from "./partner-client";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Hire ClawPlex or partner with the DFW AI builder community: venue partnerships, sponsorships, workshops, and local AI talent.",
  openGraph: {
    title: "Partner — ClawPlex DFW",
    description:
      "Hire ClawPlex or partner with the DFW AI builder community: venue partnerships, sponsorships, workshops, and local AI talent.",
    type: "website",
    url: "/partner",
  },
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <PartnerClient />
      </main>
      <Footer />
    </div>
  );
}
