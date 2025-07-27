import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Button } from "antd";
import L from "leaflet";
import { mapUrls, mapAttributions } from "../utils/mapConfig";
import type { MapType } from "../types";

interface MapTypeControlProps {
  mapType: MapType;
  setMapType: (type: MapType) => void;
}

const MapTypeControl: React.FC<MapTypeControlProps> = ({
  mapType,
  setMapType,
}) => {
  const map = useMap();

  useEffect(() => {
    // Get all layers
    map.eachLayer((layer) => {
      // Check if it's a tile layer
      if (layer instanceof L.TileLayer) {
        // Remove it
        map.removeLayer(layer);
      }
    });

    // Add the selected tile layer
    L.tileLayer(mapUrls[mapType], {
      attribution: mapAttributions[mapType],
    }).addTo(map);
  }, [map, mapType]);

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <div className="bg-white shadow-md overflow-hidden flex transition-all duration-300 ease-in-out">
        <Button
          size="small"
          onClick={() => setMapType("roadmap")}
          type={mapType === "roadmap" ? "primary" : "default"}
        >
          Map
        </Button>
        <Button
          size="small"
          onClick={() => setMapType("satellite")}
          type={mapType === "satellite" ? "primary" : "default"}
        >
          Satellite
        </Button>
      </div>
    </div>
  );
};

export default MapTypeControl;
