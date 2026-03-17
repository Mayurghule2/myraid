export default function TaskCard({ task, onDelete, onUpdate }) {
  const isCompleted = task.status === "completed";

  return (
    <div className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition flex flex-col justify-between h-full">
      
      {/* Top */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 break-words">
            {task.title}
          </h3>

          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm break-words">
          {task.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-5">
        {!isCompleted && (
          <button
            onClick={() => onUpdate(task._id, "completed")}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}