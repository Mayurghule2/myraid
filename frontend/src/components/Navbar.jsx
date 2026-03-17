import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h2
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-gray-800 cursor-pointer tracking-tight"
        >
          Task Manager
        </h2>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}