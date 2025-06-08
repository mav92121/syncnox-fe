import { useContext } from "react";
import { PlanContext } from "../context/planContextDefinition"; // Adjusted path

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};
