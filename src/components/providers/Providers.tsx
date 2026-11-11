"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { ProjectBriefProvider } from "./ProjectBriefProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ProjectBriefProvider>{children}</ProjectBriefProvider>
    </MotionConfig>
  );
}
