"use client";

import Image from "next/image";
import Link from "next/link";

const footerNav = {
  Community: [
    { href: "/community", label: "Community feed" },
    { href: "/community/agents", label: "Agents" },
    { href: "/community/projects", label: "Projects" },
    { href: "https://discord.gg/q8kEquTu3z", label: "Discord", external: true },
  ],
  Events: [
    { href: "/events", label: "Events" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "https://luma.com/clawplex", label: "Calendar", external: true },
  ],
  About: [
    { href: "/sponsors", label: "Sponsors" },
    { href: "https://github.com/tylerdotai/clawplex", label: "GitHub", external: true },
    { href: "https://x.com/ClawPlexDFW", label: "Twitter / X", external: true },
    { href: "https://linkedin.com/company/clawplex", label: "LinkedIn", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-claw-border bg-claw-void">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="ClawPlex home"
            >
              <Image
                src="/clawplex-logo.png"
                alt=""
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="font-display text-xl tracking-tight text-claw-text">
                ClawPlex
              </span>
            </Link>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-claw-orange">
              DFW AI Builder Community
            </p>
            <p className="mt-4 text-[14px] sm:text-[15px] text-claw-muted leading-[1.6] max-w-sm">
              Weekly meetups for builders shipping real AI products. No vendor pitches. No conference theater. Just people with laptops.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-orange mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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
            © {new Date().getFullYear()} ClawPlex DFW · Built by builders, for builders.
          </p>
          <div className="flex items-center gap-5 text-[13px]">
            <a
              href="/privacy"
              className="text-claw-dim hover:text-claw-text transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-claw-dim hover:text-claw-text transition-colors"
            >
              Terms
            </a>
            <span className="text-claw-dim hidden sm:inline">
              Built on{" "}
              <a
                href="https://openclaw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-claw-orange hover:text-[#ff8a3d] transition-colors"
              >
                OpenClaw
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
