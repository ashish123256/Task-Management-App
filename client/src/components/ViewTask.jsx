import React, { useState, useEffect } from "react";

const ViewTask = ({ selectedTask, setShowModal }) => {
  const [title, setTitle] = useState(selectedTask.title);
  const [description, setDescription] = useState(selectedTask.description);
  const [status, setStatus] = useState(selectedTask.status);

  // Setting the task details when the modal is triggered
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setStatus(selectedTask.status);
    }
  }, [selectedTask]);

  return (
    <div>
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-lg font-bold mb-4">View Task</h2>

          <div className="mb-4">
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              readOnly // Make the title read-only
              className="w-full p-2 border rounded-lg bg-gray-100"
              placeholder="Task title"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              readOnly // Make the description read-only
              className="w-full p-2 border rounded-lg bg-gray-100"
              rows="4"
              placeholder="Task description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              readOnly // Make the status read-only
              className="w-full p-2 border rounded-lg bg-gray-100"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
