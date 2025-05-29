import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar
          breadcrumbs={[
            { label: "Plan", path: "/plan" },
            { label: "Add Jobs" },
          ]}
        />
        <main className="flex-1 overflow-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
