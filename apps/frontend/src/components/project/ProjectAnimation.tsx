import { useState } from "react";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const waveData1 = [
  { x: 0, a: 40, b: 60, c: 30 }, { x: 1, a: 55, b: 45, c: 50 }, { x: 2, a: 35, b: 70, c: 45 },
  { x: 3, a: 65, b: 40, c: 60 }, { x: 4, a: 45, b: 65, c: 35 }, { x: 5, a: 70, b: 50, c: 55 },
  { x: 6, a: 40, b: 75, c: 40 }, { x: 7, a: 60, b: 45, c: 65 },
];
const waveData2 = [
  { x: 0, v: 30 }, { x: 1, v: 50 }, { x: 2, v: 40 }, { x: 3, v: 65 },
  { x: 4, v: 45 }, { x: 5, v: 70 }, { x: 6, v: 55 }, { x: 7, v: 60 },
];
const waveData3 = [
  { x: 0, v: 50 }, { x: 1, v: 35 }, { x: 2, v: 60 }, { x: 3, v: 40 },
  { x: 4, v: 70 }, { x: 5, v: 45 }, { x: 6, v: 65 }, { x: 7, v: 50 },
];
const smallWave = [
  { x: 0, v: 45 }, { x: 1, v: 60 }, { x: 2, v: 40 }, { x: 3, v: 70 },
  { x: 4, v: 50 }, { x: 5, v: 65 }, { x: 6, v: 45 }, { x: 7, v: 55 },
];
const sidebarRows = [
  { w: "w-24" }, { w: "w-20" }, { w: "w-28" }, { w: "w-16" }, { w: "w-24" },
  { w: "w-20" }, { w: "w-28" }, { w: "w-16" }, { w: "w-24" },
];

const hexData = [
  { color: "bg-red-400" }, { color: "bg-red-500" }, { color: "bg-orange-400" },
  { color: "bg-red-400" }, { color: "bg-red-300" }, { color: "bg-green-500" },
  { color: "bg-red-500" }, { color: "bg-orange-500" }, { color: "bg-red-400" },
  { color: "bg-red-300" }, { color: "bg-green-400" }, { color: "bg-red-500" },
  { color: "bg-orange-400" }, { color: "bg-red-400" }, { color: "bg-green-500" },
];

const WatchTowerLogo = ({ size = 32 }) => (
  <img
    src="logo.png"
    alt="logo"
    style={{ height: size }}
    className="w-auto"
  />
);
const Card = ({ children, className = "" }:{children:any ,className:string}) => (
  <div className={`rounded-lg bg-[#1e2330] border border-[#2a3040] p-3 ${className}`}>
    {children}
  </div>
);

const CardHeader = () => (
  <div className="flex justify-between items-center mb-2">
    <div className="max-h-2 max-w-20 bg-[#3a4255] rounded-full"/>
    <div className="flex gap-1">
      <div className="h-1.5 w-1.5 rounded-full bg-[#3a4255]"/>
      <div className="h-1.5 w-1.5 rounded-full bg-[#3a4255]"/>
    </div>
  </div>
);

