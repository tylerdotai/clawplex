"use client";

import Image from "next/image";
import Link from "next/link";
import { footer as copy } from "@/lib/dict";

export function Footer() {
  return (
    <footer className="border-t border-claw-border bg-claw-void">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={copy.home}>
              <Image src="/clawplex-logo.png" alt="" width={28} height={28} className="object-contain" />
              <span className="font-display text-xl tracking-tight text-claw-text">ClawPlex</span>
            </Link>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue">
              {copy.eyebrow}
            </p>
            <p className="mt-4 text-[14px] sm:text-[15px] text-claw-muted leading-[1.6] max-w-sm">
              {copy.description}
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(copy.nav).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.external ? item.href : item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[14px] text-claw-muted hover:text-claw-text transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-claw-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-claw-dim text-center md:text-left">
            © {new Date().getFullYear()} ClawPlex DFW · {copy.copyright}
          </p>
          <div className="flex items-center gap-5 text-[13px]">
            <a href="/privacy" className="text-claw-dim hover:text-claw-text transition-colors">
              {copy.privacy}
            </a>
            <a href="/terms" className="text-claw-dim hover:text-claw-text transition-colors">
              {copy.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
