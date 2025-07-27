import * as React from "react";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Button } from "antd";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import { usePlanContext } from "../hooks/usePlanContext";

// Define a more specific type that matches the expected values
type MapType = "roadmap" | "satellite";
export interface MapMarker {
  position: [number, number];
  color: string;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  markers: MapMarker[];
}
export interface MapComponentProps {
  mapType: MapType;
  setMapType: (type: MapType) => void;
  config: MapConfig;
  className?: string;
  opacity?: number;
}

interface OSRMRoute {
  routes: Array<{
    geometry: {
      coordinates: [number, number][];
      type: string;
    };
  }>;
}
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
const mapTypeStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 1,
  display: "flex",
  gap: "8px",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMapComponent: React.FC<MapComponentProps> = ({
  opacity = 1,
  setMapType,
  config,
}) => {
  const [mapTypeId, setMapTypeId] = useState<MapType>("roadmap");
  const [routes, setRoutes] = useState<google.maps.LatLngLiteral[][]>([]);
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const { optimizationResult } = usePlanContext();
  const optimizationData = optimizationResult as unknown as OptimizationData | null;

  // Auto-scroll to first job when optimization is done
  useEffect(() => {
    if (optimizationData?.routes?.[0]?.stops?.[0]) {
      const firstStop = optimizationData.routes[0].stops[0];
      setMapCenter({
        lat: firstStop.location.lat,
        lng: firstStop.location.lng
      });
    }
  }, [optimizationData]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    // Using Vite's import.meta.env for environment variables with proper type assertion
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  // Calculate bounds to fit all markers and routes
  const bounds = useMemo(() => {
    if (!optimizationData?.routes?.length) return null;

    const bounds = new window.google.maps.LatLngBounds();

    optimizationData.routes.forEach((route) => {
      // Add all stops
      route.stops.forEach((stop) => {
        bounds.extend({ lat: stop.location.lat, lng: stop.location.lng });
      });

      // Add waypoints for bounds calculation
      const waypoints = route.path?.waypoints || route.waypoints || [];
      waypoints.forEach((wp) => {
        bounds.extend({ lat: wp.lat, lng: wp.lng });
      });
    });

    return bounds;
  }, [optimizationData]);

  // Fetch actual route from OSRM
  useEffect(() => {
    if (!optimizationData?.routes?.length) return;

    const fetchRoutes = async () => {
      const newRoutes: google.maps.LatLngLiteral[][] = [];

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
            // Convert from [lng, lat] to {lat, lng} for Google Maps
            const routeCoords = data.routes[0].geometry.coordinates.map(
              ([lng, lat]) => ({ lat, lng })
            );
            newRoutes.push(routeCoords);
          }
        } catch (error) {
          console.error("Error fetching route from OSRM:", error);
          // Fallback to straight line between waypoints
          if (waypoints.length > 1) {
            newRoutes.push(
              waypoints.map((wp) => ({ lat: wp.lat, lng: wp.lng }))
            );
          }
        }
      }

      setRoutes(newRoutes);
    };

    fetchRoutes();
  }, [optimizationData]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    map.setOptions({ 
      disableDefaultUI: true,
      // Enable auto-panning but with padding to keep infowindow in view
      gestureHandling: 'greedy'
    });
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Get color for route based on vehicle ID
  const getRouteColor = (vehicleId: string): string => {
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
    const index = parseInt(vehicleId.replace(/\D/g, ""), 10) || 0;
    return colors[index % colors.length];
  };

  // Format date for display
  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Update parent's map type state
  const handleMapTypeChange = (type: MapType) => {
    setMapTypeId(type);
    if (setMapType) {
      setMapType(type === "satellite" ? "satellite" : "roadmap");
    }
  };

  // Fit map to bounds when bounds are available
  useEffect(() => {
    if (bounds && mapRef.current) {
      mapRef.current.fitBounds(bounds);
    }
  }, [bounds]);

  if (loadError) {
    console.error("Google Maps API Error:", loadError);
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div
      style={{ opacity, height: "100%", width: "100%", position: "relative" }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter || {
          lat: config.center[0],
          lng: config.center[1],
        }}
        zoom={config.zoom}
        onLoad={onLoad}
        onClick={() => {
          // Close info window when clicking on the map
          if (selectedStop) {
            setSelectedStop(null);
          }
        }}
        onUnmount={onUnmount}
        options={{
          mapTypeId: mapTypeId === "satellite" ? "satellite" : "roadmap",
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {/* Map type toggle buttons */}
        <div style={mapTypeStyles}>
          <Button
            onClick={() => handleMapTypeChange("roadmap")}
            type={mapTypeId === "roadmap" ? "primary" : "default"}
          >
            Map
          </Button>
          <Button
            onClick={() => handleMapTypeChange("satellite")}
            type={mapTypeId === "satellite" ? "primary" : "default"}
          >
            Satellite
          </Button>
        </div>

        {/* Render routes */}
        {routes.map((routeCoords, index) => (
          <Polyline
            key={`route-${index}`}
            path={routeCoords}
            options={{
              strokeColor: getRouteColor(
                optimizationData?.routes?.[index]?.vehicle_id || "1"
              ),
              strokeWeight: 4,
              strokeOpacity: 0.8,
              clickable: false,
            }}
          />
        ))}

        {/* Render stops */}
        {optimizationData?.routes.map((route, routeIndex) => (
          <React.Fragment key={`route-${routeIndex}`}>
            {route.stops.map((stop, stopIndex) => (
              <Marker
                position={{ lat: stop.location.lat, lng: stop.location.lng }}
                onClick={() => setSelectedStop(stop)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: getRouteColor(route.vehicle_id),
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#ffffff",
                }}
                label={{
                  text: `${stopIndex + 1}`,
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
                key={`stop-${routeIndex}-${stopIndex}`}
              />
            ))}
          </React.Fragment>
        ))}

        {/* Selected stop info window */}
        {selectedStop && (
          <div>
            <InfoWindow
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
                maxWidth: 200,
                disableAutoPan: false,
              }}
              onLoad={(infoWindow) => {
                infoWindowRef.current = infoWindow;
                // Close info window when clicking outside
                google.maps.event.addListener(infoWindow, 'closeclick', () => {
                  setSelectedStop(null);
                });
                
                // Ensure info window is fully visible in the map viewport
                if (mapRef.current) {
                  const bounds = new google.maps.LatLngBounds();
                  bounds.extend(new google.maps.LatLng(selectedStop.location.lat, selectedStop.location.lng));
                  // Add padding to ensure the info window is fully visible
                  const padding = 50; // pixels
                  mapRef.current.fitBounds(bounds, padding);
                }
              }}
              position={{
                lat: selectedStop.location.lat,
                lng: selectedStop.location.lng,
              }}
              onCloseClick={() => setSelectedStop(null)}
            >
              <div className="text-xs p-1 space-y-0.5 w-[180px]">
                <div className="font-semibold truncate">Stop {selectedStop.job_id}</div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival:</span>
                  <span>{formatTime(selectedStop.arrival_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span>{formatTime(selectedStop.departure_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span>{Math.round(selectedStop.service_time / 60)} min</span>
                </div>
              </div>
            </InfoWindow>
            <style dangerouslySetInnerHTML={{
              __html: `
                .gm-style .gm-style-iw-c {
                  padding: 0 !important;
                  max-width: 200px !important;
                  box-shadow: none !important;
                  border-radius: 4px !important;
                }
                .gm-style .gm-style-iw-d {
                  overflow: hidden !important;
                  padding: 4px;
                }
                .gm-style-iw-t::after {
                  display: none !important;
                }
              `
            }} />
          </div>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
