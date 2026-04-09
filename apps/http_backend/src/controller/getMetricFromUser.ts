import { NextFunction, Request, Response } from "express";
import { getUserMetricSchema } from "../util/type";
import { timeScaleClient } from "@repo/db-timescale/client";
import { memoryUsage } from "process";
export const getUserMetric=async (req:Request,res:Response,next:NextFunction)=>{
 
    // api key is valid or not 
    const parsedData  = getUserMetricSchema.safeParse(req.body);
    if(!parsedData.success){
      console.log(parsedData.error)
        return res.status(400).json("metric send are incoorect");
    }
    
  try {
    if(!req.projectId){
       return res.status(400).json("project id not received") 
    }
  
    const projectId=req.projectId
  
    const batchData= parsedData.data.map((metric)=>({
         projectId,
         activeUser:metric.activeUser,
         totalUser:metric.totalUser,
         route:metric.route,
         status:metric.status,
         method:metric.method,
         memoryUsage:metric.memoryUsage,
         incomingTraffic:metric.incomingTraffic,
         outgoingTraffic:metric.outgoingTraffic,
         cpuUsage:metric.cpuUsage,
         timeStamps:metric.timeStamps,
         responseTime:metric.responseTime
    }))
     // creating multiple roow at same time
      const metric= await timeScaleClient.project.createMany({
          data:batchData,
           skipDuplicates:true
      })
     
    return res.sendStatus(200)  //sendStatus --> means send response immediately and normal status express expect json
  } catch (error) {

    return res.sendStatus(500)  
  }
}