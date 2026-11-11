"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, CircleAlert, CircleCheck, Info, LoaderCircle, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useProjectBrief } from "@/components/providers/ProjectBriefProvider";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { submitContactRequest } from "@/lib/contact/actions";
import {
  contactFormSchema,
  projectTypes,
  type ContactErrorKey,
  type ContactFormInput,
  type ContactFormValues,
} from "@/lib/contact/schema";
import { cn } from "@/lib/cn";

type Status = "idle" | "success" | "not_configured" | "invalid" | "error";

const fieldBase =
  "w-full rounded-2xl border bg-white/90 px-4 text-[0.9375rem] text-foreground transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-foreground/40 hover:border-foreground/25 focus:border-secondary focus:shadow-[0_0_0_4px_rgb(32_125_108/0.12)]";

export function ContactForm() {
  const t = useTranslations("contact");
  const tBuilder = useTranslations("builder");
  const locale = useLocale();
  const { brief, setBrief, suggestedProjectType, revision } = useProjectBrief();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: { contact: "", message: "", company: "" },
  });

  // A CTA elsewhere on the page suggested a project type — apply it.
  useEffect(() => {
    if (suggestedProjectType) {
      setValue("projectType", suggestedProjectType, { shouldValidate: isSubmitted });
    }
    // `revision` changes on every hand-over, even if the type is the same.
  }, [revision, suggestedProjectType, setValue, isSubmitted]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const result = await submitContactRequest({ ...values, locale, brief });
      switch (result.status) {
        case "delivered":
          setStatus("success");
          reset();
          setBrief(null);
          break;
        case "not_configured":
          setStatus("not_configured");
          break;
        case "invalid":
          setStatus("invalid");
          break;
        default:
          setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const errorText = (key: string | undefined) =>
    key ? t(`errors.${key as ContactErrorKey}`) : undefined;

  const projectTypeValue = useWatch({ control, name: "projectType" });

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-start justify-center gap-4 rounded-panel bg-light-green/60 p-8 sm:p-10"
      >
        <CircleCheck className="size-10 text-secondary" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="text-2xl font-semibold tracking-tight">{t("status.successTitle")}</h3>
        <p className="text-muted">{t("status.successText")}</p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          {t("status.sendAnother")}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {brief && (
          <motion.div
            key="brief"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-secondary/20 bg-light-green/60 py-3 pr-2 pl-4">
              <span
                aria-hidden="true"
                className="size-6 shrink-0 rounded-full ring-2 ring-white"
                style={{ background: brief.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[0.75rem] text-muted">{t("brief.label")}</p>
                <p className="truncate text-sm font-medium">
                  {tBuilder(`types.${brief.businessType}.label`)} · «{brief.companyName}» ·{" "}
                  <span className="font-normal text-muted uppercase">{brief.color}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBrief(null)}
                aria-label={t("brief.remove")}
                className="grid size-9 shrink-0 place-items-center rounded-full text-foreground/60 transition-colors hover:bg-white hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Field id="contact-field-type" label={t("fields.projectType")} error={errorText(errors.projectType?.message)}>
        {(describedBy) => (
          <div className="relative">
            <select
              id="contact-field-type"
              defaultValue=""
              aria-invalid={!!errors.projectType}
              aria-describedby={describedBy}
              className={cn(
                fieldBase,
                "h-14 cursor-pointer appearance-none pr-12",
                !projectTypeValue && "text-foreground/45",
                errors.projectType ? "border-[#c4321f]/60" : "border-line-strong",
              )}
              {...register("projectType")}
            >
              <option value="" disabled>
                {t("fields.projectTypePlaceholder")}
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="text-foreground">
                  {t(`projectTypes.${type}`)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-foreground/60"
              aria-hidden="true"
            />
          </div>
        )}
      </Field>

      <Field id="contact-field-contact" label={t("fields.contact")} error={errorText(errors.contact?.message)}>
        {(describedBy) => (
          <input
            id="contact-field-contact"
            type="text"
            autoComplete="email"
            inputMode="text"
            placeholder={t("fields.contactPlaceholder")}
            aria-invalid={!!errors.contact}
            aria-required="true"
            aria-describedby={describedBy}
            className={cn(fieldBase, "h-14", errors.contact ? "border-[#c4321f]/60" : "border-line-strong")}
            {...register("contact")}
          />
        )}
      </Field>

      <Field
        id="contact-field-message"
        label={t("fields.message")}
        hint={t("fields.optional")}
        error={errorText(errors.message?.message)}
      >
        {(describedBy) => (
          <textarea
            id="contact-field-message"
            rows={4}
            placeholder={t("fields.messagePlaceholder")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy}
            className={cn(
              fieldBase,
              "min-h-28 resize-y py-3.5 leading-relaxed",
              errors.message ? "border-[#c4321f]/60" : "border-line-strong",
            )}
            {...register("message")}
          />
        )}
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className={cn(
              "flex gap-3 rounded-2xl p-4 text-sm leading-relaxed",
              status === "not_configured"
                ? "bg-[#f4f1e8] text-[#5b4a1f]"
                : "bg-[#fbeceb] text-[#8a2516]",
            )}
          >
            {status === "not_configured" ? (
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            <div>
              {status === "not_configured" && (
                <>
                  <p className="font-semibold">{t("status.notConfiguredTitle")}</p>
                  <p>{t("status.notConfiguredText")}</p>
                </>
              )}
              {status === "error" && (
                <>
                  <p className="font-semibold">{t("status.errorTitle")}</p>
                  <p>{t("status.errorText")}</p>
                </>
              )}
              {status === "invalid" && <p>{t("status.invalidText")}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting} className="mt-1 w-full">
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <ArrowIcon />
          </>
        )}
      </Button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

function Field({ id, label, hint, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-medium text-foreground">
        {label}
        {hint && <span className="text-xs font-normal text-muted">({hint})</span>}
      </label>
      {children(error ? errorId : undefined)}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-[#b42318]">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
