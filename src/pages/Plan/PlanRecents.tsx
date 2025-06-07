import ActionButtons from "./components/ActionButtons";
import TasksTable from "./components/TasksTable";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";

const PlanRecents = () => {
  const { mapType, setMapType } = useMapState();

  return (
    <div className="h-full flex flex-col">
      {/* Action Buttons */}
      <div className="pb-4">
        <ActionButtons />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Map - Takes approximately 40% of the space */}
        <div className="h-2/5 w-full mb-4 relative">
          <MapComponent
            mapType={mapType}
            setMapType={setMapType}
            config={defaultMapConfig}
            className="h-full w-full"
          />
        </div>

        {/* Table - Takes approximately 60% of the space */}
        <div className="h-3/5 w-full overflow-auto custom-scrollbar">
          <TasksTable />
        </div>
      </div>
    </div>
  );
};

export default PlanRecents;
