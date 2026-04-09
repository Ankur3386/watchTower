import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient}  from "./generated/client/index.js";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv"
//@ts-ignore
const filename= fileURLToPath(import.meta.url)
const dirname= path.dirname(filename)
console.log("hi",dirname)
dotenv.config({
  path: path.resolve(dirname, "../.env"),
 
});
console.log(process.env.DATABASE_URL_TIMESCALE);
const adapter = new PrismaPg({ connectionString:process.env.DATABASE_URL_TIMESCALE })
 const timeScaleClient = new PrismaClient({ adapter })
 console.log("timeclient")
 export {timeScaleClient}