import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const TaskList = ({ title,tasks, onEdit, onDelete, onView }) => {
  if (!tasks.length) {
    return (
      <div className="mt-4">
        <p className="text-gray-600 text-center">No tasks to display</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="p-4 bg-white rounded-lg shadow flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onView(task._id)} // View button
                >
                  <FaEye />
                </button>
                <button
                  className="text-yellow-500 hover:text-yellow-700"
                  onClick={() => onEdit(task)} // Edit button
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(task)} // Delete button
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
