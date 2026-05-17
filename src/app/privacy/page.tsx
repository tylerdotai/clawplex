import { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getRequestLocale } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

const privacyCopy = {
  en: {
    title: "Privacy Policy",
    description: "ClawPlex privacy policy. We collect minimal data — email for newsletters and community feed posts. No tracking, no ads, no data sales.",
    ogDescription: "We collect minimal data. No tracking, no ads.",
    effective: "Effective April 2026",
    sections: [
      { heading: "Information We Collect", body: "We collect information you provide directly: your email address when you subscribe to the newsletter, and any content you post to the community feed." },
      { heading: "How We Use It", body: "Email addresses are used to send newsletter updates and event announcements. Community feed posts are public and visible to all site visitors." },
      { heading: "Data Storage", body: "All data is stored in Supabase. We do not sell, trade, or rent personal information to third parties." },
      { heading: "Cookies", body: "We use minimal cookies for language preference and basic site functionality. No tracking or advertising cookies." },
    ],
    contactHeading: "Contact",
    contactIntro: "Questions? Reach out on Discord:",
  },
  es: {
    title: "Política de privacidad",
    description: "Política de privacidad de ClawPlex. Recopilamos datos mínimos — email para newsletters y posts del feed de comunidad. Sin tracking, sin ads, sin venta de datos.",
    ogDescription: "Recopilamos datos mínimos. Sin tracking, sin ads.",
    effective: "Vigente desde abril de 2026",
    sections: [
      { heading: "Información que recopilamos", body: "Recopilamos la información que nos proporcionas directamente: tu dirección de email cuando te suscribes al newsletter y cualquier contenido que publiques en el feed de comunidad." },
      { heading: "Cómo la usamos", body: "Las direcciones de email se usan para enviar updates del newsletter y anuncios de eventos. Los posts del feed de comunidad son públicos y visibles para todos los visitantes del sitio." },
      { heading: "Almacenamiento de datos", body: "Todos los datos se almacenan en Supabase. No vendemos, intercambiamos ni rentamos información personal a terceros." },
      { heading: "Cookies", body: "Usamos cookies mínimas para preferencia de idioma y funcionalidad básica del sitio. Sin cookies de tracking o publicidad." },
    ],
    contactHeading: "Contacto",
    contactIntro: "¿Preguntas? Escríbenos en Discord:",
  },
} satisfies Record<Locale, {
  title: string;
  description: string;
  ogDescription: string;
  effective: string;
  sections: Array<{ heading: string; body: string }>;
  contactHeading: string;
  contactIntro: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = privacyCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: `${copy.title} — ClawPlex DFW`,
      description: copy.ogDescription,
      type: "website",
    },
  };
}

export default async function PrivacyPage() {
  const locale = await getRequestLocale();
  const copy = privacyCopy[locale];
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-claw-text mb-2">
              {copy.title}
            </h1>
            <p className="font-mono text-xs text-claw-dim uppercase tracking-widest">
              {copy.effective}
            </p>
          </div>
        </section>

        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-sm text-claw-muted leading-relaxed">
            {copy.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl text-claw-text mb-3">{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">{copy.contactHeading}</h2>
              <p>
                {copy.contactIntro}{" "}
                <a href="https://discord.gg/q8kEquTu3z" className="text-claw-orange hover:underline">
                  discord.gg/q8kEquTu3z
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
