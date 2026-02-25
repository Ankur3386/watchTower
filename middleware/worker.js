import { metricsArray } from "../calclateMetrics.js"

export const worker =()=>{
setInterval(()=>{
if(metricsArray.length == 0){
    return ;
}

const batch =metricsArray.splice(0,metricsArray.length);
//push batch to timeSeries db
},15000)
}
