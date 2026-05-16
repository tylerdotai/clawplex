"use client";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Sponsor the DFW AI builder community. ClawPlex is a volunteer-run community for DFW builders shipping AI products. Sponsors make it free to attend and keep the focus on building.",
  openGraph: {
    title: "Sponsor — ClawPlex DFW",
    description:
      "Sponsor the DFW AI builder community. Make it free to attend and keep the focus on building.",
    type: "website",
  },
};

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

const tiers = [
  {
    name: "Venue Host",
    price: "In-kind",
    tagline: "You provide the space. We fill it.",
    description:
      "Coworking spaces, offices with meeting rooms, or venues that can host 30-100 builders. You get the crowd, the Wifi, and a room full of people actively building AI projects.",
    perks: [
      "Named as venue host on event page",
      "Logo on site and in event listings",
      "3-min welcome remarks at each event you host",
      "Social mentions (Discord, LinkedIn, Twitter)",
      "First right of refusal for future event dates",
    ],
    color: "border-claw-orange",
  },
  {
    name: "Friend of ClawPlex",
    price: "Food & Bev",
    tagline: "Feed the builders. They'll remember.",
    description:
      "Local restaurants, caterers, coffee roasters, or beverage companies. Donate food or drinks for an event. Low lift for you, massive goodwill with the community.",
    perks: [
      "Logo on site and event materials",
      "2-min introduction at the event you sponsor",
      "Thank-you post on LinkedIn and Discord",
      "Name mentioned in event recap",
      "1 free ticket to ClawCon annually",
    ],
    color: "border-claw-cyan",
  },
  {
    name: "Full Sponsor",
    price: "Custom",
    tagline: "Put your name on the DFW AI builder community.",
    description:
      "For companies that want to be embedded in the DFW AI scene. Complete sponsorship of a single event or ongoing support across multiple events.",
    perks: [
      "Everything in Venue Host + Friend of ClawPlex",
      "Logo on all event materials and site",
      "30-min demo or talk slot (non-pitch format — show the work)",
      "Direct access to 100+ DFW builders, founders, and AI practitioners",
      "Post-event attendee list (opt-in)",
      "First look at community research and survey data",
    ],
    color: "border-claw-success",
  },
];

const partners = [
  {
    name: "KiloClaw",
    image: "/ftwdao-logo.png",
    url: "https://kilocode.pxf.io/OYnK0N",
    tagline: "AI Coding Agent",
  },
  {
    name: "FTW DAO",
    image: "/kilocode-logo.png",
    url: "https://fwtx.city",
    tagline: "Community Partner",
  },
];

const venuePartners = [
  {
    name: "Spark Coworking",
    image: "/spark-arlington.png",
    url: "https://sparkcoworking.com/arlington/",
    location: "Arlington, TX",
  },
  {
    name: "CreateFW",
    image: "/createfw-fort-worth.png",
    url: "https://thedec.co/",
    location: "Fort Worth, TX",
  },
  {
    name: "25N Coworking",
    image: "/25n-coworking-frisco.png",
    url: "https://25ncoworking.com/locations/frisco-tx",
    location: "Frisco, TX",
  },
];

