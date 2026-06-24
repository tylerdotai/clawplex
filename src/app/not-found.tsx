import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-claw-blue mb-4">404</p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wider text-claw-text mb-4">
          Page not found.
        </h1>
        <p className="font-mono text-sm text-claw-muted mb-8">
          This page doesn&apos;t exist or was removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3 text-sm font-medium text-claw-void hover:bg-claw-blue-light transition-colors"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
