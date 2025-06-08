import { useState } from "react";
import {
  SearchOutlined,
  MoreOutlined,
  FilterOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Table, Input, Button } from "antd";
import type { TableProps } from "antd/es/table";
import type { ColumnsType } from "antd/es/table";
import type { Task } from "../types";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

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
    render: (time: string) => <div className="text-center px-2">{time}</div>,
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    align: "center",
    render: (time: string) => <div className="text-center px-2">{time}</div>,
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<Task> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="flex flex-col w-full shadow overflow-hidden h-full bg-white">
      <div className="flex items-center justify-between flex-shrink-0 py-3">
        <h4 className="text-xl tracking-tight">Jobs</h4>
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
              // onChange={(e) => onSearch && onSearch(e.target.value)}
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
          <Button type="primary">
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
            dataSource={dataSource}
            size="small"
            tableLayout="auto"
            className="min-w-full"
          />
        </div>
      </div>
      <div className="w-full flex-shrink-0 pt-2">
        <Button className="w-full" type="primary">
          Add More Stops
        </Button>
      </div>
    </div>
  );
};

export default TasksTable;
