"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import {
  defaultLocale,
  getLocaleFromPathname,
  withLocale,
} from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { SponsorsDict } from "@/lib/i18n/dictionaries/types";

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

const partners = [
  {
    name: "KiloClaw",
    image: "/ftwdao-logo.png",
    url: "https://kilocode.pxf.io/OYnK0N",
    taglines: { en: "AI Coding Agent", es: "Agente de código con IA" },
  },
  {
    name: "FTW DAO",
    image: "/kilocode-logo.png",
    url: "https://fwtx.city",
    taglines: { en: "Community Partner", es: "Partner de comunidad" },
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
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = useDictSlice("sponsors") as SponsorsDict;

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
              {copy.heading}
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-4 text-base text-claw-muted max-w-2xl">
              {copy.intro}
            </motion.p>
          </div>
        </section>

        {/* What we're building */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-6">
              {copy.buildingEyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-8">
              {copy.buildingHeading}
            </motion.h2>
            <div className="space-y-4 text-base text-claw-muted leading-relaxed max-w-3xl">
              {copy.buildingBody.map((text, i) => (
                <motion.p key={text} {...stagger(i + 2)}>
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-10">
              {copy.tiersEyebrow}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-claw-border">
              {copy.tiers.map((tier, i) => (
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
                  {copy.sponsorWhoEyebrow}
                </motion.p>
                <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-4xl tracking-wider text-claw-text mb-6">
                  {copy.sponsorWhoHeading}
                </motion.h2>
                {copy.sponsorWhoBody.map((text, i) => (
                  <motion.p
                    key={text}
                    {...stagger(i + 2)}
                    className={`text-base text-claw-muted leading-relaxed ${i === 0 ? "mb-4" : ""}`}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Right: stats */}
              <div>
                <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-6">
                  {copy.offerEyebrow}
                </motion.p>
                <div className="space-y-6">
                  {copy.stats.map((stat) => (
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
              {copy.partners}
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
                    <span className="font-mono text-xs text-claw-dim">{partner.taglines[locale]}</span>
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
              {copy.venuePartners}
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
                      aria-label={copy.visitVenue(venue.name)}
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
              {copy.contactEyebrow}
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-6">
              {copy.contactHeading}
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-claw-muted mb-8">
              {copy.contactText}
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
                href={withLocale("/", locale)}
                className="border border-claw-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-muted hover:border-claw-orange hover:text-claw-orange transition-colors"
              >
                {copy.backHome}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
