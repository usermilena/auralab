import { useTranslations } from "next-intl";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <NotFoundView title={t("title")} description={t("description")}>
      <Link href="/" className={buttonClasses()}>
        {t("back")}
      </Link>
    </NotFoundView>
  );
}
