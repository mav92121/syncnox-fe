import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <NavBar
          breadcrumbs={[
            { label: "Plan", path: "/plan" },
            { label: "Add Jobs" },
          ]}
        />
        <main className="flex-1 overflow-hidden bg-white px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
