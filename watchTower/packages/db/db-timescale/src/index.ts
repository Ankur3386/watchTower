import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../client";
const adapter = new PrismaPg({ connectionString:process.env.DATABASE_URL })
export const timeScaleClient = new PrismaClient({ adapter })