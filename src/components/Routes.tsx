import React from "react";
import { Table, Tag, Avatar, Progress, Button, Rate } from "antd";
import type { ColumnsType } from "antd/es/table";

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
  const columns: ColumnsType<RouteData> = [
    {
      title: "Single/Recurring",
      dataIndex: "type",
      align:"center",
      render: (type: string) => (
        <div className="flex justify-center">
          <span
          className={`inline-block min-w-[70px] text-center px-3 py-1 text-xs font-semibold ${
            type === "Single"
              ? "bg-green-100 border border-green-200"
              : type === "Recurring"
              ? "bg-blue-100  border "
              : "bg-red-100 text-red-800 border border-red-200"
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
      align:"center",
    },
    {
      title: "Map View",
      align:"center",
      render: () => (
        <div className="bg-blue-100">
          <Button type="link" size="small">Map View</Button>
        </div>
      ),
    },
    {
      title: "Assigned Team",
      dataIndex: "team",
      align:"center",
      render: (team: any) => (
        <Avatar.Group>
          {team.map((member: any, i: any) => (
            <Avatar key={i}>{member}</Avatar>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Assigned Vehicles",
      dataIndex: "vehicles",
      align:"center",
    },
    {
      title: "Total Distance",
      dataIndex: "distance",
      align:"center",
    },
    {
      title: "Total Estimated Time",
      dataIndex: "time",
      align:"center",
    },
    {
      title: "Trips",
      dataIndex: "trips",
      align:"center",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      align:"center",
      render: (val) => (
        <div className="grid">
          <Progress percent={val} size="small" />
          <span className="text-xs text-gray-400">Route Completed</span>
        </div>
      ),
    },
    {
      title: "Total Stops",
      dataIndex: "stops",
      align:"center",
    },
    {
      title: "Completed Stops",
      dataIndex: "completed",
      align:"center",
      render: (val) => (
        <span className="text-green-600 font-semibold">{val}</span>
      ),
    },
    {
      title: "Failed Stops",
      dataIndex: "failed",
      align:"center",
      render: (val) => (
        <span className="text-red-500 font-semibold">{val}</span>
      ),
    },
    {
      title: "Attempted Stops",
      dataIndex: "attempted",
      align:"center",
      render: (val) => (
        <span className="text-blue-600 font-semibold">{val}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align:"center",
      render: (status) => {
        const colorMap: any = {
          "In Transit": "orange",
          Delayed: "red",
          Scheduled: "blue",
          Completed: "green",
        };
        return (
          <div className="lfex justify-center">
            <Tag
              color={colorMap[status] || "gray"}
              style={{ fontSize: "17px", padding: "7px 14px" }}
            >
              {status}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Ratings",
      dataIndex: "rating",
      render: (stars) =>
        stars > 0 ? <Rate disabled defaultValue={stars} /> : <Tag>★</Tag>,
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default Routes;
