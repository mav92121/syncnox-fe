import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  viewMode: "list" | "add" | "options";
  onAddClick: () => void;
  onRecentClick: () => void;
}

const ActionButtons = ({
  viewMode,
  onAddClick,
  onRecentClick,
}: ActionButtonsProps) => {
  return (
    <div className="flex space-x-4">
      <Button
        className={`${viewMode !== "list" ? "" : "text-[#7D7D7D]"}`}
        onClick={onAddClick}
        variant={viewMode !== "list" ? "default" : "outline"}
      >
        <svg
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeWidth="2" d="M12 8v8M8 12h8" />
        </svg>
        Add
      </Button>
      <Button
        className={`${viewMode === "list" ? "" : "text-[#7D7D7D]"}`}
        onClick={onRecentClick}
        variant={viewMode === "list" ? "default" : "outline"}
      >
        <svg
          className="w-11 h-11 mr-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="4" y="6" width="16" height="4" rx="1" />
          <rect x="4" y="14" width="16" height="4" rx="1" />
        </svg>
        <div className=" text-xs">Recent</div>
      </Button>
    </div>
  );
};

export default ActionButtons;
