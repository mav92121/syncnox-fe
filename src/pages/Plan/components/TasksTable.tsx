import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table } from "antd";

import type { ColumnsType } from "antd/es/table";
type Task = {
  key: string;
  id: string;
  priority: string;
  firstName: string;
  lastName: string;
  address: string;
  status: string;
  businessName: string;
  status2: string;
  phone: string;
  serviceDuration: string;
  from: string;
  to: string;
  customerPreferences: string;
  notes: string;
  singleRecurring: string;
  ratings: number;
  team: string[];
  files: number;
  paid: string;
};

const columns: ColumnsType<Task> = [
  {
    title: <Checkbox className="h-5 w-5 rounded border-gray-300" />,
    width: 60, // Increased width
    key: "checkbox",
    // fixed: "left" as const,
    align: "center", // Center content
    render: () => (
      <div className="flex justify-center">
        <Checkbox className="h-5 w-5 rounded border-gray-300" />
      </div>
    ),
  },
  {
    title: "",
    width: 50, // Increased width
    key: "drag",
    align: "center",
    render: () => (
      <div className="flex flex-col gap-0 justify-center cursor-pointer">
        <svg
          className="w-2 h-2 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <svg
          className="w-2 h-2 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <svg
          className="w-2 h-2 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    ),
  },
  {
    title: "Job ID",
    dataIndex: "id",
    key: "id",
    width: 150, // Increased width
    align: "center",
    render: (id: string) => (
      <div className="flex items-center justify-center gap-2 font-normal text-gray-800">
       <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
      <img
        src={id.startsWith("ORD") ? "order.svg" : "task.svg"}
        className="w-full h-full object-contain"
        alt="icon"
      />
    </div>
        <div>{id}</div>
      </div>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    width: 120, // Increased width
    align: "center",
    render: (priority: string) => (
      <div className="flex justify-center">
        <span
          className={`inline-block min-w-[70px] text-center px-3 py-1 text-xs font-semibold ${
            priority === "Low"
              ? "bg-green-100 text-green-700 border border-green-200"
              : priority === "Medium"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {priority}
        </span>
      </div>
    ),
  },
  {
     title: (
    <div style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>
      First Name
    </div>
  ),
    dataIndex: "firstName",
    key: "firstName",
    width: 120, // Increased width
    align: "center", // Center content
  
  },
  {
    title: (
    <div style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>
      Last Name
    </div>
  ),
    dataIndex: "lastName",
    key: "lastName",
    width: 120, // Increased width
    align: "center", // Center content
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 250, // Increased width
    align: "center", // Center content
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150, // Increased width
    align: "center",
    render: (status: string) => (
      <div className="flex justify-center">
        <Button
          size="sm"
          className="bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1 h-7"
          variant="outline"
        >
          {status}
        </Button>
      </div>
    ),
  },
  {
    title: "Business Name",
    dataIndex: "businessName",
    key: "businessName",
    width: 180, // Increased width
    align: "center", // Center content
  },
  {
    title: "Status",
    dataIndex: "status2",
    key: "status2",
    width: 150, // Increased width
    align: "center",
    render: (status2: string) => (
      <div className="flex justify-center">
        <Button
          size="sm"
          className="bg-yellow-50 text-yellow-700 border-yellow-200 font-semibold px-3 py-1 h-7"
          variant="outline"
        >
          {status2}
        </Button>
      </div>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150, // Increased width
    align: "center", // Center content
  },
  {
    // title: "Service Duration",
    // dataIndex: "serviceDuration",
    // key: "serviceDuration",
    // width: 150, // Increased width
    // align: "center", // Center content
    title: (
    <div style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>
     Service Duration
    </div>
  ),
    dataIndex: "serviceDuration",
    key: "serviceDuration",
    width: 150, // adjust as needed
    align: "center",
    render: (text: string) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center px-2">
        {text}
      </div>
    ),  
    
  },
  {
    // title: "From",
    // dataIndex: "from",
    // key: "from",
    // width: 120, // Increased width
    // align: "center", // Center content
    title: "From",
    dataIndex: "from",
    key: "from",
    width: 120, // adjust as needed
    align: "center",
    render: (text: string) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center px-2">
        {text}
      </div>
    ),  
  },
  {
    // title: "To",
    // dataIndex: "to",
    // key: "to",
    // width: 120, // Increased width
    // align: "center", // Center content
    title: "To",
    dataIndex: "to",
    key: "to",
    width: 120, // adjust as needed
    align: "center",
    render: (text: string) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center px-2">
        {text}
      </div>
    ), 
    
  },
  {
    // title: "Customer Preferences",
    // dataIndex: "customerPreferences",
    // key: "customerPreferences",
    // width: 200, // Increased width
    // align: "center", // Center content
    title: "Customer Preferences",
    dataIndex: "customerPreferences",
    key: "customerPreferences",
    width: 100, // adjust as needed
    align: "center",
    render: (text: string) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center px-2">
        {text}
      </div>
    ), 
  },
  {
    // title: "Notes",
    // dataIndex: "notes",
    // key: "notes",
    // width: 180, // Increased width
    // align: "center", // Center content
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    width: 100, // adjust as needed
    align: "center",
    render: (text: string) => (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center px-2">
        {text}
      </div>
    ), 
  },
  {
    title: "Single/Recurring",
    dataIndex: "singleRecurring",
    key: "singleRecurring",
    align: "center",
    width: 150, // Increased width
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
    width: 120, // Increased width
    render: (rating: number) => (
      <div className="flex justify-center">
        <span className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
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
    // title: "Team Member",
     title: (
    <div style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>
    Team Member
    </div>
  ),
    dataIndex: "team",
    key: "team",
    align: "center",
    // width: 1200, // Increased width
    render: (team: string[]) => (
      <div className="flex justify-center">
        <span className="flex items-center gap-1">
          {team.map((_, i) => (
            <span
              key={i}
              className="inline-block w-6 h-6 rounded-full bg-gray-200 border border-gray-300"
            />
          ))}
        </span>
      </div>
    ),
  },
  {
    title: "Attach Files",
    dataIndex: "files",
    key: "files",
    align: "center",
    width: 150, // Increased width
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
    title: "Paid / Unpaid",
    dataIndex: "paid",
    key: "paid",
    align: "center",
    width: 150, // Increased width
    render: (text: string) => (
      <div className="flex justify-center">
        <Button
          size="sm"
          className={`min-w-[90px] ${
            text === "Paid"
              ? "bg-[#00774C] text-white"
              : "bg-[#667085] text-white"
          } font-semibold px-3 py-1 h-7`}
          variant="outline"
        >
          {text}
        </Button>
      </div>
    ),
  },
];

const tasks = [
  {
    key: "1",
    id: "ORD839501",
    priority: "Low",
    firstName: "Jack",
    lastName: "Reacher",
    address: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    status: "Map View",
    businessName: "The White House",
    status2: "Unassigned",
    phone: "+1 (824) 365-999",
    serviceDuration: "10 Minutes",
    from: "09:00 AM",
    to: "12:00 PM",
    customerPreferences: "Remember to water the plants on Friday.",
    notes: "Remember to water the plants on Friday.",
    singleRecurring: "Single",
    ratings: 4,
    team: ["A", "B"],
    files: 2,
    paid: "Paid",
  },
  {
    key: "2",
    id: "TASK01202",
    priority: "Medium",
    firstName: "Sofia",
    lastName: "Khan",
    address: "1 Infinite Loop, Cupertino, CA 95014",
    status: "Map View",
    businessName: "Apple Inc.",
    status2: "Unassigned",
    phone: "+1 (408) 996-1010",
    serviceDuration: "30 Minutes",
    from: "10:00 AM",
    to: "10:30 AM",
    customerPreferences: "Call before arrival.",
    notes: "N/A",
    singleRecurring: "Recurring",
    ratings: 5,
    team: ["C"],
    files: 1,
    paid: "Unpaid",
  },
  {
    key: "3",
    id: "TASK04567",
    priority: "Urgent",
    firstName: "Adonis",
    lastName: "Kerlut",
    address: "450 Serra Mall, Stanford, CA 94305",
    status: "Map View",
    businessName: "Stanford University",
    status2: "Unassigned",
    phone: "+1 (650) 723-2300",
    serviceDuration: "1 Hour",
    from: "01:00 PM",
    to: "02:00 PM",
    customerPreferences: "Requires wheelchair access.",
    notes: "Meet at the main entrance.",
    singleRecurring: "Single",
    ratings: 3,
    team: ["D", "E"],
    files: 0,
    paid: "Paid",
  },
  {
    key: "4",
    id: "ORD493827",
    priority: "Urgent",
    firstName: "Mover",
    lastName: "Grimr",
    address: "901 W Olympic Blvd, Los Angeles, CA 90015",
    status: "Map View",
    businessName: "Los Angeles Convention Center",
    status2: "Unassigned",
    phone: "+1 (213) 741-1151",
    serviceDuration: "45 Minutes",
    from: "03:00 PM",
    to: "03:45 PM",
    customerPreferences: "No special preferences.",
    notes: "Deliver to the main entrance.",
    singleRecurring: "Recurring",
    ratings: 4,
    team: ["F"],
    files: 3,
    paid: "Unpaid",
  },
];

const TasksTable = () => {
  return (
    <div className="flex flex-col w-full shadow overflow-hidden h-full bg-white">
      <div className="flex items-center justify-between flex-shrink-0 px-6">
        <h2 className="text-xl font-bold tracking-tight">Jobs</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-200 bg-[#F7F8FA] text-base"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="border-gray-200 cursor-pointer text-base px-4 py-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </div>
          <div className="border-gray-200 cursor-pointer text-base px-4 py-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </div>
          <Button
            variant="outline"
            className=" border-gray-200 text-base px-4 py-2 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Export
          </Button>
          <Button>
            <svg className="w-4 h-7" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create New Route
          </Button>
        </div>
      </div>
      {/* Only the table is scrollable */}
      <div className="flex-1 min-h-0 overflow-x-auto custom-scrollbar px-6 my-2">
        <Table
          className="w-[100px]" // You might need to adjust this width based on the total column widths
          pagination={false}
          columns={columns}
          dataSource={tasks}
        />
      </div>
      <div className="">
        <Button className="w-full h-12 bg-[#003220] hover:bg-[#004830] text-white text-base font-semibold shadow-none">
          Add More Stops
        </Button>
      </div>
    </div>
  );
};

export default TasksTable;
