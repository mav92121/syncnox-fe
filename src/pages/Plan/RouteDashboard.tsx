import { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  Plus,
  Home,
  Undo2,
  Redo2,
  CloudDownload,
  ClipboardList,
  ListFilter,
  MousePointer2,
  History,
  Share,
  Phone,
  MessageCircle,
  MoreHorizontal,
  User,
} from "lucide-react";
import type { DriverInterface, TimelineItem } from "./types";
import type { OptimizationResult } from "../../services/optimization";

interface RouteDashboardProps {
  optimizationResult: OptimizationResult;
}

// Constants
const TABS = ['Timeline', 'Route'] as const;
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = 4 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

const DRIVER_COLORS: Array<'blue' | 'green'> = ['blue', 'green'];

// Utility functions
const formatTime = (dateString: string): string => {
  try {
    return new Date(dateString).toISOString().slice(11, 16);
  } catch {
    return "00:00";
  }
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}Hrs ${minutes}Mins`;
};

const formatDistance = (meters: number): string => {
  const miles = (meters / 1609.34).toFixed(2);
  return `${miles}mi`;
};

const getTimePosition = (time: string): number => {
  if (!time || typeof time !== "string") return 0;
  
  // Handle both "HH:mm" and "HH:mmAM/PM" formats
  let hours = 0;
  let minutes = 0;
  
  if (time.includes('AM') || time.includes('PM')) {
    const [timePart, period] = time.split(/(?=[AP]M)/);
    [hours, minutes] = timePart.split(":").map(Number);
    
    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  } else {
    [hours, minutes] = time.split(":").map(Number);
  }

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return 0;
  }

  // Calculate position based on the visible time range (4:00 to 12:00)
  const startHour = 4;
  const endHour = 12;
  const totalMinutesInRange = (endHour - startHour) * 60;
  const minutesFromStart = Math.max(0, (hours - startHour) * 60 + minutes);
  
  return Math.min(100, (minutesFromStart / totalMinutesInRange) * 100);
};

// Components
const TimelineStop = ({ item, color, index }: { 
  item: TimelineItem; 
  color: 'blue' | 'green'; 
  index: number;
}) => {
  const colorClasses: Record<string, Record<string, string>> = {
    blue: {
      home: "bg-blue-500",
      stop: "border-blue-500 bg-blue-50 text-blue-700"
    },
    green: {
      home: "bg-green-500", 
      stop: "border-green-500 bg-green-50 text-green-700"
    }
  };

  return (
    <div
    key={index}
      className="absolute top-0 h-8 flex items-center justify-center z-10"
      style={{
        left: `${getTimePosition(item.time)}%`,
        transform: "translateX(-50%)",
      }}
    >
      {item.icon === "home" ? (
        <div className={`w-8 h-8 rounded-full ${colorClasses[color].home} flex items-center justify-center shadow-sm`}>
          <Home className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className={`w-8 h-8 rounded-full border-2 ${colorClasses[color].stop} flex items-center justify-center text-xs font-semibold shadow-sm`}>
          {item.stop}
        </div>
      )}
    </div>
  );
};

const TimelineBar = ({ driver }: { driver: DriverInterface }) => {
  const startPos = getTimePosition(driver.timeline[0]?.time || "00:00");
  const endPos = getTimePosition(driver.timeline[driver.timeline.length - 1]?.time || "00:00");
  
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-400",
    green: "bg-green-400"
  };

  return (
    <div className="relative h-8 mt-2">
      {/* Background grid */}
      <div className="absolute inset-0 flex">
        {TIME_SLOTS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? "bg-gray-25" : "bg-white"} ${i > 0 ? "border-l border-gray-100" : ""}`}
          />
        ))}
      </div>

      {/* Timeline bar */}
      {startPos < endPos && (
        <div
          className={`absolute top-3 h-2 rounded-full ${colorClasses[driver.color]} opacity-80`}
          style={{
            left: `${startPos}%`,
            width: `${Math.max(endPos - startPos, 2)}%`,
          }}
        />
      )}

      {/* Timeline stops */}
      {driver.timeline.map((item, index) => (
        <TimelineStop
          key={index}
          item={item}
          color={driver.color as "blue" | "green"}
          index={index}
        />
      ))}
    </div>
  );
};

