import ActionButtons from "./components/ActionButtons";
import TaskForm from "./components/TaskForm";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";
import { useMarkers } from "./context/MarkersContext";

const PlanAdd = () => {
  const { mapType, setMapType } = useMapState();
  const { markers } = useMarkers(); // Get markers from context

  return (
    <div className="h-full flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[40%] flex flex-col">
          <ActionButtons className="mb-3" />
          {/* Form */}
          <div className="w-full overflow-auto custom-scrollbar pr-1">
            <TaskForm />
          </div>
        </div>

        {/* Map */}
        <MapComponent
          mapType={mapType}
          setMapType={setMapType}
          config={{ ...defaultMapConfig, markers }} // Combine config with context markers
          className="w-[60%]"
        />
      </div>
    </div>
  );
};

export default PlanAdd;
