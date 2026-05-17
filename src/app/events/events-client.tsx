"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import {
  defaultLocale,
  getLocaleFromPathname,
  type Locale,
  withLocale,
} from "@/lib/i18n/config";

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

const eventsCopy = {
  en: {
    heading: "NODES & EVENTS.",
    intro:
      "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.",
    upcoming: "Upcoming",
    pastEvents: "Past Events",
    past: "Past",
    calendarTitle: "ClawPlex events calendar",
    ctaEyebrow: "See you at the next node",
    ctaHeading: "GET THE DROP.",
    ctaText:
      "Venue announcements, event reminders, and DFW AI community news — straight to your inbox.",
    newsletter: "Join Newsletter",
    discord: "Join Discord",
    events: [
      {
        slug: "dfw-node-04",
        status: "past",
        title: "DFW Node 04 — Frisco",
        date: "May 15, 2026",
        image: "/node-04-frisco-01.jpeg",
        description:
          "Claude In The Wild Meetup. Informal meetup where people are putting Claude to work on real projects and sharing what actually helps in day-to-day use. Heavy token users showing workflows, automations, research helpers, writing tools, and practical setups.",
        stats: [
          { value: "30+", label: "Attendees" },
          { value: "Claude", label: "In The Wild" },
          { value: "25N Coworking", label: "Frisco Host" },
        ],
      },
      {
        slug: "dfw-node-03",
        status: "past",
        title: "DFW Node 03 — Fort Worth",
        date: "May 6, 2026",
        image: "/node-03-meetup.png",
        description:
          "Hands-on Mac Mini + OpenClaw install workshop. Live demo of the Mac Mini OpenClaw setup. Great networking and builders of all levels.",
        stats: [
          { value: "~10", label: "Attendees" },
          { value: "Live Demo", label: "Mac Mini OpenClaw" },
          { value: "Workshop", label: "Hands-on Setup" },
        ],
      },
      {
        slug: "dfw-node-02",
        status: "past",
        title: "DFW Node 02",
        date: "April 15, 2026",
        image: "/spark-arlington.png",
        description:
          "Weekly meetup for DFW builders tinkering with AI agents and OpenClaw. No agenda, no slides — just people with laptops and coffee.",
        stats: null,
      },
      {
        slug: "clawcon-dfw",
        status: "past",
        title: "ClawCon DFW",
        date: "March 24, 2026",
        image: "/clawcon-1.webp",
        description:
          "Our inaugural node. 100+ DFW builders showed up to the Choctaw Stadium district for live demos, lightning talks, and real conversations about shipping AI projects.",
        stats: [
          { value: "100+", label: "Attendees" },
          { value: "4", label: "Live Demos" },
          { value: "1", label: "Node Launched" },
        ],
      },
    ],
  },
  es: {
    heading: "NODES Y EVENTOS.",
    intro:
      "Meetups semanales para builders de IA en DFW. Sin charlas. Sin diapositivas. Solo gente con laptops y café, hablando con honestidad sobre lo que están construyendo.",
    upcoming: "Próximos",
    pastEvents: "Eventos anteriores",
    past: "Anterior",
    calendarTitle: "Calendario de eventos de ClawPlex",
    ctaEyebrow: "Nos vemos en el próximo node",
    ctaHeading: "RECIBE THE DROP.",
    ctaText:
      "Anuncios de venue, recordatorios de eventos y noticias de la comunidad de IA en DFW — directo a tu inbox.",
    newsletter: "Únete al newsletter",
    discord: "Únete a Discord",
    events: [
      {
        slug: "dfw-node-04",
        status: "past",
        title: "DFW Node 04 — Frisco",
        date: "15 de mayo de 2026",
        image: "/node-04-frisco-01.jpeg",
        description:
          "Meetup Claude In The Wild. Un encuentro informal donde la gente pone a Claude a trabajar en proyectos reales y comparte lo que de verdad ayuda en el uso diario. Usuarios intensivos de tokens mostrando workflows, automatizaciones, asistentes de investigación, herramientas de escritura y setups prácticos.",
        stats: [
          { value: "30+", label: "Asistentes" },
          { value: "Claude", label: "In The Wild" },
          { value: "25N Coworking", label: "Anfitrión en Frisco" },
        ],
      },
      {
        slug: "dfw-node-03",
        status: "past",
        title: "DFW Node 03 — Fort Worth",
        date: "6 de mayo de 2026",
        image: "/node-03-meetup.png",
        description:
          "Workshop práctico de instalación de Mac Mini + OpenClaw. Demo en vivo del setup de OpenClaw en Mac Mini. Gran networking y builders de todos los niveles.",
        stats: [
          { value: "~10", label: "Asistentes" },
          { value: "Demo en vivo", label: "Mac Mini OpenClaw" },
          { value: "Workshop", label: "Setup práctico" },
        ],
      },
      {
        slug: "dfw-node-02",
        status: "past",
        title: "DFW Node 02",
        date: "15 de abril de 2026",
        image: "/spark-arlington.png",
        description:
          "Meetup semanal para builders de DFW experimentando con agentes de IA y OpenClaw. Sin agenda, sin diapositivas — solo gente con laptops y café.",
        stats: null,
      },
      {
        slug: "clawcon-dfw",
        status: "past",
        title: "ClawCon DFW",
        date: "24 de marzo de 2026",
        image: "/clawcon-1.webp",
        description:
          "Nuestro node inaugural. Más de 100 builders de DFW llegaron al distrito de Choctaw Stadium para demos en vivo, lightning talks y conversaciones reales sobre lanzar proyectos de IA.",
        stats: [
          { value: "100+", label: "Asistentes" },
          { value: "4", label: "Demos en vivo" },
          { value: "1", label: "Node lanzado" },
        ],
      },
    ],
  },
} satisfies Record<Locale, {
  heading: string;
  intro: string;
  upcoming: string;
  pastEvents: string;
  past: string;
  calendarTitle: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaText: string;
  newsletter: string;
  discord: string;
  events: Array<{
    slug: string;
    status: "past";
    title: string;
    date: string;
    image: string;
    description: string;
    stats: Array<{ value: string; label: string }> | null;
  }>;
}>;

interface EventClientProps {
  eventSchemaJson: string;
  faqSchemaJson: string;
}

export function EventsClient({ eventSchemaJson, faqSchemaJson }: EventClientProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = eventsCopy[locale];
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
