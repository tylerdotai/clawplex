import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export async function getRequestLocale(): Promise<Locale> {
  const headersList = await headers();
  const locale = headersList.get("x-claw-locale");
  return isLocale(locale) ? locale : defaultLocale;
}
