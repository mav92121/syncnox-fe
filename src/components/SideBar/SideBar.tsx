import { useState } from "react";
import { Input } from "../ui/input";
import { SearchOutlined } from "@ant-design/icons";

const SideBar = () => {
  const [isExpended, setIsExpended] = useState(false);

  const menuItems = [
    { icon: "recent.png", label: "Recent", alt: "recent" },
    { icon: "plan.png", label: "Plan", alt: "plan" },
    { icon: "manage.png", label: "Manage", alt: "manage" },
    { icon: "analytics.png", label: "Analytics", alt: "analytics" },
    { icon: "tracking.png", label: "Live Tracking & Alerts", alt: "tracking" },
    { icon: "deals.png", label: "Deals", alt: "deals" },
    { icon: "export.png", label: "Exports", alt: "exports" },
  ];

  return (
    <div
      className={`pt-[16.5px] px-[9.26px] transition-all duration-300 ease-in-out`}
      onMouseLeave={() => setIsExpended(false)}
      onMouseEnter={() => setIsExpended(true)}
    >
      <div className="logo transition-all duration-[300ms] ease-in-out">
        {isExpended ? (
          <img src="syncnox.png" className="w-[171px] h-[36px]" />
        ) : (
          <img className="w-[36px] h-[36px]" src="logo.png" />
        )}
      </div>

      <div className="relative my-[26px] transition-all duration-300 ease-in-out">
        {isExpended ? (
          <div>
            <SearchOutlined
              className="absolute left-[11px] top-1/2 -translate-y-1/2 text-base text-[#999]"
              style={{ pointerEvents: "none" }}
            />
            <Input
              style={{ boxShadow: "none" }}
              type="text"
              className="w-full h-[43px] pl-[35px]"
              placeholder="Search"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[43px]">
            <SearchOutlined
              className="text-base text-[#999]"
              style={{ pointerEvents: "none" }}
            />
          </div>
        )}
      </div>

      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-[19px] pl-[9px] py-[9.26px] my-[9.26px] transition-all duration-300 ease-in-out hover:bg-gray-100 rounded-md cursor-pointer"
        >
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <img
              src={item.icon}
              alt={item.alt}
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 text-sm ${
              isExpended ? "opacity-100 max-w-[180px]" : "opacity-0 w-0"
            }`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
