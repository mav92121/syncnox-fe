import React, { useState } from "react";
import { Table, Tag, Avatar, Progress, Button, Rate, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface RouteData {
  key: string;
  type: "Single" | "Recurring";
  routeId: string;
  team: string[];
  vehicles: string;
  distance: string;
  time: string;
  trips: number;
  progress: number;
  stops: number;
  completed: number;
  failed: number;
  attempted: number;
  status: string;
  rating: number;
}

const data: RouteData[] = [
  {
    key: "1",
    type: "Single",
    routeId: "NewYork 12/09/19",
    team: ["👩‍💼", "👩‍💼", "👩‍💼"],
    vehicles: "VKNBP2345 / CVGGT",
    distance: "25.34mi",
    time: "23hr 23m",
    trips: 2,
    progress: 41,
    stops: 78,
    completed: 78,
    failed: 25,
    attempted: 25,
    status: "In Transit",
    rating: 3,
  },
  {
    key: "2",
    type: "Recurring",
    routeId: "FTL8234",
    team: ["👩‍💼", "👩‍💼"],
    vehicles: "VKNBP2345 / CVGGT",
    distance: "120.80mi",
    time: "3hr 45m",
    trips: 4,
    progress: 41,
    stops: 31,
    completed: 31,
    failed: 12,
    attempted: 42,
    status: "Delayed",
    rating: 0,
  },
];

const Routes: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const columns: ColumnsType<RouteData> = [
    {
      title: "Single/Recurring",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type: RouteData["type"]) => (
        <div className="flex justify-center">
          <span
            className={`inline-block min-w-[70px] text-center py-1 px-2 text-xs font-semibold ${
              type === "Single"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-blue-100 text-blue-700 border border-blue-200"
            }`}
          >
            {type}
          </span>
        </div>
      ),
    },
    {
      title: "Route ID",
      dataIndex: "routeId",
      key: "routeId",
      align: "center",
      ellipsis: true,
      render: (text: string) => (
        <div className="text-center px-2" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Map View",
      key: "mapView",
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
      title: "Assigned Team",
      dataIndex: "team",
      key: "team",
      align: "center",
      render: (team: string[]) => (
        <div className="flex justify-center">
          <Avatar.Group>
            {team.map((member: string, index: number) => (
              <Avatar key={index}>{member}</Avatar>
            ))}
          </Avatar.Group>
        </div>
      ),
    },
    {
      title: "Assigned Vehicles",
      dataIndex: "vehicles",
      key: "vehicles",
      align: "center",
      ellipsis: true,
      render: (text: string) => (
        <div className="text-center px-2" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Total Distance",
      dataIndex: "distance",
      key: "distance",
      align: "center",
      className: "whitespace-nowrap",
    },
    {
      title: "Total Estimated Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      className: "whitespace-nowrap",
    },
    {
      title: "Trips",
      dataIndex: "trips",
      key: "trips",
      align: "center",
      className: "whitespace-nowrap",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      align: "center",
      render: (val: number) => (
        <div className="grid grid-cols   items-center">
          <Progress percent={val} size="small" />
          <span className="text-xs text-gray-400">Route Completed</span>
        </div>
      ),
    },
    {
      title: "Total Stops",
      dataIndex: "stops",
      key: "stops",
      align: "center",
      className: "whitespace-nowrap",
    },
    {
      title: "Completed Stops",
      dataIndex: "completed",
      key: "completed",
      align: "center",
      className: "whitespace-nowrap",
      render: (val: number) => (
        <span className="text-green-600 font-semibold">{val}</span>
      ),
    },
    {
      title: "Failed Stops",
      dataIndex: "failed",
      key: "failed",
      align: "center",
      className: "whitespace-nowrap",
      render: (val: number) => (
        <span className="text-red-500 font-semibold">{val}</span>
      ),
    },
    {
      title: "Attempted Stops",
      dataIndex: "attempted",
      key: "attempted",
      align: "center",
      className: "whitespace-nowrap",
      render: (val: number) => (
        <span className="text-blue-600 font-semibold">{val}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          "In Transit": "orange",
          Delayed: "red",
          Scheduled: "blue",
          Completed: "green",
        };
        return (
          <Tag color={colorMap[status] || "gray"} className="px-3 py-1">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Ratings",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      render: (rating: number) => (
        <div className="flex justify-center">
          {rating > 0 ? (
            <Rate
              disabled
              defaultValue={rating}
              className="whitespace-nowrap"
              style={{ lineHeight: "1" }}
            />
          ) : (
            <Tag className="bg-gray-100">N/A</Tag>
          )}
        </div>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) =>
        val && val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-x-2 ml-3">
          <img src="/Group 326.svg" alt="Route Icon" className="h-6 w-6" />
          <h2 className="text-gray-500 font-medium">Recent Routes</h2>
        </div>
        <Input
          placeholder="Search routes..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="!w-72 !text-sm !border-gray-300"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
        size="small"
        tableLayout="auto"
        className="min-w-full"
      />
    </div>
  );
};

export default Routes;