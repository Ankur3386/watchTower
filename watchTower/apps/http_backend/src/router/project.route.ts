import { Router } from "express";
import { addMetric, createProject, giveUserDefaultData, latestData } from "../controller/project.controller";
import router from "./index.route";
import { userMiddleware } from "../middeware/user.middleware";
 export const projectRouter:Router= Router();
 router.use(userMiddleware)
projectRouter.route('/getUserDefaultData').get(giveUserDefaultData)
projectRouter.route('/addMetric').post(addMetric)
projectRouter.route('/latestData').get(latestData)
projectRouter.route('/createProject').post(createProject)