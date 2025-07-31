import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import RootLayout from "./components/Layout/RootLayout";
import theme from "./theme/themeConfig";
import { PlanProvider } from "./pages/Plan/context/PlanContext";
import DynamicTabs from "./components/DynamicTabs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DynamicTabs />,
      },
      {
        path: "dashboard/*",
        element: <DynamicTabs />,
      },
      {
        path: "plan/*",
        element: <DynamicTabs />,
      },
      // Handle all other paths with DynamicTabs
      {
        path: "*",
        element: <DynamicTabs />,
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
