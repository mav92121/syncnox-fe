import { useState } from "react";
import {
  SearchOutlined,
  MoreOutlined,
  FilterOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Table, Input, Button, Modal, Select } from "antd";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routeNameFocused, setRouteNameFocused] = useState(false);
  const [optimizationFocused, setOptimizationFocused] = useState(false);
  const [assignTeamFocused, setAssignTeamFocused] = useState(false);
  const [routeNameValue, setRouteNameValue] = useState('');
  const [optimizationValue, setOptimizationValue] = useState('');
  const [assignTeamValue, setAssignTeamValue] = useState('');

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<Task> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCreateNewRoute = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleOptimizeRoute = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col w-full shadow overflow-hidden h-full bg-white">
      <div className="flex items-center justify-between flex-shrink-0 pb-2">
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
              placeholder={"search"}
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
            onClick={handleCreateNewRoute}
            disabled={selectedRowKeys.length === 0}
          >
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
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-auto custom-scrollbar">
          <Table
            rowSelection={rowSelection}
            scroll={{ y: 'calc(100vh - 400px)' }}
            pagination={false}
            columns={columns}
            dataSource={dataSource}
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

      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
        className="custom-route-modal"
        width={600}
        closeIcon={null}
      >
        <style>{`
          .floating-label-select .ant-select-selector {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            min-height: 40px;
            padding-top: 4px;
          }
          
          .floating-label-select:hover .ant-select-selector {
            border-color: #1677ff;
          }
          
          .floating-label-select.ant-select-focused .ant-select-selector {
            border-color: #1677ff;
            box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
          }
        `}</style>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-grow"></div>
            <h2 className="text-2xl font-semibold">Create a Route</h2>
            <div className="flex-grow text-right">
              <Button type="link" onClick={handleCancelModal}>
                Cancel
              </Button>
            </div>
          </div>

          <p className="text-gray-500 mb-6 text-center">
            Let's Get These Deliveries Rollin' Like a Party on Wheels!
          </p>

          <div className="flex justify-center mb-8">
            <img src="/map_pin.svg" alt="Map Pin" className="h-32 w-32" />
          </div>

          <div className="mb-4 relative">
            <Select
              placeholder="Name of the Route"
              className="w-full floating-label-select"
              options={[]}
              value={routeNameValue || undefined}
              onFocus={() => setRouteNameFocused(true)}
              onBlur={() => setRouteNameFocused(false)}
              onChange={(value) => setRouteNameValue(value || '')}
            />
            <label className={`absolute left-3 text-gray-500 transition-all duration-200 pointer-events-none bg-white px-1 ${
              routeNameFocused || routeNameValue
                ? 'top-[-8px] text-xs text-blue-600 scale-90'
                : 'top-[-8px] text-xs text-blue-600 scale-90'
            }`}>
              Route Name <span className="text-red-500">*</span>
            </label>
          </div>

          <div className="mb-4 relative">
            <Select
              placeholder="Select Preference"
              className="w-full floating-label-select"
              options={[]}
              value={optimizationValue || undefined}
              onFocus={() => setOptimizationFocused(true)}
              onBlur={() => setOptimizationFocused(false)}
              onChange={(value) => setOptimizationValue(value || '')}
            />
            <label className={`absolute left-3 text-gray-500 transition-all duration-200 pointer-events-none bg-white px-1 ${
              optimizationFocused || optimizationValue
                ? 'top-[-8px] text-xs text-blue-600 scale-90'
                : 'top-[-8px] text-xs text-blue-600 scale-90'
            }`}>
              Optimization logic
            </label>
          </div>

          <div className="mb-6 relative">
            <Select
              placeholder="Add Team"
              className="w-full floating-label-select"
              options={[]}
              value={assignTeamValue || undefined}
              onFocus={() => setAssignTeamFocused(true)}
              onBlur={() => setAssignTeamFocused(false)}
              onChange={(value) => setAssignTeamValue(value || '')}
              suffixIcon={
                <div className="flex items-center">
                  <img src="/team_avatars.svg" alt="Team" className="h-6" />
                  <span className="ant-select-arrow" />
                </div>
              }
            />
            <label className={`absolute left-3 text-gray-500 transition-all duration-200 pointer-events-none bg-white px-1 ${
              assignTeamFocused || assignTeamValue
                ? 'top-[-8px] text-xs text-blue-600 scale-90'
                : 'top-[-8px] text-xs text-blue-600 scale-90'
            }`}>
              Assign Team
            </label>
          </div>

          <Button
            type="primary"
            className="w-full bg-[#004B2F] text-white py-2 px-4 rounded hover:bg-[#004B2F] flex items-center justify-center"
            onClick={handleOptimizeRoute}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Optimize Route
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TasksTable;