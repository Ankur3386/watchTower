import { NextFunction, Request, Response } from "express";
import { getUserMetricSchema } from "../util/type";
import { timeScaleClient } from "@repo/db-timescale/client";
export const getUserMetric=async (req:Request,res:Response,next:NextFunction)=>{

    // api key is valid or not 
    const parsedData  = getUserMetricSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json("metric send are incoorect");
    }
    
  try {
    if(!req.projectId){
       return res.status(400).json("project id not received") 
    }
      //upsert= update and insert --> so project exist update otherwise create
      const metric= await timeScaleClient.project.upsert({
          where:{
              projectId:req.projectId
          },
          update:{
          projectId:req.projectId,
         activeUser:parsedData.data.activeUser,
         totalUser:parsedData.data.totalUser,
         route:parsedData.data.route,
         status:parsedData.data.status,
         method:parsedData.data.method,
         memory:parsedData.data.memory,
         incomingTraffic:parsedData.data.incomingTraffic,
         outgoingTraffic:parsedData.data.outgoingTraffic,
         cpuUsage:parsedData.data.cpuUsage,
         timeStamps:parsedData.data.timeStamps,
         responseTime:parsedData.data.responseTime
          },
          create:{
        projectId:req.projectId,
         activeUser:parsedData.data.activeUser,
         totalUser:parsedData.data.totalUser,
         route:parsedData.data.route,
         status:parsedData.data.status,
         method:parsedData.data.method,
         memory:parsedData.data.memory,
         incomingTraffic:parsedData.data.incomingTraffic,
         outgoingTraffic:parsedData.data.outgoingTraffic,
         cpuUsage:parsedData.data.cpuUsage,
         timeStamps:parsedData.data.timeStamps,
         responseTime:parsedData.data.responseTime
          }
      })
    return res.sendStatus(200)  //sendStatus --> means send response immediately and normal status express expect json
  } catch (error) {
    return res.sendStatus(500)  
  }
}