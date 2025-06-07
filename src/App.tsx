import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import RootLayout from "./components/Layout/RootLayout";
import PlanOptions from "./pages/Plan/PlanOptions";
import PlanAdd from "./pages/Plan/PlanAdd";
import PlanRecents from "./pages/Plan/PlanRecents";
import theme from "./theme/themeConfig";

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
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
