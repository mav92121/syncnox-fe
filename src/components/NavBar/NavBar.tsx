import { Input } from "../ui/input";
import {
  PlusOutlined,
  BellOutlined,
  InboxOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface NavBarProps {
  breadcrumbs: {
    label: string;
    path?: string;
  }[];
}

const NavBar = ({ breadcrumbs = [] }: NavBarProps) => {
  const iconClassName =
    "w-[36px] h-[36px] flex items-center justify-center text-lg opacity-60 border border-[#D9D9D9] rounded-lg hover:bg-gray-50 cursor-pointer";

  return (
    <nav className="border-b border-gray-200">
      <div className="h-[60px] flex items-center justify-between px-4">
        {/* Left side - Breadcrumbs */}
        <div className="flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              <span
                className={`text-sm ${
                  index === breadcrumbs.length - 1
                    ? "text-gray-900 font-medium"
                    : "text-gray-500"
                }`}
              >
                {crumb.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right side - Search and Icons */}
        <div className="flex items-center gap-3">
          <div className="relative w-[400px]">
            <SearchOutlined
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-[#999]"
              style={{ pointerEvents: "none" }}
            />
            <Input
              style={{ boxShadow: "none" }}
              type="text"
              className="w-full h-[36px] pl-9 text-sm rounded-lg border border-[#D9D9D9]"
              placeholder="Search"
            />
          </div>
          <div className={iconClassName}>
            <FilterOutlined />
          </div>
          <div className={iconClassName}>
            <PlusOutlined />
          </div>
          <div className={iconClassName}>
            <BellOutlined />
          </div>
          <div className={iconClassName}>
            <InboxOutlined />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;