import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
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
        <main className="flex-1 overflow-hidden bg-white px-2 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
