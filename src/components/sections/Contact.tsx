import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id={siteConfig.sections.contact}
      aria-labelledby="contact-title"
      className="pt-4 pb-16 md:pb-24"
    >
      <Reveal className="container-page">
        <div className="relative isolate overflow-hidden rounded-card border border-line bg-white/70 shadow-soft">
          {/* Mint decoration */}
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-32 -z-10 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(82_232_168/0.55)_0%,rgb(181_245_176/0.35)_40%,transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -top-32 right-[30%] -z-10 size-[20rem] rounded-full bg-[radial-gradient(circle,rgb(111_227_196/0.18),transparent_70%)] blur-2xl"
          />

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:p-14 xl:p-16">
            <div className="lg:pt-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-secondary uppercase">
                {t("eyebrow")}
              </p>
              <h2
                id="contact-title"
                className="mt-4 max-w-[14ch] text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance"
              >
                {t("title")}
              </h2>
              <p className="mt-5 max-w-[26rem] text-[1.0625rem] leading-relaxed text-muted">
                {t("description")}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
