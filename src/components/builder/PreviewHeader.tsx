import type { LucideIcon } from "lucide-react";

type PreviewHeaderProps = {
  companyName: string;
  nav: string[];
  icons: readonly LucideIcon[];
};

export function PreviewHeader({ companyName, nav, icons }: PreviewHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 @md:py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className="grid size-6 shrink-0 place-items-center rounded-lg bg-(--brand) text-[0.6875rem] font-bold text-(--brand-contrast) uppercase"
        >
          {companyName.trim().charAt(0)}
        </span>
        <span className="truncate text-[0.9375rem] font-semibold tracking-tight text-foreground">
          {companyName}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-5">
        <ul className="hidden items-center gap-4 text-[0.75rem] text-black/60 @lg:flex">
          {nav.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span className="flex items-center gap-2.5 text-foreground/80">
          {icons.map((Icon, i) => (
            <Icon key={i} className="size-4" strokeWidth={1.7} aria-hidden="true" />
          ))}
        </span>
      </div>
    </div>
  );
}