export default function WatchTowerDashboard() {
  const [active, setActive] = useState(2);

  return (
    <div className=" bg-[#0d1117] flex items-center justify-center font-mono p-2">
      {/* Mac-style window */}
      <div className="max-w-full  rounded-xl overflow-hidden shadow-2xl border border-[#2a3040]" style={{background:"#141820"}}>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1319] border-b border-[#2a3040]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"/>
        </div>

        <div className="flex h-[400px]">
          {/* Sidebar */}
          <div className="w-30 bg-[#111520] border-r border-[#2a3040] flex flex-col p-3 gap-1 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <WatchTowerLogo size={32}/>
              <div>
                <div className="text-[#2980d4] text-xs font-bold leading-none">Watch</div>
                <div className="text-[#f5a623] text-xs font-bold leading-none">Tower</div>
              </div>
            </div>
            {/* Search bar */}
            <div className="h-7 w-full bg-[#1e2330] rounded-md border border-[#2a3040] mb-3 flex items-center px-2">
              <div className="h-1.5 w-20 bg-[#3a4255] rounded-full"/>
            </div>
            {/* Nav items */}
            {sidebarRows.map((r, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${active === i ? "bg-[#1e2d4a]" : "hover:bg-[#1a2030]"}`}
              >
                <div className={`w-3 h-3 rounded-sm ${active === i ? "bg-[#2980d4]" : "bg-[#3a4255]"}`}/>
                <div className={`h-1.5 rounded-full ${r.w} ${active === i ? "bg-[#4a90d9]" : "bg-[#3a4255]"}`}/>
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 overflow-auto bg-[#141820]">
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full">

              {/* Chart 1 - large multi-line */}
              <Card className="col-span-2 row-span-1">
                <CardHeader/>
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={waveData1}>
                    <Line type="monotone" dataKey="a" stroke="#f5a623" strokeWidth={2} dot={false}   animationDuration={2000}/>
                    <Line type="monotone" dataKey="b" stroke="#e05252" strokeWidth={2} dot={false}   animationDuration={2000}/>
                    <Line type="monotone" dataKey="c" stroke="#52b0e0" strokeWidth={1.5} dot={false}   animationDuration={2000}/>
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-3 mt-1.5">
                  {["#f5a623","#e05252","#52b0e0"].map((c,i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{background:c}}/>
                      <div className="h-1.5 w-12 bg-[#3a4255] rounded-full"/>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Chart 2 - green line */}
              <Card className="col-span-1 row-span-1">
                <CardHeader/>
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={smallWave}>
                    <Line type="monotone" dataKey="v" stroke="#4ade80" strokeWidth={2} dot={false}   animationDuration={2000}/>
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#4ade80]"/>
                  <div className="h-1.5 w-14 bg-[#3a4255] rounded-full"/>
                </div>
              </Card>

              {/* Right text card */}
              <Card className="col-span-1 row-span-2 flex flex-col gap-2">
                <div className="h-2 w-20 bg-[#3a4255] rounded-full mb-1"/>
                {[...Array(8)].map((_,i) => (
                  <div key={i} className="h-1.5 rounded-full bg-[#2a3040]" style={{width:`${60+Math.random()*30}%`}}/>
                ))}
                <div className="mt-2 space-y-2">
                  {[["#f5a623","w-20"],["#e05252","w-14"],["#f5a623","w-16"],["#e05252","w-10"]].map(([c,w],i)=>(
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{background:c}}/>
                      <div className={`h-1.5 ${w} bg-[#3a4255] rounded-full`}/>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="h-2 w-16 bg-[#3a4255] rounded-full mb-2"/>
                  <div className="flex flex-wrap gap-1">
                    {hexData.map((h,i)=>(
                      <div key={i} className={`w-3  h-4 rounded-sm ${h.color} opacity-80`}/>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Chart 3 - area blue */}
              <Card className="col-span-2 row-span-1">
                <CardHeader/>
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={waveData2}>
                    <defs>
                      <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2980d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2980d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#2980d4" strokeWidth={2} fill="url(#areaBlue)" dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[#2980d4]"/>
                  <div className="h-1.5 w-16 bg-[#3a4255] rounded-full"/>
                </div>
              </Card>

              {/* Chart 4 - area blue2 */}
              <Card className="col-span-1 row-span-1">
                <CardHeader/>
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={waveData3}>
                  
                      <linearGradient id="areaBlue2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3090e8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3090e8" stopOpacity={0}/>
                      </linearGradient>
                   
                    <Area type="monotone" dataKey="v" stroke="#3090e8" strokeWidth={2} fill="url(#areaBlue2)" dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[#3090e8]"/>
                  <div className="h-1.5 w-14 bg-[#3a4255] rounded-full"/>
                </div>
              </Card>

              {/* Bottom table card */}
              <Card className="col-span-3 row-span-1">
                <CardHeader/>
                <div className="space-y-2">
                  {[...Array(3)].map((_,i) => (
                    <div key={i} className="grid grid-cols-4 gap-2">
                      {[..."abcd"].map((k,j) => (
                        <div key={j} className="h-1.5 rounded-full bg-[#2a3040]" style={{opacity: 0.5+j*0.15}}/>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}