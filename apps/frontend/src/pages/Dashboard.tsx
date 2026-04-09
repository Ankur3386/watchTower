import axios, {  } from "axios";
import { useEffect, useState} from "react";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";

interface Project {
  projectId: string;
  projectName: string;
  username: string;
  createdOn: string;
}
const TOKEN = localStorage.getItem("token")
// ── Helpers ──────────────────────────────────────────────
const fmt = (d: string): string =>
  new Date(d).toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });



export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch]     = useState<string>("");
  const [starred, setStarred]   = useState<string[]>([]);
  const [showRec, setShowRec]   = useState<boolean>(true);
  const [showSearch, setShowSearch]   = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`,
         { headers: { Authorization:`Bearer ${TOKEN}` } })
      .then((r) => setProjects(r.data.data||[]))
      .catch(console.error);
  }, []);

  const toggle = (id: string): void =>
    setStarred((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const rows: Project[] = projects.filter((p) =>
    [p.username, p.projectName].some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="h-screen bg-[#111217] text-gray-200 ">
<div className="h-[45%]">
   {/* Topbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">Dashboards</span>
          <button className="px-3 py-1 text-xs bg-[#1e2128] text-gray-300 border border-white/10 rounded cursor-pointer">
            Save view
          </button>
        </div>
        <div className="flex gap-2 ">
          {(["💬",  "🔗", "👤"] as string[]).map((ic) => (
            <button key={ic} className="w-8 h-8 flex items-center justify-center bg-[#1e2128] border border-white/10 rounded text-sm cursor-pointer hover:bg-[#252830]">
              {ic}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 px-5 pt-3">
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium bg-[#1f60c4] text-white border-none rounded cursor-pointer hover:bg-[#2d74d8]"
        onClick={()=>{
          navigate('/project')
        }}>
          + Create a New Project
        </button>
      </div>

      {/* Recommended header */}
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-2">
        <button
          onClick={() => setShowRec((v) => !v)}
          className="bg-transparent border-none text-gray-400 cursor-pointer text-sm"
        >
          {showRec ? "▾" : "▸"}
        </button>
        <span className="text-sm font-semibold">Recent Opened Project</span>
        <button className="bg-transparent border-none text-[#4c9ffe] text-sm cursor-pointer hover:text-blue-300">
          View all
        </button>
      </div>

</div>
   <div>
    <div className="flex items-center gap-2 px-5 py-3">
        <div className="relative">
    {showSearch && (  <div className=" absolute text-gray-500  font-bold  text-xl flex items-center justify-center   "><CiSearch/> </div>)}       
   

      <input
            className="bg-gray-700 border border-white/10 rounded text-gray-200 text-sm pl-10 pr-3 py-1.5 outline-none w-56 placeholder-gray-500 focus:border-blue-500/50 text-left placeholder:text-center"
            placeholder="Search by entity name"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            onFocus={() => setShowSearch(false)}   // hide icon when typing
            onBlur={() => {
              if (search === "") {
                setShowSearch(true);  // show icon again only if empty
              }
            }}
       />
        </div>
        <div className="flex items-center gap-1.5 bg-[#1a2744] border border-[#1f60c4]/50 rounded px-2.5 py-1.5 text-xs">
          <span className="text-gray-500">Entity Type =</span>
          <span className="text-[#4c9ffe] font-semibold">Dashboard</span>
          <span className="text-gray-500">+</span>
        </div>
      </div>

      {/* Table */}
      <div className="mx-5 mb-5 border border-white/5 rounded-md overflow-hidden bg-[#181b1f]">

        {/* Head */}
        <div className="grid grid-cols-[48px_1fr_1fr_1fr] px-4 h-10 items-center border-b border-white/[0.08] text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          <div /><div>Name ↑</div><div>Created by</div><div>Created on</div>
        </div>

        {/* Rows */}
        {rows.length ? rows.map((p: Project, i: number) => (
          <div
            key={p.projectId}
            className={`grid grid-cols-[48px_1fr_1fr_1fr] px-4 h-12 items-center text-sm hover:bg-white/[0.03] transition-colors ${i < rows.length - 1 ? "border-b border-white/5" : ""}`}
          >
            <button
              onClick={() => toggle(p.projectId)}
              className="bg-transparent border-none cursor-pointer text-lg flex items-center"
              style={{ color: starred.includes(p.projectId) ? "#f59e0b" : "#6b7280" } }
            >
              {starred.includes(p.projectId) ? <IoIosStar /> : <IoIosStarOutline />}
            </button>

            <span
              className="text-[#4c9ffe] font-medium cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate(`/project/${p.projectName}/${p.projectId}`)}
            >
              {p.projectName}
            </span>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2d3748] flex items-center justify-center text-[11px] font-bold text-gray-400 shrink-0">
                {p.username[0].toUpperCase()}
              </div>
              <span className="font-mono text-[12.5px] text-gray-400">{p.username}</span>
            </div>

            <span className="font-mono text-[12.5px] text-gray-400">{fmt(p.createdOn)}</span>
          </div>
        )) : (
          <p className="text-center py-12 text-gray-600 text-sm">No dashboards found</p>
        )}
      </div>
   </div>
     
      {/* Search toolbar */}
     
    </div>
  );
}