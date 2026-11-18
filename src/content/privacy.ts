import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/i18n/routing";

/**
 * Privacy policy text. It describes what this site actually does with data —
 * keep it in sync when the contact form, delivery channel or analytics change.
 */

export type PolicySection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  /** Paragraphs rendered after the list. */
  after?: string[];
};

export type PrivacyPolicy = {
  title: string;
  updatedLabel: string;
  intro: string;
  sections: PolicySection[];
};

const { operatorName, email } = siteConfig.legal;
const site = siteConfig.url.replace(/^https?:\/\//, "");

export const privacyPolicy: Record<AppLocale, PrivacyPolicy> = {
  ru: {
    title: "Политика конфиденциальности",
    updatedLabel: "Редакция от",
    intro: `Настоящая политика описывает, какие персональные данные собирает сайт ${site} (далее — Сайт), зачем они нужны и как мы их защищаем. Политика составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».`,
    sections: [
      {
        title: "1. Оператор",
        paragraphs: [
          `Оператор персональных данных — ${operatorName} (далее — Оператор, «мы»). По всем вопросам, связанным с обработкой данных, пишите на ${email}.`,
        ],
      },
      {
        title: "2. Какие данные мы получаем",
        paragraphs: ["Мы обрабатываем только то, что вы сами указываете в форме заявки:"],
        items: [
          "контакт для связи — Telegram, номер телефона или email;",
          "тип проекта и, по желанию, описание задачи;",
          "параметры примера из конструктора сайта (тип бизнеса, название, цвет), если вы прикрепили его к заявке.",
        ],
      },
      {
        title: "3. Зачем мы их обрабатываем",
        items: [
          "чтобы связаться с вами по заявке и обсудить проект;",
          "чтобы подготовить предложение и оценку стоимости работ.",
        ],
        after: [
          "Мы не используем ваши данные для рассылок и рекламы и не продаём их третьим лицам.",
        ],
      },
      {
        title: "4. Правовое основание",
        paragraphs: [
          "Данные обрабатываются на основании вашего согласия, которое вы даёте, отправляя заявку (п. 1 ч. 1 ст. 6 152-ФЗ), а также для подготовки договора по вашей инициативе (п. 5 ч. 1 ст. 6 152-ФЗ).",
        ],
      },
      {
        title: "5. Как данные передаются и хранятся",
        paragraphs: [
          "Заявка передаётся в защищённом виде (HTTPS) и доставляется команде через мессенджер Telegram (Telegram Messenger Inc.). Серверы Telegram расположены за пределами России, поэтому отправка заявки означает трансграничную передачу данных; отправляя форму, вы с этим соглашаетесь.",
          "Сайт не сохраняет заявки в собственной базе данных и не записывает их содержимое в журналы.",
          "Мы храним переписку по заявке не дольше, чем это нужно для обсуждения и выполнения проекта, но не более 3 лет с момента последнего контакта, если вы не попросите удалить данные раньше.",
        ],
      },
      {
        title: "6. Cookie и технические данные",
        paragraphs: [
          "Сайт не использует рекламные и аналитические cookie и сервисы веб-аналитики. Может устанавливаться служебный cookie, который запоминает выбранный язык.",
          "Хостинг-провайдер может автоматически фиксировать технические данные запросов (IP-адрес, тип браузера, время обращения) для обеспечения безопасности и работоспособности Сайта.",
        ],
      },
      {
        title: "7. Ваши права",
        paragraphs: ["Вы можете в любой момент:"],
        items: [
          "узнать, какие ваши данные у нас есть;",
          "попросить уточнить, исправить или удалить их;",
          `отозвать согласие на обработку, написав на ${email}.`,
        ],
      },
      {
        title: "8. Защита данных",
        paragraphs: [
          "Доступ к заявкам есть только у членов команды, которые работают с проектом. Мы принимаем организационные и технические меры, чтобы защитить данные от несанкционированного доступа, изменения и утраты.",
        ],
      },
      {
        title: "9. Изменения политики",
        paragraphs: [
          "Мы можем обновлять эту политику. Актуальная редакция всегда доступна на этой странице, дата последнего изменения указана вверху.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    updatedLabel: "Last updated",
    intro: `This policy explains what personal data ${site} (the “Site”) collects, why, and how we protect it. It is prepared in accordance with Russian Federal Law No. 152-FZ “On Personal Data”.`,
    sections: [
      {
        title: "1. Controller",
        paragraphs: [
          `The personal data operator is ${operatorName} (“we”, “us”). For any question about your data, email ${email}.`,
        ],
      },
      {
        title: "2. What we collect",
        paragraphs: ["We only process what you enter in the request form:"],
        items: [
          "a way to reach you — Telegram, phone number or email;",
          "the project type and, optionally, a description;",
          "the settings of the website builder example (business type, name, colour), if you attach it.",
        ],
      },
      {
        title: "3. Why we process it",
        items: [
          "to get back to you about your request and discuss the project;",
          "to prepare a proposal and an estimate.",
        ],
        after: ["We never use your data for newsletters or advertising and never sell it."],
      },
      {
        title: "4. Legal basis",
        paragraphs: [
          "Your consent, given by submitting the form, and steps taken at your request before entering into a contract.",
        ],
      },
      {
        title: "5. Transfer and storage",
        paragraphs: [
          "Requests are sent over HTTPS and delivered to the team via Telegram (Telegram Messenger Inc.), whose servers are located outside Russia. By submitting the form you agree to this cross-border transfer.",
          "The Site does not store requests in its own database and does not log their contents.",
          "We keep correspondence only as long as needed to discuss and deliver the project, and no longer than 3 years after our last contact, unless you ask us to delete it sooner.",
        ],
      },
      {
        title: "6. Cookies and technical data",
        paragraphs: [
          "The Site uses no advertising or analytics cookies and no web analytics. A functional cookie may be set to remember your language.",
          "Our hosting provider may automatically record technical request data (IP address, browser type, time) for security and reliability.",
        ],
      },
      {
        title: "7. Your rights",
        paragraphs: ["At any time you can:"],
        items: [
          "ask what data we hold about you;",
          "ask us to correct or delete it;",
          `withdraw your consent by emailing ${email}.`,
        ],
      },
      {
        title: "8. Security",
        paragraphs: [
          "Only team members working on your project can access requests. We take organisational and technical measures to protect data from unauthorised access, alteration and loss.",
        ],
      },
      {
        title: "9. Changes",
        paragraphs: [
          "We may update this policy. The current version is always available on this page, with the date of the last change shown at the top.",
        ],
      },
    ],
  },
};
