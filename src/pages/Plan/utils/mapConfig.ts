import * as L from "leaflet";
import type { MapConfig, MapType } from "../types";

// Fix for default marker icons in Leaflet with React
export const DefaultIcon = L.icon({
  iconUrl: "/marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Default map configuration
export const defaultMapConfig: MapConfig = {
  center: [38.9072, -77.0369], // Washington DC
  zoom: 13,
  markers: [
    { position: [38.8977, -77.0365], color: "green" }, // National Mall
    { position: [38.9072, -77.0369], color: "green" }, // White House
    { position: [38.8899, -77.009], color: "green" }, // Capitol
  ],
};

// Map URLs and attributions
export const mapUrls: Record<MapType, string> = {
  osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  satellite:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

export const mapAttributions: Record<MapType, string> = {
  osm: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  satellite:
    "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
};

// Utility function to hide map attribution
export const hideMapAttribution = () => {
  const attributionElements = document.getElementsByClassName(
    "leaflet-control-attribution"
  );
  for (let i = 0; i < attributionElements.length; i++) {
    (attributionElements[i] as HTMLElement).style.display = "none";
  }
};
