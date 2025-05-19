import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import { cn } from "@/lib/utils";

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
          onClick={() => setMapType("osm")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out",
            mapType === "osm"
              ? "bg-primary text-primary-foreground"
              : "bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          Map
        </Button>
        <Button
          onClick={() => setMapType("satellite")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out",
            mapType === "satellite"
              ? "bg-primary text-primary-foreground"
              : "bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          Satellite
        </Button>
      </div>
    </div>
  );
};

export default MapTypeControl;
