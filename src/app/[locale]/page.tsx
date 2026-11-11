import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WebsiteBuilder } from "@/components/sections/WebsiteBuilder";

export default async function HomePage() {
  const t = await getTranslations("common");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <WebsiteBuilder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
