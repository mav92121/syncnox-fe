import { useState, useRef, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Input } from "antd";
import "./SideBar.css";

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
    { icon: "recent.svg", label: "Insights", alt: "recent" },
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
      className={`h-screen bg-white flex flex-col justify-between border-r border-gray-100 overflow-hidden transition-all duration-300 ${
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
        <div className="pt-3 px-4 mb-4">
          <div className="logo transition-all duration-300 ease-in-out">
            {isExpended ? (
              <Link to="/">
                <div className="flex items-center cursor-pointer">
                  <img src="/syncnox.svg" alt="SYNCNOX" className="h-[38px]" />
                </div>
              </Link>
            ) : (
              <div className="flex justify-center">
                <img src="/logo.svg" alt="Logo" className="w-[28px] h-[38px]" />
              </div>
            )}
          </div>
        </div>

        {/* Search section */}
        <div className="px-4 mb-6">
          <div className="relative w-full h-[38px] transition-all duration-300 ease-in-out">
            <Input
              placeholder="Search"
              prefix={
                <SearchOutlined
                  style={{ fontSize: "16px" }}
                  className="text-gray-400"
                />
              }
              className={`transition-all duration-300 ${
                isExpended
                  ? "w-full opacity-100"
                  : "w-[38px] opacity-0 border-0 bg-transparent pointer-events-none"
              }`}
            />
            <SearchOutlined
              style={{ fontSize: "17px" }}
              className={`text-gray-400 absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                isExpended
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 left-1/2 -translate-x-1/2"
              }`}
            />
          </div>
        </div>

        {/* Menu items with sleek scrollbar */}
        <div
          className="flex-1 px-2 sidebar-menu"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "#E2E8F0 transparent",
          }}
        >
          {/* Render menu items before Manage */}
          {menuItems.slice(0, manageIndex + 1).map((item, index) => (
            <Link to={item.alt}>
              <div key={index} className="relative">
                <div
                  ref={item.label === "Manage" ? manageItemRef : null}
                  className={`flex items-center pl-2 py-[10px] my-1 hover:bg-[#F6FFED] cursor-pointer ${
                    item.label === "Manage" && showManageDropdown
                      ? "bg-[#F6FFED]"
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
                {item.label === "Manage" &&
                  isExpended &&
                  showManageDropdown && (
                    <div
                      ref={dropdownRef}
                      className={`bg-[#F6FFED] mt-1 mb-1 transition-all duration-200`}
                      style={{
                        maxHeight: showManageDropdown ? "1000px" : "0px",
                        overflow: "hidden",
                      }}
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
            </Link>
          ))}

          {/* Render menu items after Manage */}
          {menuItems.slice(manageIndex + 1).map((item, index) => (
            <Link to={item.alt}>
              <div key={index} className="relative">
                <div className="flex items-center pl-2 py-[10px] my-1 cursor-pointer hover:bg-[#F6FFED]">
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
            </Link>
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
            className="flex items-center pl-2 py-[10px] hover:bg-[#F6FFED] cursor-pointer"
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
    </div>
  );
};

export default SideBar;
