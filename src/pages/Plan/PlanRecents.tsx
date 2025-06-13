import { useEffect, useState, useRef, useCallback } from "react";
import { Spin } from "antd";
import TasksTable from "./components/TasksTable";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";
import { usePlanContext } from "./hooks/usePlanContext";
import type { Job, Task } from "./types";
import dayjs from "dayjs";

// Helper to capitalize
const capitalizeFirstLetter = (string: string = "") => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const mapJobsToTasks = (jobs: Job[]): Task[] => {
  if (!jobs) return [];
  return jobs.map((job) => {
    const formatTime = (dateTimeString?: string): string => {
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
      status: "Scheduled",
      businessName: job.business_name || "N/A",
      status2: "Unassigned",
      phone: job.phone_number,
      serviceDuration: formatServiceDuration(job.duration_minutes),
      from: formatTime(job.start_time),
      to: formatTime(job.end_time),
      customerPreferences: job.customer_preferences || "N/A",
      notes: job.additional_notes || "N/A",
      singleRecurring:
        job.recurrence_type === "one_time" ? "Single" : "Recurring",
      ratings: 0,
      team: [],
      files: job.documents?.length || 0,
      paid: capitalizeFirstLetter(job.payment_status),
    };
  });
};

const PlanRecents = () => {
  const { mapType, setMapType } = useMapState();
  const { jobs, fetchJobs, isLoading, error } = usePlanContext();
  const [transformedTasks, setTransformedTasks] = useState<Task[]>([]);
  const [mapHeight, setMapHeight] = useState<number>(400); // Initial map height
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (jobs) {
      setTransformedTasks(mapJobsToTasks(jobs));
    }
  }, [jobs]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection while dragging
    isResizing.current = true;
    startY.current = e.clientY;
    if (containerRef.current) {
      startHeight.current = containerRef.current.offsetHeight;
    }
    document.body.style.cursor = 'ns-resize'; // Change cursor while dragging
    document.body.style.userSelect = 'none'; // Prevent text selection
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const deltaY = e.clientY - startY.current;
    let newHeight = startHeight.current + deltaY;

    // Get the parent container's height
    const parentHeight = containerRef.current?.parentElement?.offsetHeight || window.innerHeight;
    
    // Constraints
    const minHeight = 200; // Minimum map height
    const maxHeight = parentHeight - 200; // Leave space for table

    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;

    setMapHeight(newHeight);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = ''; // Reset cursor
    document.body.style.userSelect = ''; // Reset user select
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

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
      {/* Map Container */}
      <div
        ref={containerRef}
        style={{ height: `${mapHeight}px` }}
        className="w-full relative flex-shrink-0 transition-[height] duration-100 ease-out"
      >
        <MapComponent
          mapType={mapType}
          setMapType={setMapType}
          config={defaultMapConfig}
          className="h-full w-full"
        />
      </div>

      {/* Resizer Handle */}
      <div
        className="w-full h-4 bg-gray-100 hover:bg-gray-200 cursor-ns-resize flex-shrink-0 flex items-center justify-center group transition-colors duration-150"
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-150" />
      </div>

      {/* Table Container - Will automatically fill remaining space */}
      <div className="flex-1 w-full overflow-hidden min-h-0">
        <TasksTable dataSource={transformedTasks} />
      </div>
    </div>
  );
};

export default PlanRecents;
