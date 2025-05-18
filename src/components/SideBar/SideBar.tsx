import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { SearchOutlined } from "@ant-design/icons";

const SideBar = () => {
  const [isExpended, setIsExpended] = useState(false);
  const [showManageDropdown, setShowManageDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const manageItemRef = useRef(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle dropdown visibility with better hover detection
  const handleManageHover = (isHovering: boolean) => {
    if (isHovering) {
      // Clear any close timer that might be running
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setShowManageDropdown(true);
    } else {
      // Set a timer to close the dropdown
      closeTimerRef.current = setTimeout(() => {
        setShowManageDropdown(false);
        closeTimerRef.current = null;
      }, 150);
    }
  };

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const menuItems = [
    { icon: "recent.svg", label: "Recent", alt: "recent" },
    { icon: "plan.svg", label: "Plan", alt: "plan" },
    { icon: "schedule.svg", label: "Schedule", alt: "schedule" },
    { icon: "manage.svg", label: "Manage", alt: "manage", hasArrow: true },
    { icon: "analytics.svg", label: "Analytics", alt: "analytics" },
    { icon: "tracking.svg", label: "Live Tracking & Alerts", alt: "tracking" },
    { icon: "deals.svg", label: "Deals", alt: "deals" },
    { icon: "export.svg", label: "Export", alt: "export" },
  ];

  const manageDropdownItems = [
    { label: "User" },
    { label: "Alerts" },
    { label: "Fleet" },
    { label: "Customers" },
  ];

  const bottomMenuItems = [
    { icon: "settings.svg", label: "Settings", alt: "settings" },
    {
      icon: "logout.svg",
      label: "Log out",
      alt: "logout",
      textColor: "text-red-500",
    },
  ];

  // Find manage item index
  const manageIndex = menuItems.findIndex((item) => item.label === "Manage");

  return (
    <div
      className={`h-screen bg-white flex flex-col justify-between border-r border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ${
        isExpended ? "w-[280px]" : "w-[60px]"
      }`}
      onMouseLeave={() => {
        setIsExpended(false);
        setShowManageDropdown(false);
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
        }
      }}
      onMouseEnter={() => setIsExpended(true)}
    >
      {/* Main content section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Logo section */}
        <div className="pt-5 px-4 mb-4">
          <div className="logo transition-all duration-300 ease-in-out">
            {isExpended ? (
              <div className="flex items-center">
                <img src="/syncnox.svg" alt="SYNCNOX" className="h-[28px]" />
              </div>
            ) : (
              <div className="flex justify-center">
                <img src="/logo.svg" alt="Logo" className="w-[28px] h-[28px]" />
              </div>
            )}
          </div>
        </div>

        {/* Search section */}
        <div className="px-4 mb-6">
          <div className="relative transition-all duration-300 ease-in-out">
            {isExpended ? (
              <div>
                <SearchOutlined
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  style={{ pointerEvents: "none" }}
                />
                <Input
                  style={{ boxShadow: "none" }}
                  type="text"
                  className="w-full h-[38px] pl-9 text-sm rounded-md border-gray-200"
                  placeholder="Search"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-[38px]">
                <SearchOutlined className="text-gray-400 text-sm" />
              </div>
            )}
          </div>
        </div>

        {/* Menu items */}
        <div className="flex-1 overflow-y-auto px-2">
          {/* Render menu items before Manage */}
          {menuItems.slice(0, manageIndex + 1).map((item, index) => (
            <div key={index} className="relative">
              <div
                ref={item.label === "Manage" ? manageItemRef : null}
                className={`flex items-center pl-2 py-[10px] my-1  hover:bg-[#F6FFED] rounded-md cursor-pointer ${
                  item.label === "Manage" && showManageDropdown
                    ? "bg-gray-100"
                    : ""
                }`}
                onMouseEnter={() => {
                  if (item.label === "Manage" && isExpended) {
                    handleManageHover(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item.label === "Manage") {
                    handleManageHover(false);
                  }
                }}
              >
                <div className="w-[20px] h-[20px] flex items-center justify-center">
                  <img
                    src={`/${item.icon}`}
                    alt={item.alt}
                    className="w-[16px] h-[16px] object-contain"
                  />
                </div>
                <div
                  className={`ml-3 whitespace-nowrap overflow-hidden transition-opacity duration-300 text-sm ${
                    isExpended ? "opacity-100 w-auto" : "opacity-0 w-0"
                  }`}
                >
                  {item.label}
                </div>
                {item.hasArrow && isExpended && (
                  <div className="ml-auto mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transform transition-transform ${
                        showManageDropdown ? "rotate-90" : ""
                      }`}
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Manage dropdown - inline instead of absolute */}
              {item.label === "Manage" && isExpended && showManageDropdown && (
                <div
                  ref={dropdownRef}
                  className={`bg-[#F6FFED] rounded-md mt-1 mb-1 overflow-hidden transition-all duration-200`}
                  onMouseEnter={() => handleManageHover(true)}
                  onMouseLeave={() => handleManageHover(false)}
                >
                  {manageDropdownItems.map((dropdownItem, idx) => (
                    <div
                      key={idx}
                      className="py-2 pl-10 text-sm hover:bg-green-100 cursor-pointer"
                    >
                      {dropdownItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Render menu items after Manage */}
          {menuItems.slice(manageIndex + 1).map((item, index) => (
            <div key={index} className="relative">
              <div className="flex items-center pl-2 py-[10px] my-1 rounded-md cursor-pointer hover:bg-[#F6FFED]">
                <div className="w-[20px] h-[20px] flex items-center justify-center">
                  <img
                    src={`/${item.icon}`}
                    alt={item.alt}
                    className="w-[16px] h-[16px] object-contain"
                  />
                </div>
                <div
                  className={`ml-3 whitespace-nowrap overflow-hidden transition-opacity duration-300 text-sm ${
                    isExpended ? "opacity-100 w-auto" : "opacity-0 w-0"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section with user profile and settings */}
      <div className="border-t border-gray-200 pt-3 pb-4 px-2">
        {/* User profile */}
        <div
          className={`flex items-center px-2 mb-3 ${
            isExpended ? "" : "justify-center"
          }`}
        >
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
            <img
              src="/avatar.svg"
              alt="Gustavo Xavier"
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

        {/* Bottom menu items */}
        {bottomMenuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center pl-2 py-[10px] hover:bg-[#F6FFED] rounded-md cursor-pointer"
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <img
                src={`/${item.icon}`}
                alt={item.alt}
                className="w-[16px] h-[16px] object-contain"
              />
            </div>
            <div
              className={`ml-3 whitespace-nowrap overflow-hidden transition-opacity duration-300 ${
                item.textColor || "text-gray-700"
              } text-sm ${isExpended ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom pink line visible in third image */}
      {isExpended && <div className="w-full h-[2px] bg-pink-500"></div>}
    </div>
  );
};

export default SideBar;
