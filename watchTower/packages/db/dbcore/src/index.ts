import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../client";
//@ts-ignore
const adapter = new PrismaPg({ connectionString:process.env.DATABASE_URL })
export const client = new PrismaClient({ adapter })