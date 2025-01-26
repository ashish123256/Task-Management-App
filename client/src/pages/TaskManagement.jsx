import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateTask from "../components/CreateTask";
import ViewTask from "../components/ViewTask"; // Import ViewTask component
import UpdateTask from "../components/UpdateTask"; // Import UpdateTask component
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { apiUrl } from "../baseUrl";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]); // All tasks fetched from API
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks based on status
  const { currentUser } = useSelector((state) => state.user); // Redux selector for current user

  // For editing and viewing a task
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter is "All"

  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/task/gettasks`, {
        credentials: "include", // Ensures cookies are sent
      });
      const data = await response.json();
      setTasks(data.tasks || []); // Update tasks
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Filter tasks based on selected status
  const filterTasksByStatus = (status) => {
    if (status === "All") {
      setFilteredTasks(tasks); // Show all tasks
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered); // Show only tasks with the selected status
    }
  };

  // View a task (fetch task details from backend)
  const handleViewTask = async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/api/task/gettask/${taskId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setSelectedTask(data.task); // Set task data to show in modal
        setShowViewModal(true); // Show view task modal
      } else {
        console.error("Failed to fetch task:", data.message);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // Create a task
  const createTask = async (formData) => {
    if (!currentUser || !currentUser._id) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id, // Pass the current user's ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Task created successfully:", data);
        fetchAllTasks(); // Refresh task list after creation
      } else {
        console.error("Failed to create task:", data.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handle Edit action (open the Edit modal with the selected task)
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  // Update task
  const updateTask = async (formData) => {
    if (!currentUser || !currentUser._id) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/task/update/${selectedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id, // Pass the current user's ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Task updated successfully:", data);
        fetchAllTasks(); // Refresh task list after update
        setShowEditModal(false); // Close modal after saving
      } else {
        console.error("Failed to update task:", data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
 

  // Handle Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/api/task/delete/${taskId}`, {
        method: "DELETE",
        credentials: "include", // Ensures cookies are sent
      });
      const data = await response.json();
      if (response.ok) {
        setShowDeleteModal(false); // Close delete modal
        fetchAllTasks(); // Refresh task list after deletion
      } else {
        console.error("Failed to delete task:", data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


   // Dynamic title based on statusFilter
   const getTitle = () => {
    switch (statusFilter) {
      case "Pending":
        return "Pending Tasks";
      case "Completed":
        return "Completed Tasks";
      case "Done":
        return "Done Tasks";
      default:
        return "All Tasks";
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Update filtered tasks whenever the statusFilter changes
  useEffect(() => {
    filterTasksByStatus(statusFilter);
  }, [statusFilter, tasks]); // Trigger filtering when tasks or filter changes

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar fetchAllTasks={fetchAllTasks} setStatusFilter={setStatusFilter} />
      <div className="flex-1 p-6">
        <CreateTask createTask={createTask} />
        <TaskList
         title={getTitle()}
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onView={handleViewTask}
          onDelete={(task) => {
            setSelectedTask(task);
            setShowDeleteModal(true); // Show delete confirmation modal
          }}
        />

        {/* View Task Modal */}
        {showViewModal && (
          <ViewTask selectedTask={selectedTask} setShowModal={setShowViewModal} />
        )}

        {/* Edit Task Modal */}
        {showEditModal && (
          <UpdateTask
            selectedTask={selectedTask}
            updateTask={updateTask}
            setShowModal={setShowEditModal}
          />
        )}

        {/* Delete Task Confirmation Modal */}
        {showDeleteModal && (
          <DeleteConfirmationModal
            task={selectedTask}
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
