// Map related types
export type MapType = "osm" | "satellite";

export interface MapMarker {
  position: [number, number];
  color: string;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  markers: MapMarker[];
}

// Task related types
export interface Task {
  key: string;
  id: string;
  priority: string;
  firstName: string;
  lastName: string;
  address: string;
  status: string;
  businessName: string;
  status2: string;
  phone: string;
  serviceDuration: string;
  from: string;
  to: string;
  customerPreferences: string;
  notes: string;
  singleRecurring: string;
  ratings: number;
  team: string[];
  files: number;
  paid: string;
}

// Component props types
export interface MapComponentProps {
  mapType: MapType;
  setMapType: (type: MapType) => void;
  config: MapConfig;
  className?: string;
  opacity?: number;
}

export interface ActionButtonsProps {
  className?: string;
}

export interface TaskOptionsProps {
  onManualAdd: () => void;
}
