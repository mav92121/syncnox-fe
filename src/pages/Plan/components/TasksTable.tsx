// import { useState } from "react";
// import { Button, message, Table, Input } from "antd";
// import type { TableProps, TableColumnType } from "antd";
// import {
//   SearchOutlined,
//   MoreOutlined,
//   FilterOutlined,
//   DeleteOutlined,
//   FileSearchOutlined,
//   UploadOutlined,
//   LoadingOutlined,
//   EditOutlined,
//   CheckOutlined,
//   CloseOutlined,
// } from "@ant-design/icons";
// import { usePlan } from "../context/planContextDefinition";
// import { optimizeRoutes } from "../../../services/optimization";
// import type { Job as OptimizationJob } from "../../../services/optimization";
// import type { Task } from "../types";
// import CreateRouteModalForm from "./CreateRouteModalForm";

// type TableRowSelection<T extends object = object> =
//   TableProps<T>["rowSelection"];
// type ColumnsType<T> = TableColumnType<T>[];

// interface TasksTableProps {
//   dataSource: Task[];
// }

// // Component for editable column title
// const EditableColumnTitle = ({
//   title,
//   onSave,
// }: {
//   title: string;
//   onSave: (newTitle: string) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(title);

//   const handleSave = () => {
//     if (editValue.trim() && editValue !== title) {
//       onSave(editValue.trim());
//     }
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditValue(title);
//     setIsEditing(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSave();
//     } else if (e.key === "Escape") {
//       handleCancel();
//     }
//   };

//   if (isEditing) {
//     return (
//       <div className="flex items-center gap-1">
//         <Input
//           value={editValue}
//           onChange={(e) => setEditValue(e.target.value)}
//           onKeyDown={handleKeyPress}
//           size="small"
//           className="min-w-[80px]"
//           autoFocus
//         />
//         <CheckOutlined
//           className="cursor-pointer text-green-600 hover:text-green-700"
//           onClick={handleSave}
//         />
//         <CloseOutlined
//           className="cursor-pointer text-red-600 hover:text-red-700"
//           onClick={handleCancel}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center gap-1 group">
//       <span>{title}</span>
//       <EditOutlined
//         className="cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
//         onClick={() => setIsEditing(true)}
//       />
//     </div>
//   );
// };

// const TasksTable = ({ dataSource }: TasksTableProps) => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [isOptimizing, setIsOptimizing] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [messageApi, contextHolder] = message.useMessage();
//   const { jobs, setOptimizationResult } = usePlan();
//   const [open, setOpen] = useState(false);

//   // State for column titles
//   const [columnTitles, setColumnTitles] = useState({
//     id: "Job ID",
//     priority: "Priority",
//     firstName: "First Name",
//     lastName: "Last Name",
//     address: "Address",
//     status: "Status",
//     businessName: "Business Name",
//     status2: "Assignment",
//     phone: "Phone",
//     serviceDuration: "Service Duration",
//     from: "From",
//     to: "To",
//     customerPreferences: "Customer Preferences",
//     notes: "Notes",
//     singleRecurring: "Type",
//     ratings: "Ratings",
//     team: "Team",
//     files: "Files",
//     paid: "Payment",
//   });

//   // Function to update column title
//   const updateColumnTitle = (key: string, newTitle: string) => {
//     setColumnTitles((prev) => ({
//       ...prev,
//       [key]: newTitle,
//     }));
//     messageApi.success(`Column title updated to "${newTitle}"`);
//   };

