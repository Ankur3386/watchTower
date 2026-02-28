import * as  z from "zod"
export const getUserMetricSchema=z.object({
  projectId:z.string(),
 responseTime: z.number(),
 activeUser:z.number(),
 totalUser:z.number(),
 route:z.string(),
 status:z.string(),
 method:z.string(),
 memory:z.number(),
 incomingTraffic:z.number(),
 outgoingTraffic: z.number(),
cpuUsage :z.number(),
timeStamps: z.date()
})

export const signUpSchema=z.object({
    username:z.string(),
    email:z.string(),
    password:z.string()
})
export const  signInSchema=z.object({
    email:z.string(),
    password:z.string()
})
//enum
export const metricEnum = z.enum([
  "cpuUsage",
  "memoryUsage",
  "network",
  "reqperSec",
  "totalUser",
  "activeUser",
  "responseTime",
  "errorResponse"
]);

export const chartTypeEnum = z.enum([
  "HISTOGRAM",
  "BAR_GRAPH",
  "Number",
  "Pie_Chart"
]);
export const addMetricSchema=z.object({
    type:metricEnum,
    chartType:chartTypeEnum,
    dashboardId:z.string(),
    projectId:z.string()
})
export const getUserDefaultMetricSchema=z.object({
  projectId: z.string().min(1),
  timeStamp: z.coerce.date()
})

export const latestDataSchema=z.object({
   timeStamp:z.coerce.date(),
   type:z.string(),
   projectId:z.string()
})
export const projectSchema=z.object({
  name:z.string()
})
