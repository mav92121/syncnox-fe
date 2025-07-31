import { useState, useEffect } from "react";
import { Table, Button, Input, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { usePlanContext } from "../pages/Plan/hooks/usePlanContext";
import type {Job, Task} from "../pages/Plan/types"
import dayjs from "dayjs";



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
  const { jobs, isLoading, error, fetchJobs } = usePlanContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Map jobs to tasks when jobs data changes
  useEffect(() => {
    if (jobs) {
      setTasks(mapJobsToTasks(jobs));
    }
  }, [jobs]);
  // Debug: Log the dataSource to check what we're receiving
  console.log("Jobs data:", { jobs, tasks, isLoading, error });
  // Columns configuration
  const columns: ColumnsType<Task> = [
    {
      title: "Job ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id: string) => (
        <div className="font-medium text-gray-800 text-center">{id || 'N/A'}</div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      render: (priority: string) => {
        const base =
          "inline-block min-w-[70px] text-center px-3 py-1 text-xs font-semibold border";
        const style =
          priority === "Low"
            ? "bg-green-100 text-green-700 border-green-200"
            : priority === "Medium"
            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
            : "bg-red-100 text-red-800 border-red-200";

        return <span className={`${base} ${style}`}>{priority || 'N/A'}</span>;
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      ellipsis: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: () => (
        <Button type="link" size="small">
          Map View
        </Button>
      ),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      align: "center",
      ellipsis: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Assignment",
      dataIndex: "status2",
      key: "status2",
      align: "center",
      render: () => (
        <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 font-semibold px-3 py-1 h-7">
          Unassigned
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Service Duration",
      dataIndex: "serviceDuration",
      key: "serviceDuration",
      align: "center",
      render: (text: string) => text || 'N/A',
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      align: "center",
      render: (text: string) => text || 'N/A',
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      align: "center",
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Customer Preferences",
      dataIndex: "customerPreferences",
      key: "customerPreferences",
      align: "center",
      ellipsis: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      align: "center",
      ellipsis: true,
      render: (text: string) => text || 'N/A',
    },
    {
      title: "Type",
      dataIndex: "singleRecurring",
      key: "singleRecurring",
      align: "center",
      render: (type: string) => {
        const base =
          "inline-block min-w-[90px] text-center px-3 py-1 text-xs font-semibold";
        const style =
          type === "Single"
            ? "bg-[#00B875] text-white"
            : type === "Recurring"
            ? "bg-[#1677FF] text-white"
            : "bg-gray-200 text-gray-700";

        return <span className={`${base} ${style}`}>{type || 'N/A'}</span>;
      },
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      align: "center",
      render: (rating: number) => (
        <span className="flex justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${
                i <= (rating || 0) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <polygon points="9.9,1.1 7.6,6.6 1.6,7.3 6.1,11.2 4.8,17.1 9.9,14.1 15,17.1 13.7,11.2 18.2,7.3 12.2,6.6 " />
            </svg>
          ))}
        </span>
      ),
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
      align: "center",
      render: (team: string[] = []) => (
        <span className="flex justify-center gap-1">
          {team.length > 0 ? team.map((_, i) => (
            <span
              key={i}
              className="inline-block w-5 h-5 rounded-full bg-gray-200 border border-gray-300"
            />
          )) : <span className="text-gray-400">No team</span>}
        </span>
      ),
    },
    {
      title: "Files",
      dataIndex: "files",
      key: "files",
      align: "center",
      render: () => (
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
      ),
    },
    {
      title: "Payment",
      dataIndex: "paid",
      key: "paid",
      align: "center",
      render: (text: string) => (
        <div
          className={`w-[90px] px-[10px] py-[7px] text-white text-center ${
            text === "Paid" ? "bg-[#00774C]" : "bg-[#667085]"
          }`}
        >
          {text || 'Unpaid'}
        </div>
      ),
    },
  ];

  // Search logic
  const filteredData = tasks.filter(task => 
    Object.values(task).some(
      value => 
        value && 
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" />
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
    <div className="flex flex-col w-full overflow-hidden h-full bg-white">
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

      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
        <div
          className="h-full overflow-y-auto custom-scrollbar"
          style={{ minWidth: "max-content" }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey={(record) => record.id || record.key || Math.random().toString()}
            size="small"
            tableLayout="auto"
            className="min-w-full"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;