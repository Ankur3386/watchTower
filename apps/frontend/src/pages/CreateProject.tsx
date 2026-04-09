import { useState } from "react";
import GenerateKey from "../components/project/GenerateKey";
import WatchTowerDashboard from "../components/project/ProjectAnimation";
import { Link } from "react-router";

const CreateProject = () => {
  const [showSideBar,setShowSideBar]=useState<boolean>(false)
  return (
    
    <div className="w-full min-h-screen flex justify-center items-center  bg-[#0d1117]" >
      <Link to="/getAllAPi" className="w-[105px] absolute top-4 right-4 h-8 bg-blue-400   rounded-lg text-white  hover:bg-blue-500 flex items-center justify-center"
      onClick={()=>{
        
      }}>Get All keys</Link >
<div className="max-w-[1100px] w-full min-h-[600px] bg-[#141a1c] rounded-xl flex items-center justify-between px-10 py-10">

  {/* Left */}
  <div className="flex-1 max-w-[500px]">
    <div className=" flex flex-col gap-4">
       <h1 className="font-bold text-2xl leading-snug text-white">
      Get Set Up And Start Seeing Your Data In Minutes
    </h1>
    <p className="text-base text-gray-400 leading-relaxed">
      Stay in control with powerful monitoring. Visualize real-time metrics,
      track system health, and gain deep insights into your applications.
      Detect issues early, analyze logs, and respond quickly to performance
      bottlenecks — ensuring your systems run smoothly, reliably, and
      without interruption at all times.
    </p>
    <button className="bg-blue-500 text-white rounded-md w-28 h-9 hover:bg-blue-600 transition-colors"
    onClick={()=>setShowSideBar(true)}>
      Get Your Key
    </button>
    </div>
 
  </div>

  {/* Right */}
  <div className="w-[60%] flex justify-center items-center">
    <div className="h-[340px] w-[540px] overflow-hidden">
      <WatchTowerDashboard/>
    </div>
  </div>

</div>
{showSideBar && (
  <>
    {/*  Dark Overlay as fixed makes it relative to  browser screen  */}
    <div
      className="fixed inset-0 bg-black/50 z-40"
      onClick={() => setShowSideBar(false)}
    />

    <GenerateKey onClose={() => setShowSideBar(false)} />
  </>
)}
    </div>
    
  );
};

export default CreateProject;