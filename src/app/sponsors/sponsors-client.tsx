"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";

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
    image: "/kiloclaw-logo.png",
    url: "https://kilocode.pxf.io/OYnK0N",
    tagline: "AI Coding Agent",
  },
  {
    name: "FTW DAO",
    image: "/ftwdao-logo.png",
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
    name: "The DEC Network",
    image: "/the-dec-network-fort-worth.png",
    url: "https://thedec.co/",
    location: "Fort Worth, TX",
  },
  {
    name: "Office Evolution Southlake",
    image: "/office-evolution-southlake.webp",
    url: "https://www.officeevolution.com/locations/usa/texas/southlake/",
    location: "Southlake, TX",
  },
  {
    name: "25N Coworking",
    image: "/25n-coworking-frisco.png",
    url: "https://25ncoworking.com/locations/frisco-tx",
    location: "Frisco, TX",
  },
];

const tiers = [
  {
    name: "Friend",
    tagline: "For Individuals",
    price: "Pay what you can",
    color: "border-border",
    description:
      "Get a name on the website and a warm feeling. Great if you're just getting started.",
    perks: [
      "Logo on website (individuals)",
      "Shoutout at events",
      "Community Discord",
    ],
  },
  {
    name: "Patron",
    tagline: "For Small Teams",
    price: "$500 / year",
    color: "border-accent",
    description:
      "Bring your team into the community, get your build showcased, and connect with the DFW AI scene.",
    perks: [
      "Everything in Friend",
      "Logo on website + events page",
      "Featured project showcase",
      "2 free tickets to each Node",
      "Job board posts (2x / year)",
    ],
  },
  {
    name: "Champion",
    tagline: "For Companies",
    price: "$2,000 / year",
    color: "border-accent",
    description:
      "Serious about reaching the DFW AI builder community. Your name and brand throughout every event.",
    perks: [
      "Everything in Patron",
      "Logo on all event materials",
      "Speaking slot at 2 Nodes / year",
      "Premium job board access",
      "Private community channel",
    ],
  },
];

export function SponsorsClient() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Header */}
        <section className="border-b border-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
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
              Sponsor the Node
            </motion.h1>
            <motion.p {...stagger(2)} className="mt-4 text-base text-muted max-w-2xl">
              We bring together the most active AI builders, agent developers, and
              automation-forward teams in DFW. Reach them directly — without a vendor pitch.
            </motion.p>
          </div>
        </section>

        {/* What we're building */}
        <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
              What We're Building
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-text mb-8">
              A community that actually ships
            </motion.h2>
            <div className="space-y-4 text-base text-muted leading-relaxed max-w-3xl">
              <motion.p {...stagger(2)}>
                Agent Builders Club isn't a networking group. It's a working lab.
                Members are shipping agents, automating workflows, and building businesses
                on top of LLMs — in public, every week.
              </motion.p>
              <motion.p {...stagger(3)}>
                Our sponsor program puts your name in front of builders who are making
                decisions right now — about tools, APIs, and infrastructure.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-10">
              Sponsorship Tiers
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  {...stagger(i + 1)}
                  className={`border-t-0 border-l-0 md:border-t md:border-l ${i > 0 ? "border-t md:border-l-0" : ""} ${tier.color} border-2 p-8 md:p-10 flex flex-col`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-dim mb-4">
                    {tier.tagline}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-text mb-2">
                    {tier.name}
                  </h3>
                  <p className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
                    {tier.price}
                  </p>
                  <p className="text-sm text-muted leading-relaxed mb-8 flex-1">
                    {tier.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-muted">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
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
        <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
                  Who Should Sponsor
                </motion.p>
                <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-4xl tracking-wider text-text mb-6">
                  AI tool providers, APIs, and dev infra
                </motion.h2>
                <motion.p {...stagger(2)} className="text-base text-muted leading-relaxed mb-4">
                  Our members are early adopters who are actively evaluating tools.
                  If you have an AI product that builders actually want to use,
                  this is the room.
                </motion.p>
                <motion.p {...stagger(3)} className="text-base text-muted leading-relaxed">
                  We don't do vendor pitches. Sponsors are visible, respected, and
                  present — but the stage belongs to builders.
                </motion.p>
              </div>
              <div>
                <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
                  What You Get
                </motion.p>
                <div className="space-y-6">
                  {[
                    { value: "50+", label: "Active builders per Node" },
                    { value: "1,000+", label: "Monthly reach (online + in-person)" },
                    { value: "Weekly", label: "Consistent touchpoints" },
                    { value: "DFW", label: "Fastest-growing US tech corridor" },
                  ].map((stat) => (
                    <div key={stat.label} className="border-t border-border pt-4">
                      <p className="font-display text-3xl text-accent">{stat.value}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-dim mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-10">
              Our Sponsors
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partners.map((partner, i) => (
                <motion.a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stagger(i + 1)}
                  className="group relative overflow-hidden border border-border aspect-video hover:border-accent transition-colors"
                >
                  <div className="absolute inset-0 z-10" />
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-void/90 border-t border-border px-4 py-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-text">{partner.name}</span>
                    <span className="font-mono text-xs text-dim">{partner.tagline}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Venue Partners */}
        <section className="border-b border-border px-5 md:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-dim mb-10">
              Venue Partners
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {venuePartners.map((venue, i) => (
                <motion.div key={venue.name} {...stagger(i + 1)}>
                  <div className="group relative overflow-hidden border border-border aspect-video hover:border-accent transition-colors">
                    <a
                      href={venue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Visit ${venue.name}`}
                    />
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-void/90 border-t border-border px-4 py-3 flex items-center justify-between">
                      <span className="font-mono text-sm text-text">{venue.name}</span>
                      <span className="font-mono text-xs text-dim">{venue.location}</span>
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
            <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Get In Touch
            </motion.p>
            <motion.h2 {...stagger(1)} className="font-display text-3xl md:text-5xl tracking-wider text-text mb-6">
              Let's talk.
            </motion.h2>
            <motion.p {...stagger(2)} className="text-base text-muted mb-8">
              Reach out on Discord or via the form below. We respond to every serious inquiry.
            </motion.p>
            <motion.div {...stagger(3)} className="flex gap-3">
              <a
                href="https://discord.gg/q8kEquTu3z"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-void hover:bg-accent/90 transition-colors"
              >
                Discord
              </a>
              <Link
                href="/"
                className="border border-border px-8 py-4 font-mono text-sm uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-colors"
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
