import { useState, useEffect } from "react";
import type { MapType } from "../types";
import { hideMapAttribution } from "../utils/mapConfig";

export const useMapState = () => {
  const [mapType, setMapType] = useState<MapType>("osm");

  useEffect(() => {
    hideMapAttribution();
    const timer = setTimeout(hideMapAttribution, 100);
    return () => clearTimeout(timer);
  }, [mapType]);

  return {
    mapType,
    setMapType,
  };
};
