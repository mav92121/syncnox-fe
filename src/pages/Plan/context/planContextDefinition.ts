import React, { createContext } from "react";
import type { Job } from "../types";
import type { OptimizationResult } from "../../../services/optimization";

export interface PlanContextType {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  optimizationResult: OptimizationResult | null;
  fetchJobs: () => Promise<void>;
  addJob: (jobData: Omit<Job, "id">) => Promise<Job | void>;
  setOptimizationResult: (result: OptimizationResult | null) => void;
}

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = React.useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
