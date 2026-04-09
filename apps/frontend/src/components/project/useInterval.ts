import axios from "axios";
import { useEffect, useRef } from "react";


const getLastTimestamp = (data: any[]) => {
  let lastTimeStamp:any = null;

  data.forEach((item) => {
    if (item.data.length > 0) {
      const last = item.data[item.data.length - 1]?.min;
      if (!lastTimeStamp || new Date(last) > new Date(lastTimeStamp)) {
        lastTimeStamp = last;
      }
    }
  });

  return (
    lastTimeStamp ||
    new Date(Date.now() - 5 * 60 * 1000).toISOString()
  );
};
const useIntervalFetch = (
  projectId: string,
  token:string,
  setChartData: (data: any) => void,
  enabled:boolean,
  chartData:any[]
) => {
  const chartDataRef = useRef<any[]>([]);

useEffect(() => {
  chartDataRef.current = chartData;
}, [chartData]);

  useEffect(() => {
   
    if (!projectId || !enabled) return;
console.log("projectId:", projectId, "enabled:", enabled);
    const interval = setInterval(async () => {
  
      try {
        const lastTimeStamp= getLastTimestamp(chartDataRef.current)
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/project/latestData?projectId=${projectId}&timeStamp=${lastTimeStamp}`,{
              headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        
     console.log(`${new Date().toISOString()}`)
     console.log(res)
       setChartData((prev:any)=>{
        const prevValue=[...prev]
        res.data.forEach((newVal:any) => {
          const index= prevValue.findIndex((item)=>item.metric==newVal.metric)
          if(index!=-1){
            const merged=[...prevValue[index].data,...newVal.data]
                        //  remove duplicates (by timestamp)
            const unique = merged.filter(
              (v, i, arr) =>
                i === arr.findIndex((x) => x.min === v.min)
            );

          // keep only last 20 points (optional but recommended)
            prevValue[index].data = unique.slice(-20);
          } else {
            // new widget added
            prevValue.push(newVal)
        }
     })
     console.log("hjklkjkjk",prevValue)
      return prevValue
       })
      } catch (err) {
        console.error(err);
      }
    }, 60000); 
   
    return () => clearInterval(interval);
  }, [projectId,token,enabled,chartData]);
};

export default useIntervalFetch;