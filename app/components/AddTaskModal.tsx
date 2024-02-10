import { useState } from "react";
import PrimaryButton from "./buttons/Primary";
import SecondaryButton from "./buttons/SecondaryButton";

type props = {
  onClickAdd: Function;
  onCloseClick: Function;
};
const AddTaskModal: React.FC<props> = ({ onClickAdd, onCloseClick }) => {
  const [task, setTask] = useState("");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <dialog
        open
        className="fixed inset-0 flex items-center justify-center rounded-lg"
      >
        <div className="relative shadow dark:bg-gray-700 w-[400px] rounded-lg">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              New Task
            </h3>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <input
              type="text"
              onChange={(e) => setTask(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter task..."
            />
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <PrimaryButton label="Add" onClick={() => onClickAdd(task)} />
            <SecondaryButton onClick={() => onCloseClick()} label={"Close"} />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddTaskModal;
