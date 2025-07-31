import { useLocation } from "react-router-dom";
import { Suspense } from "react";
import Dashboard from "./Dashboard";
import Routes from "./Routes";
import PlanOptions from "../pages/Plan/PlanOptions";
import PlanAdd from "../pages/Plan/PlanAdd";
import PlanRecents from "../pages/Plan/PlanRecents";

// Define component types for better type safety
type ComponentMap = {
  [key: string]: React.ComponentType<Record<string, never>>;
};

interface RouteConfig {
  defaultTab: string;
  components: ComponentMap;
}

// Configuration for different route patterns
const routeConfig: Record<string, RouteConfig> = {
  // Dashboard route configuration
  "^/dashboard": {
    defaultTab: "dashboard",
    components: {
      dashboard: Dashboard,
      routes: Routes,
    },
  },
  // Plan route configuration
  "^/plan": {
    defaultTab: "options",
    components: {
      options: PlanOptions,
      add: PlanAdd,
      recents: PlanRecents,
    },
  },
};

// Default component to render when tab is not found
const DefaultTab = () => <div></div>;

const DynamicTabs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Find the matching route configuration
  const config = Object.values(routeConfig).find((_, index) => {
    const pattern = Object.keys(routeConfig)[index];
    return new RegExp(pattern).test(location.pathname);
  });

  if (!config) {
    return <DefaultTab />;
  }

  const tab = searchParams.get("tab") || config.defaultTab;
  const TabComponent = config.components[tab] || DefaultTab;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabComponent />
    </Suspense>
  );
};

export default DynamicTabs;
