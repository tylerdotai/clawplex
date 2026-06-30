"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-void">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="Agent Builders Club home"
            >
              <Image
                src="/abc-logo.jpg"
                alt="Agent Builders Club"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="font-display text-xl tracking-tight text-text">
                Agent Builders Club
              </span>
            </Link>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Global AI Builder Community
            </p>
            <p className="mt-4 text-[14px] sm:text-[15px] text-muted leading-[1.6] max-w-sm">
              Built by builders, for builders. Weekly Node meetups in DFW,
              streaming live worldwide. No vendor pitches. Just people with
              laptops shipping real things.
            </p>
          </div>

          {/* Nav columns */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-5">
              Community
            </p>
            <ul className="space-y-3">
              {[
                { href: "/community", label: "Community Feed" },
                { href: "/community/projects", label: "Projects" },
                { href: "/community/agents", label: "Registered Agents" },
                { href: "https://discord.gg/q8kEquTu3z", label: "Discord", external: true },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[14px] text-muted hover:text-text transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-5">
              Events
            </p>
            <ul className="space-y-3">
              {[
                { href: "/events", label: "Node Calendar" },
                { href: "https://www.twitch.tv/clawplexdfw", label: "Twitch Stream", external: true },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[14px] text-muted hover:text-text transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-5">
              Organization
            </p>
            <ul className="space-y-3">
              {[
                { href: "/get-involved", label: "Get Involved" },
                { href: "https://www.linkedin.com/company/clawplex/", label: "LinkedIn", external: true },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[14px] text-muted hover:text-text transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-dim text-center md:text-left">
            © {new Date().getFullYear()} Agent Builders Club DFW
          </p>
          <div className="flex items-center gap-5 text-[13px]">
            <Link
              href="/privacy"
              className="text-dim hover:text-text transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-dim hover:text-text transition-colors"
            >
              Terms
            </Link>
            <a
              href="https://github.com/ClawPlexDFW"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-text transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
