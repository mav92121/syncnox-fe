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
} from "lucide-react";
import { MoreOutlined } from "@ant-design/icons";

const RouteDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("02/08/2025");
  const [activeTab, setActiveTab] = useState("Timeline");
  console.log(setSelectedDate);
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
      avatar: "/Image 1.jpg",
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

  const renderTimelineBar = (driver: any) => {
    const startPos = getTimePosition(driver.timeline[0].time);
    const endPos = getTimePosition(
      driver.timeline[driver.timeline.length - 1].time
    );

    return (
      <div className="relative h-8 mt-2">
        {/* Timeline bar */}
        <div
          className={`relative top-3 h-1 ${
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
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2">
            <span className="text-xl text-gray-800">Route1201</span>
            <span className="py-1 px-1.5 text-blue-700 text-sm  bg-blue-50">NewYork</span>
          </div>
          <div className="flex items-center space-x-2 border border-gray-800 px-3 py-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">{selectedDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-9">
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "Timeline"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("Timeline")}
            >
              Timeline
            </button>
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "Route"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("Route")}
            >
              Route
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="flex items-center px-3 py-1.5 mr-10 border border-gray-300 w-100 bg-white ">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>

            {/* Manifest & Export */}
            <button className="flex items-center justify-between space-x-2 text-gray-600 hover:text-black px-2 py-1">
              <ClipboardList className="w-6 h-6" />
              <span className="text-md">Manifest</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-black px-2 py-1">
              <CloudDownload className="w-6 h-6" />
              <span className="text-md">Export</span>
            </button>

            {/* Share URL */}
            <button className="flex items-center ml-3 space-x-2 px-4 py-2 bg-green-950 text-white  hover:bg-green-800 ">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.27952 7.82299C8.69609 7.82299 8.22313 8.27923 8.22313 8.84204C8.22313 9.40484 8.69609 9.86109 9.27952 9.86109C9.86295 9.86109 10.3359 9.40484 10.3359 8.84204C10.3359 8.27923 9.86295 7.82299 9.27952 7.82299ZM6.95547 8.84204C6.95547 7.60386 7.99598 6.60013 9.27952 6.60013C10.5631 6.60013 11.6036 7.60386 11.6036 8.84204C11.6036 10.0802 10.5631 11.0839 9.27952 11.0839C7.99598 11.0839 6.95547 10.0802 6.95547 8.84204Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.27952 4.56203C8.402 4.56203 7.54418 4.81304 6.81455 5.28334C6.08492 5.75363 5.51624 6.42208 5.18043 7.20415C4.84461 7.98622 4.75675 8.84678 4.92794 9.67702C5.09914 10.5073 5.52171 11.2699 6.14221 11.8685C6.38974 12.1072 6.38974 12.4944 6.14221 12.7332C5.89468 12.9719 5.49336 12.9719 5.24583 12.7332C4.44805 11.9636 3.90475 10.983 3.68464 9.91559C3.46453 8.84814 3.5775 7.7417 4.00926 6.73618C4.44102 5.73066 5.17217 4.87123 6.11027 4.26657C7.04837 3.6619 8.15128 3.33917 9.27952 3.33917C10.4078 3.33917 11.5107 3.6619 12.4488 4.26657C13.3869 4.87123 14.118 5.73066 14.5498 6.73618C14.9816 7.7417 15.0945 8.84814 14.8744 9.91559C14.6543 10.983 14.111 11.9636 13.3132 12.7332C13.0657 12.9719 12.6644 12.9719 12.4168 12.7332C12.1693 12.4944 12.1693 12.1072 12.4168 11.8685C13.0373 11.2699 13.4599 10.5073 13.6311 9.67702C13.8023 8.84678 13.7144 7.98622 13.3786 7.20415C13.0428 6.42208 12.4741 5.75363 11.7445 5.28334C11.0149 4.81304 10.157 4.56203 9.27952 4.56203Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.27959 1.38302C7.75028 1.38302 6.25531 1.82048 4.98373 2.64009C3.71216 3.4597 2.72109 4.62464 2.13584 5.9876C1.5506 7.35056 1.39748 8.85032 1.69583 10.2972C1.99418 11.7441 2.73062 13.0732 3.812 14.1164C4.05953 14.3552 4.05953 14.7423 3.812 14.9811C3.56448 15.2199 3.16316 15.2199 2.91563 14.9811C1.65696 13.7669 0.799789 12.2199 0.452523 10.5358C0.105257 8.85168 0.283486 7.10604 0.964674 5.51963C1.64586 3.93322 2.79942 2.5773 4.27946 1.62332C5.7595 0.66934 7.49955 0.160156 9.27959 0.160156C11.0596 0.160156 12.7997 0.669341 14.2797 1.62332C15.7598 2.5773 16.9133 3.93322 17.5945 5.51963C18.2757 7.10604 18.4539 8.85168 18.1066 10.5358C17.7594 12.2199 16.9022 13.7669 15.6435 14.9811C15.396 15.2199 14.9947 15.2199 14.7472 14.9811C14.4996 14.7423 14.4996 14.3552 14.7472 14.1164C15.8286 13.0732 16.565 11.7441 16.8633 10.2972C17.1617 8.85032 17.0086 7.35056 16.4233 5.9876C15.8381 4.62464 14.847 3.4597 13.5754 2.64009C12.3039 1.82048 10.8089 1.38302 9.27959 1.38302Z"
                  fill="white"
                />
              </svg>
              <span className="text-sm font-medium">Share URL</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 ml-3 bg-green-950 text-white  hover:bg-green-800">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share to App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex px-6 py-2 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-950 text-white border border-green-700  hover:border-gray-700">
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
        <div className="w-114 px-6 py-4 border-r bg-white"></div>
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
            <div className="w-115 px-4 py-2 border-r relative">
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
                  <div className="flex items-center space-x-30">
                    <span className="font-medium text-gray-800">
                      {driver.name}
                    </span>
                    <div className="flex items-center">
                      <button className="p-1 text-gray-600 hover:text-gray-600 rounded ">
                        <svg
                          width="25"
                          height="18"
                          viewBox="0 0 25 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.11385 0.451172C1.91552 2.64949 0.555237 5.68585 0.555237 9.03798C0.555237 12.3901 1.91552 15.4265 4.11385 17.6248L5.82635 15.9123C4.06526 14.1634 2.98432 11.7343 2.98432 9.03798C2.98432 6.35385 4.06526 3.91262 5.82635 2.16368L4.11385 0.451172ZM21.2875 0.451172L19.575 2.16368C21.3361 3.91262 22.417 6.35385 22.417 9.03798C22.417 11.7343 21.3361 14.1634 19.575 15.9123L21.2875 17.6248C23.4858 15.4265 24.8461 12.3901 24.8461 9.03798C24.8461 5.68585 23.4858 2.64949 21.2875 0.451172ZM7.551 3.88833C6.22715 5.21218 5.41341 7.03399 5.41341 9.03798C5.41341 11.042 6.22715 12.8638 7.551 14.1876L9.2635 12.4751C8.38903 11.6007 7.84249 10.3861 7.84249 9.03798C7.84249 7.68984 8.38903 6.4753 9.2635 5.60083L7.551 3.88833ZM17.8503 3.88833L16.1378 5.60083C17.0123 6.4753 17.5588 7.68984 17.5588 9.03798C17.5588 10.3861 17.0123 11.6007 16.1378 12.4751L17.8503 14.1876C19.1742 12.8638 19.9879 11.042 19.9879 9.03798C19.9879 7.03399 19.1742 5.21218 17.8503 3.88833ZM12.7007 6.6089C12.0564 6.6089 11.4386 6.86482 10.983 7.32036C10.5275 7.77591 10.2716 8.39375 10.2716 9.03798C10.2716 9.68222 10.5275 10.3001 10.983 10.7556C11.4386 11.2111 12.0564 11.4671 12.7007 11.4671C13.3449 11.4671 13.9627 11.2111 14.4183 10.7556C14.8738 10.3001 15.1297 9.68222 15.1297 9.03798C15.1297 8.39375 14.8738 7.77591 14.4183 7.32036C13.9627 6.86482 13.3449 6.6089 12.7007 6.6089Z"
                            fill="#7D8088"
                          />
                        </svg>
                      </button>
                      <button className="p-1 text-black-400 hover:text-gray-600 rounded font-bold">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.0197 4.95605V4.95605C9.20994 4.95605 7.30507 4.95605 6.12153 6.13959C4.93799 7.32313 4.93799 9.22801 4.93799 13.0378V19.099C4.93799 20.0515 4.93799 20.5277 5.23387 20.8236C5.52976 21.1195 6.00598 21.1195 6.95841 21.1195H13.0197C16.8294 21.1195 18.7343 21.1195 19.9179 19.9359C21.1014 18.7524 21.1014 16.8475 21.1014 13.0378V13.0378"
                            stroke="#333333"
                            strokeWidth="2.02043"
                          />
                          <path
                            d="M9.98907 11.0176L16.0504 11.0176"
                            stroke="#333333"
                            strokeWidth="2.02043"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.98907 15.0576H13.0197"
                            stroke="#333333"
                            strokeWidth="2.02043"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.0912 8.99683L20.0912 2.93555M17.0605 5.96619H23.1218"
                            stroke="#333333"
                            strokeWidth="2.02043"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button className="p-1 text-black-400 hover:text-gray-600 rounded font-bold">
                        <svg
                          width="25"
                          height="26"
                          viewBox="0 0 25 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.0813 14.7618L20.7565 17.4369C21.1162 17.7967 21.1162 18.3799 20.7565 18.7397C18.8116 20.6845 15.7326 20.9034 13.5322 19.2531L11.9407 18.0594C10.1794 16.7384 8.61472 15.1738 7.29372 13.4125L6.10008 11.8209C4.4498 9.62057 4.66862 6.54155 6.6135 4.59667C6.97323 4.23693 7.55647 4.23693 7.91621 4.59667L10.5914 7.27184C10.9859 7.66635 10.9859 8.30598 10.5914 8.70049L9.5598 9.73207C9.39586 9.89601 9.35522 10.1465 9.4589 10.3538C10.6577 12.7514 12.6018 14.6955 14.9993 15.8942C15.2067 15.9979 15.4571 15.9573 15.6211 15.7934L16.6527 14.7618C17.0472 14.3673 17.6868 14.3673 18.0813 14.7618Z"
                            fill="#333333"
                          />
                          <path
                            d="M16.6519 14.762C17.0463 14.3675 17.686 14.3676 18.0806 14.762L20.7563 17.4368C21.1159 17.7964 21.1158 18.3798 20.7563 18.7395C20.4602 19.0357 20.137 19.2915 19.7954 19.5071L15.8511 15.5628L16.6519 14.762ZM6.61279 4.59693C6.97252 4.23721 7.55579 4.23723 7.91553 4.59693L10.5972 7.27857C10.9852 7.67348 10.9834 8.30806 10.5913 8.70045L9.78955 9.50123L5.84521 5.5569C6.06076 5.21538 6.31676 4.893 6.61279 4.59693Z"
                            fill="#333333"
                          />
                        </svg>
                      </button>
                      <button className="p-1 text-black hover:text-gray-600 ">
                        <MoreOutlined />
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
                  <div className="text-[12px] font-medium text-gray-950">
                    {driver.shiftTime}
                  </div>
                </div>
                <div>
                  <div>Vehicle</div>
                  <div className=" text-gray-800 font-medium">{driver.vehicle}</div>
                </div>
                <div>
                  <div>Total Stops</div>
                  <div className=" text-gray-800 font-medium">{driver.totalStops}</div>
                </div>
                <div>
                  <div>Distance</div>
                  <div className=" text-gray-800 font-medium">{driver.distance}</div>
                </div>
                <div>
                  <div className="">Duration</div>
                  <div className="text-gray-800 font-medium">{driver.duration}</div>
                </div>
              </div>
            </div>

            <div className="flex-1 px-10 py-10 relative">
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
