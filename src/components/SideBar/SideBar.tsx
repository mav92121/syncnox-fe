import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const [isExpended, setIsExpended] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const menuItems = [
    { icon: "rocket.svg", label: "Plan", alt: "plan" },
    { icon: "recent.svg", label: "Insights", alt: "recent" },
    { icon: "schedule.svg", label: "Schedule", alt: "schedule" },
    { icon: "analytics.svg", label: "Analytics", alt: "analytics" },
    { icon: "tracking.svg", label: "Live Tracking & Alerts", alt: "tracking" },
    { icon: "settings.svg", label: "Settings", alt: "settings" },
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

  return (
    <div
      className={`h-screen bg-white flex flex-col justify-between border-r border-gray-100 overflow-hidden transition-all duration-300 ${
        isExpended ? "w-[280px]" : "w-[60px]"
      }`}
      onMouseLeave={() => {
        setIsExpended(false);
        // setShowManageDropdown(false);
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
          {menuItems.map((item, index) => (
            <Link to={item.alt}>
              <div key={index} className="relative">
                {item.label === "Plan" ? (
                  <div className="w-full">
                    <div className="bg-green-950 text-white w-full py-[10px] flex items-center justify-center">
                      <img
                        src={`/${item.icon}`}
                        alt={item.alt}
                        className="w-[20px] h-[20px] ml-[10px] object-contain"
                      />
                      <span
                        className={`ml-3 whitespace-nowrap overflow-hidden transition-opacity duration-300 text-sm ${
                          isExpended ? "opacity-100 w-auto" : "opacity-0 w-0"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex items-center pl-2 py-[10px] my-1 hover:bg-[#F6FFED] cursor-pointer`}
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
                  </div>
                )}
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
