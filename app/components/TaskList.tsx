import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Column, Task } from "../constants";
import TaskCard from "./TaskCard";
import PrimaryButton from "./buttons/Primary";

type Props = {
  column: Column;
  tasks: Task[];
  onAddClick: Function;
  onDeleteClick: Function;
};

const TaskList: React.FC<Props> = ({
  column,
  tasks,
  onAddClick,
  onDeleteClick,
}) => {
  console.log("LIST: ", column.id);
  return (
    <div className="flex rounded-md bg-gray-800 w-96 h-[calc(100vh-170px)] flex-col">
      <div className="flex items-center h-16 bg-gray-800 rounded-t-md px-4 mb-2">
        <p className="text-lg font-semibold text-white">{column.name}</p>
        <PrimaryButton label={"Add"} onClick={onAddClick} />
      </div>

      <Droppable droppableId={column.id}>
        {(droppableProvided) => (
          <div
            className="px-4 flex flex-col flex-1"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks?.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <TaskCard
                    draggableSnapshot={draggableSnapshot}
                    task={task}
                    column={column}
                    onDeleteClick={onDeleteClick}
                    draggableProvided={draggableProvided}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