const DriverRow = ({ driver }: { driver: DriverInterface }) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-400",
    green: "bg-green-400"
  };

  return (
    <div className="flex border-b border-gray-200 hover:bg-gray-25 transition-colors duration-150">
      {/* Driver Info Panel */}
      <div className="w-80 px-6 py-4 border-r border-gray-200 bg-white relative">
        <div className={`absolute top-4 right-0 h-20 w-1 rounded-l ${colorClasses[driver.color]}`} />
        
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{driver.name}</h3>
              <div className="flex items-center space-x-1 ml-2">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                  <User className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                {driver.driverNumber}
              </span>
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium">
                {driver.zone}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-gray-500 mb-1">Shift Time</div>
                <div className="text-gray-900 font-medium">{driver.shiftTime}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Vehicle</div>
                <div className="text-gray-900 font-medium">{driver.vehicle}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Total Stops</div>
                <div className="text-gray-900 font-medium">{driver.totalStops}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Distance</div>
                <div className="text-gray-900 font-medium">{driver.distance}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500 mb-1">Duration</div>
                <div className="text-gray-900 font-medium">{driver.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Panel */}
      <div className="flex-1 px-6 py-4 relative min-h-24">
        <TimelineBar driver={driver} />
      </div>
    </div>
  );
};

const Header = ({ selectedDate, activeTab, setActiveTab }: {
  selectedDate: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold text-gray-900">Route1201</h1>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md">
            NewYork
          </span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{selectedDate}</span>
        </div>
      </div>

      {/* Center Tabs */}
      <div className="flex items-center space-x-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              activeTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white min-w-64">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search drivers, routes..."
            className="w-full border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>

        <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
          <ClipboardList className="w-4 h-4" />
          <span className="text-sm font-medium">Manifest</span>
        </button>

        <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
          <CloudDownload className="w-4 h-4" />
          <span className="text-sm font-medium">Export</span>
        </button>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded-md transition-colors">
            <Share className="w-4 h-4" />
            <span className="text-sm font-medium">Share URL</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded-md transition-colors">
            <MousePointer2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share to App</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Controls = () => (
  <div className="bg-white border-b border-gray-200 px-6 py-3">
    <div className="flex items-center justify-between">
      {/* Left Controls */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded-md transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add New Driver</span>
        </button>

        <div className="flex items-center border-l border-gray-200 pl-4 space-x-1">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="Undo">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="Redo">
            <Redo2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="History">
            <History className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            <ListFilter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            <span className="text-sm font-medium">30 Mins</span>
          </button>
        </div>
      </div>

      {/* Time Headers */}
      <div className="flex-1 px-8">
        <div className="grid grid-cols-16 gap-0 text-xs text-gray-500">
          {TIME_SLOTS.map((time, i) => (
            <div key={i} className="text-center py-1 font-medium">
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const RouteDashboard = ({ optimizationResult }: RouteDashboardProps) => {
  const selectedDate = "02/08/2025";
  const [activeTab, setActiveTab] = useState<string>("Timeline");

  const drivers = useMemo(() => {
    return optimizationResult.routes.map((route, index) => {
      const timeline = route.stops.map((stop, i) => ({
        stop: i === 0 ? "home" : i,
        time: formatTime(stop.arrival_time),
        icon: i === 0 ? "home" : undefined,
      }));

      return {
        id: index + 1,
        name: `Driver ${index + 1}`,
        avatar: "https://avatar.iran.liara.run/public/6",
        driverNumber: `Driver ${index + 1}`,
        zone: `Zone ${index + 1}`,
        shiftTime: "09:00AM - 12:00PM",
        vehicle: route.vehicle_id,
        totalStops: `${route.stops.length} Stops`,
        distance: formatDistance(route.total_distance),
        duration: formatDuration(route.total_duration),
        color: DRIVER_COLORS[index % DRIVER_COLORS.length],
        timeline,
      };
    });
  }, [optimizationResult]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header 
        selectedDate={selectedDate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Controls />
      
      {/* Driver List */}
      <div className="bg-white">
        {drivers.map((driver) => (
          <DriverRow key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default RouteDashboard;