import { useEffect, useState } from "react";
import { Spin } from "antd";
import TasksTable from "./components/TasksTable";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";
import { usePlanContext } from "./hooks/usePlanContext";
import type { Job, Task } from "./types";
import dayjs from "dayjs";
import RouteDashboard from "./components/RouteDashboard";

// Helper to capitalize
const capitalizeFirstLetter = (string: string = "") => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const mapJobsToTasks = (jobs: Job[]): Task[] => {
  if (!jobs) return [];
  return jobs.map((job) => {
    const formatTime = (dateTimeString?: string | null): string => {
      if (!dateTimeString) return "N/A";
      return dayjs(dateTimeString).format("hh:mm A");
    };

    const formatServiceDuration = (minutes?: number): string => {
      if (minutes === undefined || minutes === null) return "N/A";
      if (minutes < 60) return `${minutes} Minutes`;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} Hour${hours > 1 ? "s" : ""}${
        mins > 0 ? ` ${mins} Minutes` : ""
      }`;
    };

    const taskId = String(job.id || Math.random().toString(36).substr(2, 9));

    return {
      key: taskId,
      id: taskId,
      priority: capitalizeFirstLetter(job.priority_level),
      firstName: job.first_name || "N/A",
      lastName: job.last_name || "N/A",
      address: job.delivery_address,
      status: "Scheduled", // Default or map from a Job status if available
      businessName: job.business_name || "N/A",
      status2: "Unassigned", // Default or map
      phone: job.phone_number,
      serviceDuration: formatServiceDuration(job.duration_minutes),
      from: formatTime(job.start_time),
      to: formatTime(job.end_time),
      customerPreferences: job.customer_preferences || "N/A",
      notes: job.additional_notes || "N/A",
      singleRecurring:
        job.recurrence_type === "one_time" ? "Single" : "Recurring",
      ratings: 0, // Default
      team: [], // Default
      files: job.documents?.length || 0,
      paid: capitalizeFirstLetter(job.payment_status),
    };
  });
};

const PlanRecents = () => {
  const { mapType, setMapType } = useMapState();
  const { jobs, fetchJobs, isLoading, error, optimizationResult } =
    usePlanContext();
  const [transformedTasks, setTransformedTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (jobs) {
      setTransformedTasks(mapJobsToTasks(jobs));
    }
  }, [jobs]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full flex-col">
        <Spin size="large" />
        <div className="mt-4 text-primary">Loading Jobs...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error fetching jobs: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Map - Takes approximately 40% of the space */}
        <div className="h-2/5 w-full mb-2 relative flex-shrink-0">
          <MapComponent
            mapType={mapType}
            setMapType={setMapType}
            config={defaultMapConfig}
            className="h-full w-full"
          />
        </div>

        {/* Table - Takes approximately 60% of the space */}

        {optimizationResult ? (
          <div className="h-3/5 w-full overflow-hidden min-h-0">
            <RouteDashboard />
          </div>
        ) : (
          <div className="h-3/5 w-full overflow-hidden min-h-0">
            <TasksTable dataSource={transformedTasks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanRecents;
