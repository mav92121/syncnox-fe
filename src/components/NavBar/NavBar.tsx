import { Input } from "../ui/input";
import {
  PlusOutlined,
  BellOutlined,
  InboxOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const NavBar = () => {
  const iconClassName =
    "w-[43px] h-[43px] flex items-center justify-center text-2xl opacity-60 border border-[#D9D9D9] rounded-lg";

  return (
    <nav className="flex-1">
      <nav className="h-[69px] flex items-center justify-between">
        <div className="flex gap-[17px] items-center">
          <div className="relative w-[493.43px] pl-[9.26px]">
            <SearchOutlined
              className="absolute left-[20px] top-1/2 -translate-y-1/2 text-base text-[#999]"
              style={{ pointerEvents: "none" }} // This prevents the icon from interfering with input
            />
            <Input
              style={{
                boxShadow: "none",
              }}
              type="text"
              className="w-full h-[43px] pl-[35px] shadow-none outline-none"
              placeholder="Search by User id, User Name, Date etc"
            />
          </div>
          <div className={iconClassName}>
            <FilterOutlined />
          </div>
        </div>
        <div className="flex gap-[17px] pr-[17px] items-center">
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
      </nav>
    </nav>
  );
};

export default NavBar;
