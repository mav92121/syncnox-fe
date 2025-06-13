import { Tabs } from "antd";
import { PlusOutlined, HistoryOutlined } from "@ant-design/icons";
import TaskOptions from "./components/TaskOptions";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";
import PlanAdd from "./PlanAdd";
import PlanRecents from "./PlanRecents";
import { PlanProvider } from "./context/PlanContext";
import { useState } from "react";

const PlanOptions = () => {
  const [activeTab, setActiveTab] = useState("add");

  const items = [
    {
      key: "add",
      label: (
        <span className="flex items-center">
          <PlusOutlined className="mr-2" />
          Add
        </span>
      ),
      children: (
        <div className="h-full flex flex-col">
          <PlanProvider>
            <PlanAdd />
          </PlanProvider>
        </div>
      ),
    },
    {
      key: "recent",
      label: (
        <span className="flex items-center">
          <HistoryOutlined className="mr-2" />
          Recent
        </span>
      ),
      children: (
        <div className="h-full flex flex-col">
          <PlanProvider>
            <PlanRecents />
          </PlanProvider>
        </div>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={items}
        className="custom-tabs"
      />
    </div>
  );
};

export default PlanOptions;
