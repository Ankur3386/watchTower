import axios from "axios";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineGraph from "../components/charts/LineGraph";
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import BarGraph from "../components/charts/BarGraph";
import PieGraph from "../components/charts/PieGraph";
import AddWidget from "../components/project/AddWidget";
import useIntervalFetch from "../components/project/useInterval";

type metricData={
  chartType:string,
  data:any,
  metric:string
}

  const ProjectPage = () => {
  const { projectName, projectId } = useParams<{ projectName: string; projectId: string }>();
  const [chartData, setChartData] = useState<any[]>([]);
  const [showDefaultIcon,setShowDefaultIcon]=useState(false)
  const [showAddWidget,setShowAddWidget]=useState(false)
  const [refresh,setRefresh]=useState(false)
  const [enabled,setEnabled]=useState(false)
  const token=localStorage.getItem("token")
   useIntervalFetch(projectId!,token!,setChartData,enabled,chartData)
  useEffect(() => {
    if (!projectId) return;
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/project/getUserDefaultData?projectId=${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
         setChartData(res.data);
         console.log(res)
         setEnabled(true)
      } catch (err) {
        console.log(err)
        console.error(err);
      }
    };

    fetchMetrics();
  }, [projectId,refresh]);

  const getGraph=(data:metricData)=>{
     if(data.chartType==="LINE_GRAPH"){return(
        <LineGraph data={data.data} metric={data.metric}/>
     )
     }else if(data.chartType==="BAR_GRAPH"){
      return(
      <BarGraph data={data.data} metric={data.metric}/>
      ) 
     }else if(data.chartType==="PIE_CHART"){
      return(
      <PieGraph data={data.data} />
      )}}

  return (
    <div className=" w-full h-full bg-[#0e1212]  flex flex-col gap-15">
<div className="flex justify-between items-center pb-10 ">
        <div>
          <h1 className="text-white font-bold text-3xl">{projectName}</h1>
        </div>
        <div className="flex gap-3 ">
          <button className="w-25 h-6 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center justify-center gap-1 cursor-pointer"
          onClick={()=>{
          setShowAddWidget(true);
          }}><span className="text-xl">+</span>Add Widget</button>
                   <button className="w-29 h-6 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center justify-center gap-1 cursor-pointer"
          onClick={()=>{
          setShowDefaultIcon((prev)=>!prev)
          }}><span className="text-xl"><CiClock2 /></span>Default UTC {showDefaultIcon?<IoIosArrowUp/>:<IoIosArrowDown/>}</button>
        </div>
        
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">{
    chartData.map((data,id)=>{
      return(
      <div key={id}>
        <div className="rounded-md bg-[#151a1c] min-w-[400px] w-full overflow-hidden">
            {getGraph(data)}
        </div>        
      </div>
      )
    })
    }</div>
 {showAddWidget && (
<div>
     <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setShowAddWidget(false)}
      >
      </div>
       <AddWidget setShowAddWidget={setShowAddWidget} projectId={projectId!} setRefresh={setRefresh}/>
</div> 
)}
    </div>
  );
};

export default ProjectPage;