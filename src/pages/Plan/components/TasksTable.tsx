import { useState } from "react";
import { Button, message, Table, Input } from "antd";

import type { TableProps, TableColumnType } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
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
type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
type ColumnsType<T> = TableColumnType<T>[];

interface TasksTableProps {
  dataSource: Task[];
}

const columns: ColumnsType<Task> = [
  {
    title: "",
    key: "drag",
    align: "center",
    render: () => <MoreOutlined className="text-[20px] cursor-pointer" />,
  },
  {
    title: "Job ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    render: (id: string) => (
      <div className="flex items-center justify-center font-medium text-gray-800">
        <div>{id}</div>
      </div>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    align: "center",
    render: (priority: string) => (
      <div className="flex justify-center">
        <span
          className={`inline-block min-w-[70px] text-center px-3 py-1 text-xs font-semibold ${
            priority === "Low"
              ? "bg-green-100 text-green-700 border border-green-200"
              : priority === "Medium"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {priority}
        </span>
      </div>
    ),
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    align: "center",
    render: (text: string) => <div className="text-center px-2">{text}</div>,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    align: "center",
    render: (text: string) => <div className="text-center px-2">{text}</div>,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    align: "center",
    ellipsis: true,
    render: (text: string) => (
      <div className="text-center px-2" title={text}>
        {text}
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: () => (
      <div className="flex justify-center">
        <Button type="link" size="small">
          Map View
        </Button>
      </div>
    ),
  },
  {
    title: "Business Name",
    dataIndex: "businessName",
    key: "businessName",
    align: "center",
    ellipsis: true,
    render: (text: string) => (
      <div className="text-center px-2" title={text}>
        {text}
      </div>
    ),
  },
  {
    title: "Assignment",
    dataIndex: "status2",
    key: "status2",
    align: "center",
    render: () => (
      <div className="flex justify-center">
        <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 font-semibold px-3 py-1 h-7">
          Unassigned
        </div>
      </div>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (text: string) => <div className="text-center px-2">{text}</div>,
  },
  {
    title: "Service Duration",
    dataIndex: "serviceDuration",
    key: "serviceDuration",
    align: "center",
    render: (duration: string) => (
      <div className="text-center px-2">{duration}</div>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    align: "center",
    render: (time: string | null) => (
      <div className="text-center px-2">{time}</div>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    align: "center",
    render: (time: string | null) => (
      <div className="text-center px-2">{time}</div>
    ),
  },
  {
    title: "Customer Preferences",
    dataIndex: "customerPreferences",
    key: "customerPreferences",
    align: "center",
    ellipsis: true,
    render: (preference: string) => (
      <div className="text-center px-2" title={preference}>
        {preference}
      </div>
    ),
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    align: "center",
    ellipsis: true,
    render: (notes: string) => (
      <div className="text-center px-2" title={notes}>
        {notes}
      </div>
    ),
  },
  {
    title: "Type",
    dataIndex: "singleRecurring",
    key: "singleRecurring",
    align: "center",
    render: (type: string) => (
      <div className="flex justify-center">
        <span
          className={`min-w-[90px] inline-block text-center ${
            type === "Single"
              ? "bg-[#00B875] text-white"
              : type === "Recurring"
              ? "bg-[#1677FF] text-white"
              : "bg-gray-200 text-gray-700"
          } px-3 py-1 text-xs font-semibold`}
        >
          {type}
        </span>
      </div>
    ),
  },
  {
    title: "Ratings",
    dataIndex: "ratings",
    key: "ratings",
    align: "center",
    render: (rating: number) => (
      <div className="flex justify-center">
        <span className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${
                i <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <polygon points="9.9,1.1 7.6,6.6 1.6,7.3 6.1,11.2 4.8,17.1 9.9,14.1 15,17.1 13.7,11.2 18.2,7.3 12.2,6.6 " />
            </svg>
          ))}
        </span>
      </div>
    ),
  },
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    align: "center",
    render: (team: string[]) => (
      <div className="flex justify-center">
        <span className="flex items-center gap-1">
          {team.map((_, i) => (
            <span
              key={i}
              className="inline-block w-5 h-5 rounded-full bg-gray-200 border border-gray-300"
            />
          ))}
        </span>
      </div>
    ),
  },
  {
    title: "Files",
    dataIndex: "files",
    key: "files",
    align: "center",
    render: () => (
      <div className="flex justify-center">
        <label className="flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100 px-1 py-1.5 w-[100px]">
          <svg
            className="w-4 h-4 text-gray-400 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <div className="text-gray-500 text-xs font-medium">Attach File</div>
          <input type="file" className="hidden" />
        </label>
      </div>
    ),
  },
  {
    title: "Payment",
    dataIndex: "paid",
    key: "paid",
    align: "center",
    render: (text: string) => (
      <div className="flex w-[150px] justify-center">
        <div
          className={`w-[90px] px-[10px] py-[7px] text-white ${
            text === "Paid" ? "bg-[#00774C]" : "bg-[#667085]"
          }`}
        >
          {text}
        </div>
      </div>
    ),
  },
];

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
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Task> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Helper function to convert 12-hour time to 24-hour format (HH:MM:SS)
  // const convertTo24HourFormat = (timeStr: string): string => {
  //   if (!timeStr) return "09:00:00";

  //   // If already in 24-hour format, return as is
  //   if (/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(timeStr)) {
  //     return timeStr.includes(":") && timeStr.split(":").length === 2
  //       ? `${timeStr}:00`
  //       : timeStr;
  //   }

  //   // Convert 12-hour format to 24-hour format
  //   const time = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  //   if (!time) return "09:00:00";

  //   // Using underscore prefix to indicate intentionally unused variable
  //   const [_match, _hours, _minutes] = time; // eslint-disable-line @typescript-eslint/no-unused-vars
  //   const period = time[3].toUpperCase();

  //   let hours = _hours;
  //   let minutes = _minutes;

  //   if (period === "PM" && hours !== "12") {
  //     hours = String(parseInt(hours, 10) + 12);
  //   } else if (period === "AM" && hours === "12") {
  //     hours = "00";
  //   }

  //   // Ensure two digits
  //   hours = hours.padStart(2, "0");
  //   minutes = minutes.padStart(2, "0");

  //   return `${hours}:${minutes}:00`;
  // };

  const handleCreateRoute = async () => {
    console.log("Create Route button clicked");
    console.log("Selected row keys:", selectedRowKeys);

    if (selectedRowKeys.length === 0) {
      console.log("No jobs selected, showing warning");
      messageApi.warning("Please select at least one job to create a route");
      return;
    }
    if (selectedRowKeys.length > 0) {
      setOpen(true);
    }
    const selectedJobs = dataSource.filter((job) =>
      selectedRowKeys.includes(job.key as React.Key)
    );

    console.log("selected jobs -> ", selectedJobs);

    // Use original job data for validation
    const jobsWithInvalidCoords = selectedJobs.filter((job) => {
      const jobData = getJobById(job.id) || job;
      const lat = jobData.lat ?? null;
      const lng = jobData.lon ?? null;
      console.log("job data -> ", jobData); 

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
          ? jobData.duration_minutes * 60
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
        <div className="flex space-x-4 gap-x-4">
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
          <div className="cursor-pointer text-sm flex items-center gap-1">
            <DeleteOutlined />
            <div>Delete</div>
          </div>
          <div className="cursor-pointer text-sm flex items-center gap-1">
            <FilterOutlined />
            <div>Filters</div>
          </div>
          <div className="cursor-pointer text-sm flex items-center gap-1">
            <FileSearchOutlined />
            <div>Verify</div>
          </div>
          <Button>
            <UploadOutlined />
            Export
          </Button>
          <Button
            type={selectedRowKeys.length > 0 ? "primary" : "default"}
            // onClick={`${handleCreateRoute} ${showModal}`}
            onClick={() => setOpen(true)}
            disabled={selectedRowKeys.length === 0 || isOptimizing}
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
            {isOptimizing ? `Optimizing...` : "Create New Route"}
          </Button>
        </div>
        {open ? (
          <CreateRouteModalForm
            open={open}
            onCancel={() => setOpen(false)}
            onSubmit={handleCreateRoute}
          />
        ) : (
          ""
        )}
      </div>
      {/* Only the table is scrollable */}
      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
        <div
          className="h-full overflow-y-auto custom-scrollbar"
          style={{ minWidth: "max-content" }}
        >
          <Table
            rowSelection={rowSelection}
            scroll={undefined}
            pagination={false}
            columns={columns}
            dataSource={filteredData}
            rowKey={(record) => record.id || record.key}
            size="small"
            tableLayout="auto"
            className="min-w-full"
          />
        </div>
      </div>
      <div className="w-full flex-shrink-0 pt-1">
        <Button className="w-full" type="primary">
          Add More Stops
        </Button>
      </div>
    </div>
  );
};

export default TasksTable;
