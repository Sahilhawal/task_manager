"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import { Task, TaskTypes, COLUMNS } from "./constants";
import AddTaskModal from "./components/AddTaskModal";

const STORAGE_KEY = "tasks_list";
export default function Home() {
  const [addedTasks, setAddedTasks] = useState<Task[]>([]);
  const [startedTasks, setStartedTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addTaskType, setAddTaskType] = useState<TaskTypes>();
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const { added, started, completed } = JSON.parse(storedData);
      setAddedTasks(added || []);
      setStartedTasks(started || []);
      setCompletedTasks(completed || []);
    }
  }, []);

  useEffect(() => {
    storeDataToLocalStorage();
  }, [addedTasks, startedTasks, completedTasks]);

  const storeDataToLocalStorage = () => {
    const dataToStore = {
      added: addedTasks,
      started: startedTasks,
      completed: completedTasks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
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

    const sourceColId = source.droppableId;
    const destinationColId = destination.droppableId;

    if (sourceColId === destinationColId) {
      return;
    }

    const startTasks = getTasksByType(sourceColId);
    const [removed] = startTasks.splice(source.index, 1);
    const endTasks = getTasksByType(destinationColId);
    endTasks.splice(destination.index, 0, removed);

    setTasksByType(sourceColId, startTasks);
    setTasksByType(destinationColId, endTasks);
  };

  const getTasksByType = (type: string) => {
    if (type == "added") return addedTasks;
    else if (type == "started") return startedTasks;
    else return completedTasks;
  };

  const setTasksByType = (type: string, tasks: any) => {
    if (type == "added") setAddedTasks(tasks);
    if (type == "started") setStartedTasks(tasks);
    if (type === "completed") setCompletedTasks(tasks);
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

  const handleAddTask = () => {
    if (addTaskType === "added")
      setAddedTasks([...addedTasks, buildTaskObj(task)]);
    if (addTaskType === "started")
      setStartedTasks([...startedTasks, buildTaskObj(task)]);
    if (addTaskType === "completed")
      setCompletedTasks([...completedTasks, buildTaskObj(task)]);

    setShowAddForm(false);
  };

  const handleDeleteTask = (type: TaskTypes, taskId: number) => {
    const tasks = getTasksByType(type);
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasksByType(type, updatedTasks);
  };

  return (
    <>
      {showAddForm && (
        <AddTaskModal
          onInputChange={(e: any) => setTask(e.target.value)}
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
            <TaskList
              key={"added"}
              column={COLUMNS["added"]}
              tasks={addedTasks}
              onAddClick={() => onAddClick("added")}
              onDeleteClick={handleDeleteTask}
            />
            <TaskList
              key={"started"}
              column={COLUMNS["started"]}
              tasks={startedTasks}
              onAddClick={() => onAddClick("started")}
              onDeleteClick={handleDeleteTask}
            />
            <TaskList
              key={"completed"}
              column={COLUMNS["completed"]}
              tasks={completedTasks}
              onAddClick={() => onAddClick("completed")}
              onDeleteClick={handleDeleteTask}
            />
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
