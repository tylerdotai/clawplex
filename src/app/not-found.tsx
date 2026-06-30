import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
          404
        </p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wider text-text mb-4">
          Not Found
        </h1>
        <p className="font-mono text-sm text-muted mb-8">
          This page does not exist.
        </p>
        <Link
          href="/"
          className="border border-accent bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-void hover:bg-accent/90 transition-colors"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