//   // Updated columns with editable titles
//   const columns: ColumnsType<Task> = [
//     {
//       title: "",
//       key: "drag",
//       align: "center",
//       render: () => <MoreOutlined className="text-[20px] cursor-pointer" />,
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.id}
//           onSave={(newTitle) => updateColumnTitle("id", newTitle)}
//         />
//       ),
//       dataIndex: "id",
//       key: "id",
//       align: "center",
//       render: (id: string) => (
//         <div className="flex items-center justify-center font-medium text-gray-800">
//           <div>{id}</div>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.priority}
//           onSave={(newTitle) => updateColumnTitle("priority", newTitle)}
//         />
//       ),
//       dataIndex: "priority",
//       key: "priority",
//       align: "center",
//       render: (priority: string) => (
//         <div className="flex justify-center">
//           <span
//             className={`inline-block min-w-[70px] text-center px-3 py-1 text-xs font-semibold ${
//               priority === "Low"
//                 ? "bg-green-100 text-green-700 border border-green-200"
//                 : priority === "Medium"
//                 ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
//                 : "bg-red-100 text-red-800 border border-red-200"
//             }`}
//           >
//             {priority}
//           </span>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.firstName}
//           onSave={(newTitle) => updateColumnTitle("firstName", newTitle)}
//         />
//       ),
//       dataIndex: "firstName",
//       key: "firstName",
//       align: "center",
//       render: (text: string) => <div className="text-center px-2">{text}</div>,
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.lastName}
//           onSave={(newTitle) => updateColumnTitle("lastName", newTitle)}
//         />
//       ),
//       dataIndex: "lastName",
//       key: "lastName",
//       align: "center",
//       render: (text: string) => <div className="text-center px-2">{text}</div>,
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.address}
//           onSave={(newTitle) => updateColumnTitle("address", newTitle)}
//         />
//       ),
//       dataIndex: "address",
//       key: "address",
//       align: "center",
//       ellipsis: true,
//       render: (text: string) => (
//         <div className="text-center px-2" title={text}>
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.status}
//           onSave={(newTitle) => updateColumnTitle("status", newTitle)}
//         />
//       ),
//       dataIndex: "status",
//       key: "status",
//       align: "center",
//       render: () => (
//         <div className="flex justify-center">
//           <Button type="link" size="small">
//             Map View
//           </Button>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.businessName}
//           onSave={(newTitle) => updateColumnTitle("businessName", newTitle)}
//         />
//       ),
//       dataIndex: "businessName",
//       key: "businessName",
//       align: "center",
//       ellipsis: true,
//       render: (text: string) => (
//         <div className="text-center px-2" title={text}>
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.status2}
//           onSave={(newTitle) => updateColumnTitle("status2", newTitle)}
//         />
//       ),
//       dataIndex: "status2",
//       key: "status2",
//       align: "center",
//       render: () => (
//         <div className="flex justify-center">
//           <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 font-semibold px-3 py-1 h-7">
//             Unassigned
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.phone}
//           onSave={(newTitle) => updateColumnTitle("phone", newTitle)}
//         />
//       ),
//       dataIndex: "phone",
//       key: "phone",
//       align: "center",
//       render: (text: string) => <div className="text-center px-2">{text}</div>,
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.serviceDuration}
//           onSave={(newTitle) => updateColumnTitle("serviceDuration", newTitle)}
//         />
//       ),
//       dataIndex: "serviceDuration",
//       key: "serviceDuration",
//       align: "center",
//       render: (duration: string) => (
//         <div className="text-center px-2">{duration}</div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.from}
//           onSave={(newTitle) => updateColumnTitle("from", newTitle)}
//         />
//       ),
//       dataIndex: "from",
//       key: "from",
//       align: "center",
//       render: (time: string | null) => (
//         <div className="text-center px-2">{time}</div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.to}
//           onSave={(newTitle) => updateColumnTitle("to", newTitle)}
//         />
//       ),
//       dataIndex: "to",
//       key: "to",
//       align: "center",
//       render: (time: string | null) => (
//         <div className="text-center px-2">{time}</div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.customerPreferences}
//           onSave={(newTitle) =>
//             updateColumnTitle("customerPreferences", newTitle)
//           }
//         />
//       ),
//       dataIndex: "customerPreferences",
//       key: "customerPreferences",
//       align: "center",
//       ellipsis: true,
//       render: (preference: string) => (
//         <div className="text-center px-2" title={preference}>
//           {preference}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.notes}
//           onSave={(newTitle) => updateColumnTitle("notes", newTitle)}
//         />
//       ),
//       dataIndex: "notes",
//       key: "notes",
//       align: "center",
//       ellipsis: true,
//       render: (notes: string) => (
//         <div className="text-center px-2" title={notes}>
//           {notes}
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.singleRecurring}
//           onSave={(newTitle) => updateColumnTitle("singleRecurring", newTitle)}
//         />
//       ),
//       dataIndex: "singleRecurring",
//       key: "singleRecurring",
//       align: "center",
//       render: (type: string) => (
//         <div className="flex justify-center">
//           <span
//             className={`min-w-[90px] inline-block text-center ${
//               type === "Single"
//                 ? "bg-[#00B875] text-white"
//                 : type === "Recurring"
//                 ? "bg-[#1677FF] text-white"
//                 : "bg-gray-200 text-gray-700"
//             } px-3 py-1 text-xs font-semibold`}
//           >
//             {type}
//           </span>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.ratings}
//           onSave={(newTitle) => updateColumnTitle("ratings", newTitle)}
//         />
//       ),
//       dataIndex: "ratings",
//       key: "ratings",
//       align: "center",
//       render: (rating: number) => (
//         <div className="flex justify-center">
//           <span className="flex items-center gap-0.5">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <svg
//                 key={i}
//                 className={`w-3 h-3 ${
//                   i <= rating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <polygon points="9.9,1.1 7.6,6.6 1.6,7.3 6.1,11.2 4.8,17.1 9.9,14.1 15,17.1 13.7,11.2 18.2,7.3 12.2,6.6 " />
//               </svg>
//             ))}
//           </span>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.team}
//           onSave={(newTitle) => updateColumnTitle("team", newTitle)}
//         />
//       ),
//       dataIndex: "team",
//       key: "team",
//       align: "center",
//       render: (team: string[]) => (
//         <div className="flex justify-center">
//           <span className="flex items-center gap-1">
//             {team.map((_, i) => (
//               <span
//                 key={i}
//                 className="inline-block w-5 h-5 rounded-full bg-gray-200 border border-gray-300"
//               />
//             ))}
//           </span>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.files}
//           onSave={(newTitle) => updateColumnTitle("files", newTitle)}
//         />
//       ),
//       dataIndex: "files",
//       key: "files",
//       align: "center",
//       render: () => (
//         <div className="flex justify-center">
//           <label className="flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer bg-gray-50 hover:bg-gray-100 px-1 py-1.5 w-[100px]">
//             <svg
//               className="w-4 h-4 text-gray-400 mr-1.5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             <div className="text-gray-500 text-xs font-medium">Attach File</div>
//             <input type="file" className="hidden" />
//           </label>
//         </div>
//       ),
//     },
//     {
//       title: (
//         <EditableColumnTitle
//           title={columnTitles.paid}
//           onSave={(newTitle) => updateColumnTitle("paid", newTitle)}
//         />
//       ),
//       dataIndex: "paid",
//       key: "paid",
//       align: "center",
//       render: (text: string) => (
//         <div className="flex w-[150px] justify-center">
//           <div
//             className={`w-[90px] px-[10px] py-[7px] text-white ${
//               text === "Paid" ? "bg-[#00774C]" : "bg-[#667085]"
//             }`}
//           >
//             {text}
//           </div>
//         </div>
//       ),
//     },
//   ];

