import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import RootLayout from "./components/Layout/RootLayout";
import PlanOptions from "./pages/Plan/PlanOptions";
import PlanAdd from "./pages/Plan/PlanAdd";
import PlanRecents from "./pages/Plan/PlanRecents";
import theme from "./theme/themeConfig";
import { PlanProvider } from "./pages/Plan/context/PlanContext";
import { MarkersProvider } from "./pages/Plan/context/MarkersContext";
const Dashboard = () => <div>Dashboard Page</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "plan",
        element: <PlanOptions />,
      },
      {
        path: "plan/add",
        element: (
          <PlanProvider>
            <PlanAdd />
          </PlanProvider>
        ),
      },
      {
        path: "plan/recents",
        element: (
          <PlanProvider>
            <PlanRecents />
          </PlanProvider>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ConfigProvider theme={theme}>
      <MarkersProvider>
        <RouterProvider router={router} />
      </MarkersProvider>
    </ConfigProvider>
  );
}

export default App;
