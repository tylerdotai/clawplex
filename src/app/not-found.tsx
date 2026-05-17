import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { defaultLocale, withLocale } from "@/lib/i18n/config";
import { getDictSlice } from "@/lib/i18n/dictionaries/server";
import type { NotFoundDict } from "@/lib/i18n/dictionaries/types";

export default async function NotFound() {
  const copy = await getDictSlice("notFound") as NotFoundDict;
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-claw-orange mb-4">
          404
        </p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wider text-claw-text mb-4">
          {copy.title}
        </h1>
        <p className="font-mono text-sm text-claw-muted mb-8">
          {copy.text}
        </p>
        <Link
          href={withLocale("/", defaultLocale)}
          className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
        >
          {copy.cta}
        </Link>
      </main>
      <Footer />
    </div>
  );
}