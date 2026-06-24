import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { HomeClient } from "./home-client";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <HomeClient />
      </main>
      <Footer />
    </div>
  );
}
