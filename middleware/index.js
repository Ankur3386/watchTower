import express from "express"
import { userMetrics } from "../calclateMetrics.js";
import { worker } from "./worker.js";
const app=express();
app.use(userMetrics);
worker()
// add networktraffic and error code
app.listen(3000);