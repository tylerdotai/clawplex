"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { newsletterUiCopy, translateIssue } from "@/components/newsletter/i18n";
import { defaultLocale, getLocaleFromPathname, withLocale } from "@/lib/i18n/config";
import type { ParagraphBlock } from "@/lib/newsletter";

const ease = [0.25, 0.1, 0.25, 1] as const;

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  };
}

function renderParagraph(segments: ParagraphBlock["segments"]) {
  return segments.map((seg, j) => {
    switch (seg.type) {
      case "bold":
        return <strong key={j} className="font-bold text-claw-text">{seg.content}</strong>;
      case "code":
        return <code key={j} className="font-mono text-sm text-claw-text bg-claw-surface px-1.5 py-0.5">{seg.content}</code>;
      case "link":
        return (
          <a
            key={j}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-claw-orange hover:underline"
          >
            {seg.content}
          </a>
        );
      default:
        return <span key={j}>{seg.content}</span>;
    }
  });
}

interface IssueClientProps {
  issue: {
    slug: string;
    number: number;
    date: string;
    publishedAt?: string;
    from: string;
    subject: string;
    body: ParagraphBlock[];
    nextNode: { title: string; venue: string; rsvpUrl: string } | null;
    signature: string;
    signatureTitle: string;
  };
  prevIssue: { slug: string; number: number; date: string } | null;
  nextIssue: { slug: string; number: number; date: string } | null;
}

export function IssueClient({ issue, prevIssue, nextIssue }: IssueClientProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = newsletterUiCopy[locale];
  const localizedIssue = translateIssue(issue, locale);
  const localizedPrevIssue = prevIssue ? translateIssue(prevIssue, locale) : null;
  const localizedNextIssue = nextIssue ? translateIssue(nextIssue, locale) : null;

  return (
    <>
      {/* Header */}
      <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.p {...stagger(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-claw-orange mb-4">
            <Link href={withLocale("/newsletter", locale)} className="hover:text-claw-orange/70 transition-colors">
              {copy.back}
            </Link>
          </motion.p>
          <motion.div {...stagger(1)} className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-claw-orange border border-claw-orange/30 bg-claw-orange/5 px-3 py-1">
              {copy.issue} {localizedIssue.number} — {localizedIssue.date}
            </span>
          </motion.div>

          <motion.p {...stagger(2)} className="font-mono text-xs text-claw-dim mb-2">
            {localizedIssue.from}
          </motion.p>
          <motion.h1 {...stagger(3)} className="font-display text-3xl md:text-5xl tracking-wider text-claw-text mb-10">
            {localizedIssue.subject}
          </motion.h1>

          {localizedIssue.publishedAt && (
            <motion.p {...stagger(4)} className="font-mono text-xs text-claw-dim">
              {copy.published} {localizedIssue.publishedAt}
            </motion.p>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5">
            {localizedIssue.body.map((block, i) => (
              <motion.p
                key={i}
                {...stagger(i + 5)}
                className="text-base text-claw-muted leading-relaxed"
              >
                {renderParagraph(block.segments)}
              </motion.p>
            ))}
          </div>

          {localizedIssue.nextNode && (
            <motion.div
              {...stagger(localizedIssue.body.length + 5)}
              className="mt-12 border border-claw-orange/30 bg-claw-orange/5 px-6 py-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-claw-orange mb-2">
                {copy.nextNode}
              </p>
              <p className="font-display text-xl text-claw-text mb-1">
                {localizedIssue.nextNode.title}
              </p>
              <p className="font-mono text-sm text-claw-dim mb-4">
                {localizedIssue.nextNode.venue}
              </p>
              <a
                href={localizedIssue.nextNode.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-claw-orange hover:underline"
              >
                {copy.rsvp}
              </a>
            </motion.div>
          )}

          <motion.div {...stagger(localizedIssue.body.length + 6)} className="mt-12 pt-8 border-t border-claw-border">
            <p className="font-display text-xl text-claw-text">{localizedIssue.signature}</p>
            <p className="font-mono text-xs text-claw-dim mt-1">
              {localizedIssue.signatureTitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="px-5 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-between items-center">
            {localizedPrevIssue ? (
              <Link
                href={withLocale(`/newsletter/${localizedPrevIssue.slug}`, locale)}
                className="border border-claw-border px-6 py-4 hover:border-claw-orange transition-colors"
              >
                <p className="font-mono text-[10px] text-claw-dim uppercase tracking-widest mb-1">{copy.older}</p>
                <p className="text-sm text-claw-muted">{copy.issue} {localizedPrevIssue.number} — {localizedPrevIssue.date}</p>
              </Link>
            ) : (
              <div />
            )}
            {localizedNextIssue ? (
              <Link
                href={withLocale(`/newsletter/${localizedNextIssue.slug}`, locale)}
                className="border border-claw-border px-6 py-4 hover:border-claw-orange transition-colors text-right"
              >
                <p className="font-mono text-[10px] text-claw-dim uppercase tracking-widest mb-1">{copy.newer}</p>
                <p className="text-sm text-claw-muted">{copy.issue} {localizedNextIssue.number} — {localizedNextIssue.date}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
