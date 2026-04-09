import axios from "axios";
import { useEffect, useState } from "react";
import type { project } from "../utils/types";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";

const Dashboard = () => {
  const BACKEND_URL = "http://localhost:3000/api/v1";

  const [projects, setProjects] = useState<project[]>([]);
  const [search, setSearch] = useState("");
  const [starred, setStarred] = useState<string[]>([]);

  const toggle = (id: string) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const token =
    "YOUR_TOKEN";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProjects(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  const rows = projects.filter(
    (p) =>
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      p.projectName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-screen min-h-screen flex flex-col text-white bg-gray-900">

      {/* Header */}
      <div className="px-10 pt-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Dashboards</h1>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">

        <div className="w-full max-w-7xl gap-5 flex flex-col ">

          {/* Search */}
          <div className="flex items-center gap-6 mb-12">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-96 px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          {/* Table */}
          <div className="w-full bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg">

            {/* Head */}
       <div className="grid grid-cols-[60px_2fr_1.5fr_1fr] px-8 py-4 border-b border-gray-700 text-sm text-gray-400 uppercase tracking-wider font-semibold">
              <div></div>
              <div>Project Name</div>
              <div>Created By</div>
              <div>Created On</div>
            </div>

            {/* Body */}
            {rows.map((p, i) => (
              <div
                key={p.projectId}
                className={`grid grid-cols-4 px-8 py-4 items-center cursor-pointer text-lg transition hover:bg-gray-700 ${
                  i < rows.length - 1 ? "border-b border-gray-700" : ""
                }`}
              >
                {/* Star */}
                <button onClick={() => toggle(p.projectId)}>
                  {starred.includes(p.projectId) ? (
                    <IoIosStar className="text-yellow-400 text-xl" />
                  ) : (
                    <IoIosStarOutline className="text-gray-400 text-xl" />
                  )}
                </button>

                {/* Project Name */}
                <div className="font-semibold text-lg">
                  {p.projectName}
                </div>

                {/* Username */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
                    {p.username[0].toUpperCase()}
                  </div>
                  <span className="text-gray-400">
                    {p.username}
                  </span>
                </div>

                {/* Date */}
                <div className="text-gray-400">
                  {new Date(p.createdOn).toLocaleDateString()}
                </div>
              </div>
            ))}

            {rows.length === 0 && (
              <p className="text-center text-gray-500 py-20 text-xl">
                No projects found
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;