export function SponsorsClient() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Header */}
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
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
              SPONSOR.
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-4 text-base text-claw-muted max-w-2xl">
              ClawPlex is a volunteer-run community for DFW builders shipping AI products. Sponsors make it free to attend and keep the focus on building — not logistics.
            </motion.p>
          </div>
        </section>

        {/* What we're building */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-6">
              What we&apos;re building
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-8">
              The DFW AI builder community deserves a real meetup scene.
            </motion.h2>
            <div className="space-y-4 text-base text-claw-muted leading-relaxed max-w-3xl">
              <motion.p {...stagger(2)}>
                Dallas-Fort Worth has serious AI talent — people shipping local models, building agents, automating workflows. But most of them are doing it alone in home offices.
              </motion.p>
              <motion.p {...stagger(3)}>
                ClawPlex exists to connect them. No vendor pitches. No conference theater. Just builders showing real work to other builders.
              </motion.p>
              <motion.p {...stagger(4)}>
                100+ people showed up to ClawCon in March. April 15th was Node 02. May 6th was Node 03. We&apos;re building a weekly rotation across the metro. Sponsors make this sustainable.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-10">
              Sponsorship Tiers
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-claw-border">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  {...stagger(i + 1)}
                  className={`border-t-0 border-l-0 md:border-t md:border-l ${i > 0 ? "border-t md:border-l-0" : ""} ${tier.color} border-2 p-8 md:p-10 flex flex-col`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mb-4">
                    {tier.tagline}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-claw-text mb-2">
                    {tier.name}
                  </h3>
                  <p className="font-mono text-xs text-claw-orange uppercase tracking-widest mb-6">
                    {tier.price}
                  </p>
                  <p className="text-sm text-claw-muted leading-relaxed mb-8 flex-1">
                    {tier.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-claw-muted">
                        <span className="text-claw-orange mt-0.5 shrink-0">→</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who should sponsor */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              {/* Left: copy */}
              <div>
                <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-6">
                  Who should sponsor
                </motion.p>
                <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-4xl tracking-wider text-claw-text mb-6">
                  You know who you are.
                </motion.h2>
                <motion.p {...stagger(2)} className="text-base text-claw-muted leading-relaxed mb-4">
                  Coworking spaces that want to be known as where AI builders hang out. Local AI companies hiring talent. Coffee roasters who want their brand in front of developers. Restaurants looking for a recurring community event.
                </motion.p>
                <motion.p {...stagger(3)} className="text-base text-claw-muted leading-relaxed">
                  You don&apos;t need to be big. You just need to show up.
                </motion.p>
              </div>

              {/* Right: stats */}
              <div>
                <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-6">
                  What we offer
                </motion.p>
                <div className="space-y-6">
                  {[
                    { value: "100+", label: "Builders per event (growing)" },
                    { value: "4x", label: "Events per month across DFW" },
                    { value: "DFW", label: "Dallas-Fort Worth metro" },
                    { value: "0", label: "Vendor pitches — builders only" },
                  ].map((stat) => (
                    <div key={stat.label} className="border-t border-claw-border pt-4">
                      <p className="font-display text-3xl text-claw-orange">{stat.value}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-claw-dim mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners }---*/}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-dim mb-10">
              Partners
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partners.map((partner, i) => (
                <motion.a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stagger(i + 1)}
                  className="group relative overflow-hidden border border-claw-border aspect-video hover:border-claw-orange transition-colors"
                >
                  <div className="absolute inset-0 z-10" />
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-claw-void/90 border-t border-claw-border px-4 py-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-claw-text">{partner.name}</span>
                    <span className="font-mono text-xs text-claw-dim">{partner.tagline}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Venue Partners */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-dim mb-10">
              Venue Partners
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {venuePartners.map((venue, i) => (
                <motion.div
                  key={venue.name}
                  {...stagger(i + 1)}
                >
                  <div className="group relative overflow-hidden border border-claw-border aspect-video hover:border-claw-orange transition-colors">
                    <a
                      href={venue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Visit ${venue.name} website`}
                    />
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-claw-void/90 border-t border-claw-border px-4 py-3 flex items-center justify-between">
                      <span className="font-mono text-sm text-claw-text">{venue.name}</span>
                      <span className="font-mono text-xs text-claw-dim">{venue.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
              Get in touch
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-6">
              LET&apos;S TALK.
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8">
              Reach out on Discord or LinkedIn. We can figure out what makes sense for your organization.
            </motion.p>
            <motion.div {...stagger(3)} className="flex gap-3">
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-claw-orange bg-claw-orange px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-orange/90 transition-colors"
              >
                Discord
              </a>
              <Link
                href="/"
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}