//   // Filter data based on search text
//   const filteredData = searchText
//     ? dataSource.filter((item) =>
//         Object.values(item).some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(searchText.toLowerCase())
//         )
//       )
//     : dataSource;

//   // Helper function to find a job by id
//   const getJobById = (id: string) => {
//     return jobs?.find((job) => job.id == id);
//   };

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const rowSelection: TableRowSelection<Task> = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };

//   const handleCreateRoute = async () => {
//     console.log("Create Route button clicked");
//     console.log("Selected row keys:", selectedRowKeys);

//     if (selectedRowKeys.length === 0) {
//       console.log("No jobs selected, showing warning");
//       messageApi.warning("Please select at least one job to create a route");
//       return;
//     }
//     if (selectedRowKeys.length > 0) {
//       setOpen(true);
//     }
//     const selectedJobs = dataSource.filter((job) =>
//       selectedRowKeys.includes(job.key as React.Key)
//     );

//     console.log("selected jobs -> ", selectedJobs);

//     // Use original job data for validation
//     const jobsWithInvalidCoords = selectedJobs.filter((job) => {
//       const jobData = getJobById(job.id) || job;
//       const lat = jobData.lat ?? null;
//       const lng = jobData.lon ?? null;
//       console.log("job data -> ", jobData);

//       // Check if coordinates are valid
//       return (
//         lat === null ||
//         lng === null ||
//         isNaN(Number(lat)) ||
//         isNaN(Number(lng)) ||
//         Number(lat) < -90 ||
//         Number(lat) > 90 ||
//         Number(lng) < -180 ||
//         Number(lng) > 180
//       );
//     });

