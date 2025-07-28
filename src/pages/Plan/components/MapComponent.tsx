import { memo } from 'react';
import GoogleMapComponent from './GoogleMapComponent';
import type { MapComponentProps } from "../types";

// This is now a simple wrapper component that delegates to the GoogleMapComponent
const MapComponent = (props: MapComponentProps) => {
  return <GoogleMapComponent {...props} />;
};

// Memoize to prevent unnecessary re-renders
export default memo(MapComponent);
