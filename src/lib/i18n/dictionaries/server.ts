import { getRequestLocale } from "@/lib/i18n/server";
import { en } from "./en";
import { es } from "./es";
import type { Dictionary, DictionaryKey } from "./types";
import type { Locale } from "@/lib/i18n/config";

const dictionaries: Record<Locale, Dictionary> = { en, es };

/**
 * Returns the full dictionary for the current request locale (server components).
 */
export async function getDictionary(): Promise<Dictionary> {
  const locale = await getRequestLocale();
  return dictionaries[locale];
}

/**
 * Returns a specific slice of the dictionary by key (server components).
 */
export async function getDictSlice<K extends DictionaryKey>(key: K): Promise<Dictionary[K]> {
  const d = await getDictionary();
  return d[key];
}