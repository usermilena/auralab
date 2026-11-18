import { useTranslations } from "next-intl";
import { Builder } from "@/components/builder/Builder";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function WebsiteBuilder() {
  const t = useTranslations("builder");

  return (
    <section
      id={siteConfig.sections.builder}
      aria-labelledby="builder-title"
      className="relative isolate scroll-mt-[-4rem] overflow-x-clip py-20 md:scroll-mt-[-6rem] md:py-28 lg:scroll-mt-0 lg:pt-3 lg:pb-20"
    >
      {/* Faint pastel wash behind the preview */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_92%_30%,rgb(190_200_255/0.28),transparent_100%),radial-gradient(40%_40%_at_78%_78%,rgb(255_214_194/0.25),transparent_100%)] dark:opacity-25"
      />
      <Reveal className="container-page">
        <Builder
          contactId={siteConfig.sections.contact}
          intro={
            <h2
              id="builder-title"
              className="text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance"
            >
              {t("title")}
            </h2>
          }
        />
      </Reveal>
    </section>
  );
}
