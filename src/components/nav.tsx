"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  defaultLocale,
  getLocaleFromPathname,
  localeCookieName,
  localeNames,
  locales,
  type Locale,
  withLocale,
} from "@/lib/i18n/config";
import { useDictSlice } from "@/lib/i18n/dictionaries/client";
import type { NavDict } from "@/lib/i18n/dictionaries/types";

const primaryCtaHref = "https://luma.com/clawplex";

function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function Nav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = useDictSlice("nav") as NavDict;
  const [open, setOpen] = useState(false);
  const [communityHover, setCommunityHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navCommunityLinks = [
    ...copy.communityLinks,
  ].map((link) => ({ ...link, href: withLocale(link.href, locale) }));

  const localizedLinks = copy.links.map((link) => ({
    ...link,
    href: link.external ? link.href : withLocale(link.href, locale),
  }));

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? "bg-claw-void/85 backdrop-blur-md border-b border-claw-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
          {/* Wordmark */}
          <Link
            href={withLocale("/", locale)}
            className="flex items-center gap-2.5 group"
            aria-label={copy.home}
          >
            <Image
              src="/clawplex-logo.png"
              alt=""
              width={28}
              height={28}
              className="object-contain"
              priority
            />
            <span className="font-display text-xl md:text-[22px] tracking-tight text-claw-text">
              ClawPlex
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Community dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCommunityHover(true)}
              onMouseLeave={() => setCommunityHover(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-claw-muted hover:text-claw-text transition-colors"
                aria-haspopup="menu"
                aria-expanded={communityHover}
              >
                {copy.community}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={`text-claw-dim transition-transform ${
                    communityHover ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M2 3.5L5 6.5L8 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {communityHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute top-full left-0 pt-3 min-w-[200px]"
                    role="menu"
                  >
                    <div className="rounded-lg border border-claw-border bg-claw-surface shadow-2xl shadow-black/40 overflow-hidden">
                      {navCommunityLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm text-claw-muted hover:text-claw-text hover:bg-claw-surface-2 transition-colors border-b border-claw-border last:border-0"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {localizedLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="px-3 py-2 text-sm text-claw-muted hover:text-claw-text transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Primary CTA */}
            <a
              href={primaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 lg:ml-3 inline-flex items-center gap-1.5 rounded-full bg-claw-orange px-5 py-2 text-sm font-medium text-claw-void hover:bg-[#ff8a3d] transition-colors"
            >
              {copy.primaryCta}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6h6m0 0L6 3m3 3L6 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div className="ml-2 flex items-center rounded-full border border-claw-border bg-claw-surface/80 p-1" aria-label={copy.language}>
              <span className="px-2 text-claw-dim" aria-hidden="true">◎</span>
              {locales.map((language) => (
                <Link
                  key={language}
                  href={withLocale(pathname, language)}
                  onClick={() => rememberLocale(language)}
                  hrefLang={language}
                  aria-current={language === locale ? "true" : undefined}
                  className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                    language === locale
                      ? "bg-claw-orange text-claw-void"
                      : "text-claw-muted hover:text-claw-text"
                  }`}
                >
                  {localeNames[language]}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 flex flex-col justify-center gap-1.5 p-2 -mr-2"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            aria-expanded={open}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-5 bg-claw-text origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block h-[1.5px] w-5 bg-claw-text"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-5 bg-claw-text origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-claw-void md:hidden flex flex-col"
            onClick={() => setOpen(false)}
          >
            <div
              className="flex-1 flex flex-col justify-center px-8 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1">
                {[
                  ...navCommunityLinks.map((l) => ({ ...l, external: false })),
                  ...localizedLinks.map((l) => ({ ...l, external: l.external || false })),
                ].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="font-display text-4xl text-claw-text hover:text-claw-orange transition-colors py-3 border-b border-claw-border last:border-0"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  duration: 0.3,
                  delay: (navCommunityLinks.length + localizedLinks.length) * 0.04 + 0.05,
                }}
                className="mt-10"
              >
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-claw-orange py-4 text-center text-base font-medium text-claw-void hover:bg-[#ff8a3d] transition-colors"
                >
                  {copy.primaryCta}
                </a>

                <div className="mt-6 flex items-center justify-center gap-2" aria-label={copy.language}>
                  {locales.map((language) => (
                    <Link
                      key={language}
                      href={withLocale(pathname, language)}
                      onClick={() => {
                        rememberLocale(language);
                        setOpen(false);
                      }}
                      hrefLang={language}
                      aria-current={language === locale ? "true" : undefined}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        language === locale
                          ? "border-claw-orange bg-claw-orange text-claw-void"
                          : "border-claw-border text-claw-muted hover:text-claw-text"
                      }`}
                    >
                      {localeNames[language]}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
