import { useState, useEffect } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { usePlanContext } from "../pages/Plan/hooks/usePlanContext";
import type { Job, Task } from "../pages/Plan/types";
import dayjs from "dayjs";
import JobsTable from "@/pages/Plan/components/JobsTable";

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

const Jobs = () => {
  const [searchText, setSearchText] = useState("");
  const { jobs, isLoading, error } = usePlanContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Map jobs to tasks when jobs data changes
  useEffect(() => {
    if (jobs) {
      setTasks(mapJobsToTasks(jobs));
    }
  }, [jobs]);

  // Search logic
  const filteredData = tasks.filter((task) =>
    Object.values(task).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full flex-col">
        <Spin size="large" />
        <div className="mt-4 text-primary">Loading Jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex items-center justify-between pb-2">
        <h4 className="text-md font-semibold">Recent Jobs</h4>
        <div className="flex gap-10">
          <Input
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            suffix={<SearchOutlined className="text-gray-400" />}
          />
        </div>
      </div>

      <JobsTable dataSource={filteredData} enableRowSelection={false} />
    </div>
  );
};

export default Jobs;
