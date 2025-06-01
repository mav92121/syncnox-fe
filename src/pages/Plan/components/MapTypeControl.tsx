import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Button } from "antd";
import L from "leaflet";

interface MapTypeControlProps {
  mapType: "osm" | "satellite";
  setMapType: (type: "osm" | "satellite") => void;
}

const MapTypeControl: React.FC<MapTypeControlProps> = ({
  mapType,
  setMapType,
}) => {
  const map = useMap();

  // Map URLs
  const mapUrls = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  // Map attribution
  const mapAttributions = {
    osm: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    satellite:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  };

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
  }, [map, mapType, mapUrls, mapAttributions]);

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <div className="bg-white shadow-md overflow-hidden flex transition-all duration-300 ease-in-out">
        <Button
          size="small"
          onClick={() => setMapType("osm")}
          type={mapType === "osm" ? "primary" : "default"}
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
