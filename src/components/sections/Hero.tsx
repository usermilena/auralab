import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { ArrowIcon, buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { HeroShader } from "./HeroShader";

const WORD_STAGGER_MS = 70;

export function Hero() {
  const t = useTranslations("hero");
  const title = t("title");
  const words = title.split(/\s+/).filter(Boolean);
  const afterTitle = 250 + words.length * WORD_STAGGER_MS;

  return (
    <section
      aria-labelledby="hero-title"
      // Fills the first screen so the next section never peeks in. On phones
      // the content is spread over the full height: headline at the top,
      // buttons at the bottom within thumb reach.
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] flex-col overflow-x-clip"
    >
      <HeroShader className="absolute inset-x-0 top-[calc(-1*var(--header-height))] bottom-0 -z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />

      <div className="container-page flex w-full flex-1 flex-col pt-12 pb-28 [@media(max-height:44rem)]:pt-6 sm:pt-20 md:block md:flex-none md:pt-24 md:pb-28 lg:pt-28 lg:pb-36">
        <div className="flex max-w-[60rem] flex-1 flex-col md:block">
          <h1
            id="hero-title"
            className="max-w-[19ch] text-[clamp(3rem,1.8rem+4vw,4.625rem)] [@media(max-height:44rem)]:text-[2.625rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
          >
            <span className="sr-only">{title}</span>
            {words.map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span
                  aria-hidden="true"
                  className="animate-word-in inline-block"
                  style={{ animationDelay: `${150 + i * WORD_STAGGER_MS}ms` }}
                >
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-[34rem] text-[clamp(1.0625rem,1rem+0.35vw,1.3125rem)] leading-relaxed text-muted text-pretty md:mt-8"
            style={{ animationDelay: `${afterTitle}ms` }}
          >
            {t("description")}
          </p>
          <div
            className="animate-fade-up mt-auto flex flex-col gap-3 pt-9 [@media(max-height:44rem)]:pt-6 sm:flex-row sm:flex-wrap md:mt-11 md:pt-0"
            style={{ animationDelay: `${afterTitle + 120}ms` }}
          >
            <a
              href={`#${siteConfig.sections.contact}`}
              className={buttonClasses({
                size: "lg",
                className: "h-15 px-9 text-[1.0625rem]",
              })}
            >
              {t("cta")}
              <ArrowIcon className="size-4" />
            </a>
            <a
              href={`#${siteConfig.sections.builder}`}
              className={buttonClasses({
                variant: "outline",
                size: "lg",
                className: "h-15 px-9 text-[1.0625rem]",
              })}
            >
              {t("secondaryCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
