import { useState } from "react";
import {
  Calendar,
  Search,
  FileText,
  Plus,
  Clock,
  Filter,
  Phone,
  Edit,
  Home,
  Undo2,
  Redo2,
  CloudDownload,
  ClipboardList,
  ClockFading,
  ListFilter,
} from "lucide-react";
import {
  CloudDownloadOutlined,
  FieldTimeOutlined,
  MoreOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  WifiOutlined,
} from "@ant-design/icons";

const RouteDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("02/08/2025");
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

  const drivers = [
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

  const getTimePosition = (time: any) => {
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

  const renderTimelineBar = (driver: any) => {
    const startPos = getTimePosition(driver.timeline[0].time);
    const endPos = getTimePosition(
      driver.timeline[driver.timeline.length - 1].time
    );

    return (
      <div className="relative h-8 mt-2">
        {/* Timeline bar */}
        <div
          className={`absolute top-0 h-8 rounded ${
            driver.color === "blue" ? "bg-blue-500" : "bg-green-500"
          }`}
          style={{
            left: `${startPos}%`,
            width: `${endPos - startPos}%`,
          }}
        />

        {/* Timeline stops */}
        {driver.timeline.map((item: any, index: any) => (
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
                } rounded flex items-center justify-center`}
              >
                <Home className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div
                className={`w-8 h-8 border-2 ${
                  driver.color === "blue"
                    ? "border-blue-500 bg-blue-100 text-blue-600"
                    : "border-green-500 bg-green-100 text-green-600"
                } rounded flex items-center justify-center text-sm font-medium`}
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
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
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
          <div className="flex items-center space-x-6">
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "Timeline"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("Timeline")}
            >
              Timeline
            </button>
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "Route"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("Route")}
            >
              Route
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex items-center px-3 py-1.5 border border-gray-300 w-100 bg-white ">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>

            {/* Manifest & Export */}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-black px-2 py-1">
              <ClipboardList className="w-6 h-6" />
              <span className="text-md">Manifest</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-black px-2 py-1">
              {/* <Upload  /> */}
              <CloudDownload className="w-6 h-6" />
              <span className="text-md">Export</span>
            </button>

            {/* Share URL */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-900 text-white  hover:bg-green-800">
              <WifiOutlined className="w-4 h-4" />
              <span className="text-sm font-medium">Share URL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex px-6 py-2 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-800 text-white hover:bg-green-700">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add New Driver</span>
          </button>

          <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
            <Undo2 className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
            <Redo2 className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded">
            <ClockFading className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-black">
              <ListFilter className="w-5 h-5" />
              <span>Filter</span>
            </button>

            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-black">
              <ListFilter className="w-5 h-5" />
              <span>30 Mins</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="flex bg-white border-b text-xs text-gray-500">
        <div className="w-130 px-6 py-4 border-r bg-white"></div>
        <div className="flex-1 px-4 py-2 grid grid-cols-17 gap-2">
          {timeSlots.map((time, index) => (
            <div key={index} className="text-center w-17">
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Driver Rows */}
      <div className="bg-white">
        {drivers.map((driver, index) => (
          <div key={index} className="flex border-b hover:bg-gray-50">
            <div className="w-130 px-4 py-2 border-r relative">
              <div
                className={`absolute top-0 right-0 h-full w-2 ${
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
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-800">
                      {driver.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-600 hover:text-gray-600 rounded ">
                        <WifiOutlined className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-black-400 hover:text-gray-600 rounded font-bold">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-black-400 hover:text-gray-600 rounded font-bold">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-black-400 hover:text-gray-600 rounded font-bold">
                        <MoreOutlined className="w-4 h-4" />
                      </button>
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
