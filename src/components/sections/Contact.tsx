import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { MessengerLinks } from "@/components/ui/MessengerLinks";
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
        <div className="relative isolate overflow-hidden rounded-card border border-line bg-surface/70 shadow-soft">
          {/* Mint decoration */}
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-32 -z-10 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(196_205_255/0.55)_0%,rgb(226_214_250/0.35)_40%,transparent_70%)] opacity-40 blur-3xl dark:opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute -top-32 right-[30%] -z-10 size-[20rem] rounded-full bg-[radial-gradient(circle,rgb(190_230_215/0.3),transparent_70%)] opacity-50 blur-3xl dark:opacity-30"
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
            <div>
              <ContactForm />
              {/* The alternative to the form: "—— or message us directly ——" + buttons. */}
              <div className="mt-8">
                <p className="flex items-center gap-4 text-[0.8125rem] text-muted">
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-line-strong"
                  />
                  {t("direct")}
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-line-strong"
                  />
                </p>
                <MessengerLinks stretch className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
