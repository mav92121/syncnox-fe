import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./SideBar.css";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showManageDropdown, setShowManageDropdown] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleManageHover = (hovering: boolean) => {
    if (hovering) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setShowManageDropdown(true);
    } else {
      closeTimerRef.current = setTimeout(() => {
        setShowManageDropdown(false);
        closeTimerRef.current = null;
      }, 150);
    }
  };

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
    { icon: "logout.svg", label: "Log out", alt: "logout", textColor: "text-red-500" },
  ];

  const manageIndex = menuItems.findIndex(item => item.label === "Manage");

  return (
    <div
      className={`h-screen bg-white flex flex-col justify-between border-r-2 border-r-gray-300 border-double transition-all duration-300 shadow-sm ${
    isExpanded ? "w-[260px]" : "w-[60px]"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setShowManageDropdown(false);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      }}
    >
      {/* Top Logo */}
      <div className="p-4">
        {isExpanded ? (
          <Link to="/" className="flex items-center space-x-2">
            <img src="/syncnox.svg" alt="SYNCNOX" className="h-7" />
          </Link>
        ) : (
          <div className="flex justify-center">
            <img src="/logo.svg" alt="Logo" className="w-7 h-7" />
          </div>
        )}
      </div>

      {/* Search Box */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined className="text-gray-400" />}
            className={`transition-all duration-300 ${
              isExpanded ? "w-full opacity-100" : "w-[38px] opacity-0 border-0 bg-transparent pointer-events-none"
            }`}
          />
          {!isExpanded && (
            <SearchOutlined className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
          )}
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto px-2">
        {menuItems.map((item, index) => (
          <div key={index} onMouseEnter={() => item.label === "Manage" && isExpanded && handleManageHover(true)}
            onMouseLeave={() => item.label === "Manage" && handleManageHover(false)}>
            <Link to={item.alt}>
              <div className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-[#F6FFED] transition-colors ${
                item.label === "Manage" && showManageDropdown ? "bg-[#F6FFED]" : ""
              }`}>
                <img src={`/${item.icon}`} alt={item.alt} className="w-5 h-5" />
                <span className={`ml-3 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}>
                  {item.label}
                </span>
                {item.hasArrow && isExpanded && (
                  <svg className={`ml-auto w-4 h-4 transform transition-transform ${
                    showManageDropdown ? "rotate-90" : ""
                  }`} fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 6L15 12L9 18" />
                  </svg>
                )}
              </div>
            </Link>

            {/* Manage Dropdown */}
            {item.label === "Manage" && isExpanded && showManageDropdown && (
              <div className="ml-9 transition-all duration-300">
                {manageDropdownItems.map((drop, i) => (
                  <div key={i} className="py-2 text-sm hover:bg-green-100 cursor-pointer rounded-md px-2">
                    {drop.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t pt-4 pb-6 px-2">
        <div className={`flex items-center mb-4 ${isExpanded ? "" : "justify-center"}`}>
          <img src="/avatar.svg" className="w-8 h-8 rounded-full" alt="User" />
          {isExpanded && (
            <div className="ml-2">
              <div className="text-sm font-medium">Gustavo Xavier</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          )}
        </div>
        {bottomMenuItems.map((item, i) => (
          <div key={i} className="flex items-center p-2 rounded-md hover:bg-[#F6FFED] cursor-pointer">
            <img src={`/${item.icon}`} alt={item.alt} className="w-5 h-5" />
            <span className={`ml-3 text-sm font-medium ${
              item.textColor || "text-gray-700"
            } ${isExpanded ? "opacity-100" : "opacity-0 w-0"} transition-all`}>
              {item.label}
            </span>
          </div>
        ))}
        
      </div>
    </div>
    
  );
};

export default SideBar;
