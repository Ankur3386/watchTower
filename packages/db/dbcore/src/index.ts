import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient}  from "./generated/client/index.js";
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
//@ts-ignore
const filename= fileURLToPath(import.meta.url)
const dirname= path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, "../.env"),

});
console.log("hi",process.env.DATABASE_URL)

const adapter = new PrismaPg({ connectionString:process.env.DATABASE_URL })
export const client = new PrismaClient({ adapter })