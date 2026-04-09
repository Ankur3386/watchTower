import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import CpuUsageChart from "./chart"

const RightComponent = () => {
      const navigate=useNavigate()
  return (
   <div className="w-[35%] bg-[#212529] flex flex-col items-center gap-4  ">
     <div className="  w-[90%]   rounded-2xl h-13 bg-black flex items-center gap-3 "
      style={{marginTop:'10px'}}>
        <span className="text-gray-500 text-4xl h-[70%] cursor-pointer"
        style={{marginLeft:'8px'}} onClick={()=>{
            navigate('/sign-in')
        }}><CgProfile/></span>
        <button className=" w-[35%] h-[70%] bg-blue-500 rounded-3xl text-xs md:text-lg text-white font-bold cursor-pointer"
        style={{marginLeft:'6px'}}
        onClick={()=>{
            navigate('/sign-in')
        }}>Sign In</button>
        <button className="w-[50%] h-[70%] bg-green-500 rounded-3xl text-white text-xs md:text-xs lg:text-md font-bold cursor-pointer"
         style={{marginLeft:'6px'}}
         onClick={()=>{
            navigate('/sign-up')
        }}>Get Started Free</button>
     </div>
  <div className="flex flex-col w-[95%] h-[65%] bg-black  rounded-2xl "
  style={{marginTop:'60px',padding:'15px',paddingTop:'60px'}}>
  <div>
    <CpuUsageChart />
  </div>

  <div className="text-gray-500 text-xl px-4 mt-4">
    Provides high-fidelity metrics for accurate system observability and performance insights
  </div>
</div>
   </div>
  )
}

export default RightComponent