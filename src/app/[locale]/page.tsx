import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { HomeClient } from "./home-client";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  
  if (!isLocale(locale)) {
    notFound();
  }
  
  return <HomeClient locale={locale} />;
}