import { Button, Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { ActionButtonsProps } from "../types";

const ActionButtons = ({ className }: ActionButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveKey = () => {
    if (location.pathname.includes("/plan/recent")) return "recent";
    return "add";
  };

  const tabItems = [
    {
      key: "add",
      label: "Add",
    },
    {
      key: "recent",
      label: "Recent",
    },
  ];

  const handelTabChange = (key: string) => {
    if (key === "add") {
      navigate("/plan/add");
    } else if (key === "recent") {
      navigate("/plan/recents");
    }
  };
  return (
    <div className={`flex space-x-4 ${className}`}>
      <Tabs
        activeKey={getActiveKey()}
        onChange={handelTabChange}
        items={tabItems}
      />
    </div>
  );
};

export default ActionButtons;