//     if (jobsWithInvalidCoords.length > 0) {
//       const jobIds = jobsWithInvalidCoords
//         .map((job) => `#${job.id}`)
//         .join(", ");
//       messageApi.error(
//         `Cannot create route: Jobs ${jobIds} have invalid or missing coordinates. Please check the address and try again.`
//       );
//       return;
//     }

//     // Convert selected tasks to optimization jobs format
//     const optimizationJobs: OptimizationJob[] = selectedJobs.map((job) => {
//       const jobData = getJobById(job.id) || job;

//       return {
//         id: job.id,
//         location: {
//           lat: jobData.lat || 0,
//           lng: jobData.lon || 0,
//         },
//         duration: jobData.duration_minutes
//           ? jobData.duration_minutes * 60
//           : 1800, // Convert minutes to seconds if available
//         priority:
//           jobData.priority_level === "high"
//             ? 10
//             : jobData.priority_level === "medium"
//             ? 5
//             : 1,
//       };
//     });

//     try {
//       setIsOptimizing(true);
//       const result = await optimizeRoutes(optimizationJobs);
//       setOptimizationResult(result);
//       messageApi.success("Route optimized successfully!");
//     } catch (error) {
//       console.error("Error optimizing route:", error);
//       messageApi.error(
//         "Failed to optimize route. Please ensure all jobs have valid addresses and try again."
//       );
//     } finally {
//       setIsOptimizing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full shadow overflow-hidden h-full bg-white">
//       {contextHolder}
//       <div className="flex items-center justify-between flex-shrink-0 pb-2">
//         <h4 className="text-md tracking-tight">Jobs</h4>
//         <div className="flex space-x-4 gap-x-4">
//           <div className="flex gap-10">
//             <Input
//               type="text"
//               suffix={
//                 <SearchOutlined
//                   style={{ fontSize: "16px" }}
//                   className="text-gray-400"
//                 />
//               }
//               placeholder={"search"}
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//           <div className="cursor-pointer text-sm flex items-center gap-1">
//             <DeleteOutlined />
//             <div>Delete</div>
//           </div>
//           <div className="cursor-pointer text-sm flex items-center gap-1">
//             <FilterOutlined />
//             <div>Filters</div>
//           </div>
//           <div className="cursor-pointer text-sm flex items-center gap-1">
//             <FileSearchOutlined />
//             <div>Verify</div>
//           </div>
//           <Button>
//             <UploadOutlined />
//             Export
//           </Button>
//           <Button
//             type={selectedRowKeys.length > 0 ? "primary" : "default"}
//             onClick={() => setOpen(true)}
//             disabled={selectedRowKeys.length === 0 || isOptimizing}
//             icon={
//               isOptimizing ? (
//                 <LoadingOutlined />
//               ) : (
//                 <svg
//                   className="w-4 h-7"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               )
//             }
//           >
//             {isOptimizing ? `Optimizing...` : "Create New Route"}
//           </Button>
//         </div>
//         {open ? (
//           <CreateRouteModalForm
//             open={open}
//             onCancel={() => setOpen(false)}
//             onSubmit={handleCreateRoute}
//           />
//         ) : (
//           ""
//         )}
//       </div>
//       {/* Only the table is scrollable */}
//       <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
//         <div
//           className="h-full overflow-y-auto custom-scrollbar"
//           style={{ minWidth: "max-content" }}
//         >
//           <Table
//             rowSelection={rowSelection}
//             scroll={undefined}
//             pagination={false}
//             columns={columns}
//             dataSource={filteredData}
//             rowKey={(record) => record.id || record.key}
//             size="small"
//             tableLayout="auto"
//             className="min-w-full"
//           />
//         </div>
//       </div>
//       <div className="w-full flex-shrink-0 pt-1">
//         <Button className="w-full" type="primary">
//           Add More Stops
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TasksTable;


