"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { events as copy } from "@/lib/dict";

const ease = [0.25, 0.1, 0.25, 1] as const;
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};
const stagger = (i: number) => ({ ...fade, transition: { duration: 0.7, ease, delay: i * 0.08 } });

export function EventsClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-claw-border px-5 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,131,255,0.08),transparent)]" />
        </div>
        <div className="mx-auto max-w-4xl relative">
          <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-claw-blue/60" />
            {copy.hero.eyebrow}
          </motion.p>
          <motion.h1 {...stagger(1)} className="font-display text-5xl sm:text-6xl lg:text-[72px] leading-[0.97] tracking-tight text-claw-text">
            {copy.hero.title}
          </motion.h1>
          <motion.p {...stagger(2)} className="mt-7 text-base sm:text-lg text-claw-muted leading-relaxed max-w-2xl">
            {copy.hero.subtitle}
          </motion.p>
          <motion.div {...stagger(3)} className="mt-8 flex flex-wrap items-center gap-4">
            <a href={copy.hero.ctaHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 text-sm font-medium text-claw-void hover:bg-claw-blue-light transition-colors">
              {copy.hero.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link href="/community"
              className="inline-flex items-center gap-1.5 text-sm text-claw-muted hover:text-claw-text transition-colors">
              {copy.hero.secondaryCta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 md:mb-14 flex items-center justify-between">
            <motion.h2 {...stagger(0)} className="font-display text-3xl sm:text-4xl tracking-tight text-claw-text">
              {copy.upcomingHeading}
            </motion.h2>
            <motion.p {...stagger(1)} className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-claw-dim tabular-nums">
              {copy.events.length} events
            </motion.p>
          </div>

          {copy.events.length === 0 ? (
            <motion.p {...stagger(0)} className="text-claw-muted text-center py-16">
              {copy.noEvents}
            </motion.p>
          ) : (
            <div className="space-y-4">
              {copy.events.map((event, i) => (
                <motion.article key={event.slug} {...stagger(i + 1)}>
                  <Link href={`/events/${event.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border border-claw-border bg-claw-surface p-5 sm:p-6 hover:border-claw-blue transition-colors">
                    {/* Date block */}
                    <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 sm:w-20 shrink-0">
                      <div className="flex sm:flex-col items-center gap-1 text-center">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-claw-blue">
                          {event.month}
                        </span>
                        <span className="font-display text-4xl sm:text-5xl leading-none text-claw-text">
                          {event.day}
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-display text-xl sm:text-2xl tracking-tight text-claw-text group-hover:text-claw-blue transition-colors">
                          {event.name}
                        </h3>
                        {event.isVirtual && (
                          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-claw-dim border border-claw-border px-2 py-0.5 rounded-full">
                            Virtual
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-claw-muted leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-claw-dim">
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M6 1.5C4.5 1.5 3.5 2.5 3.5 4c0 2 2.5 6.5 2.5 6.5S8.5 6 8.5 4C8.5 2.5 7.5 1.5 6 1.5Z" stroke="currentColor" strokeWidth="1.2" />
                            <circle cx="6" cy="4" r="1" stroke="currentColor" strokeWidth="1.2" />
                          </svg>
                          {event.location}
                        </span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="hidden sm:flex shrink-0 text-claw-dim group-hover:text-claw-blue transition-colors">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...stagger(0)} className="font-display text-3xl sm:text-4xl tracking-tight text-claw-text mb-10">
            {copy.faqHeading}
          </motion.h2>
          <div className="space-y-4">
            {copy.faqs.map((faq, i) => (
              <motion.details key={faq.q} {...stagger(i + 1)} className="group rounded-xl border border-claw-border bg-claw-surface">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 select-none">
                  <span className="text-[15px] font-medium text-claw-text group-hover:text-claw-blue transition-colors">
                    {faq.q}
                  </span>
                  <svg className="shrink-0 w-4 h-4 text-claw-dim transition-transform group-open:rotate-180" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="border-t border-claw-border px-5 pb-5 pt-4">
                  <p className="text-[14px] text-claw-muted leading-relaxed">{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
