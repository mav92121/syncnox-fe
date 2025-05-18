import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  priority: "Low" | "Medium" | "Urgent";
  firstName: string;
  lastName: string;
  address: string;
}

const TasksTable = () => {
  const [tasks] = useState<Task[]>([
    {
      id: "ORD839501",
      priority: "Low",
      firstName: "Jack",
      lastName: "Reacher",
      address: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    },
    {
      id: "TASK01202",
      priority: "Medium",
      firstName: "Sofia",
      lastName: "Khan",
      address: "1 Infinite Loop, Cupertino, CA 95014",
    },
    {
      id: "TASK01202",
      priority: "Urgent",
      firstName: "Adonis",
      lastName: "Kerlut",
      address: "450 Serra Mall, Stanford, CA 94305",
    },
    {
      id: "ORD493827",
      priority: "Urgent",
      firstName: "Mover",
      lastName: "Grimr",
      address: "901 W Olympic Blvd, Los Angeles, CA 90015",
    },
  ]);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium">Tasks/Orders</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-1.5 rounded-none border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#003220]"
            />
            <svg
              className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400"
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
          <Button
            className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-none text-sm text-gray-700 hover:bg-gray-50"
            variant="outline"
          >
            <svg
              className="w-4 h-4 mr-1"
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
          </Button>
          <Button
            className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-none text-sm text-gray-700 hover:bg-gray-50"
            variant="outline"
          >
            <svg
              className="w-4 h-4 mr-1"
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
          </Button>
          <Button
            className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-none text-sm text-gray-700 hover:bg-gray-50"
            variant="outline"
          >
            <svg
              className="w-4 h-4 mr-1"
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
        </div>
      </div>

      {/* Table with scroll container */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="min-w-full">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              <th className="w-10 py-3 text-left">
                <Checkbox className="h-4 w-4 rounded-none border-gray-300" />
              </th>
              <th className="w-8 py-3"></th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Task / Order ID
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Priority
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  First Name
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Last Name
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Address
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 pl-4">
                  <Checkbox className="h-4 w-4 rounded-none border-gray-300" />
                </td>
                <td className="py-3">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zm0 2h14v14H5V5z" />
                    </svg>
                    {task.id}
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs ${
                      task.priority === "Low"
                        ? "bg-yellow-100 text-yellow-800"
                        : task.priority === "Medium"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3">{task.firstName}</td>
                <td className="py-3">{task.lastName}</td>
                <td className="py-3 truncate max-w-xs" title={task.address}>
                  {task.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add More Stops Button */}
      <div className="mt-4">
        <Button className="w-full py-3 bg-[#003220] hover:bg-[#004c30] text-white text-sm font-medium rounded-none">
          Add More Stops
        </Button>
      </div>
    </div>
  );
};

export default TasksTable;
