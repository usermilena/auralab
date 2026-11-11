import { useTranslations } from "next-intl";
import { ArrowIcon, buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { HeroAura } from "./HeroAura";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-x-clip">
      <HeroAura className="absolute -top-[10rem] -right-[14rem] -z-10 size-[30rem] opacity-80 sm:-top-[12rem] sm:-right-[12rem] sm:size-[40rem] md:opacity-100 lg:-top-[10rem] lg:-right-[6rem] lg:size-[50rem] xl:-right-[4rem]" />

      <div className="container-page pt-14 pb-20 sm:pt-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
        <div className="max-w-[60rem]">
          <h1
            id="hero-title"
            className="animate-fade-up max-w-[19ch] text-[clamp(2.25rem,1.4rem+3.3vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance"
          >
            {t("title")}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-[34rem] text-[clamp(1.0625rem,1rem+0.35vw,1.3125rem)] leading-relaxed text-muted text-pretty md:mt-8"
            style={{ animationDelay: "120ms" }}
          >
            {t("description")}
          </p>
          <div className="animate-fade-up mt-9 md:mt-11" style={{ animationDelay: "220ms" }}>
            <a
              href={`#${siteConfig.sections.contact}`}
              className={buttonClasses({ size: "lg", className: "h-15 px-9 text-[1.0625rem]" })}
            >
              {t("cta")}
              <ArrowIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
