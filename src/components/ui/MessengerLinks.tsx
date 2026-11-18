import { MessageCircle, Send } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const messengerIds = ["telegram", "whatsapp"] as const;

const icons = {
  telegram: <Send className="size-[1.05rem]" aria-hidden="true" />,
  whatsapp: <MessageCircle className="size-[1.1rem]" aria-hidden="true" />,
};

const messengers = messengerIds.flatMap((id) => {
  const contact = siteConfig.contacts.find((c) => c.id === id);
  return contact ? [{ id, label: contact.label, href: contact.href }] : [];
});

/** Telegram / WhatsApp buttons from `siteConfig.contacts`. */
export function MessengerLinks({
  className,
  stretch = false,
  onNavigate,
}: {
  className?: string;
  /** Equal-width buttons filling the row at every screen size. */
  stretch?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <ul className={cn("flex gap-2", className)}>
      {messengers.map((m) => (
        <li key={m.id} className={stretch ? "flex-1" : "flex-1 sm:flex-none"}>
          <a
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className={buttonClasses({
              variant: "outline",
              className: stretch ? "w-full" : "w-full sm:w-auto",
            })}
          >
            {icons[m.id]}
            {m.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
