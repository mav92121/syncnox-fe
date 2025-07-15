import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
const RootLayout = () => {
  const location = useLocation();

  // Define route-specific breadcrumbs
  const getBreadcrumbs = () => {
    if (location.pathname.startsWith("/plan")) {
      return [{ label: "Plan", path: "/plan" }, { label: "Add Jobs" }];
    } else if (location.pathname.startsWith("/routes")) {
      return [{ label: "Routes", path: "/routes" }];
    } else if (location.pathname === "/") {
      return []; // Dashboard has no breadcrumbs
    } else {
      return [{ label: "Unknown Page" }];
    }
  };
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <NavBar
          breadcrumbs={getBreadcrumbs()}
        />
        <main className="flex-1 overflow-hidden bg-white px-2 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
