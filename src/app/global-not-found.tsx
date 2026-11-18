import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { buttonClasses } from "@/components/ui/Button";
import { routing } from "@/i18n/routing";
import messages from "@/messages/ru.json";
import { fontVariables } from "./fonts";
import { themeInitScript } from "@/lib/theme/script";
import "./globals.css";

// Rendered outside the `[locale]` segment, so it uses the default locale.

export const metadata: Metadata = {
  title: messages.notFound.title,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale} data-theme="dark" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NotFoundView
          title={messages.notFound.title}
          description={messages.notFound.description}
        >
          {/* Plain anchor: global-not-found renders outside the app router tree. */}
          <a href={`/${routing.defaultLocale}`} className={buttonClasses()}>
            {messages.notFound.back}
          </a>
        </NotFoundView>
      </body>
    </html>
  );
}
