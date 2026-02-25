import { json } from "express";
import { calculateCpu, memoryUsed } from "./cpuUsage";

let count=0;
let totalUser=0;
export const metricsArray=[]; 
export const userMetrics=(req,res,next)=>{
    let startTimeCpu=Date.now()
    let cpuAtStart=process.cpuUsage();
    const startTime=Date.now()
      count++ 
      totalUser++
    let  incomingTraffic=0;
      if(req.body){
        const data= JSON.stringify(req.body)
        incomingTraffic= Buffer.byteLength(data,'utf8')
      }
            
      const originalJson = res.json;
        let outgoingTraffic = 0;
//this does not work for res.send
  res.json = function (data) {
    outgoingTraffic = Buffer.byteLength(JSON.stringify(data), 'utf8');
     return originalJson.call(this, data); // still sends the JSON response to client this is used as res need context
  };
  // happens after res is send so calculate traffic before it
       res.on('finish',()=>{
        const endTime=Date.now();
        const duration=endTime-startTime
        count--
  
    metricsArray.push({
    responseTime:duration,
    activeUser:count,
    totalUser:totalUser,
    route:req.route ? req.route.path :req.path,
    status:res.statusCode,
    method:req.method,
    memory:memoryUsed(),
      incomingTraffic,  // bytes sent by client
      outgoingTraffic, 
    cpuUsage:calculateCpu(cpuAtStart,startTimeCpu),
    timeStamps:Date.now()
})})
       next();
}