import { useState } from "react";
import { Button, message, Table, Input, Drawer, Checkbox, Switch, Dropdown, Modal } from "antd";
import type { TableProps, TableColumnType } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  FilterOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  UploadOutlined,
  LoadingOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
  DragOutlined,
  EyeOutlined,
  SaveOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];
type ColumnsType<T> = TableColumnType<T>[];

interface Task {
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
  from: string | null;
  to: string | null;
  customerPreferences: string;
  notes: string;
  singleRecurring: string;
  ratings: number;
  team: string[];
  files: string;
  paid: string;
}

interface TasksTableProps {
  dataSource: Task[];
}

interface ColumnConfig {
  key: string;
  title: string;
  visible: boolean;
  order: number;
  width?: number;
}

interface ColumnPreset {
  id: string;
  name: string;
  columns: ColumnConfig[];
}

// Sample data for demo
const sampleData: Task[] = [
  {
    key: "1",
    id: "JOB001",
    priority: "High",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St, City, State",
    status: "Pending",
    businessName: "ABC Corp",
    status2: "Unassigned",
    phone: "(555) 123-4567",
    serviceDuration: "2 hours",
    from: "09:00",
    to: "11:00",
    customerPreferences: "Morning service preferred",
    notes: "Customer notes here",
    singleRecurring: "Single",
    ratings: 4,
    team: ["user1", "user2"],
    files: "",
    paid: "Paid"
  },
  {
    key: "2",
    id: "JOB002",
    priority: "Medium",
    firstName: "Jane",
    lastName: "Smith",
    address: "456 Oak Ave, City, State",
    status: "In Progress",
    businessName: "XYZ Inc",
    status2: "Assigned",
    phone: "(555) 987-6543",
    serviceDuration: "1.5 hours",
    from: "14:00",
    to: "15:30",
    customerPreferences: "Afternoon preferred",
    notes: "Follow up required",
    singleRecurring: "Recurring",
    ratings: 5,
    team: ["user3"],
    files: "",
    paid: "Unpaid"
  }
];

