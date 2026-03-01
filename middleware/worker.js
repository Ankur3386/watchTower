import axios from "axios";
import { metricsArray } from "../calclateMetrics.js"

export const worker =()=>{
setInterval(()=>{
if(metricsArray.length == 0){
    return ;
}
const apiKey ="sfdsf"
const batch =metricsArray.splice(0,metricsArray.length);
//push batch to timeSeries db
    axios.post(`${Backend_Url}/api/v1/client/metric-data`,{
        batch
    },
    {
   headers:{
    Authorization:`Bearer ${apiKey}`
}
    }
)
},15000)
}
