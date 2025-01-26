import React, { useState } from "react";

const CreateTask = ({ createTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      createTask({ title, description, status });
      setTitle("");
      setDescription("");
      setShowModal(false); // Close modal after submission
    } else {
      alert("Title and description are required!");
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Create Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Create Task</h2>

            <div className="mb-4">
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter task title"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="4"
                placeholder="Enter task description"
              ></textarea>
            </div>

            

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