// Component for editable column title
const EditableColumnTitle = ({
  title,
  onSave,
}: {
  title: string;
  onSave: (newTitle: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleSave = () => {
    if (editValue.trim() && editValue !== title) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyPress}
          size="small"
          className="min-w-[80px]"
          autoFocus
        />
        <CheckOutlined
          className="cursor-pointer text-green-600 hover:text-green-700"
          onClick={handleSave}
        />
        <CloseOutlined
          className="cursor-pointer text-red-600 hover:text-red-700"
          onClick={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 group">
      <span>{title}</span>
      <EditOutlined
        className="cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

// Column Configuration Component
const ColumnConfigPanel = ({
  columns,
  onUpdate,
  onSavePreset,
  presets,
  onLoadPreset,
  onDeletePreset,
}: {
  columns: ColumnConfig[];
  onUpdate: (columns: ColumnConfig[]) => void;
  onSavePreset: (name: string, columns: ColumnConfig[]) => void;
  presets: ColumnPreset[];
  onLoadPreset: (preset: ColumnPreset) => void;
  onDeletePreset: (presetId: string) => void;
}) => {
  const [draggedItem, setDraggedItem] = useState<ColumnConfig | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleDragStart = (e: React.DragEvent, column: ColumnConfig) => {
    setDraggedItem(column);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumn: ColumnConfig) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.key === targetColumn.key) return;

    const newColumns = [...columns];
    const draggedIndex = newColumns.findIndex(col => col.key === draggedItem.key);
    const targetIndex = newColumns.findIndex(col => col.key === targetColumn.key);

    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedItem);

    // Update order values
    newColumns.forEach((col, index) => {
      col.order = index;
    });

    onUpdate(newColumns);
    setDraggedItem(null);
  };

  const toggleVisibility = (columnKey: string) => {
    const newColumns = columns.map(col =>
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    onUpdate(newColumns);
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), columns);
      setPresetName("");
      setShowSaveModal(false);
    }
  };

  const presetMenuItems = presets.map(preset => ({
    key: preset.id,
    label: (
      <div className="flex items-center justify-between">
        <span onClick={() => onLoadPreset(preset)}>{preset.name}</span>
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onDeletePreset(preset.id);
          }}
        />
      </div>
    ),
  }));

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Customize Columns</h3>
        <div className="flex gap-2">
          <Dropdown
            menu={{
              items: presetMenuItems,
            }}
            trigger={['click']}
            disabled={presets.length === 0}
          >
            <Button icon={<AppstoreOutlined />}>
              Load Preset
            </Button>
          </Dropdown>
          <Button
            icon={<SaveOutlined />}
            onClick={() => setShowSaveModal(true)}
          >
            Save Preset
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Switch
            checked={columns.every(col => col.visible)}
            onChange={(checked) => {
              const newColumns = columns.map(col => ({ ...col, visible: checked }));
              onUpdate(newColumns);
            }}
          />
          <span className="text-sm font-medium">Show All Columns</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600 mb-2">
          Drag to reorder • Click eye to show/hide
        </div>
        {columns
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <div
              key={column.key}
              className={`flex items-center gap-3 p-2 rounded border ${
                column.visible ? 'bg-white' : 'bg-gray-50'
              } cursor-move hover:shadow-sm`}
              draggable
              onDragStart={(e) => handleDragStart(e, column)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
            >
              <DragOutlined className="text-gray-400" />
              <Checkbox
                checked={column.visible}
                onChange={() => toggleVisibility(column.key)}
              />
              <EyeOutlined
                className={`cursor-pointer ${
                  column.visible ? 'text-blue-500' : 'text-gray-400'
                }`}
                onClick={() => toggleVisibility(column.key)}
              />
              <span className={`flex-1 ${!column.visible ? 'text-gray-400' : ''}`}>
                {column.title}
              </span>
            </div>
          ))}
      </div>

      <Modal
        title="Save Column Preset"
        open={showSaveModal}
        onOk={handleSavePreset}
        onCancel={() => {
          setShowSaveModal(false);
          setPresetName("");
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="py-4">
          <Input
            placeholder="Enter preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onPressEnter={handleSavePreset}
          />
        </div>
      </Modal>
    </div>
  );
};

