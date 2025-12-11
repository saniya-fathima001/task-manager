import { useState } from "react";
import Navbar from "./components/Navbar";
import BoardColumn from "./components/BoardColumn";
import TaskModal from "./components/TaskModal";
import FilterBar from "./components/FilterBar";
import useLocalStorage from "./hooks/useLocalStorage";
import initialTasks from "./data/tasks.json";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { DragDropContext } from "@hello-pangea/dnd";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", () => initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    priority: "All",
    status: "All",
    sort: "newest",
  });

  const getFilteredTasks = () => {
    let result = [...tasks];

    if (filters.priority !== "All") {
      result = result.filter((t) => t.priority === filters.priority);
    }

    if (filters.status !== "All") {
      result = result.filter((t) => t.status === filters.status);
    }

    if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sort === "closest") {
      result.sort(
        (a, b) =>
          new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity)
      );
    }

    return result;
  };

  const filteredTasks = getFilteredTasks();

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? taskData : t))
      );
    } else {
      const newTask = {
        id: uuidv4(),
        createdAt: dayjs().toISOString(),
        ...taskData,
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setIsModalOpen(false);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id.toString() === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <Navbar onAddTask={handleAddTask} />

      <main className="p-6 max-w-7xl mx-auto animate-fadeIn">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4 tracking-tight">
          Your Boards
        </h2>

        <FilterBar filters={filters} setFilters={setFilters} />

        <div
          className="
            mt-4 p-4 rounded-xl 
            bg-white/40 backdrop-blur-sm 
            shadow-inner border border-slate-200
          "
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BoardColumn
                title="To-Do"
                tasks={filteredTasks.filter((t) => t.status === "To-Do")}
                onTaskClick={handleTaskClick}
              />

              <BoardColumn
                title="In-Progress"
                tasks={filteredTasks.filter((t) => t.status === "In-Progress")}
                onTaskClick={handleTaskClick}
              />

              <BoardColumn
                title="Completed"
                tasks={filteredTasks.filter((t) => t.status === "Completed")}
                onTaskClick={handleTaskClick}
              />
            </div>
          </DragDropContext>
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        initialTask={selectedTask}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
