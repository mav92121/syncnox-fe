import { useState } from "react";
import { Input } from "../ui/input";
import { SearchOutlined } from "@ant-design/icons";

const SideBar = () => {
  const [isExpended, setIsExpended] = useState(false);

  const menuItems = [
    { icon: "recent.png", label: "Recent", alt: "recent" },
    { icon: "plan.png", label: "Plan", alt: "plan" },
    { icon: "schedule.png", label: "Schedule", alt: "schedule" },
    { icon: "manage.png", label: "Manage", alt: "manage" },
    { icon: "analytics.png", label: "Analytics", alt: "analytics" },
    { icon: "tracking.png", label: "Live Tracking & Alerts", alt: "tracking" },
    { icon: "deals.png", label: "Deals", alt: "deals" },
    { icon: "export.png", label: "Export", alt: "export" },
  ];

  const bottomMenuItems = [
    { icon: "settings.png", label: "Settings", alt: "settings" },
    {
      icon: "logout.png",
      label: "Log out",
      alt: "logout",
      textColor: "text-red-500",
    },
  ];

  return (
    <div
      className={`h-screen flex flex-col bg-white shadow-md transition-all duration-300 ease-in-out ${
        isExpended ? "w-[280px]" : "w-[60px]"
      }`}
      onMouseLeave={() => setIsExpended(false)}
      onMouseEnter={() => setIsExpended(true)}
    >
      <div className="pt-5 px-4">
        <div className="logo transition-all duration-300 ease-in-out mb-5">
          {isExpended ? (
            <img src="syncnox.png" alt="Syncnox Logo" className="h-[30px]" />
          ) : (
            <img className="w-[30px] h-[30px]" src="logo.png" alt="Logo" />
          )}
        </div>

        <div className="relative mb-6 transition-all duration-300 ease-in-out">
          {isExpended ? (
            <div>
              <SearchOutlined
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] text-base"
                style={{ pointerEvents: "none" }}
              />
              <Input
                style={{ boxShadow: "none" }}
                type="text"
                className="w-full h-[38px] pl-9 rounded-md border-[#E0E0E0]"
                placeholder="Search"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[38px]">
              <SearchOutlined
                className="text-[#999] text-base"
                style={{ pointerEvents: "none" }}
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center py-[10px] px-2 my-1 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <div className="w-[20px] h-[20px] flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 text-sm ${
                  isExpended ? "opacity-100 max-w-[200px]" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </div>
              {item.label === "Manage" && isExpended && (
                <span className="ml-auto">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="#999"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User profile and bottom menu items */}
      <div className="mt-auto border-t border-gray-200 pt-3 pb-4 px-2">
        <div
          className={`flex items-center px-2 mb-3 ${
            isExpended ? "" : "justify-center"
          }`}
        >
          <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
            <img
              src="avatar.png"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          {isExpended && (
            <div className="ml-2">
              <p className="text-sm font-medium">Gustavo Xavier</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>

        {bottomMenuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center py-[10px] px-2 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                item.textColor || "text-gray-700"
              } text-sm ${
                isExpended ? "opacity-100 max-w-[200px]" : "opacity-0 w-0"
              }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
