import { useTranslations } from "next-intl";
import { Builder } from "@/components/builder/Builder";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function WebsiteBuilder() {
  const t = useTranslations("builder");

  return (
    <section
      id={siteConfig.sections.projects}
      aria-labelledby="builder-title"
      className="relative isolate overflow-hidden py-20 md:py-28"
    >
      {/* Soft mint wash, as in the reference */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_92%_30%,rgb(111_227_196/0.32),transparent_100%),radial-gradient(40%_40%_at_78%_78%,rgb(181_245_176/0.38),transparent_100%)]"
      />
      <Reveal className="container-page">
        <Builder
          contactId={siteConfig.sections.contact}
          intro={
            <div>
              <h2
                id="builder-title"
                className="max-w-[16ch] text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance"
              >
                {t("title")}
              </h2>
              <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-muted">
                {t("description")}
              </p>
            </div>
          }
        />
      </Reveal>
    </section>
  );
}
