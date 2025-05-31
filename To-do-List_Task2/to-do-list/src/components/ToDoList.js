import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Check,
  X,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(()=>{
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [newTime, setNewTime] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortAsc, setSortAsc] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      dueDate: newDate || null,
      dueTime: newTime || null,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setNewDate("");
    setNewTime("");
    setShowForm(false);
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(newSortBy);
      setSortAsc(true);
    }
  };

  const isOverdue = (task) => {
    if (!task.dueDate) return false;
    const now = new Date();
    const taskDateTime = new Date(`${task.dueDate}T${task.dueTime || "23:59"}`);
    return taskDateTime < now && !task.completed;
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "overdue") return isOverdue(task);
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "dueDate") {
      const aDate = a.dueDate
        ? new Date(`${a.dueDate}T${a.dueTime || "00:00"}`)
        : new Date("9999-12-31");
      const bDate = b.dueDate
        ? new Date(`${b.dueDate}T${b.dueTime || "00:00"}`)
        : new Date("9999-12-31");
      comparison = aDate - bDate;
    } else if (sortBy === "text") {
      comparison = a.text.localeCompare(b.text);
    } else if (sortBy === "created") {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }

    return sortAsc ? comparison : -comparison;
  });

  const formatDate = (dateStr, timeStr) => {
    if (!dateStr) return "No due date";
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateText = "";
    if (date.toDateString() === today.toDateString()) {
      dateText = "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dateText = "Tomorrow";
    } else {
      dateText = date.toLocaleDateString();
    }

    return timeStr ? `${dateText} at ${timeStr}` : dateText;
  };

  const getTaskPriority = (task) => {
    if (task.completed) return "completed";
    if (isOverdue(task)) return "overdue";
    if (task.dueDate) {
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      const diffDays = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) return "urgent";
      if (diffDays <= 3) return "important";
    }
    return "normal";
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Smart Todo List
        </h1>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg"
          >
            <Plus size={20} />
            Add New Task
          </button>
        </div>

        {/* Imput for field */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showForm ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Clock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddTask}
                disabled={!newTask.trim()}
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Check size={18} />
                Add Task
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center justify-center gap-2 p-3 bg-gray-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Sort buttons fir the filter property impelemention  */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "active", "completed", "overdue"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => handleFilterChange(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === filterOption
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Filter className="inline mr-1" size={14} />
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { key: "dueDate", label: "Due Date" },
            { key: "text", label: "Name" },
            { key: "created", label: "Created" },
          ].map((sortOption) => (
            <button
              key={sortOption.key}
              onClick={() => handleSortChange(sortOption.key)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                sortBy === sortOption.key
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {sortBy === sortOption.key ? (
                sortAsc ? (
                  <SortAsc size={14} />
                ) : (
                  <SortDesc size={14} />
                )
              ) : (
                <SortAsc size={14} />
              )}
              {sortOption.label}
            </button>
          ))}
        </div>

        {/* All the task that is added is displaced in the section */}
        <div className="space-y-3">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg">No tasks found</p>
              <p className="text-sm">Add a new task to get started!</p>
            </div>
          ) : (
            sortedTasks.map((task, index) => {
              const priority = getTaskPriority(task);
              return (
                <div
                  key={task.id}
                  className={`group flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                    priority === "completed"
                      ? "bg-green-50 border-l-4 border-green-400"
                      : priority === "overdue"
                      ? "bg-red-50 border-l-4 border-red-400"
                      : priority === "urgent"
                      ? "bg-orange-50 border-l-4 border-orange-400"
                      : priority === "important"
                      ? "bg-yellow-50 border-l-4 border-yellow-400"
                      : "bg-white border-l-4 border-gray-200"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "slideInUp 0.5s ease-out",
                  }}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleCompletion(task.id)}
                      className="mt-1 w-5 h-5 text-blue-600 rounded transition-all duration-200"
                    />
                    <div className="flex-1">
                      <div
                        className={`font-medium transition-all duration-200 ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.text}
                      </div>
                      <div
                        className={`text-sm mt-1 flex items-center gap-2 ${
                          priority === "overdue"
                            ? "text-red-600 font-medium"
                            : priority === "urgent"
                            ? "text-orange-600 font-medium"
                            : priority === "important"
                            ? "text-yellow-600 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        <Calendar size={12} />
                        {formatDate(task.dueDate, task.dueTime)}
                        {priority === "overdue" && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            OVERDUE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Lower menu describing the number of tasks due and completed adn active */}
        {tasks.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {tasks.filter((t) => !t.completed).length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {tasks.filter((t) => t.completed).length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {tasks.filter((t) => isOverdue(t)).length}
                </div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx="true">{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ToDoList;
