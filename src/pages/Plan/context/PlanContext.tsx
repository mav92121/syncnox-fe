import React, { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import apiClient from "../../../services/client"; // Points to src/services/client.ts
import type { Job } from "../types";
import { PlanContext } from "./planContextDefinition"; // Import the context

// PlanContextType interface has been moved to ./planContextDefinition.ts
// PlanContext (createContext call) has been moved to ./planContextDefinition.ts
// usePlanContext hook has been moved to ../hooks/usePlanContext.ts

// Interfaces for a validated API error structure where properties are guaranteed to exist
interface GuaranteedApiErrorResponseData {
  message: string;
}

interface GuaranteedApiErrorResponse {
  data: GuaranteedApiErrorResponseData;
}

interface GuaranteedApiErrorWithMessage extends Error {
  // Ensure it extends Error for proper error handling
  response: GuaranteedApiErrorResponse;
}

// Type guard to check if an error is a GuaranteedApiErrorWithMessage
function isApiErrorWithMessage(
  error: unknown
): error is GuaranteedApiErrorWithMessage {
  return (
    error instanceof Error && // Check if it's an error instance first
    typeof (error as GuaranteedApiErrorWithMessage).response === "object" &&
    (error as GuaranteedApiErrorWithMessage).response !== null &&
    typeof (error as GuaranteedApiErrorWithMessage).response.data ===
      "object" &&
    (error as GuaranteedApiErrorWithMessage).response.data !== null &&
    typeof (error as GuaranteedApiErrorWithMessage).response.data.message ===
      "string"
  );
}

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await apiClient.get<Job[]>("/jobs");
      const response = Promise.resolve({
        data: [
          {
            scheduled_date: "2025-06-05T10:00:00",
            job_type: "delivery",
            delivery_address: "123 Main Street, Springfield, IL",
            priority_level: "high",
            recurrence_type: "one_time",
            payment_status: "paid",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            business_name: "Doe Logistics",
            start_time: "2025-06-05T10:00:00",
            end_time: "2025-06-05T11:00:00",
            duration_minutes: 60,
            phone_number: "+15555550123",
            customer_preferences: "Leave at front desk",
            additional_notes: "Customer prefers contactless delivery.",
            documents: null,
            id: 1,
            created_at: "2025-06-08T07:44:35.770642",
            updated_at: "2025-06-08T07:44:35.770646",
          },
          {
            scheduled_date: "2025-06-12T18:30:00",
            job_type: "delivery",
            delivery_address: "first address",
            priority_level: "low",
            recurrence_type: "recurring",
            payment_status: "unpaid",
            first_name: "first name",
            last_name: "last name",
            email: "mohsinali530121@gmail.com",
            business_name: "b name",
            start_time: "2025-06-12T23:36:00",
            end_time: "2025-06-12T23:36:00",
            duration_minutes: 45,
            phone_number: "+234-8866990320",
            customer_preferences: "customer preference",
            additional_notes: "notes",
            documents: null,
            id: 2,
            created_at: "2025-06-08T15:04:28.881438",
            updated_at: "2025-06-08T15:04:28.881440",
          },
          {
            scheduled_date: "2025-06-17T18:30:00",
            job_type: "pickup",
            delivery_address: "address",
            priority_level: "medium",
            recurrence_type: "recurring",
            payment_status: "paid",
            first_name: "first name",
            last_name: "last name",
            email: "mohsinali530121@gmail.com",
            business_name: "b name",
            start_time: "2025-06-17T21:34:00",
            end_time: "2025-06-17T22:36:00",
            duration_minutes: 15,
            phone_number: "+234-8866990320",
            customer_preferences: "",
            additional_notes: null,
            documents: null,
            id: 3,
            created_at: "2025-06-08T15:49:56.445441",
            updated_at: "2025-06-08T15:49:56.445445",
          },
          {
            scheduled_date: "2025-06-12T18:30:00",
            job_type: "pickup",
            delivery_address: "first address",
            priority_level: "medium",
            recurrence_type: "one_time",
            payment_status: "unpaid",
            first_name: "first name",
            last_name: "last name",
            email: "mohsinali530121@gmail.com",
            business_name: "b name",
            start_time: "2025-06-12T18:37:00",
            end_time: "2025-06-12T21:35:00",
            duration_minutes: 45,
            phone_number: "+234-8866990320",
            customer_preferences: "sdf",
            additional_notes: "asdf",
            documents: null,
            id: 4,
            created_at: "2025-06-08T18:29:52.613463",
            updated_at: "2025-06-08T18:29:52.613467",
          },

          {
            scheduled_date: "2025-06-10T18:30:00",
            job_type: "pickup",
            delivery_address: "jk",
            priority_level: "medium",
            recurrence_type: "recurring",
            payment_status: "unpaid",
            first_name: null,
            last_name: null,
            email: null,
            business_name: null,
            start_time: "2025-06-10T18:30:00",
            end_time: "2025-06-11T18:29:59.999000",
            duration_minutes: 0,
            phone_number: "+234-99",
            customer_preferences: null,
            additional_notes: null,
            documents: null,
            id: 36,
            created_at: "2025-06-10T18:29:52.550907",
            updated_at: "2025-06-10T18:29:52.550909",
          },
          {
            scheduled_date: "2025-06-17T18:30:00",
            job_type: "pickup",
            delivery_address: "TEMP",
            priority_level: "low",
            recurrence_type: "one_time",
            payment_status: "paid",
            first_name: null,
            last_name: null,
            email: null,
            business_name: null,
            start_time: "2025-06-17T18:30:00",
            end_time: "2025-06-18T18:29:59.999000",
            duration_minutes: 0,
            phone_number: "+234-9090817890",
            customer_preferences: null,
            additional_notes: null,
            documents: null,
            id: 37,
            created_at: "2025-06-11T04:57:12.519698",
            updated_at: "2025-06-11T04:57:12.519700",
          },
          {
            scheduled_date: "2025-06-11T18:30:00",
            job_type: "pickup",
            delivery_address: "hhh",
            priority_level: "medium",
            recurrence_type: "one_time",
            payment_status: "paid",
            first_name: null,
            last_name: null,
            email: null,
            business_name: null,
            start_time: "2025-06-11T18:30:00",
            end_time: "2025-06-12T18:29:59.999000",
            duration_minutes: 0,
            phone_number: "+234-87",
            customer_preferences: null,
            additional_notes: null,
            documents: null,
            id: 38,
            created_at: "2025-06-11T16:19:04.455635",
            updated_at: "2025-06-11T16:19:04.455638",
          },
        ],
      });
      const temp = await response;
      console.log("response -> ", temp.data);
      setJobs(temp.data);
    } catch (err) {
      let errorMessage = "Failed to fetch jobs";

      if (isApiErrorWithMessage(err)) {
        errorMessage = err.response.data.message; // Now guaranteed to be string
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
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
      } catch (err) {
        // Changed from errUntyped: unknown
        let errorMessage = "Failed to add job";

        if (isApiErrorWithMessage(err)) {
          errorMessage = err.response.data.message; // Now guaranteed to be string
        } else if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
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
    <PlanContext.Provider value={{ jobs, isLoading, error, fetchJobs, addJob }}>
      {children}
    </PlanContext.Provider>
  );
};
