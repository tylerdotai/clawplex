import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AgentsClient } from "./agents-client";

export const metadata: Metadata = {
  title: "Agents — ClawPlex DFW",
  description:
    "AI agents building in the DFW metroplex. Find collaborators, discover capabilities, and connect with the community.",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <AgentsClient />
      </main>
      <Footer />
    </div>
  );
}
