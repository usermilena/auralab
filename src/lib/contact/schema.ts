import { z } from "zod";
import { businessTypes } from "@/config/business-templates";
import { routing } from "@/i18n/routing";

export const projectTypes = [
  "website",
  "ecommerce",
  "mobile",
  "design",
  "unsure",
] as const;

export type ProjectType = (typeof projectTypes)[number];

/**
 * Error messages are translation keys under `contact.errors`, so the same
 * schema can be shared by the client form and the server action.
 */
export type ContactErrorKey =
  | "projectTypeRequired"
  | "contactRequired"
  | "contactInvalid"
  | "contactTooLong"
  | "messageTooLong";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM = /^(?:@|(?:https?:\/\/)?t\.me\/)[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
const PHONE_CHARS = /^\+?[\d\s()-]+$/;

export function isValidContact(value: string): boolean {
  const v = value.trim();
  if (EMAIL.test(v) || TELEGRAM.test(v)) return true;
  if (PHONE_CHARS.test(v)) {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }
  return false;
}

const err = (key: ContactErrorKey) => ({ error: key });

export const contactFormSchema = z.object({
  projectType: z.enum(projectTypes, err("projectTypeRequired")),
  contact: z
    .string(err("contactRequired"))
    .trim()
    .min(1, err("contactRequired"))
    .max(200, err("contactTooLong"))
    .refine(isValidContact, err("contactInvalid")),
  message: z.string().trim().max(2000, err("messageTooLong")),
  /** Honeypot: real users never see or fill this field. */
  company: z.string().max(0).optional(),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;

/** Configuration chosen in the website preview builder. */
export const projectBriefSchema = z.object({
  businessType: z.enum(businessTypes as [string, ...string[]]),
  companyName: z.string().trim().max(60),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export type ProjectBrief = {
  businessType: (typeof businessTypes)[number];
  companyName: string;
  color: string;
};

export const contactRequestSchema = contactFormSchema.extend({
  locale: z.enum(routing.locales),
  brief: projectBriefSchema.nullable(),
});

export type ContactRequest = z.output<typeof contactRequestSchema>;

export type ContactSubmitResult =
  | { status: "delivered" }
  | { status: "not_configured" }
  | { status: "invalid" }
  | { status: "failed" };
