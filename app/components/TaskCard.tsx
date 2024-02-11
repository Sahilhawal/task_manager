import { Column, Task } from "../constants";

type props = {
  draggableSnapshot: any;
  task: Task;
  column: Column;
  onDeleteClick: Function;
  draggableProvided: any;
};

const TaskCard: React.FC<props> = ({
  draggableSnapshot,
  task,
  onDeleteClick,
  draggableProvided,
  column,
}) => {
  return (
    <div
      className={`flex justify-between items-center mb-4 h-auto bg-white rounded-md p-4 text-black ${
        draggableSnapshot.isDragging ? "ring-2 ring-blue-300" : ""
      }`}
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      <p>{task.content}</p>
      <button
        onClick={() => onDeleteClick(column.id, task.id)}
        className=" h-8 mt-2 text-xs text-white bg-red-500 hover:bg-red-600 border border-red-500 px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
