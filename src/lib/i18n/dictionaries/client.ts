"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, getLocaleFromPathname, type Locale } from "@/lib/i18n/config";
import { en } from "./en";
import { es } from "./es";
import type { Dictionary, DictionaryKey } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, es };

/**
 * Returns the full dictionary for the current locale (client components).
 * Falls back to "en" if locale cannot be determined.
 */
export function useDictionary() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? defaultLocale;
  return dictionaries[locale];
}

/**
 * Returns a specific slice of the dictionary by key.
 * Prefer useDictionary() for full dictionary access.
 */
export function useDictSlice<K extends DictionaryKey>(key: K) {
  const d = useDictionary();
  return d[key];
}