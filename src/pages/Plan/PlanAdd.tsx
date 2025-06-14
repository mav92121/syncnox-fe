import TaskForm from "./components/TaskForm";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";

const PlanAdd = () => {
  const { mapType, setMapType } = useMapState();

  return (
    <div className="h-full flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[40%] flex flex-col">
          {/* Task Options / Form */}
          <div className="w-full overflow-auto custom-scrollbar pr-1">
            <TaskForm />
          </div>
        </div>

        {/* Map */}
        <MapComponent
          mapType={mapType}
          setMapType={setMapType}
          config={defaultMapConfig}
          className="w-[60%]"
        />
      </div>
    </div>
  );
};

export default PlanAdd;
