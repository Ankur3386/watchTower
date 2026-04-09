-- CreateEnum
CREATE TYPE "metric" AS ENUM ('cpuUsage', 'memoryUsage', 'networkTraffic', 'reqperSec', 'totalUser', 'activeUser', 'responseTime', 'errorResponse');

-- CreateEnum
CREATE TYPE "chartType" AS ENUM ('BAR_GRAPH', 'NUMBER', 'PIE_CHART', 'LINE_GRAPH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectWidgets" (
    "id" TEXT NOT NULL,
    "chartType" "chartType" NOT NULL,
    "metric" "metric" NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectWidgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_apiKey_key" ON "Project"("apiKey");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectWidgets" ADD CONSTRAINT "ProjectWidgets_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
