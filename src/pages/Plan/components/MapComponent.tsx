import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useMemo, useEffect, useState } from "react";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import MapTypeControl from "./MapTypeControl";
import type { MapComponentProps } from "../types";
import { usePlanContext } from "../hooks/usePlanContext";
import { mapUrls, mapAttributions } from "../utils/mapConfig";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";

// Type for OSRM response
interface OSRMRoute {
  routes: Array<{
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
  }>;
}

// Type definition for decoded polyline coordinates
type LatLngTuple = [number, number];

// Component to handle map view updates when bounds change
const MapUpdater = ({ bounds }: { bounds: L.LatLngBounds | null }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      const isvalid =
        bounds.isValid() &&
        !bounds.getNorthEast().equals(bounds.getSouthWest());

      if (isvalid) {
        try {
          map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: 1,
            easeLinearity: 0.5,
          });
        } catch (error) {
          console.error("MapUpdater flyToBounds error:", error);
        }
      } else {
        console.warn("Invalid bounds (equal NE and SW), skipping flyToBounds");
      }
    }
  }, [bounds, map]);

  return null;
};

// Type definitions for optimization results
interface RouteStop {
  job_id: string;
  location: {
    lat: number;
    lng: number;
  };
  arrival_time: string;
  departure_time: string;
  distance_from_prev: number;
  duration_from_prev: number;
  service_time: number;
}

interface Route {
  vehicle_id: string;
  stops: RouteStop[];
  total_distance: number;
  total_duration: number;
  start_time: string;
  end_time: string;
  path: {
    overview_polyline: string;
    waypoints: Array<{ lat: number; lng: number }>;
  };
  // Some APIs might have these at the root level as well
  overview_polyline?: string;
  waypoints?: Array<{ lat: number; lng: number }>;
}

interface OptimizationData {
  routes: Route[];
  // Add other properties from optimization result as needed
}

