import { memoryUsage } from "process";
import * as  z from "zod"
export const getUserMetricSchema=z.array(
z.object({
 responseTime: z.number(),
 activeUser:z.number(),
 totalUser:z.number(),
 route:z.string(),
 status:z.string(),
 method:z.string(),
 memoryUsage:z.number(),
 incomingTraffic:z.number(),
 outgoingTraffic: z.number(),
cpuUsage :z.number(),
timeStamps: z.coerce.date()
})

)


export const signUpSchema=z.object({
    username:z.string().min(3),
    email:z.email(),
    password:z.string().min(9)
})
export const  signInSchema=z.object({
    email:z.email(),
    password:z.string()
})
//enum
export const metricEnum = z.enum([
  "cpuUsage",
  "memoryUsage",
  "networkTraffic",
  "reqperSec",
  "totalUser",
  "activeUser",
  "responseTime",
  "errorResponse"
]);
export const chartTypeEnum = z.enum([
 "LINE_GRAPH",
  "BAR_GRAPH",
  "NUMBER",
  "PIE_CHART"
]);
export const addMetricSchema=z.object({
    type:metricEnum,
    chartType:chartTypeEnum,
    projectId:z.string()
})
export const getUserDefaultMetricSchema=z.object({
  projectId: z.string(),
})

export const latestDataSchema=z.object({
   timeStamp:z.coerce.date(),
   projectId:z.string()
})
export const projectSchema=z.object({
  name:z.string().min(3)
})


 declare global{
  namespace Express{
   export interface Request{
    id?:string,
    projectId?:string
   }
  }
}