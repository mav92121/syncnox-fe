// Map related types
export type MapType = "roadmap" | "satellite";

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
  latitude?: string;
  longitude?: string;
  lat?: number | null;
  lon?: number | null;
  [key: string]: string | number | string[] | boolean | null | undefined; // More specific type for dynamic properties
}

export interface Job {
  id?: string; // From backend Job model (int, but string for frontend consistency often fine)
  scheduled_date: string; // ISO datetime string
  job_type: "delivery" | "pickup" | "task";
  delivery_address: string;
  address_id?: string;
  lat?: number;
  lon?: number;
  priority_level: "low" | "medium" | "high";
  first_name?: string; // Optional in JobBase if not explicitly required, but form has it
  last_name?: string;  // Optional in JobBase
  email?: string;      // Optional in JobBase (EmailStr implies required, but let's assume form can omit)
  business_name?: string;
  start_time: string | null; // ISO datetime string
  end_time: string | null;   // ISO datetime string
  duration_minutes: number;
  phone_number: string;
  customer_preferences?: string;
  additional_notes?: string;
  recurrence_type: "one_time" | "recurring"; // Align with Python RecurrenceType
  documents?: string[]; // Assuming list of file names or URLs
  payment_status: "paid" | "unpaid";
  created_at?: string; // From backend Job model
  updated_at?: string; // From backend Job model
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
export interface TimelineItem {
  stop: string | number;
  time: string;
  icon?: string;
}
export interface DriverInterface {
  id: number;
  name: string;
  avatar: string;
  driverNumber: string;
  zone: string;
  shiftTime: string;
  vehicle: string;
  totalStops: string;
  distance: string;
  duration: string;
  color: string;
  timeline: TimelineItem[];
} 