import { useTranslations } from "next-intl";
import { ServiceVisualRenderer } from "@/components/services/ServiceVisuals";
import { ServicesSlider, type SlideData } from "@/components/services/ServicesSlider";
import { Reveal } from "@/components/ui/Reveal";
import { serviceSlides } from "@/config/services";
import { siteConfig } from "@/config/site";

export function Services() {
  const t = useTranslations("services");

  const slides: SlideData[] = serviceSlides.map((slide) => ({
    ...slide,
    tab: t(`slides.${slide.id}.tab`),
    title: t(`slides.${slide.id}.title`),
    description: t(`slides.${slide.id}.description`),
    cta: t(`slides.${slide.id}.cta`),
    visual: <ServiceVisualRenderer visual={slide.visual} />,
  }));

  return (
    <section
      id={siteConfig.sections.services}
      aria-labelledby="services-title"
      className="relative py-16 md:py-24"
    >
      <Reveal className="container-page">
        <ServicesSlider
          slides={slides}
          contactId={siteConfig.sections.contact}
          heading={
            <h2
              id="services-title"
              className="text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
            >
              {t("title")}
            </h2>
          }
          labels={{
            tabs: t("tabsLabel"),
            previous: t("previous"),
            next: t("next"),
            conceptNote: t("conceptNote"),
            progress: slides.map((_, i) =>
              t("progressLabel", { current: i + 1, total: slides.length }),
            ),
          }}
        />
      </Reveal>
    </section>
  );
}
