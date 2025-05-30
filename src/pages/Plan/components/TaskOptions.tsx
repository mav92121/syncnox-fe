import { Button } from "antd";

interface TaskOptionsProps {
  onManualAdd: () => void;
}

const TaskOptions = ({ onManualAdd }: TaskOptionsProps) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full max-w-md mx-auto">
      <Button
        size="large"
        onClick={onManualAdd}
        className="w-full"
        type="primary"
      >
        <svg
          className="w-5 h-5 mr-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Manually Add Jobs
      </Button>

      <Button size="large" className="w-full" type="default">
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        Bulk Upload Jobs
      </Button>
    </div>
  );
};

export default TaskOptions;
