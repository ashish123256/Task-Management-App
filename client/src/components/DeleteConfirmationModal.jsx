import React from "react";

const DeleteConfirmationModal = ({ task, showModal, setShowModal, onDelete }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this task?</h2>
        <div className="mb-4">
          <p className="text-gray-700">Task: {task.title}</p>
          <p className="text-gray-500">{task.description}</p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(false)} // Close modal
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onDelete(task._id)} // Confirm delete
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