const TasksTable = ({ dataSource = sampleData }: TasksTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [columnDrawerOpen, setColumnDrawerOpen] = useState(false);

  // Initialize column configurations
  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig[]>([
    { key: "id", title: "Job ID", visible: true, order: 0 },
    { key: "priority", title: "Priority", visible: true, order: 1 },
    { key: "firstName", title: "First Name", visible: true, order: 2 },
    { key: "lastName", title: "Last Name", visible: true, order: 3 },
    { key: "address", title: "Address", visible: true, order: 4 },
    { key: "status", title: "Status", visible: true, order: 5 },
    { key: "businessName", title: "Business Name", visible: false, order: 6 },
    { key: "status2", title: "Assignment", visible: true, order: 7 },
    { key: "phone", title: "Phone", visible: false, order: 8 },
    { key: "serviceDuration", title: "Service Duration", visible: true, order: 9 },
    { key: "from", title: "From", visible: true, order: 10 },
    { key: "to", title: "To", visible: true, order: 11 },
    { key: "customerPreferences", title: "Customer Preferences", visible: false, order: 12 },
    { key: "notes", title: "Notes", visible: false, order: 13 },
    { key: "singleRecurring", title: "Type", visible: true, order: 14 },
    { key: "ratings", title: "Ratings", visible: true, order: 15 },
    { key: "team", title: "Team", visible: true, order: 16 },
    { key: "files", title: "Files", visible: false, order: 17 },
    { key: "paid", title: "Payment", visible: true, order: 18 },
  ]);

  const [presets, setPresets] = useState<ColumnPreset[]>([
    {
      id: "default",
      name: "Default View",
      columns: columnConfigs,
    },
  ]);

  // Function to update column title
  const updateColumnTitle = (key: string, newTitle: string) => {
    setColumnConfigs(prev => 
      prev.map(col => 
        col.key === key ? { ...col, title: newTitle } : col
      )
    );
    messageApi.success(`Column title updated to "${newTitle}"`);
  };

  // Create columns based on configuration
  const createColumns = (): ColumnsType<Task> => {
    const baseColumns: ColumnsType<Task> = [
      {
        title: "",
        key: "drag",
        align: "center",
        width: 40,
        render: () => <MoreOutlined className="text-[20px] cursor-pointer" />,
      },
    ];

    const configuredColumns = columnConfigs
      .filter(config => config.visible)
      .sort((a, b) => a.order - b.order)
      .map(config => {
        const baseColumn: TableColumnType<Task> = {
          title: (
            <EditableColumnTitle
              title={config.title}
              onSave={(newTitle) => updateColumnTitle(config.key, newTitle)}
            />
          ),
          dataIndex: config.key,
          key: config.key,
          align: "center" as const,
          width: config.width,
        };

        // Add specific renderers based on column type
        switch (config.key) {
          case "priority":
            return {
              ...baseColumn,
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
            };
          case "status":
            return {
              ...baseColumn,
              render: () => (
                <div className="flex justify-center">
                  <Button type="link" size="small">
                    Map View
                  </Button>
                </div>
              ),
            };
          case "status2":
            return {
              ...baseColumn,
              render: () => (
                <div className="flex justify-center">
                  <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 font-semibold px-3 py-1 h-7">
                    Unassigned
                  </div>
                </div>
              ),
            };
          case "singleRecurring":
            return {
              ...baseColumn,
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
            };
          case "ratings":
            return {
              ...baseColumn,
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
            };
          case "team":
            return {
              ...baseColumn,
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
            };
          case "files":
            return {
              ...baseColumn,
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
            };
          case "paid":
            return {
              ...baseColumn,
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
            };
          default:
            return {
              ...baseColumn,
              ellipsis: true,
              render: (text: string) => (
                <div className="text-center px-2" title={text}>
                  {text}
                </div>
              ),
            };
        }
      });

    return [...baseColumns, ...configuredColumns];
  };

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Task> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCreateRoute = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning("Please select at least one job to create a route");
      return;
    }
    
    setIsOptimizing(true);
    // Simulate API call
    setTimeout(() => {
      messageApi.success("Route created successfully!");
      setIsOptimizing(false);
    }, 2000);
  };

  const handleSavePreset = (name: string, columns: ColumnConfig[]) => {
    const newPreset: ColumnPreset = {
      id: Date.now().toString(),
      name,
      columns: [...columns],
    };
    setPresets(prev => [...prev, newPreset]);
    messageApi.success(`Preset "${name}" saved successfully!`);
  };

  const handleLoadPreset = (preset: ColumnPreset) => {
    setColumnConfigs([...preset.columns]);
    messageApi.success(`Preset "${preset.name}" loaded successfully!`);
  };

  const handleDeletePreset = (presetId: string) => {
    setPresets(prev => prev.filter(p => p.id !== presetId));
    messageApi.success("Preset deleted successfully!");
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
              placeholder="Search"
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
          <Button
            icon={<SettingOutlined />}
            onClick={() => setColumnDrawerOpen(true)}
          >
            Customize Columns
          </Button>
          <Button>
            <UploadOutlined />
            Export
          </Button>
          <Button
            type={selectedRowKeys.length > 0 ? "primary" : "default"}
            onClick={handleCreateRoute}
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
            {isOptimizing ? "Optimizing..." : "Create New Route"}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden">
        <div
          className="h-full overflow-y-auto"
          style={{ minWidth: "max-content" }}
        >
          <Table
            rowSelection={rowSelection}
            scroll={undefined}
            pagination={false}
            columns={createColumns()}
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

      <Drawer
        title="Customize Table Columns"
        placement="right"
        onClose={() => setColumnDrawerOpen(false)}
        open={columnDrawerOpen}
        width={400}
      >
        <ColumnConfigPanel
          columns={columnConfigs}
          onUpdate={setColumnConfigs}
          onSavePreset={handleSavePreset}
          presets={presets}
          onLoadPreset={handleLoadPreset}
          onDeletePreset={handleDeletePreset}
        />
      </Drawer>
    </div>
  );
};

export default TasksTable;