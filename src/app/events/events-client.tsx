"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";

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

const pastEvents = [
  {
    slug: "dfw-node-06",
    title: "DFW Node 06 — Hermes",
    date: "June 28, 2026",
    image: "/node-06-hermes-arlington-03.webp",
    description:
      "Hermes Agent launch event at Spark Coworking Arlington. The community's own AI agent made its debut — live demo, real conversations, and a look at what's next for the DFW builder ecosystem.",
    stats: [
      { value: "Spark Coworking", label: "Arlington" },
      { value: "Jun 28", label: "2026" },
    ],
  },
  {
    slug: "dfw-node-05",
    title: "DFW Node 05 — Claude Tools",
    date: "June 3, 2026",
    image: "/node-05-claude-tools-southlake-01.webp",
    description:
      "20+ DFW builders gathered at Office Evolution Southlake for an honest conversation about the AI tools actually on their desks — Cursor, Claude Code, OpenCode, OpenAI, Hermes, OpenClaw, and more. No slides, no pitches — just builders sharing what's working, what isn't, and what keeps giving them trouble.",
    stats: [
      { value: "20+", label: "Builders" },
      { value: "Tools", label: "On The Desk" },
      { value: "Southlake", label: "Office Evolution" },
    ],
  },
  {
    slug: "dfw-node-04",
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
    title: "DFW Node 02",
    date: "April 15, 2026",
    image: "/spark-arlington.png",
    description:
      "Weekly meetup for DFW builders tinkering with AI agents and OpenClaw. No agenda, no slides — just people with laptops and coffee.",
    stats: null,
  },
  {
    slug: "clawcon-dfw",
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
];

export function EventsClient({ eventSchemaJson, faqSchemaJson }: EventClientProps) {
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
          <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4"
              >
                Agent Builders Club DFW
              </motion.p>
              <motion.h1
                {...stagger(1)}
                className="font-display text-4xl md:text-6xl tracking-wider text-text leading-none"
              >
                Events
              </motion.h1>
              <motion.p {...stagger(2)} className="mt-4 text-base text-muted max-w-xl mx-auto">
                Every week, builders come together to ship something real.
                No panels. No slides. Just demos, code, and decisions made in the room.
              </motion.p>
            </div>
          </section>

          {/* Calendar */}
          <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
              <motion.p
                {...stagger(0)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-10 text-center"
              >
                Upcoming
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
                  title="Agent Builders Club Events"
                />
              </motion.div>
            </div>
          </section>

          {/* Past */}
          {pastEvents.length > 0 && (
            <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
              <div className="mx-auto max-w-5xl">
                <motion.p
                  {...stagger(0)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-10 text-center"
                >
                  Past Events
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {pastEvents.map((event, i) => (
                    <motion.div key={event.slug} {...stagger(i + 1)}>
                      <div className="relative overflow-hidden border border-border aspect-video mb-4">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover opacity-70"
                        />
                        <div className="absolute top-4 left-4 border border-border bg-void/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                          Past
                        </div>
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl tracking-wider text-text mb-2">
                        {event.title}.
                      </h2>
                      <p className="font-mono text-sm text-dim uppercase tracking-widest mb-4">
                        {event.date}
                      </p>
                      <p className="text-base text-muted leading-relaxed mb-6">
                        {event.description}
                      </p>
                      {event.stats && (
                        <div className="flex gap-8 border-t border-border pt-6">
                          {event.stats.map((stat) => (
                            <div key={stat.label}>
                              <p className="font-display text-3xl text-accent">
                                {stat.value}
                              </p>
                              <p className="font-mono text-[10px] uppercase tracking-widest text-dim mt-1">
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
              <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-widest text-dim mb-4">
                Stay in the Loop
              </motion.p>
              <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-text mb-6">
                Come to the next Node.
              </motion.h2>
              <motion.p {...stagger(2)} className="text-base text-muted mb-8">
                Every Node is free to attend. Bring a build to show, or just come to watch.
                Either way — you won't leave empty-handed.
              </motion.p>
              <motion.div {...stagger(3)} className="flex justify-center">
                <a
                  href="https://discord.gg/q8kEquTu3z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors text-center"
                >
                  Join Discord
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
