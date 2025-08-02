import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import apiClient from "../../../services/client"; // Points to src/services/client.ts
import type { Job } from "../types";
import { PlanContext } from "./planContextDefinition"; // Import the context
import type { OptimizationResult } from "../../../services/optimization";

// Interfaces for a validated API error structure where properties are guaranteed to exist
interface GuaranteedApiErrorResponseData {
  message: string;
}

interface GuaranteedApiErrorResponse {
  data: GuaranteedApiErrorResponseData;
}

interface GuaranteedApiErrorWithMessage extends Error { // Ensure it extends Error for proper error handling
  response: GuaranteedApiErrorResponse;
}

// Type guard to check if an error is a GuaranteedApiErrorWithMessage
function isApiErrorWithMessage(error: unknown): error is GuaranteedApiErrorWithMessage {
  return (
    error instanceof Error && // Check if it's an error instance first
    typeof (error as GuaranteedApiErrorWithMessage).response === 'object' &&
    (error as GuaranteedApiErrorWithMessage).response !== null &&
    typeof (error as GuaranteedApiErrorWithMessage).response.data === 'object' &&
    (error as GuaranteedApiErrorWithMessage).response.data !== null &&
    typeof (error as GuaranteedApiErrorWithMessage).response.data.message === 'string'
  );
}

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Job[]>("/jobs");
      setJobs(response.data);
    } catch (err) {
      let errorMessage = "Failed to fetch jobs";

      if (isApiErrorWithMessage(err)) {
        errorMessage = err.response.data.message; // Now guaranteed to be string
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      // For other unknown error types, the default message "Failed to fetch jobs" will be used.

      console.error("Fetch Jobs Error:", errorMessage, "Raw error:", err);
      setError(errorMessage);
      setJobs([]); // Clear jobs on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addJob = useCallback(
    async (jobData: Omit<Job, "id">): Promise<Job | void> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<Job>("/jobs", jobData);
        // Add the new job to the local state
        setJobs((prevJobs) => [response.data, ...prevJobs]); // Add to the beginning for visibility
        return response.data; // Return the newly created job
      } catch (err) { // Changed from errUntyped: unknown
        let errorMessage = "Failed to add job";

        if (isApiErrorWithMessage(err)) {
          errorMessage = err.response.data.message; // Now guaranteed to be string
        } else if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        // For other unknown error types, the default message "Failed to add job" will be used.
        
        console.error("Add Job Error:", errorMessage, "Raw error:", err);
        setError(errorMessage);
        throw err; // Re-throw the original error (now typed as unknown, but handled)
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Fetch jobs on initial mount
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <PlanContext.Provider 
      value={{ 
        jobs, 
        isLoading, 
        error, 
        optimizationResult,
        fetchJobs, 
        addJob,
        setOptimizationResult 
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};
