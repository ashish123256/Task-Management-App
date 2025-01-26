import { ClipboardList, ClipboardCheck, ListTodo, Check } from "lucide-react";

const Sidebar = ({ setStatusFilter }) => {
  return (
    <div>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 justify-between items-center">
            <span className="text-lg font-bold">Task Management</span>
          </div>
          <ul className="flex-1 px-3 mt-5">
            <li
              className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 cursor-pointer"
              onClick={() => setStatusFilter("All")}
            >
              <ClipboardList /> All Tasks
            </li>
            <li
              className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 cursor-pointer"
              onClick={() => setStatusFilter("Completed")}
            >
              <ClipboardCheck /> Completed Tasks
            </li>
            <li
              className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 cursor-pointer"
              onClick={() => setStatusFilter("Pending")}
            >
              <ListTodo /> Pending Tasks
            </li>
            <li
              className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 cursor-pointer"
              onClick={() => setStatusFilter("Done")}
            >
              <Check /> Done Tasks
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
