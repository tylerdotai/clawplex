import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { eventSchema, faqSchema } from "@/components/agent-readiness/json-ld-schemas";
import { EventsClient } from "./events-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nodes & Events",
    description:
      "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.",
    openGraph: {
      title: "Nodes & Events — ClawPlex DFW",
      description:
        "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.",
      type: "website",
      url: "/events",
    },
  };
}

export default async function EventsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <EventsClient />
      </main>
      <Footer />
    </div>
  );
}
