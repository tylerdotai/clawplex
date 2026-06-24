"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { partner as copy } from "@/lib/dict";

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

export function PartnerClient() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-claw-border px-5 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-claw-blue/60" />
            {copy.eyebrow}
          </motion.p>
          <motion.h1 {...stagger(1)} className="font-display text-5xl sm:text-6xl lg:text-[80px] leading-[0.98] tracking-tight text-claw-text">
            {copy.titleLine1}<br />
            <span className="underline-accent">{copy.titleAccent}</span>.
          </motion.h1>
          <motion.p {...stagger(2)} className="mt-7 text-base sm:text-lg text-claw-muted leading-relaxed max-w-2xl">
            {copy.intro}
          </motion.p>
          <motion.div {...stagger(3)} className="mt-9 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 text-sm sm:text-base font-medium text-claw-void hover:bg-claw-blue-light transition-colors cursor-pointer">
              {copy.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="https://discord.gg/q8kEquTu3z" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm sm:text-base text-claw-muted hover:text-claw-text transition-colors group">
              {copy.discord}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Community proof */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-claw-blue/60" />
                {copy.proof.eyebrow}
              </motion.p>
              <motion.h2 {...stagger(1)} className="font-display text-4xl sm:text-5xl lg:text-[60px] leading-[1.02] tracking-tight text-claw-text">
                {copy.proof.title}
              </motion.h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4 text-base sm:text-lg text-claw-muted leading-[1.65]">
                {copy.proof.body.map((text, i) => (
                  <motion.p key={text} {...stagger(i + 2)}>{text}</motion.p>
                ))}
              </div>
              <motion.dl {...stagger(5)} className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-lg border border-claw-border bg-claw-border">
                {copy.proof.stats.map((stat) => (
                  <div key={stat.label} className="bg-claw-surface px-4 py-5">
                    <dt className="font-display text-3xl text-claw-blue leading-none">{stat.value}</dt>
                    <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-claw-muted leading-snug">{stat.label}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Us — featured */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-5 flex items-center gap-2">
                <span className="inline-block h-px w-6 bg-claw-blue/60" />
                {copy.hire.eyebrow}
              </motion.p>
              <motion.h2 {...stagger(1)} className="font-display text-4xl sm:text-5xl lg:text-[60px] leading-[1.02] tracking-tight text-claw-text">
                {copy.hire.titlePrefix}<span className="underline-accent">{copy.hire.titleAccent}</span>.
              </motion.h2>
              <motion.div {...stagger(2)} className="mt-7">
                <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 text-sm sm:text-base font-medium text-claw-void hover:bg-claw-blue-light transition-colors cursor-pointer">
                  {copy.hire.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.div>
            </div>
            <div className="lg:col-span-7">
              <motion.p {...stagger(2)} className="text-lg sm:text-[19px] text-claw-muted leading-[1.65]">
                {copy.hire.body} <strong className="text-claw-text font-semibold">{copy.hire.bodyEmphasis}</strong>.
              </motion.p>
              <motion.dl {...stagger(3)} className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-px overflow-hidden rounded-lg border border-claw-border bg-claw-border">
                {copy.hire.capabilities.map((cap) => (
                  <div key={cap.label} className="bg-claw-surface px-4 py-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-claw-blue">{cap.label}</dt>
                    <dd className="mt-2 text-[14px] text-claw-text leading-snug">{cap.desc}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to work with us */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div {...stagger(0)} className="mb-12 md:mb-16 flex items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue">{copy.waysEyebrow}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-claw-dim tabular-nums">
              01\u2009–\u2009{String(copy.ways.length).padStart(2, "0")}
            </p>
          </motion.div>
          <div className="border-t border-claw-border">
            {copy.ways.map((way, i) => (
              <motion.div key={way.num} {...stagger(i + 1)} className="border-b border-claw-border">
                <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-3 items-start py-8 md:py-10 lg:py-12">
                  <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    <span className="font-display text-5xl sm:text-6xl md:text-[64px] lg:text-[76px] leading-none text-claw-dim/70 tabular-nums">{way.num}</span>
                  </div>
                  <div className="col-span-12 md:col-span-9 lg:col-span-10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-claw-blue mb-3">{way.label}</p>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] leading-[1.15] tracking-tight text-claw-text mb-3">{way.title}</h3>
                    <p className="text-[15px] sm:text-base text-claw-muted leading-[1.6] max-w-prose">{way.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor tiers */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-10">
            {copy.sponsorship.eyebrow}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-lg border border-claw-border bg-claw-border">
            {copy.sponsorship.tiers.map((tier, i) => (
              <motion.div key={tier.name} {...stagger(i + 1)} className="bg-claw-surface p-7 sm:p-8 lg:p-9 flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-claw-dim mb-4">{tier.tagline}</p>
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-claw-text mb-2">{tier.name}</h3>
                <p className="font-mono text-[11px] text-claw-blue uppercase tracking-[0.18em] mb-6">{tier.price}</p>
                <p className="text-[15px] text-claw-muted leading-[1.6] mb-7 flex-1">{tier.description}</p>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-[14px] text-claw-muted leading-snug">
                      <span className="text-claw-blue mt-0.5 shrink-0">→</span>{perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-14">
          <div>
            <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-dim mb-8">
              {copy.partners.partners}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map((p, i) => (
                <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" {...stagger(i + 1)}
                  className="group relative overflow-hidden rounded-lg border border-claw-border aspect-video hover:border-claw-blue transition-colors"
                  aria-label={copy.partners.visit(p.name)}>
                  <Image src={p.image} alt="" fill className="object-cover group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 bg-claw-void/90 border-t border-claw-border px-4 py-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-sm text-claw-text">{p.name}</span>
                    <span className="font-mono text-xs text-claw-dim text-right">{p.tagline}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <motion.p {...stagger(0)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-dim mb-8">
              {copy.partners.venues}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {venuePartners.map((v, i) => (
                <motion.a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer" {...stagger(i + 1)}
                  className="group relative overflow-hidden rounded-lg border border-claw-border aspect-video hover:border-claw-blue transition-colors"
                  aria-label={copy.partners.visit(v.name)}>
                  <Image src={v.image} alt="" fill className="object-cover group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 bg-claw-void/90 border-t border-claw-border px-4 py-3">
                    <span className="block font-mono text-sm text-claw-text">{v.name}</span>
                    <span className="mt-1 block font-mono text-xs text-claw-dim">{v.location}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-b border-claw-border px-5 md:px-8 py-20 md:py-28 lg:py-32">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue mb-4">{copy.bottomEyebrow}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-claw-text">
            {copy.bottomTitlePrefix}<span className="underline-accent">{copy.bottomTitleAccent}</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-claw-muted">{copy.bottomBody}</p>
          <button type="button" onClick={() => setModalOpen(true)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-claw-blue px-6 py-3.5 text-sm sm:text-base font-medium text-claw-void hover:bg-claw-blue-light transition-colors cursor-pointer">
            {copy.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Embed form modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-claw-void/85 backdrop-blur-sm p-3 sm:p-6"
            role="dialog" aria-modal="true" aria-labelledby="partner-modal-title"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="relative w-full max-w-3xl h-[85vh] rounded-2xl border border-claw-border bg-claw-surface overflow-hidden shadow-2xl shadow-black/60 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-claw-border px-5 py-3 sm:px-6">
                <p id="partner-modal-title" className="font-mono text-[11px] uppercase tracking-[0.22em] text-claw-blue">
                  {copy.modalEyebrow}
                </p>
                <button type="button" onClick={() => setModalOpen(false)} aria-label={copy.closeModal}
                  className="rounded-full p-1.5 text-claw-muted hover:text-claw-text hover:bg-claw-surface-2 transition-colors cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4.5 4.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="relative flex-1 bg-claw-void flex items-center justify-center px-6 text-center">
                <div className="max-w-sm">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-blue">{copy.formComingSoonEyebrow}</p>
                  <p className="mt-4 font-display text-2xl sm:text-3xl tracking-tight text-claw-text leading-tight">{copy.formComingSoonTitle}</p>
                  <p className="mt-4 text-[15px] text-claw-muted leading-[1.6]">
                    {copy.formComingSoonBody}{" "}
                    <a href="https://discord.gg/q8kEquTu3z" target="_blank" rel="noopener noreferrer" className="text-claw-blue hover:text-claw-blue-light transition-colors">Discord</a>.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
