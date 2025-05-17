import { useState } from "react";
import { Input } from "../ui/input";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const SideBar = () => {
  const [isExpended, setIsExpended] = useState(false);

  const menuItems = [
    { icon: "recent.svg", label: "Recent", alt: "recent" },
    { icon: "plan.svg", label: "Plan", alt: "plan" },
    { icon: "schedule.svg", label: "Schedule", alt: "schedule" },
    { icon: "manage.svg", label: "Manage", alt: "manage", hasDropdown: true },
    { icon: "analytics.svg", label: "Analytics", alt: "analytics" },
    { icon: "tracking.svg", label: "Live Tracking & Alerts", alt: "tracking" },
    { icon: "deals.svg", label: "Deals", alt: "deals" },
    { icon: "export.svg", label: "Export", alt: "export" },
  ];

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isExpended ? "w-[280px]" : "w-[56px]"
      } bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden`}
      onMouseLeave={() => setIsExpended(false)}
      onMouseEnter={() => setIsExpended(true)}
    >
      <div className="pt-4 px-3">
        <div className="logo flex justify-left items-center relative h-[36px]">
          <img
            src="syncnox.svg"
            className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
              isExpended ? "opacity-100 w-[171px]" : "opacity-0 w-[171px]"
            }`}
            alt="Syncnox"
          />
          <img
            src="logo.svg"
            className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
              isExpended ? "opacity-0 w-[36px]" : "opacity-100 w-[36px]"
            }`}
            alt="Logo"
          />
        </div>

        <div className="relative mt-4 mb-3">
          {isExpended ? (
            <div>
              <SearchOutlined
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-[#999]"
                style={{ pointerEvents: "none", fontSize: "16px" }}
              />
              <Input
                style={{ boxShadow: "none" }}
                type="text"
                className="w-full h-[36px] pl-9 text-sm"
                placeholder="Search"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[36px]">
              <SearchOutlined
                className="text-[#999]"
                style={{ fontSize: "20px" }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-3 flex-1">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <Link to={item.alt} key={index}>
              <div
                className="flex items-center h-[32px] px-1 rounded-md hover:bg-[#F6FFED] cursor-pointer group"
              >
                <div className="w-[20px] h-[20px] shrink-0 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span
                  className={`ml-2 text-sm flex-grow whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isExpended ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0"
                  }`}
                >
                  {item.label}
                </span>
                {item.hasDropdown && (
                  <span
                    className={`text-[#999] transition-all duration-300 ${
                      isExpended ? "opacity-100 max-w-[16px]" : "opacity-0 max-w-0"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3 pb-3 mt-auto">
        {!isExpended && (
          <div className="flex items-center justify-center h-[32px] mb-1">
            <img
              src="avatar.svg"
              alt="User"
              className="w-6 h-6 rounded-full object-cover"
            />
          </div>
        )}

        {isExpended && (
          <div className="flex items-center gap-2 px-2 py-1 mb-1">
            <img
              src="avatar.svg"
              alt="User"
              className="w-6 h-6 rounded-full object-cover shrink-0"
            />
            <div
              className={`ml-3 transition-all duration-300 ${
                isExpended
                  ? "opacity-100 max-w-[180px]"
                  : "opacity-0 max-w-0 overflow-hidden"
              }`}
            >
              <div className="text-sm font-medium">Gustavo Xavier</div>
              <div className="text-xs text-[#999]">Admin</div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center h-[32px] px-1 rounded-md hover:bg-[#F6FFED] cursor-pointer">
            <div className="w-[20px] h-[20px] shrink-0 flex items-center justify-center">
              <img
                src="settings.svg"
                alt="Settings"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span
              className={`ml-2 text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpended ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0"
              }`}
            >
              Settings
            </span>
          </div>

          <div className="flex items-center h-[32px] px-1 rounded-md hover:bg-[#F6FFED] cursor-pointer">
            <div className="w-[20px] h-[20px] shrink-0 flex items-center justify-center">
              <img
                src="logout.svg"
                alt="Log out"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span
              className={`ml-2 text-sm text-red-500 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpended ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0"
              }`}
            >
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;