"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProjectBrief, ProjectType } from "@/lib/contact/schema";

type ProjectBriefContextValue = {
  /** Configuration carried over from the website preview builder. */
  brief: ProjectBrief | null;
  /** Project type suggested by the last CTA the visitor clicked. */
  suggestedProjectType: ProjectType | null;
  /** Bumps whenever a CTA hands over new data, so the form can re-sync. */
  revision: number;
  setBrief: (brief: ProjectBrief | null) => void;
  suggestProjectType: (type: ProjectType) => void;
};

const ProjectBriefContext = createContext<ProjectBriefContextValue | null>(null);

export function ProjectBriefProvider({ children }: { children: ReactNode }) {
  const [brief, setBriefState] = useState<ProjectBrief | null>(null);
  const [suggestedProjectType, setSuggested] = useState<ProjectType | null>(null);
  const [revision, setRevision] = useState(0);

  const setBrief = useCallback((next: ProjectBrief | null) => {
    setBriefState(next);
    if (next) {
      setSuggested("website");
      setRevision((r) => r + 1);
    }
  }, []);

  const suggestProjectType = useCallback((type: ProjectType) => {
    setSuggested(type);
    setRevision((r) => r + 1);
  }, []);

  const value = useMemo(
    () => ({ brief, suggestedProjectType, revision, setBrief, suggestProjectType }),
    [brief, suggestedProjectType, revision, setBrief, suggestProjectType],
  );

  return (
    <ProjectBriefContext.Provider value={value}>
      {children}
    </ProjectBriefContext.Provider>
  );
}

export function useProjectBrief(): ProjectBriefContextValue {
  const ctx = useContext(ProjectBriefContext);
  if (!ctx) {
    throw new Error("useProjectBrief must be used within ProjectBriefProvider");
  }
  return ctx;
}
