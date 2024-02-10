"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import { Task, TaskTypes, COLUMNS } from "./constants";
import AddTaskModal from "./components/AddTaskModal";

const STORAGE_KEY = "tasks_list";

export default function Home() {
  const [tasks, setTasks] = useState<Record<TaskTypes, Task[]>>({
    added: [],
    started: [],
    completed: [],
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [addTaskType, setAddTaskType] = useState<TaskTypes>();

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const { added, started, completed } = JSON.parse(storedData);
      setTasks({
        added: added || [],
        started: started || [],
        completed: completed || [],
      });
    }
  }, []);

  useEffect(() => {
    storeDataToLocalStorage();
  }, [tasks]);

  const storeDataToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColId: TaskTypes = source.droppableId;
    const destinationColId: TaskTypes = destination.droppableId;

    if (sourceColId === destinationColId) {
      return;
    }

    const startTasks = [...tasks[sourceColId]];
    const [removed] = startTasks.splice(source.index, 1);
    const endTasks = [...tasks[destinationColId]];
    endTasks.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [sourceColId]: startTasks,
      [destinationColId]: endTasks,
    });
  };

  const buildTaskObj = (task: string): Task => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return {
      id: randomNumber,
      content: task,
    };
  };

  const onAddClick = (type: TaskTypes) => {
    setShowAddForm(true);
    setAddTaskType(type);
  };

  const handleAddTask = (task: string) => {
    setTasks({
      ...tasks,
      [addTaskType!]: [...tasks[addTaskType!], buildTaskObj(task)],
    });

    setShowAddForm(false);
  };

  const onDeleteClick = (type: TaskTypes, taskId: number) => {
    const updatedTasks = tasks[type].filter((t) => t.id !== taskId);
    setTasks({
      ...tasks,
      [type]: updatedTasks,
    });
  };

  return (
    <>
      {showAddForm && (
        <AddTaskModal
          onClickAdd={handleAddTask}
          onCloseClick={() => setShowAddForm(false)}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col bg-gray-900 min-h-screen text-white pb-8">
          <div className="py-16 flex flex-col items-center">
            <h1 className="text-5xl font-extrabold dark:text-white">
              TaskM
              <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                Manage your project here
              </small>
            </h1>
          </div>

          <div className="px-16 flex justify-between space-x-4">
            {Object.values(COLUMNS).map((column) => (
              <TaskList
                key={column.id}
                column={column}
                tasks={tasks[column.id]}
                onAddClick={() => onAddClick(column.id as TaskTypes)}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
