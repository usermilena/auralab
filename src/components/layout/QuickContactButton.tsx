import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { QuickContact } from "./QuickContact";

function contactHref(id: "telegram" | "whatsapp") {
  return siteConfig.contacts.find((c) => c.id === id)?.href ?? "";
}

export function QuickContactButton({ anchorBase = "" }: { anchorBase?: string }) {
  const t = useTranslations("quickContact");
  return (
    <QuickContact
      telegramHref={contactHref("telegram")}
      whatsappHref={contactHref("whatsapp")}
      formHref={`${anchorBase}#${siteConfig.sections.contact}`}
      contactSectionId={siteConfig.sections.contact}
      labels={{
        open: t("open"),
        close: t("close"),
        telegram: t("telegram"),
        whatsapp: t("whatsapp"),
        form: t("form"),
      }}
    />
  );
}
