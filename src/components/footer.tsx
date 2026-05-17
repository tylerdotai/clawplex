"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import type { FooterDict } from "@/lib/i18n/dictionaries/types";

function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const copy = useDictSlice("footer") as FooterDict;

  return (
    <footer className="border-t border-claw-border bg-claw-void">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link
              href={withLocale("/", locale)}
              className="inline-flex items-center gap-2.5"
              aria-label={copy.home}
            >
              <Image
                src="/clawplex-logo.png"
                alt=""
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="font-display text-xl tracking-tight text-claw-text">
                ClawPlex
              </span>
            </Link>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-claw-orange">
              {copy.eyebrow}
            </p>
            <p className="mt-4 text-[14px] sm:text-[15px] text-claw-muted leading-[1.6] max-w-sm">
              {copy.description}
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(copy.nav).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-claw-orange mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.external ? item.href : withLocale(item.href, locale)}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[14px] text-claw-muted hover:text-claw-text transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-claw-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-claw-dim text-center md:text-left">
            © {new Date().getFullYear()} ClawPlex DFW · {copy.copyright}
          </p>
          <div className="flex items-center gap-5 text-[13px]">
            <a
              href={withLocale("/privacy", locale)}
              className="text-claw-dim hover:text-claw-text transition-colors"
            >
              {copy.privacy}
            </a>
            <a
              href={withLocale("/terms", locale)}
              className="text-claw-dim hover:text-claw-text transition-colors"
            >
              {copy.terms}
            </a>
            <span className="flex items-center gap-2" aria-label={copy.language}>
              {locales.map((language) => (
                <Link
                  key={language}
                  href={withLocale(pathname, language)}
                  onClick={() => rememberLocale(language)}
                  hrefLang={language}
                  aria-current={language === locale ? "true" : undefined}
                  className={`transition-colors ${
                    language === locale
                      ? "text-claw-orange"
                      : "text-claw-dim hover:text-claw-text"
                  }`}
                >
                  {localeNames[language]}
                </Link>
              ))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}