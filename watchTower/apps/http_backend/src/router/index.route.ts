import { Router } from "express";
import { dashboard, signInUser, signUpUser } from "../controller/user.controller";
import { projectRouter } from "./project.route";
import { userMiddleware } from "../middeware/user.middleware";
import { clientRouter } from "./client.route";

 const router:Router= Router();
 router.use('/project',projectRouter)
 router.use('/client',clientRouter)
router.route('/sign-up').post(signUpUser)
router.route('/sign-in').post(signInUser)
router.route('/dashboard').get(userMiddleware,dashboard)
export default router