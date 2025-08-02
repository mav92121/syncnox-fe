import TaskOptions from "./components/TaskOptions";

const PlanOptions = () => {
  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute w-full h-full top-[25vh]">
        <TaskOptions />
      </div>
    </div>
  );
};

export default PlanOptions;
