import { Router } from "express";
import { apiKeyVerificationMiddleware } from "../middeware/inputData.middleware";
import { getUserMetric } from "../controller/getMetricFromUser";
 export const clientRouter:Router= Router();
 clientRouter.use(apiKeyVerificationMiddleware)
 clientRouter.route('/metric-data').post(getUserMetric)