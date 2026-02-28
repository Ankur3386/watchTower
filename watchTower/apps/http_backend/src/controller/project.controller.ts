import { NextFunction, Request, Response } from "express";
import {timeScaleClient} from "@repo/db-timescale/client"
import {client} from "@repo/dbcore/client"
import { addMetricSchema, getUserMetricSchema, getUserDefaultMetricSchema, latestDataSchema, projectSchema } from "../util/type";
export const giveUserDefaultData=async(req:Request,res:Response,next:NextFunction)=>{
const parsedData= getUserDefaultMetricSchema.safeParse(req.query)
if(!parsedData.success){
     return res.status(400).json("send correct credential"); 
}
    const {projectId,timeStamp}=parsedData.data
    const metricType= await client.dashboard.findFirst({
        where:{
            projectId
        },
        select:{
             dashBoard_widget:{
               select:{
                chartType:true,
                metric:true
               }
             }

}})
const widget = metricType?.dashBoard_widget || []
const metricToFetch= widget.length >0 ? widget:[{metric:"cpuUsage",chartType:"BAR_GRAPH"}]

const response=await  Promise.all(
    metricToFetch.map(async(widget)=>{
        const{metric,chartType}=widget
        const allMetric=[
                "cpuUsage",
                "memoryUsage",
                "network",
                "reqperSec",
                "totalUser",
                "activeUser",
                "responseTime",
                "errorResponse"
        ]
        if(!allMetric.includes(metric)) return {chartType,metric,data:[]};
        const data= await timeScaleClient.$queryRawUnsafe(`
    SELECT
    time_bucket('1 minute', timeStamps) AS min,
    AVG("${metric}") AS avg_${metric}
    FROM "Project" 
    WHERE
    "projectId"='${projectId}' 
    AND
     "timeStamps" > NOW() - INTERVAL '5 minute'
    GROUP BY min
    ORDER BY min  DESC
    LIMIT 5;`)
  return {chartType,metric,data}
    })
)
return res.status(200).json(response)
}
export const addMetric=async(req:Request,res:Response,next:NextFunction)=>{
const parsedData= addMetricSchema.safeParse(req.body)
if(!parsedData.success){
    return res.status(400).json("send correct credential");
}
const projectId =parsedData.data.projectId
const project= await client.project.findFirst({
    where:{
        id:parsedData.data.projectId
    }
})
if(!project){
    return res.status(400).json("project with this project id does not exist"); 
}
 const allMetric=[
                "cpuUsage",
                "memoryUsage",
                "network",
                "reqperSec",
                "totalUser",
                "activeUser",
                "responseTime",
                "errorResponse"
        ]
        if(!allMetric.includes(parsedData.data.type)) {
            return res.status(400).json("send correct metric")
        }
const dashboardWidget= await client.dashboardWidgets.create({
    data:{
        chartType:parsedData.data.chartType,
        metric:parsedData.data.type,
        dashBoardId:parsedData.data.dashboardId
    }
})
if(!dashboardWidget){
    return res.status(400).json("error creating dashboard widget");
}


const data= await timeScaleClient.$queryRawUnsafe(`
    SELECT
    time_bucket('1 minute', timeStamps) AS min,
    AVG("${parsedData.data.type}") AS avg_${parsedData.data.type}
FROM "Project"
WHERE "projectId"='${project.id}'
 AND "timeStamps" > NOW() - INTERVAL '5 minute'
GROUP BY min
ORDER BY min  DESC
LIMIT 5;`)
if(!data){
      return res.status(400).json("error creating dashboard widget"); 
}
return res.status(200).json({"chartType":parsedData.data.chartType,"metric":parsedData.data.type,"Data":data})
}
export const latestData=async(req:Request,res:Response,next:NextFunction)=>{
    //receive latest Data and sendnew entry
try {
    const parsedData= latestDataSchema.safeParse(req.query);
    if(!parsedData.success){
        return res.status(400).json("send correct credentials")
    }
    const allMetric=[
                    "cpuUsage",
                    "memoryUsage",
                    "network",
                    "reqperSec",
                    "totalUser",
                    "activeUser",
                    "responseTime",
                    "errorResponse"
            ]
            if(!allMetric.includes(parsedData.data.type)) {
                return res.status(400).json("send correct metric")
            }
    const data = await timeScaleClient.$queryRawUnsafe(
       `SELECT
        time_bucket('1 minute', "timeStamps") AS min,
        AVG("${parsedData.data.type}") AS avg_${parsedData.data.type}
    
    FROM "Project"
    
    WHERE "projectId" = '${parsedData.data.projectId}'
    AND "timeStamps" > '${parsedData.data.timeStamp}'
    
    GROUP BY min
    
    ORDER BY min ASC;`
    )
        if(!data){
            return res.status(400).json("error finding data")
        }
        return res.status(200).json({metric:parsedData.data.type,data})
} catch (error) {
    return res.status(500).json("internal server error")
}

}
export const createProject = async (req: Request, res: Response) => {
 try {

   const parsedData = projectSchema.safeParse(req.body);

   if (!parsedData.success) {
     return res.status(400).json("invalid  body data");
   }

   const project = await client.project.create({
     data: {
       name: parsedData.data.name,
       userId: req.id
     }
   });

   return res.status(201).json({
     projectId: project.id,
     apiKey: project.apiKey
   });

 } catch (error) {

   console.error(error);

   return res.status(500).json("internal server error");
 }
};