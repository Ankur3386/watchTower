import { NextFunction, Request, Response } from "express";
import {timeScaleClient} from "@repo/db-timescale/client"
import {client} from "@repo/dbcore/client"
import { addMetricSchema, getUserDefaultMetricSchema, latestDataSchema, projectSchema } from "../util/type";
import jwt from "jsonwebtoken"
export const giveUserDefaultData=async(req:Request,res:Response,next:NextFunction)=>{
const parsedData= getUserDefaultMetricSchema.safeParse(req.query)
if(!parsedData.success){
     return res.status(400).json("send correct credential"); 
}
    const {projectId}=parsedData.data
    const metricType=  await client.projectWidgets.findMany({
  where: { projectId },
  select: {
    chartType: true,
    metric: true
  }
});
let widget = metricType || []
if(widget.length==0){
const createProjectWidget= await client.projectWidgets.create({
    data:{
        chartType:"LINE_GRAPH",
        metric:"cpuUsage",
        projectId
    }
})
if(!createProjectWidget){
    return res.status(400).json("error creating default metric");  
}
 widget = [{
    chartType: "LINE_GRAPH",
    metric: "cpuUsage"
  }];
}

const metricToFetch= widget

const response=await Promise.all(
    metricToFetch.map(async(widget)=>{
        const{metric,chartType}=widget
        const allMetric=[
                "cpuUsage",
                "memoryUsage",
                "networkTraffic",
                "reqperSec",
                "totalUser",
                "activeUser",
                "responseTime",
                "errorResponse"
        ]
        if(!allMetric.includes(metric)) return {chartType,metric,data:[]};
        //check interval in query
        // shifted from this 
       
        // to this a sit return latest 5 minutes but only where data exists: 
        const data= await timeScaleClient.$queryRawUnsafe(`
          SELECT
         time_bucket('1 minute', "timeStamps") AS min,
         AVG("${metric}") AS "${metric}"
         FROM "Project" 
         WHERE
         "projectId"='${projectId}' 
         AND
         "timeStamps" > NOW() - INTERVAL '5 min'
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
        id:projectId
    }
})

if(!project){
    return res.status(400).json("project with this project id does not exist"); 
}
 const allMetric=[
                "cpuUsage",
                "memoryUsage",
                "networkTraffic",
                "reqperSec",
                "totalUser",
                "activeUser",
                "responseTime",
                "errorResponse"
        ]
        if(!allMetric.includes(parsedData.data.type)) {
            return res.status(400).json("send correct metric")
        }
const createProjectWidget= await client.projectWidgets.create({
    data:{
        chartType:parsedData.data.chartType,
        metric:parsedData.data.type,
        projectId:parsedData.data.projectId
    }
})

if(!createProjectWidget){
    return res.status(400).json("error creating project widget");
}

return res.status(200).json("metric added successfully")
}
export const latestData=async(req:Request,res:Response,next:NextFunction)=>{

try {
    
    const parsedData= latestDataSchema.safeParse(req.query);
    if(!parsedData.success){
        return res.status(400).json("send correct credentials")
    }
    console.log("hi")
    const project= await client.project.findFirst({
        where:{
            id:parsedData.data.projectId
        },
        select:{
            projectWidget:{
                select:{
                metric:true,
                chartType:true
                }
             
            }
        }
    })
    console.log("hi2")
       if (!project) {
      return res.status(400).json("project not found");
    }
   
console.log(parsedData.data.timeStamp)
    const widgets=project?.projectWidget || []
    const response= await Promise.all(
        widgets.map(async(widget)=>{
        const {metric,chartType}=widget
    const data = await timeScaleClient.$queryRawUnsafe(
  `SELECT
      time_bucket('1 minute', "timeStamps") AS min,
      AVG("${metric}") AS "${metric}"
   FROM "Project"
   WHERE "projectId" = '${parsedData.data.projectId}'
     AND "timeStamps" > $1
   GROUP BY min
   ORDER BY min ASC;`,
  new Date(parsedData.data.timeStamp)
);

  // passing timestamp as the way like to prevent sql injection as inb/w req queries it was treated as string and giving wrong ans
      return {data,chartType,metric}
        })
    )
    console.log(response,parsedData.data.timeStamp)
  return res.status(200).json(response);
  } catch (error) {
    console.log(error)
    return res.status(500).json("internal server error");
  }

}
export const createProject = async (req: Request, res: Response) => {
 try {

   const parsedData = projectSchema.safeParse(req.body);

   if (!parsedData.success) {
     return res.status(400).json("invalid  body data");
   }
     if (!req.id) {
     return res.status(401).json("unauthorized");
   }
   console.log(req.id)
   const project = await client.project.create({
     data: {
       name: parsedData.data.name,
       userId: req.id
     }
   });
   const apiKey= jwt.sign({
    id:project.id
   },process.env.apiSecret as string)
  const newProjectData= await client.project.update({
    where:{
        id:project.id
    },
    data:{
        apiKey
    }
  })

   return res.status(201).json({
     projectId: project.id,
     apiKey: newProjectData.apiKey
   });

 } catch (error) {

   console.error(error);

   return res.status(500).json("internal server error");
 }
};