import axios from "axios";
import { useState } from "react";
import { FaChartLine} from "react-icons/fa6";
import type{ Dispatch , SetStateAction } from "react";
import { IoBarChartOutline, IoPieChartOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbCircleNumber1 } from "react-icons/tb";

const AddWidget = ({ setShowAddWidget,projectId,setRefresh }: { setShowAddWidget: (x:boolean) => void ,projectId:string,setRefresh:Dispatch<SetStateAction<boolean>>}) => {
const[widget,setWidget]=useState<string>("")
const[charType,setChartType]=useState<string>("")
const [error,setError]=useState("")
const token=localStorage.getItem('token')
  const addNewWidget=async()=>{ 
     setError("")
       if (!widget || !charType) {
    setError("Please select both metric and chart type");
    return;
  }
  try {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/project/addMetric`,{
  type:widget,
  chartType:charType,
  projectId:projectId
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
)
   
    setRefresh(prev=>!prev)
     setShowAddWidget(false) 

  } catch (error) {
    setError("error while adding metric")
  }
  
  }
const metric=["Cpu Usage","Memory Usage","Network Traffic","Req/sec","Total User","Active User","Response Time","Error Response"]
const chart=[
"Line Graph",
"Bar Graph",
"Pie Chart",
"Number"
]
const selectedMetric=[
  "cpuUsage",
  "memoryUsage",
  "networkTraffic",
  "reqperSec",
  "totalUser",
  "activeUser",
  "responseTime",
  "errorResponse",
]
const chartType=[
   "LINE_GRAPH",
  "BAR_GRAPH",
  "PIE_CHART",
  "NUMBER",
]

const chartIcon=[
  <FaChartLine /> ,<IoBarChartOutline />,<IoPieChartOutline />  ,<TbCircleNumber1 /> 
]
  const [selectedWidget,setSelectedWidget]=useState<number>()
  const [selectedChart,setSelectChart]=useState<number>()
  return (
    <>
    <div className="fixed top-1 right-102 text-gray-600 text-2xl z-50" onClick={()=>{
      setShowAddWidget(false)}
    } ><RxCross2/>
        </div>
      <div className="fixed top-0 right-0 h-full  min-w-[400px] bg-[#151a1c] z-50 shadow-lg p-5 flex flex-col items-center gap-9">
      
         <h3 className=" font-semibold text-white  h-19  flex items-center justify-center text-2xl">
            Add New Metric Widget
          </h3>

         <div className="flex flex-col gap-2">
            <h5 className="text-lg  text-white">Select the metric</h5>
             <div className="flex flex-col items-center-safe gap- mt-4 text-gray-400 ">
             <div className="grid grid-cols-3  gap-3 ">
              {metric.map((metric,id)=>{
                return(
                  <div key={id} className={`border  rounded-md  h-12 flex items-center justify-center gap-2  cursor-pointer ${selectedWidget===id ?"border-blue-600 bg-blue-300/50 text-blue-800 ":"border-gray-600 hover:bg-[#2F3E46]"} `}
             onClick={()=>{
              setSelectedWidget(id)
              setWidget(selectedMetric[id])
             }}>
              {metric}</div>
             ) })}
               </div> 
             </div>
        </div>
        <div className="flex flex-col gap-2">
        <h5 className="text-lg  text-white">Select the Chart Type</h5>
        <div className="flex flex-col items-center-safe  gap-4 mt-4 text-gray-400 ">
           <div className="grid grid-cols-2  gap-3 w-90 ">
            {
              chart.map((_,id)=>(
             <div key={id} className={`border  rounded-md  h-12 flex items-center justify-center gap-2  cursor-pointer ${selectedChart===id ?"border-blue-600 bg-blue-300/50 text-blue-800 ":"border-gray-600 hover:bg-[#2F3E46]"} `}
             onClick={()=>{
              setSelectChart(id)
              setChartType(chartType[id])
             }}>
                    <span>{chartIcon[id]}</span>{chart[id]}           
                                    </div>
              ))}
                 </div>
          </div>
           
          </div>
          {
            error!="" && (
              <div className="text-red-500 ">
                {error}
              </div>
            )
          }
       <button className=" w-35 h-8 bg-blue-400 hover:bg-blue-500 rounded-md text-white" onClick={addNewWidget}>
        Add The Widget
        </button>
        
        </div>
      
    </>
  );
};

export default AddWidget;