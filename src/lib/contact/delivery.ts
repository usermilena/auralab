import "server-only";
import type { ContactRequest, ContactSubmitResult } from "./schema";

/**
 * Delivery abstraction for contact requests.
 *
 * A provider is only active once its environment variables are set. With no
 * provider configured, requests are NOT delivered and the caller is told so
 * honestly (`not_configured`) — nothing is stored or logged.
 *
 * To add email or a CRM, implement `ContactDeliveryProvider` and register it
 * in `resolveProvider`.
 */
export interface ContactDeliveryProvider {
  name: string;
  deliver(request: ContactRequest): Promise<void>;
}

function telegramProvider(): ContactDeliveryProvider | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;

  return {
    name: "telegram",
    async deliver(request) {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: formatRequest(request),
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(10_000),
        },
      );
      if (!response.ok) {
        // Status code only — never include the payload with personal data.
        throw new Error(`Telegram API responded with ${response.status}`);
      }
    },
  };
}

function resolveProvider(): ContactDeliveryProvider | null {
  return telegramProvider();
}

export function formatRequest(request: ContactRequest): string {
  const lines = [
    "Новая заявка с сайта Auralab",
    `Тип проекта: ${request.projectType}`,
    `Контакт: ${request.contact}`,
    `Язык: ${request.locale}`,
  ];
  if (request.message) lines.push("", request.message);
  if (request.brief) {
    lines.push(
      "",
      "Конфигурация из конструктора:",
      `• Тип бизнеса: ${request.brief.businessType}`,
      `• Название: ${request.brief.companyName}`,
      `• Цвет: ${request.brief.color}`,
    );
  }
  return lines.join("\n");
}

export async function deliverContactRequest(
  request: ContactRequest,
): Promise<ContactSubmitResult> {
  const provider = resolveProvider();
  if (!provider) return { status: "not_configured" };

  try {
    await provider.deliver(request);
    return { status: "delivered" };
  } catch (error) {
    console.error(
      `[contact] delivery via ${provider.name} failed:`,
      error instanceof Error ? error.message : "unknown error",
    );
    return { status: "failed" };
  }
}
