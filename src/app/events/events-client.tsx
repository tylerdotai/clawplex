"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import {
  defaultLocale,
  getLocaleFromPathname,
  withLocale,
} from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { EventsDict } from "@/lib/i18n/dictionaries/types";

interface EventClientProps {
  eventSchemaJson: string;
  faqSchemaJson: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

function stagger(i: number) {
  return { ...fade, transition: { duration: 0.7, ease, delay: i * 0.08 } };
}

export function EventsClient({ eventSchemaJson, faqSchemaJson }: EventClientProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = useDictSlice("events") as EventsDict;
  const past = copy.events;

  return (
    <>
      {/* JSON-LD: Event + FAQ schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: eventSchemaJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
      <div className="min-h-screen">
        <Nav />
        <main>
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              {...stagger(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4"
            >
              ClawPlex DFW
            </motion.p>
            <motion.h1
              {...stagger(1)}
              className="font-display text-4xl md:text-6xl tracking-wider text-claw-text leading-none"
            >
              {copy.heading}
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-4 text-base text-claw-muted max-w-xl mx-auto">
              {copy.intro}
            </motion.p>
          </div>
        </section>

        {/* Calendar */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p
              {...stagger(0)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-10 text-center"
            >
              {copy.upcoming}
            </motion.p>
            <motion.div
              {...stagger(1)}
              className="relative w-full"
              style={{ paddingTop: "75%" }}
            >
              <iframe
                src="https://luma.com/embed/calendar/cal-AzkmUYVr0KtSTQ9/events"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: "1px solid #bfcbda88", borderRadius: "4px", position: "absolute", top: 0, left: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                title={copy.calendarTitle}
              />
            </motion.div>
          </div>
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-claw-dim mb-10 text-center"
              >
                {copy.pastEvents}
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {past.map((event, i) => (
                  <motion.div key={event.slug} {...stagger(i + 1)}>
                    <div className="relative overflow-hidden border border-claw-border aspect-video mb-8">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover opacity-70"
                      />
                      <div className="absolute top-4 left-4 border border-claw-border bg-claw-void/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-claw-dim">
                        {copy.past}
                      </div>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl tracking-wider text-claw-text mb-2">
                      {event.title}.
                    </h2>
                    <p className="font-mono text-sm text-claw-dim uppercase tracking-widest mb-4">
                      {event.date}
                    </p>
                    <p className="text-base text-claw-muted leading-relaxed mb-6">
                      {event.description}
                    </p>
                    {event.stats && (
                      <div className="flex gap-8 border-t border-claw-border pt-6">
                        {event.stats.map((stat) => (
                          <div key={stat.label}>
                            <p className="font-display text-3xl text-claw-orange">
                              {stat.value}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mt-1">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-claw-dim mb-4">
              {copy.ctaEyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-6">
              {copy.ctaHeading}
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8">
              {copy.ctaText}
            </motion.p>
            <motion.div {...stagger(3)} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={withLocale("/newsletter", locale)}
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors text-center"
              >
                {copy.newsletter}
              </Link>
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors text-center"
              >
                {copy.discord}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}

export type { EventClientProps };
