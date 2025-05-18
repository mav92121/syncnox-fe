import { Button } from "@/components/ui/button";
import type { ViewMode } from "../Plan";

interface ActionButtonsProps {
  onAddClick: () => void;
  onRecentClick: () => void;
  active: ViewMode;
}

const ActionButtons = ({
  onAddClick,
  onRecentClick,
  active,
}: ActionButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        onClick={onAddClick}
        className="flex items-center bg-[#003220] hover:bg-[#004c30] text-white rounded-none"
        variant="default"
      >
        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add
      </Button>
      <Button
        onClick={onRecentClick}
        className={`flex items-center ${
          active === "list"
            ? "bg-gray-100 text-gray-700"
            : "bg-gray-100 text-gray-700"
        } hover:bg-gray-200 rounded-none`}
        variant="outline"
      >
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        Recent
      </Button>
    </div>
  );
};

export default ActionButtons;
