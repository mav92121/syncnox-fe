import { useState } from "react";
import {
  Calendar,
  Search,
  Plus,
  Home,
  Undo2,
  Redo2,
  CloudDownload,
  ClipboardList,
  ClockFading,
  ListFilter,
  MousePointer2,
  History,
} from "lucide-react";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import type { DriverInterface, TimelineItem } from "../types";
import { Button, Input, Tabs } from "antd";

const RouteDashboard = () => {
  // const [selectedDate, setSelectedDate] = useState("02/08/2025");
  const selectedDate = "02/08/2025";
  const [activeTab, setActiveTab] = useState("Timeline");

  const timeSlots = [
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
  ];

  const drivers: DriverInterface[] = [
    {
      id: 1,
      name: "Courtney Henry",
      avatar: "https://avatar.iran.liara.run/public/6",
      driverNumber: "Driver 1",
      zone: "Zone 1",
      shiftTime: "12PM - 3PM",
      vehicle: "TXQ2SXX223",
      totalStops: "26 Stops",
      distance: "100.74mi",
      duration: "23Hrs36Mins",
      color: "blue",
      timeline: [
        { stop: "home", time: "05:00", icon: "home" },
        { stop: 1, time: "06:30" },
        { stop: 2, time: "07:00" },
        { stop: 3, time: "07:30" },
        { stop: 4, time: "08:00" },
        { stop: 5, time: "10:30" },
        { stop: 6, time: "11:00" },
        { stop: 7, time: "11:30" },
      ],
    },
    {
      id: 2,
      name: "Courtney Henry",
      avatar: "https://avatar.iran.liara.run/public/6",
      driverNumber: "Driver 1",
      zone: "Zone 1",
      shiftTime: "12PM - 3PM",
      vehicle: "TXQ2SXX223",
      totalStops: "26 Stops",
      distance: "100.74mi",
      duration: "23Hrs36Mins",
      color: "green",
      timeline: [
        { stop: "home", time: "07:00", icon: "home" },
        { stop: 1, time: "08:00" },
        { stop: 2, time: "08:30" },
        { stop: 3, time: "09:00" },
        { stop: 4, time: "09:30" },
        { stop: 5, time: "10:30" },
      ],
    },
  ];

  const getTimePosition = (time: string) => {
    // Safety check for time parameter
    if (!time || typeof time !== "string") {
      return 0;
    }

    const [hours, minutes] = time.split(":").map(Number);

    // Validate hours and minutes
    if (isNaN(hours) || isNaN(minutes)) {
      return 0;
    }

    const totalMinutes = hours * 60 + minutes;
    const startTime = 4 * 60; // 04:00
    const endTime = 12 * 60; // 12:00

    // Ensure the position is within bounds
    const position = ((totalMinutes - startTime) / (endTime - startTime)) * 100;
    return Math.max(0, Math.min(100, position));
  };

  const renderTimelineBar = (driver: DriverInterface) => {
    const startPos = getTimePosition(driver.timeline[0].time);
    const endPos = getTimePosition(
      driver.timeline[driver.timeline.length - 1].time
    );

    return (
      <div className="relative h-8 mt-2">
        {/* Timeline bar */}
        <div
          className={`absolute top-3 h-1 rounded ${
            driver.color === "blue" ? "bg-blue-500" : "bg-green-500"
          }`}
          style={{
            left: `${startPos}%`,
            width: `${endPos - startPos}%`,
          }}
        />

        {/* Timeline stops */}
        {driver.timeline.map((item: TimelineItem, index: number) => (
          <div
            key={index}
            className="absolute top-0 h-8 flex items-center justify-center"
            style={{
              left: `${getTimePosition(item.time)}%`,
              transform: "translateX(-50%)",
            }}
          >
            {item.icon === "home" ? (
              <div
                className={`w-8 h-8 ${
                  driver.color === "blue" ? "bg-blue-500" : "bg-green-500"
                } flex items-center justify-center`}
              >
                <Home className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div
                className={`w-8 h-8 border-2 ${
                  driver.color === "blue"
                    ? "border-blue-500 bg-blue-100 text-blue-600"
                    : "border-green-500 bg-green-100 text-green-600"
                } flex items-center justify-center text-sm font-medium`}
              >
                {item.stop}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-4">
            <span className="text-xl text-gray-800">Route1201</span>
            <span className="px-2 py-1 bg-blue-60 text-blue-700 text-sm ml-0.1">
              NewYork
            </span>
          </div>
          <div className="flex items-center space-x-2 border border-gray-800 px-3 py-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">{selectedDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-20">
          <div className="flex items-center ml-10">
            <Tabs
              defaultActiveKey="1"
              items={[
                { label: "Timeline", key: "1" },
                { label: "Route", key: "2" },
              ]}
              onChange={(key) => setActiveTab(key)}
            />
          </div>

          <div className="flex items-center space-x-2">
            {/* Search */}
              <Input
                type="text"
                suffix={
                  <SearchOutlined
                    style={{ fontSize: "16px" }}
                    className="text-gray-400"
                  />
                }
                className="pl-9"
                placeholder="Search"
              />

            {/* Manifest & Export */}
              <Button type="text">
                <ClipboardList />
                Menifest
              </Button>
              <Button type="text">
                <CloudDownload />
                Export
              </Button>

              {/* Share URL */}
              <Button type="primary" className="mt-1">
                <img src="/Icon.svg" alt="" />
                Share URL
              </Button>
              {/* Share to App */}
              <Button type="primary" className="mt-1">
                <MousePointer2 />
                Share to App
              </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex py-2">
        <div className="flex items-center">
          <Button type="primary">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Add New Driver</span>
          </Button>

          <Button type="text" className="ml-1">
            <Undo2 className="w-5 h-5" />
          </Button>
          <Button type="text">
            <Redo2 className="w-5 h-5" />
          </Button>
          <Button type="text">
            <History className="w-5 h-5" />
          </Button>

          <div className="flex items-center">
            <Button type="text">
              <ListFilter className="w-5 h-5" />
              <span>Filter</span>
            </Button>

            <Button type="text">
              <ListFilter className="w-5 h-5" />
              <span>30 Mins</span>
            </Button>
          </div>
          <div className="flex bg-white text-xs text-gray-500">
            <div className="flex-1 px-4 py-2 grid grid-cols-17 gap-2">
              {timeSlots.map((time, index) => (
                <div key={index} className="text-center w-17">
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Driver Rows */}
      <div className="bg-white">
        {drivers.map((driver, index) => (
          <div key={index} className="flex">
            <div className="w-134 px-4 py-2 border-r relative">
              <div
                className={`absolute top-2 right-0 h-28 w-2 ${
                  driver.color === "blue" ? "bg-blue-400" : "bg-green-500"
                }`}
              />
              <div className="flex items-center space-x-5">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-20">
                    <span className="font-medium text-gray-800">
                      {driver.name}
                    </span>
                    <div className="flex items-center">
                      <Button type="text">
                        <img src="/Vector.svg" />
                      </Button>
                      <Button type="text">
                        <img src="/Chat_plus.svg" />
                      </Button>
                      <Button type="text">
                        <img src="/Phone_duotone.svg" />
                      </Button>
                      <Button type="text">
                        <MoreOutlined />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                      {driver.driverNumber}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                      {driver.zone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-cols-2 gap-4 text-xs text-gray-600">
                <div>
                  <div>Shift Time</div>
                  <div className="text-[11px] font-normal text-gray-800">
                    {driver.shiftTime}
                  </div>
                </div>
                <div>
                  <div>Vehicle</div>
                  <div className=" text-gray-800">{driver.vehicle}</div>
                </div>
                <div>
                  <div>Total Stops</div>
                  <div className=" text-gray-800">{driver.totalStops}</div>
                </div>
                <div>
                  <div>Distance</div>
                  <div className=" text-gray-800">{driver.distance}</div>
                </div>
                <div>
                  <div className="">Duration</div>
                  <div className="text-gray-800">{driver.duration}</div>
                </div>
              </div>
            </div>

            <div className="flex-1 px-6 py-4 relative">
              {/* Time grid background */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 17 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-r border-gray-100`}
                  ></div>
                ))}
              </div>

              {/* Timeline visualization */}
              {renderTimelineBar(driver)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDashboard;
