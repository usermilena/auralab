"use server";

import { deliverContactRequest } from "./delivery";
import { contactRequestSchema, type ContactSubmitResult } from "./schema";

export async function submitContactRequest(
  input: unknown,
): Promise<ContactSubmitResult> {
  const parsed = contactRequestSchema.safeParse(input);
  if (!parsed.success) return { status: "invalid" };

  // Honeypot filled in: pretend nothing happened, deliver nothing.
  if (parsed.data.company) return { status: "invalid" };

  return deliverContactRequest(parsed.data);
}
