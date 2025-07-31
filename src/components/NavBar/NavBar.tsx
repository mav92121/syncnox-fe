import { Input } from "antd";
import {
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import { CalendarRange, Radar, Rocket, Route, List, Clock, CirclePlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

// Define types for navigation icons
interface NavIcon {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

interface NavBarProps {
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  searchWidth?: number;
  navIcons?: NavIcon[];
}

// Define types for tab configuration
interface TabConfig {
  id: string;
  label: string;
  icon: ReactNode;
}

type RouteTabs = {
  [key: string]: TabConfig[];
};

// Define tab configurations for different routes
const routeTabs: RouteTabs = {
  "^/dashboard": [
    { id: "dashboard", label: "Dashboard", icon: <Rocket size={16} /> },
    { id: "routes", label: "Routes", icon: <Route size={16} /> },
    { id: "jobs", label: "Jobs", icon: <Radar size={16} /> },
    { id: "schedule", label: "Schedule", icon: <CalendarRange size={16} /> },
  ],
  "^/plan": [
    { id: "options", label: "Plan", icon: <List size={16} /> },
    { id: "add", label: "Add", icon: <CirclePlus size={16} /> },
    { id: "recents", label: "Recents", icon: <Clock size={16} /> },
  ],
};

const NavBar = ({
  onSearch,
  searchPlaceholder = "Search",
  searchWidth = 428,
  navIcons,
}: NavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  // Get current route's tabs
  const currentTabs = useMemo(() => {
    const route = Object.keys(routeTabs).find(route => 
      new RegExp(route).test(location.pathname)
    );
    return route ? routeTabs[route as keyof typeof routeTabs] : [];
  }, [location.pathname]);

  // Get active tab from URL or use first tab as default
  const activeTab = searchParams.get('tab') || currentTabs[0]?.id || '';

  // Handle tab navigation
  const handleTabClick = (tabId: string) => {
    const basePath = location.pathname.split('/')[1] || 'dashboard';
    navigate(`/${basePath}?tab=${tabId}`);
  };

  // Set initial tab if none is selected
  useEffect(() => {
    if (['/', '/dashboard', '/plan'].includes(location.pathname) && !searchParams.get('tab')) {
      const basePath = location.pathname === '/' ? 'dashboard' : location.pathname.substring(1);
      const defaultTab = routeTabs[`^/${basePath}` as keyof typeof routeTabs]?.[0]?.id;
      if (defaultTab) {
        navigate(`/${basePath}?tab=${defaultTab}`, { replace: true });
      }
    }
  }, [location.pathname, navigate, searchParams]);

  const iconClassName = "w-[32px] h-[32px] flex items-center justify-center text-base text-gray-600 hover:bg-gray-50 cursor-pointer";

  // Default icons if none provided
  const defaultNavIcons: NavIcon[] = [
    { icon: <SettingOutlined />, label: "Settings" },
    { icon: <QuestionCircleOutlined />, label: "Help" },
    { icon: <BellOutlined />, label: "Notifications" },
    { icon: <UserOutlined />, label: "User profile" },
  ];

  // Use provided icons or fallback to defaults
  const iconsToRender = navIcons || defaultNavIcons;

  return (
    <nav className="border-b border-gray-200">
      <div className="h-[60px] flex items-center justify-between px-6">
        {/* Left side - Navigation */}
        <div className="flex space-x-6 items-center">
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 text-sm cursor-pointer py-2 px-1 transition-all ${
                  isActive
                    ? "text-green-900 border-b-2 border-green-900 font-medium"
                    : "text-gray-500 hover:text-green-800"
                }`}
              >
                <span className="flex items-center">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            );
          })}
        </div>

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
