import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapTypeControl from "./MapTypeControl";
import type { MapComponentProps } from "../types";
import { mapUrls, mapAttributions } from "../utils/mapConfig";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  mapType,
  setMapType,
  config,
  className = "",
  opacity = 1,
}: MapComponentProps) => {
  return (
    <div className={`relative ${className}`} style={{ opacity }}>
      <MapContainer
        center={config.center}
        zoom={config.zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={false}
        className="overflow-hidden"
      >
        <TileLayer
          url={mapUrls[mapType]}
          attribution={mapAttributions[mapType]}
        />
        {config.markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
        <MapTypeControl mapType={mapType} setMapType={setMapType} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
