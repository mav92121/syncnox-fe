import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import RootLayout from "./components/Layout/RootLayout";
import PlanOptions from "./pages/Plan/PlanOptions";
import PlanAdd from "./pages/Plan/PlanAdd";
import PlanRecents from "./pages/Plan/PlanRecents";
import theme from "./theme/themeConfig";
import { PlanProvider } from "./pages/Plan/context/PlanContext";
import Dashboard from "./components/Dashboard";
import Routes from "./components/Routes";
import Jobs from "./components/Jobs";

import tasks from "./pages/Plan/tableData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/routes",
        element: <Routes />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "plan",
        element: <PlanOptions />,
      },
      {
        path: "plan/add",
        element: <PlanAdd />,
      },
      {
        path: "plan/recents",
        element: <PlanRecents />,
      },
    ],
  },
]);

function App() {
  return (
    <ConfigProvider theme={theme}>
      <PlanProvider>
        <RouterProvider router={router} />
      </PlanProvider>
    </ConfigProvider>
  );
}

export default App;
