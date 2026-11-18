import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

export function NotFoundView({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(200_210_255/0.45),rgb(230_215_250/0.25)_40%,transparent_70%)] dark:opacity-20 blur-3xl"
      />
      <div className="relative flex max-w-md flex-col items-center gap-6 text-center">
        <Logo />
        <p className="font-display text-7xl font-semibold tracking-tight text-foreground">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted">{description}</p>
        {children}
      </div>
    </main>
  );
}