// Extend the Window interface to include Leaflet types
declare global {
  interface Window {
    L: typeof L;
  }
}

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({
  mapType,
  setMapType,
  config,
  className = "",
  opacity = 1,
}: MapComponentProps) => {
  // Get the optimization result from context
  const { optimizationResult } = usePlanContext();

  // Type assertion for optimization result
  const optimizationData =
    optimizationResult as unknown as OptimizationData | null;
  //

  // Generate a unique key to force remount when optimization data changes
  const mapKey = useMemo(
    () => `map-${optimizationData?.routes?.length || 0}-${Date.now()}`,
    [optimizationData]
  );

  // Calculate bounds to fit all markers and routes
  const bounds = useMemo(() => {
    if (!optimizationData?.routes?.length) return null;
    const coords: [number, number][] = [];

    optimizationData.routes.forEach((route) => {
      // Add all stops
      route.stops.forEach((stop) => {
        coords.push([stop.location.lat, stop.location.lng]);
      });

      // Add waypoints for bounds calculation
      const waypoints = route.path?.waypoints || route.waypoints || [];
      waypoints.forEach((wp) => {
        coords.push([wp.lat, wp.lng]);
      });
    });

    if (coords.length === 0) return null;

    const bounds = L.latLngBounds(coords);
    return bounds;
  }, [optimizationData]);

  // State to store routes from OSRM
  const [routes, setRoutes] = useState<LatLngTuple[][]>([]);

  // Fetch actual route from OSRM
  useEffect(() => {
    if (!optimizationData?.routes?.length) return;

    const fetchRoutes = async () => {
      const newRoutes: LatLngTuple[][] = [];

      for (const route of optimizationData.routes) {
        const waypoints = route.path?.waypoints || route.waypoints || [];
        if (waypoints.length < 2) continue;

        // Convert waypoints to OSRM format (lng,lat)
        const coordinates = waypoints
          .map((wp) => `${wp.lng},${wp.lat}`)
          .join(";");

        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
          );

          if (!response.ok) throw new Error("Failed to fetch route");

          const data: OSRMRoute = await response.json();

          if (data.routes?.[0]?.geometry?.coordinates?.length) {
            // Convert from [lng, lat] to [lat, lng] for Leaflet
            const routeCoords = data.routes[0].geometry.coordinates.map(
              ([lng, lat]) => [lat, lng] as LatLngTuple
            );
            newRoutes.push(routeCoords);
          }
        } catch (error) {
          console.error("Error fetching route from OSRM:", error);
          // Fallback to straight line between waypoints
          if (waypoints.length > 1) {
            newRoutes.push(
              waypoints.map((wp) => [wp.lat, wp.lng] as LatLngTuple)
            );
          }
        }
      }

      setRoutes(newRoutes);
    };

    fetchRoutes();
  }, [optimizationData]);

  // Get polyline positions for each route
  const getPolylinePositions = (
    route: Route,
    routeIndex: number
  ): LatLngTuple[] => {
    // Use the pre-fetched route if available
    if (routes[routeIndex]?.length > 1) {
      return routes[routeIndex];
    }

    // Fallback to waypoints if no route is available yet
    const waypoints = route.path?.waypoints || route.waypoints || [];
    return waypoints.map((wp) => [wp.lat, wp.lng] as [number, number]);
  };

  // Create a custom marker with number
  const createNumberedIcon = (number: number) => {
    return L.divIcon({
      html: renderToString(
        <div style={{ position: "relative", width: "40px", height: "40px" }}>
          <img
            src="/marker.svg"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            alt="Location marker"
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#1e40af" /* Dark blue for better contrast */,
              fontWeight: "bold",
              fontSize: "14px",
              textShadow:
                "0 0 2px rgba(255,255,255,0.8)" /* White shadow for better readability */,
              marginTop: "-2px",
              pointerEvents: "none",
              width: "20px",
              textAlign: "center",
            }}
            className="marker-number"
          >
            {number}
          </div>
        </div>
      ),
      className: "custom-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  // Get color for route based on vehicle ID
  const getRouteColor = (vehicleId: string) => {
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
    const index = parseInt(vehicleId.replace(/\D/g, ""), 10) || 0;
    return colors[index % colors.length];
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ opacity, height: "100%", width: "100%" }}
    >
      <MapContainer
        key={mapKey}
        center={bounds?.getCenter() || [51.505, -0.09]}
        zoom={13}
        className="h-full w-full"
        zoomControl={true}
        bounds={bounds || undefined}
        boundsOptions={{ padding: [50, 50] }}
        style={{ height: "100%", width: "100%" }}
      >
        <MapUpdater bounds={bounds} />
        <TileLayer
          url={mapUrls[mapType]}
          attribution={mapAttributions[mapType]}
          opacity={opacity}
        />
        {/* Default markers */}
        {config.markers.map((marker, index) => (
          <Marker key={`default-${index}`} position={marker.position} />
        ))}

        {/* Optimized routes */}
        {optimizationData?.routes.map((route, routeIndex) => {
          const routeColor = getRouteColor(route.vehicle_id);
          const positions = getPolylinePositions(route, routeIndex);

          return (
            <div key={`route-${routeIndex}`}>
              {/* Route polyline */}
              {positions.length > 1 && (
                <Polyline
                  positions={positions}
                  pathOptions={{
                    color: routeColor,
                    weight: 4,
                    opacity: 0.8,
                    lineCap: "round",
                    lineJoin: "round",
                  }}
                />
              )}

              {/* Stops with numbers */}
              {route.stops.map((stop, stopIndex) => {
                const stopNumber = stopIndex + 1;
                const icon = createNumberedIcon(stopNumber);

                return (
                  <Marker
                    key={`stop-${routeIndex}-${stopIndex}`}
                    position={[stop.location.lat, stop.location.lng]}
                    icon={icon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-semibold">Stop {stopNumber}</div>
                        <div>Job: {stop.job_id}</div>
                        <div>
                          Arrival:{" "}
                          {new Date(stop.arrival_time).toLocaleTimeString()}
                        </div>
                        <div>
                          Duration: {Math.round(stop.service_time / 60)} min
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </div>
          );
        })}

        <MapTypeControl mapType={mapType} setMapType={setMapType} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
