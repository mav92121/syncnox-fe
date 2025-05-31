import { useState, useEffect } from "react";
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import TasksTable from "./components/TasksTable";
import ActionButtons from "./components/ActionButtons";
import TaskOptions from "./components/TaskOptions";
import TaskForm from "./components/TaskForm";
import MapTypeControl from "./components/MapTypeControl";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with React
// import icon from "public/marker.svg";

const DefaultIcon = L.icon({
  iconUrl: "/marker.svg",
  // shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
// End of marker icon fix

// Types
export type ViewMode = "list" | "add" | "options";

const Plan = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("options");
  const [mapType, setMapType] = useState<"osm" | "satellite">("osm");

  // Initial map center (Washington DC)
  const center: [number, number] = [38.9072, -77.0369];

  // Sample markers for the map
  const markers = [
    { position: [38.8977, -77.0365] as [number, number], color: "green" }, // National Mall
    { position: [38.9072, -77.0369] as [number, number], color: "green" }, // White House
    { position: [38.8899, -77.009] as [number, number], color: "green" }, // Capitol
  ];

  // Add these action handlers for navigating between views
  const handleAddClick = () => {
    setViewMode("add");
  };

  const handleRecentClick = () => {
    setViewMode("list");
  };

  const handleManualAddClick = () => {
    setViewMode("add");
  };

  useEffect(() => {
    const hideAttribution = () => {
      const attributionElements = document.getElementsByClassName(
        "leaflet-control-attribution"
      );
      for (let i = 0; i < attributionElements.length; i++) {
        (attributionElements[i] as HTMLElement).style.display = "none";
      }
    };
    hideAttribution();
    const timer = setTimeout(hideAttribution, 100);

    return () => clearTimeout(timer);
  }, [mapType, viewMode]);

  return (
    <div className="h-full flex flex-col">
      {/* Action Buttons */}
      {viewMode !== "add" && (
        <div className="pb-4">
          <ActionButtons
            viewMode={viewMode}
            onAddClick={handleAddClick}
            onRecentClick={handleRecentClick}
          />
        </div>
      )}

      {/* Main Content Area */}
      {viewMode === "list" ? (
        // List view - Map on top, table on bottom
        <div className="flex-1 flex flex-col pb-4 overflow-hidden">
          {/* Map - Takes approximately 40% of the space */}
          <div className="h-2/5 w-full mb-4 relative">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              attributionControl={false}
              className="overflow-hidden"
            >
              <TileLayer
                url={
                  mapType === "osm"
                    ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                }
                attribution={
                  mapType === "osm"
                    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    : "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                }
              />
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  // center={marker.position}
                  // radius={8}
                  // pathOptions={{
                  //   fillColor: marker.color,
                  //   fillOpacity: 1,
                  //   stroke: false,
                  // }}
                />
              ))}
              <MapTypeControl mapType={mapType} setMapType={setMapType} />
            </MapContainer>
          </div>

          {/* Table - Takes approximately 60% of the space */}
          <div className="h-3/5 w-full bg-red-200 overflow-auto custom-scrollbar">
            <TasksTable />
          </div>
        </div>
      ) : viewMode === "add" ? (
        // Add view - Form on left, map on right (side by side)
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[40%] flex flex-col">
            <ActionButtons
              className="mb-4"
              viewMode={viewMode}
              onAddClick={handleAddClick}
              onRecentClick={handleRecentClick}
            />
            {/* Form */}
            <div className="w-full overflow-auto custom-scrollbar pr-2">
              <TaskForm />
            </div>
          </div>

          {/* Map */}
          <div className="w-[60%] relative">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              attributionControl={false}
              className="overflow-hidden"
            >
              <TileLayer
                url={
                  mapType === "osm"
                    ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                }
                attribution={
                  mapType === "osm"
                    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    : "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                }
              />
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  // center={marker.position}
                  // radius={8}
                  // pathOptions={{
                  //   fillColor: marker.color,
                  //   fillOpacity: 1,
                  //   stroke: false,
                  // }}
                />
              ))}
              <MapTypeControl mapType={mapType} setMapType={setMapType} />
            </MapContainer>
          </div>
        </div>
      ) : (
        // Options view - Task options in center, map in background
        <div className="flex-1 flex relative">
          {/* Map as background */}
          <div className="absolute opacity-30 inset-0 overflow-hidden">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              attributionControl={false}
            >
              <TileLayer
                url={
                  mapType === "osm"
                    ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                }
                attribution={
                  mapType === "osm"
                    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    : "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                }
              />
              <MapTypeControl mapType={mapType} setMapType={setMapType} />
            </MapContainer>
          </div>

          {/* Task options on top */}
          <div className="w-full flex justify-center items-center z-10">
            <TaskOptions onManualAdd={handleManualAddClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
