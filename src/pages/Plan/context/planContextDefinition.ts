import { createContext } from "react";
import type { Job } from "../types"; // Assuming Job is in src/pages/Plan/types/index.ts

export interface PlanContextType {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (jobData: Omit<Job, "id">) => Promise<Job | void>; // Return the created job or void
}

export const PlanContext = createContext<PlanContextType | undefined>(undefined);
