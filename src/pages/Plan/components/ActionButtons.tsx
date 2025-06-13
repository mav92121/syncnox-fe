import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { ActionButtonsProps } from "../types";

const ActionButtons = ({ className }: ActionButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAddActive = location.pathname === "/plan/add";
  const isRecentsActive = location.pathname === "/plan/recents";

  const handleAddClick = () => {
    navigate("/plan/add");
  };

  const handleRecentClick = () => {
    navigate("/plan/recents");
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      <Button
        size="small"
        className={`${isAddActive ? "bg-[#228B22] hover:bg-[#228B22] text-white" : "text-[#7D7D7D]"}`}
        onClick={handleAddClick}
        type={isAddActive ? "primary" : "default"}
      >
        <svg
          className="w-5 h-5"
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
        size="small"
        className={`${isRecentsActive ? "bg-[#228B22] hover:bg-[#228B22] text-white" : "text-[#7D7D7D]"}`}
        onClick={handleRecentClick}
        type={isRecentsActive ? "primary" : "default"}
      >
        <svg
          className="w-5 h-5 mr-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="4" y="6" width="16" height="4" rx="1" />
          <rect x="4" y="14" width="16" height="4" rx="1" />
        </svg>
        <div className="text-xs">Recent</div>
      </Button>
    </div>
  );
};

export default ActionButtons;
