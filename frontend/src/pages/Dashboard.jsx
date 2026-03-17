import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await API.get(
      `/tasks?page=${page}&status=${status}&search=${search}`
    );
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, search]);

  const createTask = async () => {
    if (!form.title.trim()) return;
    await API.post("/tasks", form);
    alert("Task created successfully!");
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    alert("Are you sure you want to delete this task?");
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    alert("Are you sure you want to update the status of this task?");
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Dashboard
        </h2>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            placeholder="Search tasks..."
            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Create Task */}
        <div className="bg-white p-4 md:p-5 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-3">
          <input
            placeholder="Task title"
            value={form.title}
            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={form.description}
            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={createTask}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>

        {/* Tasks Grid */}
        <div className="mt-4">

  {/* Section Header */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
      Your Tasks
    </h3>

    <span className="text-sm text-gray-500">
      {tasks.length} items
    </span>
  </div>

  {/* Empty State */}
  {tasks.length === 0 ? (
    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
      No tasks found
    </div>
  ) : (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="transition transform hover:-translate-y-1 hover:shadow-lg"
        >
          <TaskCard
            task={task}
            onDelete={deleteTask}
            onUpdate={updateStatus}
          />
        </div>
      ))}
    </div>
  )}

</div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold text-gray-700">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}