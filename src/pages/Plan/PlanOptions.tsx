// import ActionButtons from "./components/ActionButtons";
import TaskOptions from "./components/TaskOptions";
import MapComponent from "./components/MapComponent";
import { useMapState } from "./hooks/useMapState";
import { defaultMapConfig } from "./utils/mapConfig";

const PlanOptions = () => {
  const { mapType, setMapType } = useMapState();

  return (
    <div className="h-full flex flex-col">
      {/* Action Buttons */}
      {/* <div className="pb-2">
        <ActionButtons />
      </div> */}

      {/* Main Content Area */}
      <div className="flex-1 flex relative">
        {/* Map as background */}
        <MapComponent
          mapType={mapType}
          setMapType={setMapType}
          config={defaultMapConfig}
          className="w-[100%]"
          opacity={0.3}
        />

        {/* Task options centered */}
        <div className="absolute inset-0 w-full h-full flex justify-center items-center z-10">
          <TaskOptions />
        </div>
      </div>
    </div>
  );
};

export default PlanOptions;
