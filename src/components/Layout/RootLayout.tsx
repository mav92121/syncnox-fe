import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
const { TabPane } = Tabs;

const RootLayout = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    if (key === "add") {
      navigate("/plan/add");
    } else if (key === "recent") {
      navigate("/plan/recents");
    }
  };

  useEffect(() => {
    if (location.pathname.includes("/plan/add")) {
      setActiveTab("add");
    } else if (location.pathname.includes("/plan/recents")) {
      setActiveTab("recent");
    } else {
      setActiveTab(null);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* <NavBar
          breadcrumbs={[
            { label: "Plan", path: "/plan" },
            { label: "Add Jobs" },
          ]}
        />
       */}

        <div className="flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
          <Tabs
            activeKey={activeTab ?? "___"}
            onTabClick={handleTabClick}
            tabBarStyle={{ marginBottom: 0 }}
          >
            <TabPane
              key="add"
              tab={
                <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  {/* <PlusCircleOutlined /> */}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 8v8M8 12h8" />
                  </svg>
                  Add
                </span>
              }
            />
            <TabPane
              key="recent"
              tab={
                <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <svg
                    className="w-5 h-5 mr-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="4" y="6" width="16" height="4" rx="1" />
                    <rect x="4" y="14" width="16" height="4" rx="1" />
                  </svg>
                  Recent
                </span>
              }
            />
          </Tabs>
          <NavBar />
        </div>

        <main className="flex-1 overflow-hidden bg-white px-2 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
