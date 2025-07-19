import { Input } from "antd";
import {
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import { CalendarRange, LayoutDashboard, Radar, Rocket, Route } from "lucide-react";
import { NavLink } from "react-router-dom";

// Define types for breadcrumbs
interface Breadcrumb {
  label: string;
  path?: string;
}

// Define types for navigation icons
interface NavIcon {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
}

// Expanded props interface
interface NavBarProps {
  breadcrumbs?: Breadcrumb[];
  title?: string;
  subtitle?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  searchWidth?: number;
  navIcons?: NavIcon[];
}

const NavBar = ({
  breadcrumbs = [],
  title,
  subtitle,
  onSearch,
  searchPlaceholder = "Search",
  searchWidth = 428,
  navIcons,
}: NavBarProps) => {
  const iconClassName =
    "w-[32px] h-[32px] flex items-center justify-center text-base text-gray-600 hover:bg-gray-50 cursor-pointer";

  // Default icons if none provided
  const defaultNavIcons: NavIcon[] = [
    { icon: <SettingOutlined />, label: "Settings" },
    { icon: <QuestionCircleOutlined />, label: "Help" },
    { icon: <BellOutlined />, label: "Notifications" },
    { icon: <UserOutlined />, label: "User profile" },
  ];
  const showBradcrums = window.location.pathname !== "/";

  // Use provided icons or fallback to defaults
  const iconsToRender = navIcons || defaultNavIcons;

  return (
    <nav className="border-b border-gray-200">
      <div className="h-[60px] flex items-center justify-between px-6">
        {/* Left side - Navigation */}
        {showBradcrums ? (
          <div className="flex items-center">
            {breadcrumbs.length > 0 && (
              <div className="flex items-center">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && <span className="mx-1 text-gray-300">/</span>}
                    <span
                      className={`text-sm ${
                        index === 0
                          ? "font-medium text-gray-700"
                          : "text-gray-500"
                      } ${
                        crumb.path ? "cursor-pointer hover:text-blue-500" : ""
                      }`}
                      onClick={() => {
                        if (crumb.path) {
                          // Handle navigation if needed
                          console.log(`Navigate to: ${crumb.path}`);
                        }
                      }}
                    >
                      {crumb.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Alternative title when no breadcrumbs */}
            {breadcrumbs.length === 0 && title && (
              <div>
                <h1 className="text-lg font-medium text-gray-800">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-8 items-center">
            {[
              { icon: <Rocket />, label: "Dashboard", path: "/" },
              { icon: <Route/>, label: "Routes", path: "/routes" },
              { icon:  <Radar />, label: "Jobs", path: "/jobs" },
              { icon: <CalendarRange />, label: "Schedule", path: "/schedule" },
            ].map((tab, index) => (
              <NavLink
                to={tab.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center gap-1 cursor-pointer pb-1 transition-all ${
                    isActive
                      ? "text-green-900 border-b-2 border-green-900"
                      : "text-gray-400 hover:text-green-800"
                  }`
                }
              >
                <span className="pr-1 font-medium">{tab.icon}</span>
                <span className="font-normal">{tab.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Right side - Search and icons */}
        <div className="flex items-center">
          <div className="relative" style={{ width: `${searchWidth}px` }}>
            <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-9 pointer-events-none">
              <SearchOutlined className="text-gray-400 text-sm" />
            </div>
            <Input
              type="text"
              suffix={
                <SearchOutlined
                  style={{ fontSize: "16px" }}
                  className="text-gray-400"
                />
              }
              className="pl-9"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center ml-4">
            {iconsToRender.map((navIcon, index) => (
              <div
                key={index}
                className={`${iconClassName} ml-1`}
                onClick={navIcon.onClick}
                title={navIcon.label}
              >
                {navIcon.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
