import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
const Dashboard = () => <div>Dashboard Page</div>;
const Analytics = () => <div>Analytics Page</div>;
const Schedule = () => <div>Schedule Page</div>;

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
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
