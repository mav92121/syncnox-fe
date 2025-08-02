import { useState } from "react";
import { Button, message, Input } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { usePlan } from "../context/planContextDefinition";
import { optimizeRoutes } from "../../../services/optimization";
import type { Job as OptimizationJob } from "../../../services/optimization";
import type { Task } from "../types";
import CreateRouteModalForm from "./CreateRouteModalForm";
import GeneralTasksTable from "./GeneralTasksTable";

interface TasksTableProps {
  dataSource: Task[];
}

const TasksTable = ({ dataSource }: TasksTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { jobs, setOptimizationResult } = usePlan();
  const [open, setOpen] = useState(false);

  // Filter data based on search text
  const filteredData = searchText
    ? dataSource.filter((item) =>
        Object.values(item).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : dataSource;

  // Helper function to find a job by id
  const getJobById = (id: string) => {
    return jobs?.find((job) => job.id == id);
  };
  const handelSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleCreateRoute = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning("Please select at least one job to create a route");
      return;
    }

    const selectedJobs = dataSource.filter((job) =>
      selectedRowKeys.includes(job.key as React.Key)
    );

    // Use original job data for validation
    const jobsWithInvalidCoords = selectedJobs.filter((job) => {
      const jobData = getJobById(job.id) || job;
      const lat = jobData.lat ?? null;
      const lng = jobData.lon ?? null;

      // Check if coordinates are valid
      return (
        lat === null ||
        lng === null ||
        isNaN(Number(lat)) ||
        isNaN(Number(lng)) ||
        Number(lat) < -90 ||
        Number(lat) > 90 ||
        Number(lng) < -180 ||
        Number(lng) > 180
      );
    });

    if (jobsWithInvalidCoords.length > 0) {
      const jobIds = jobsWithInvalidCoords
        .map((job) => `#${job.id}`)
        .join(", ");
      messageApi.error(
        `Cannot create route: Jobs ${jobIds} have invalid or missing coordinates. Please check the address and try again.`
      );
      return;
    }

    // Convert selected tasks to optimization jobs format
    const optimizationJobs: OptimizationJob[] = selectedJobs.map((job) => {
      const jobData = getJobById(job.id) || job;
      // const timeWindowStart = jobData.start_time
      //   ? new Date(jobData.start_time).toLocaleTimeString("en-US", {
      //       hour12: true,
      //       hour: "numeric",
      //       minute: "2-digit",
      //     })
      //   : "09:00 AM";
      // const timeWindowEnd = jobData.end_time
      //   ? new Date(jobData.end_time).toLocaleTimeString("en-US", {
      //       hour12: true,
      //       hour: "numeric",
      //       minute: "2-digit",
      //     })
      //   : "06:00 PM";

      return {
        id: job.id,
        location: {
          lat: jobData.lat || 0,
          lng: jobData.lon || 0,
        },
        duration: jobData.duration_minutes
          ? Number(jobData.duration_minutes) * 60
          : 1800, // Convert minutes to seconds if available
        // time_window: {
        //   start: convertTo24HourFormat(timeWindowStart),
        //   end: convertTo24HourFormat(timeWindowEnd),
        // },
        priority:
          jobData.priority_level === "high"
            ? 10
            : jobData.priority_level === "medium"
            ? 5
            : 1,
      };
    });

    try {
      setIsOptimizing(true);
      const result = await optimizeRoutes(optimizationJobs);
      setOptimizationResult(result);
      messageApi.success("Route optimized successfully!");
    } catch (error) {
      console.error("Error optimizing route:", error);
      messageApi.error(
        "Failed to optimize route. Please ensure all jobs have valid addresses and try again."
      );
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="flex flex-col w-full shadow overflow-hidden h-full bg-white">
      {contextHolder}
      <div className="flex items-center justify-between flex-shrink-0 pb-2">
        <h4 className="text-md tracking-tight">Jobs</h4>
        <div className="flex space-x-4 gap-3">
          <div className="flex gap-10">
            <Input
              type="text"
              suffix={
                <SearchOutlined
                  style={{ fontSize: "16px" }}
                  className="text-gray-400"
                />
              }
              // className="pl-9 h-[20px]"
              placeholder={"search"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="border-gray-200 cursor-pointer text-sm px-4 py-2 flex gap-2 items-center">
            <DeleteOutlined />
            <div>Delete</div>
          </div>
          <div className="border-gray-200 cursor-pointer text-sm flex gap-2 items-center">
            <FilterOutlined />
            <div>Filters</div>
          </div>
          <div className="border-gray-200 cursor-pointer text-sm flex gap-2 items-center">
            <FileSearchOutlined />
            <div>Verify</div>
          </div>
          <Button>
            <UploadOutlined />
            Export
          </Button>
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            disabled={isOptimizing || selectedRowKeys.length === 0}
            icon={
              isOptimizing ? (
                <LoadingOutlined />
              ) : (
                <svg
                  className="w-4 h-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            }
          >
            {isOptimizing ? "Optimizing..." : "Create New Route"}
          </Button>
        </div>
        <CreateRouteModalForm
          open={open}
          onClose={() => setOpen(false)}
          handleCreateRoute={handleCreateRoute}
        />
      </div>
      <GeneralTasksTable
        dataSource={filteredData}
        enableRowSelection
        onSelectionChange={handelSelectChange}
      />
      <div className="w-full flex-shrink-0 pt-1">
        <Button className="w-full" type="primary">
          Add More Stops
        </Button>
      </div>
    </div>
  );
};

export default TasksTable;
