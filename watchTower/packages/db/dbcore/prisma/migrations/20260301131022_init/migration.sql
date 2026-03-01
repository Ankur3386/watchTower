-- CreateEnum
CREATE TYPE "metric" AS ENUM ('cpuUsage', 'memoryUsage', 'network', 'reqperSec', 'totalUser', 'activeUser', 'responseTime', 'errorResponse');

-- CreateEnum
CREATE TYPE "chartType" AS ENUM ('HISTOGRAM', 'BAR_GRAPH', 'Number', 'Pie_Chart');

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

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardWidgets" (
    "id" TEXT NOT NULL,
    "chartType" "chartType" NOT NULL,
    "metric" "metric" NOT NULL,
    "dashBoardId" TEXT NOT NULL,

    CONSTRAINT "DashboardWidgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_apiKey_key" ON "Project"("apiKey");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardWidgets" ADD CONSTRAINT "DashboardWidgets_dashBoardId_fkey" FOREIGN KEY ("dashBoardId") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
