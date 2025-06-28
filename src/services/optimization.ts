import apiClient from "./client";

export interface Location {
  lat: number;
  lng: number;
}

export interface TimeWindow {
  start: string;
  end: string;
}

export interface Vehicle {
  id: string;
  start_location: Location;
  time_window: TimeWindow;
}

export interface Job {
  id: string;
  location: Location;
  duration: number;
  time_window?: TimeWindow;
  priority: number;
}

export interface Stop {
  job_id: string;
  location: Location;
  arrival_time: string;
  departure_time: string;
  distance_from_prev: number;
  duration_from_prev: number;
  service_time: number;
}

export interface Route {
  vehicle_id: string;
  stops: Stop[];
  total_distance: number;
  total_duration: number;
  start_time: string;
  end_time: string;
  path: {
    overview_polyline: string;
    waypoints: Location[];
  };
}

export interface OptimizationResult {
  status: string;
  optimization_type: string;
  total_distance: number;
  total_duration: number;
  routes: Route[];
  metadata: {
    num_jobs: number;
    num_vehicles: number;
    optimization_timestamp: string;
    timezone: string;
    version: string;
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
}

export const optimizeRoutes = async (
  jobs: Job[]
): Promise<OptimizationResult> => {
  // Create a dummy vehicle for now
  const dummyVehicle: Vehicle = {
    id: "vehicle_1",
    start_location: {
      lat: 22.996342,
      lng: 72.5043085,
    },
    time_window: {
      start: "09:00:00",
      end: "18:00:00",
    },
  };

  const payload = {
    vehicles: [dummyVehicle],
    jobs,
    optimization_type: "distance",
    options: {
      profile: "car",
    },
  };

  const response = await apiClient.post<OptimizationResult>(
    "/optimize",
    payload
  );
  return response.data;
};
