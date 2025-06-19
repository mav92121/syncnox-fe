// contexts/MarkersContext.jsx
import React, { createContext, useContext, useReducer } from "react";

// Marker type definition
export interface Marker {
  id: string;
  position: [number, number];
  color: string;
  title?: string;
  description?: string;
}

// Action types
const MARKER_ACTIONS = {
  ADD_MARKER: "ADD_MARKER",
  REMOVE_MARKER: "REMOVE_MARKER",
  UPDATE_MARKER: "UPDATE_MARKER",
  CLEAR_MARKERS: "CLEAR_MARKERS",
  SET_MARKERS: "SET_MARKERS",
} as const;

type MarkerAction =
  | { type: typeof MARKER_ACTIONS.ADD_MARKER; payload: Omit<Marker, "id"> }
  | { type: typeof MARKER_ACTIONS.REMOVE_MARKER; payload: string }
  | { type: typeof MARKER_ACTIONS.UPDATE_MARKER; payload: Marker }
  | { type: typeof MARKER_ACTIONS.CLEAR_MARKERS }
  | { type: typeof MARKER_ACTIONS.SET_MARKERS; payload: Marker[] };

// Initial state with default markers
const initialMarkers: Marker[] = [];

// Reducer function
const markersReducer = (state: Marker[], action: MarkerAction): Marker[] => {
  switch (action.type) {
    case MARKER_ACTIONS.ADD_MARKER:
      return [
        ...state,
        {
          ...action.payload,
          id: `marker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        },
      ];

    case MARKER_ACTIONS.REMOVE_MARKER:
      return state.filter((marker) => marker.id !== action.payload);

    case MARKER_ACTIONS.UPDATE_MARKER:
      return state.map((marker) =>
        marker.id === action.payload.id ? action.payload : marker
      );

    case MARKER_ACTIONS.CLEAR_MARKERS:
      return [];

    case MARKER_ACTIONS.SET_MARKERS:
      return action.payload;

    default:
      return state;
  }
};

// Context type
interface MarkersContextType {
  markers: Marker[];
  addMarker: (marker: Omit<Marker, "id">) => void;
  removeMarker: (id: string) => void;
  updateMarker: (marker: Marker) => void;
  clearMarkers: () => void;
  setMarkers: (markers: Marker[]) => void;
  getMarkerById: (id: string) => Marker | undefined;
}

// Create context
const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

// Provider component
export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [markers, dispatch] = useReducer(markersReducer, initialMarkers);

  const addMarker = (marker: Omit<Marker, "id">) => {
    dispatch({ type: MARKER_ACTIONS.ADD_MARKER, payload: marker });
  };

  const removeMarker = (id: string) => {
    dispatch({ type: MARKER_ACTIONS.REMOVE_MARKER, payload: id });
  };

  const updateMarker = (marker: Marker) => {
    dispatch({ type: MARKER_ACTIONS.UPDATE_MARKER, payload: marker });
  };

  const clearMarkers = () => {
    dispatch({ type: MARKER_ACTIONS.CLEAR_MARKERS });
  };

  const setMarkers = (markers: Marker[]) => {
    dispatch({ type: MARKER_ACTIONS.SET_MARKERS, payload: markers });
  };

  const getMarkerById = (id: string) => {
    return markers.find((marker) => marker.id === id);
  };

  return (
    <MarkersContext.Provider
      value={{
        markers,
        addMarker,
        removeMarker,
        updateMarker,
        clearMarkers,
        setMarkers,
        getMarkerById,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

// Custom hook
export const useMarkers = () => {
  const context = useContext(MarkersContext);
  if (context === undefined) {
    throw new Error("useMarkers must be used within a MarkersProvider");
  }
  return context;
};
